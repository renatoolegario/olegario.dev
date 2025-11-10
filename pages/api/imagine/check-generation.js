import getDb from "infra/database";
import {
  fetchBufferFromUrl,
  guessFileExtension,
  mapGenerationRow,
  normalizeRemoteStatus,
  uploadToBlob,
} from "../../../utils/generation";

async function requestRemoteStatus({ orderId, jobId }) {
  const { GEMINI_API } = process.env;
  if (!GEMINI_API || !jobId) {
    return null;
  }

  const response = await fetch(GEMINI_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "status", orderId, jobId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.message ||
      errorData?.error ||
      `Falha ao consultar status remoto (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({ message: "orderId é obrigatório" });
  }

  const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
  const client = await getDb(schema);

  try {
    const recordResult = await client.query(
      `
        SELECT *
        FROM generated_images
        WHERE order_id = $1
        LIMIT 1;
      `,
      [orderId]
    );

    if (recordResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum registro de geração encontrado" });
    }

    let generation = recordResult.rows[0];
    let shouldUpdate = false;
    let nextStatus = generation.status;
    let nextStatusMessage = generation.status_message;
    let nextResultUrl = generation.result_image_url;
    let nextErrorMessage = generation.error_message;

    const needsRemoteCheck = ![
      "completed",
      "failed",
      "canceled",
    ].includes((generation.status || "").toLowerCase());

    let remoteResponse = null;

    if (needsRemoteCheck && generation.external_job_id) {
      try {
        remoteResponse = await requestRemoteStatus({
          orderId,
          jobId: generation.external_job_id,
        });
      } catch (error) {
        console.error("Erro ao consultar status remoto", error);
      }
    }

    if (remoteResponse) {
      const remoteStatus = normalizeRemoteStatus(remoteResponse?.status);

      if (remoteResponse?.statusMessage || remoteResponse?.message) {
        const message =
          remoteResponse.statusMessage || remoteResponse.message ||
          nextStatusMessage;
        if (message !== nextStatusMessage) {
          nextStatusMessage = message;
          shouldUpdate = true;
        }
      }

      if (remoteStatus) {
        if (remoteStatus !== nextStatus) {
          nextStatus = remoteStatus;
          shouldUpdate = true;
        }
      }

      if (remoteStatus === "failed") {
        const remoteError =
          remoteResponse?.error || remoteResponse?.errorMessage || null;
        if (remoteError && remoteError !== nextErrorMessage) {
          nextErrorMessage = remoteError;
          shouldUpdate = true;
        }
      }

      if (remoteStatus === "completed") {
        const remoteBase64 =
          remoteResponse?.imageBase64 || remoteResponse?.base64 || null;
        const remoteUrl = remoteResponse?.imageUrl || remoteResponse?.url || null;
        const remoteMimeType =
          remoteResponse?.imageMimeType || remoteResponse?.mimeType || null;

        if (!nextResultUrl) {
          try {
            let uploadBuffer = null;
            let uploadContentType = remoteMimeType || "image/png";

            if (remoteBase64) {
              uploadBuffer = Buffer.from(remoteBase64, "base64");
            } else if (remoteUrl) {
              const remoteData = await fetchBufferFromUrl(remoteUrl);
              uploadBuffer = remoteData.buffer;
              uploadContentType = remoteData.contentType || uploadContentType;
            }

            if (uploadBuffer) {
              const blobUrl = await uploadToBlob({
                buffer: uploadBuffer,
                contentType: uploadContentType,
                orderId,
                extension: guessFileExtension(uploadContentType),
              });
              if (blobUrl) {
                nextResultUrl = blobUrl;
                shouldUpdate = true;
                nextErrorMessage = null;
              }
            }
          } catch (error) {
            console.error("Erro ao salvar imagem gerada no blob", error);
            nextErrorMessage =
              error.message ||
              "Não foi possível salvar a imagem gerada no armazenamento.";
            nextStatus = "failed";
            shouldUpdate = true;
          }
        }
      }
    }

    if (shouldUpdate) {
      const updateResult = await client.query(
        `
          UPDATE generated_images
          SET
            status = $2,
            status_message = $3,
            result_image_url = COALESCE($4, result_image_url),
            error_message = $5,
            last_checked_at = NOW(),
            updated_at = NOW()
          WHERE id = $1
          RETURNING *;
        `,
        [
          generation.id,
          nextStatus,
          nextStatusMessage,
          nextResultUrl,
          nextErrorMessage,
        ]
      );

      generation = updateResult.rows[0];
    } else {
      const touchResult = await client.query(
        `
          UPDATE generated_images
          SET last_checked_at = NOW(), updated_at = NOW()
          WHERE id = $1
          RETURNING *;
        `,
        [generation.id]
      );
      generation = touchResult.rows[0];
    }

    return res.status(200).json({ generation: mapGenerationRow(generation) });
  } catch (error) {
    console.error("Erro ao consultar geração de imagem:", error);
    return res.status(500).json({
      message: error.message || "Erro interno ao consultar a geração",
    });
  } finally {
    client.release();
  }
}
