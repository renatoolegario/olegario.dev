import getDb from "infra/database";
import { buildPromptWithReplacements } from "../../../utils/imagineModels";
import {
  parseDataUrl,
  mapGenerationRow,
  normalizeRemoteStatus,
} from "../../../utils/generation";

function normalizeColorDescription(colorName, colorHex) {
  if (colorName && typeof colorName === "string") {
    return colorName.trim();
  }
  if (colorHex && typeof colorHex === "string") {
    return colorHex.trim();
  }
  return "a cor selecionada";
}

function extractJobIdFromResponse(response) {
  if (!response || typeof response !== "object") return null;
  return (
    response.jobId ||
    response.id ||
    response.requestId ||
    response.taskId ||
    response.processId ||
    null
  );
}

async function requestRemoteGeneration(payload) {
  const { GEMINI_API } = process.env;
  if (!GEMINI_API) {
    return { status: "processing", statusMessage: "Processando com recurso local." };
  }

  const requestBody = {
    action: "generate",
    ...payload,
  };

  const response = await fetch(GEMINI_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.message ||
      errorData?.error ||
      `Falha ao solicitar geração remota (${response.status})`;
    throw new Error(message);
  }

  return response.json();
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

  const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
  const client = await getDb(schema);

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
        .json({ message: "Pagamento não encontrado para este pedido" });
    }

    const payment = paymentResult.rows[0];

    if (payment.encrypted_email !== encryptedEmail) {
      await client.query("ROLLBACK");
      return res.status(403).json({ message: "Token do pedido inválido" });
    }

    const appliedModelType =
      typeof modelType === "string" && modelType.trim()
        ? modelType.trim()
        : payment.model_type;

    const promptTemplate = buildPromptWithReplacements(appliedModelType, {
      cor: normalizeColorDescription(colorName, colorHex),
    });

    const { base64, mimeType } = parseDataUrl(imageDataUrl);

    if (!base64) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Imagem inválida ou não suportada" });
    }

    let status = "processing";
    let statusMessage =
      "Imagem recebida. Iniciamos o processamento no provedor de IA.";
    let externalJobId = null;
    let errorMessage = null;

    try {
      const remoteResponse = await requestRemoteGeneration({
        orderId,
        prompt: promptTemplate,
        modelType: appliedModelType,
        color: { name: colorName || null, hex: colorHex || null },
        imageBase64: base64,
        email: payment.player_email,
      });

      externalJobId = extractJobIdFromResponse(remoteResponse);
      const remoteStatus = normalizeRemoteStatus(remoteResponse?.status);

      if (remoteStatus) {
        status = remoteStatus;
      }

      statusMessage =
        remoteResponse?.statusMessage ||
        remoteResponse?.message ||
        statusMessage;

      if (status === "failed") {
        errorMessage =
          remoteResponse?.error || remoteResponse?.errorMessage || errorMessage;
      }
    } catch (error) {
      console.error("Erro ao solicitar geração externa", error);
      status = "failed";
      statusMessage =
        "Não foi possível iniciar a geração da imagem no provedor externo.";
      errorMessage = error.message || statusMessage;
    }

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
        external_job_id,
        result_image_url,
        source_image_name,
        source_image_mime_type,
        error_message,
        last_checked_at,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW(), NOW()
      )
      ON CONFLICT (order_id) DO UPDATE
      SET
        player_payment_id = EXCLUDED.player_payment_id,
        player_email = EXCLUDED.player_email,
        encrypted_email = EXCLUDED.encrypted_email,
        model_type = EXCLUDED.model_type,
        selected_color_name = EXCLUDED.selected_color_name,
        selected_color_hex = EXCLUDED.selected_color_hex,
        prompt = EXCLUDED.prompt,
        status = EXCLUDED.status,
        status_message = EXCLUDED.status_message,
        external_job_id = COALESCE(EXCLUDED.external_job_id, generated_images.external_job_id),
        result_image_url = COALESCE(EXCLUDED.result_image_url, generated_images.result_image_url),
        source_image_name = EXCLUDED.source_image_name,
        source_image_mime_type = EXCLUDED.source_image_mime_type,
        error_message = EXCLUDED.error_message,
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
      status,
      statusMessage,
      externalJobId,
      null,
      originalFileName || null,
      mimeType || null,
      errorMessage,
    ];

    const generationResult = await client.query(upsertQuery, upsertValues);
    generationRow = generationResult.rows[0];

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao iniciar geração da imagem:", error);
    return res.status(500).json({
      message: error.message || "Erro interno ao iniciar a geração da imagem",
    });
  } finally {
    client.release();
  }

  const payload = mapGenerationRow(generationRow);

  if (payload?.status === "failed") {
    return res.status(502).json({
      message:
        payload.errorMessage ||
        "Não foi possível iniciar a geração da imagem no provedor externo.",
      generation: payload,
    });
  }

  return res.status(200).json({ generation: payload });
}
