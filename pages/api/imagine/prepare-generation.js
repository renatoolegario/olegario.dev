import getDb from "infra/database";
import { buildPromptWithReplacements } from "../../../utils/imagineModels";
import {
  deleteBlobByUrl,
  guessFileExtension,
  mapGenerationRow,
  parseDataUrl,
  uploadToBlob,
} from "../../../utils/generation";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

function normalizeColorDescription(colorName, colorHex) {
  if (colorName && typeof colorName === "string") {
    return colorName.trim();
  }

  if (colorHex && typeof colorHex === "string") {
    return colorHex.trim();
  }

  return "a cor selecionada";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const {
    orderId,
    encryptedEmail,
    modelType,
    colorName,
    colorHex,
    imageDataUrl,
    originalFileName,
  } = req.body || {};

  if (!orderId) {
    return res.status(400).json({ message: "orderId é obrigatório" });
  }

  if (!encryptedEmail) {
    return res.status(400).json({ message: "encryptedEmail é obrigatório" });
  }

  if (!imageDataUrl) {
    return res.status(400).json({ message: "imageDataUrl é obrigatório" });
  }

  const { base64, mimeType } = parseDataUrl(imageDataUrl);

  if (!base64) {
    return res
      .status(400)
      .json({ message: "Imagem inválida ou não suportada" });
  }

  const buffer = Buffer.from(base64, "base64");
  const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
  const client = await getDb(schema);

  let uploadedBlobUrl = null;
  let previousBlobUrl = null;
  let generationRow = null;

  try {
    await client.query("BEGIN");

    const paymentResult = await client.query(
      `
        SELECT id, player_email, encrypted_email, model_type
        FROM player_payments
        WHERE order_id = $1
        LIMIT 1;
      `,
      [orderId]
    );

    if (paymentResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return res
        .status(404)
        .json({ message: "Pedido não encontrado para este orderId" });
    }

    const payment = paymentResult.rows[0];

    const existingGeneration = await client.query(
      `
        SELECT id, source_image_blob_url
        FROM generated_images
        WHERE order_id = $1
        LIMIT 1;
      `,
      [orderId]
    );

    if (existingGeneration.rowCount > 0) {
      previousBlobUrl = existingGeneration.rows[0].source_image_blob_url;
    }

    uploadedBlobUrl = await uploadToBlob({
      buffer,
      contentType: mimeType || "image/png",
      orderId,
      extension: guessFileExtension(mimeType),
      prefix: "source",
    });

    const appliedModelType =
      typeof modelType === "string" && modelType.trim()
        ? modelType.trim()
        : payment.model_type;

    const promptTemplate = buildPromptWithReplacements(appliedModelType, {
      cor: normalizeColorDescription(colorName, colorHex),
    });

    const statusMessage =
      "Pagamento pendente. Assim que confirmado iniciaremos o processamento.";

    const upsertQuery = `
      INSERT INTO generated_images (
        player_payment_id,
        order_id,
        player_email,
        encrypted_email,
        model_type,
        selected_color_name,
        selected_color_hex,
        prompt,
        status,
        status_message,
        source_image_name,
        source_image_mime_type,
        source_image_blob_url,
        error_message,
        last_checked_at,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9, $10, $11, $12, NULL, NOW(), NOW(), NOW()
      )
      ON CONFLICT (order_id) DO UPDATE
      SET
        player_payment_id = EXCLUDED.player_payment_id,
        player_email = EXCLUDED.player_email,
        encrypted_email = EXCLUDED.encrypted_email,
        model_type = EXCLUDED.model_type,
        selected_color_name = EXCLUDED.selected_color_name,
        selected_color_hex = EXCLUDED.selected_color_hex,
        prompt = COALESCE(EXCLUDED.prompt, generated_images.prompt),
        status = EXCLUDED.status,
        status_message = EXCLUDED.status_message,
        source_image_name = EXCLUDED.source_image_name,
        source_image_mime_type = EXCLUDED.source_image_mime_type,
        source_image_blob_url = EXCLUDED.source_image_blob_url,
        error_message = NULL,
        last_checked_at = NOW(),
        updated_at = NOW()
      RETURNING *;
    `;

    const upsertValues = [
      payment.id,
      orderId,
      payment.player_email,
      payment.encrypted_email,
      appliedModelType || null,
      colorName || null,
      colorHex || null,
      promptTemplate,
      statusMessage,
      originalFileName || null,
      mimeType || null,
      uploadedBlobUrl,
    ];

    const generationResult = await client.query(upsertQuery, upsertValues);
    generationRow = generationResult.rows[0];

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao preparar geração de imagem:", error);

    if (uploadedBlobUrl) {
      deleteBlobByUrl(uploadedBlobUrl).catch((cleanupError) => {
        console.error(
          "Erro ao remover imagem temporária após falha na preparação",
          cleanupError
        );
      });
    }

    return res.status(500).json({
      message:
        error.message || "Erro interno ao preparar a geração da imagem",
    });
  } finally {
    client.release();
  }

  if (previousBlobUrl && previousBlobUrl !== uploadedBlobUrl) {
    deleteBlobByUrl(previousBlobUrl).catch((cleanupError) => {
      console.error(
        "Erro ao remover imagem anterior do blob durante preparação",
        cleanupError
      );
    });
  }

  return res
    .status(200)
    .json({ generation: mapGenerationRow(generationRow) });
}
