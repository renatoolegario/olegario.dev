import { GoogleGenAI } from "@google/genai";
import getDb from "infra/database";
import { buildPromptWithReplacements } from "../../../utils/imagineModels";
import {
  fetchBufferFromUrl,
  guessFileExtension,
  parseDataUrl,
  mapGenerationRow,
  normalizeRemoteStatus,
  uploadToBlob,
  deleteBlobByUrl,
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

function extractPartsFromGenerateResponse(response) {
  if (!response || typeof response !== "object") return [];

  if (Array.isArray(response.parts)) {
    return response.parts;
  }

  const candidateSources = [];

  if (Array.isArray(response.response?.candidates)) {
    candidateSources.push(...response.response.candidates);
  }

  if (Array.isArray(response.candidates)) {
    candidateSources.push(...response.candidates);
  }

  for (const candidate of candidateSources) {
    if (candidate?.content?.parts && Array.isArray(candidate.content.parts)) {
      return candidate.content.parts;
    }
    if (Array.isArray(candidate?.parts)) {
      return candidate.parts;
    }
  }

  return [];
}

function collectTextFromParts(parts) {
  if (!Array.isArray(parts)) return "";
  return parts
    .filter(
      (part) => typeof part?.text === "string" && part.text.trim().length > 0
    )
    .map((part) => part.text.trim())
    .join(" ")
    .trim();
}

async function requestRemoteGeneration({ prompt, imageBase64, imageMimeType }) {
  const apiKey =
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GEMINI_API_KEY;

  const ai = apiKey ? new GoogleGenAI({ apiKey }) : new GoogleGenAI({});

  const contents = [];
  const promptText = typeof prompt === "string" ? prompt.trim() : "";
  if (promptText) {
    contents.push({ text: promptText });
  }

  if (imageBase64) {
    contents.push({
      inlineData: {
        mimeType: imageMimeType || "image/png",
        data: imageBase64,
      },
    });
  }

  if (contents.length === 0) {
    throw new Error(
      "Não foi possível preparar o conteúdo para o modelo de imagem."
    );
  }

  const modelName =
    process.env.GOOGLE_GENAI_IMAGE_MODEL || "gemini-2.5-flash-image";

  const response = await ai.models.generateContent({
    model: modelName,
    contents,
  });

  console.log("Resposta", response);
  const parts = extractPartsFromGenerateResponse(response) || [];
  const textMessage = collectTextFromParts(parts);

  const inlinePart = parts.find((part) => part?.inlineData?.data);

  if (!inlinePart) {
    throw new Error(
      textMessage || "O provedor não retornou a imagem gerada para este pedido."
    );
  }

  return {
    status: "completed",
    statusMessage: textMessage || "Imagem gerada com sucesso.",
    imageBase64: inlinePart.inlineData.data,
    imageMimeType:
      inlinePart.inlineData.mimeType || imageMimeType || "image/png",
  };
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
    imageBlobUrl,
    originalFileName,
  } = req.body || {};

  if (!orderId) {
    return res.status(400).json({ message: "orderId é obrigatório" });
  }

  if (!encryptedEmail) {
    return res.status(400).json({ message: "encryptedEmail é obrigatório" });
  }

  if (!imageDataUrl && !imageBlobUrl) {
    return res.status(400).json({
      message: "É necessário fornecer a imagem de origem para gerar o conteúdo",
    });
  }

  const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
  const client = await getDb(schema);

  let generationRow = null;
  let sourceBlobUrlForCleanup = null;

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

    let base64 = null;
    let mimeType = null;

    if (imageBlobUrl) {
      try {
        const remoteSource = await fetchBufferFromUrl(imageBlobUrl);
        base64 = remoteSource.buffer.toString("base64");
        mimeType = remoteSource.contentType || null;
        sourceBlobUrlForCleanup = imageBlobUrl;
      } catch (blobError) {
        await client.query("ROLLBACK");
        console.error("Erro ao baixar imagem do blob", blobError);
        return res.status(400).json({
          message:
            blobError.message ||
            "Não foi possível acessar a imagem enviada para processamento.",
        });
      }
    }

    if (!base64 && imageDataUrl) {
      const parsed = parseDataUrl(imageDataUrl);
      base64 = parsed.base64;
      mimeType = parsed.mimeType || mimeType;
    }

    if (!base64) {
      await client.query("ROLLBACK");
      return res
        .status(400)
        .json({ message: "Imagem inválida ou não suportada" });
    }

    let status = "processing";
    let statusMessage =
      "Imagem recebida. Iniciamos o processamento no provedor de IA.";
    let externalJobId = null;
    let resultImageUrl = null;
    let errorMessage = null;

    try {
      const remoteResponse = await requestRemoteGeneration({
        prompt: promptTemplate,
        imageBase64: base64,
        imageMimeType: mimeType,
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

      if (status === "completed") {
        const generatedBase64 =
          remoteResponse?.imageBase64 || remoteResponse?.base64 || null;
        const generatedUrl =
          remoteResponse?.imageUrl || remoteResponse?.url || null;
        const generatedMimeType =
          remoteResponse?.imageMimeType || remoteResponse?.mimeType || mimeType;

        try {
          let uploadBuffer = null;
          let uploadMimeType = generatedMimeType || "image/png";

          if (generatedBase64) {
            uploadBuffer = Buffer.from(generatedBase64, "base64");
          } else if (generatedUrl) {
            const remoteData = await fetchBufferFromUrl(generatedUrl);
            uploadBuffer = remoteData.buffer;
            uploadMimeType = remoteData.contentType || uploadMimeType;
          }

          if (uploadBuffer) {
            const blobUrl = await uploadToBlob({
              buffer: uploadBuffer,
              contentType: uploadMimeType,
              orderId,
              extension: guessFileExtension(uploadMimeType),
            });

            if (blobUrl) {
              resultImageUrl = blobUrl;
            }
          } else if (!resultImageUrl) {
            throw new Error(
              "Nenhuma imagem gerada foi retornada pelo provedor."
            );
          }
        } catch (uploadError) {
          console.error("Erro ao salvar imagem gerada no blob", uploadError);
          status = "failed";
          statusMessage =
            "Não foi possível salvar a imagem gerada no armazenamento.";
          errorMessage = uploadError.message || statusMessage;
        }
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
      resultImageUrl,
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

    if (sourceBlobUrlForCleanup) {
      try {
        await deleteBlobByUrl(sourceBlobUrlForCleanup);
      } catch (cleanupError) {
        console.error(
          "Não foi possível remover a imagem original do blob",
          cleanupError
        );
      }
    }
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
