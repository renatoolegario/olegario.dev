import { del as deleteBlob, put as putBlob } from "@vercel/blob";

const BLOB_ENDPOINT = "https://blob.vercel-storage.com";

function parseDataUrl(dataUrl) {
  if (typeof dataUrl !== "string") {
    return { mimeType: null, base64: null };
  }

  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (match) {
    return { mimeType: match[1], base64: match[2] };
  }

  return { mimeType: null, base64: dataUrl };
}

function guessFileExtension(mimeType) {
  if (!mimeType) return "png";
  const normalized = mimeType.toLowerCase();
  if (normalized === "image/jpeg" || normalized === "image/jpg") return "jpg";
  if (normalized === "image/png") return "png";
  if (normalized === "image/webp") return "webp";
  if (normalized === "image/gif") return "gif";
  if (normalized.includes("/")) return normalized.split("/").pop();
  return "png";
}

function mapGenerationRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    orderId: row.order_id,
    playerEmail: row.player_email,
    encryptedEmail: row.encrypted_email,
    modelType: row.model_type,
    selectedColorName: row.selected_color_name,
    selectedColorHex: row.selected_color_hex,
    prompt: row.prompt,
    status: row.status,
    statusMessage: row.status_message,
    externalJobId: row.external_job_id,
    resultImageUrl: row.result_image_url,
    sourceImageName: row.source_image_name,
    sourceImageMimeType: row.source_image_mime_type,
    sourceImageBlobUrl: row.source_image_blob_url,
    errorMessage: row.error_message,
    lastCheckedAt: row.last_checked_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeRemoteStatus(status) {
  if (!status) return null;
  const normalized = String(status).toLowerCase();
  if (["completed", "complete", "done", "finished"].includes(normalized)) {
    return "completed";
  }
  if (["failed", "error", "canceled", "cancelled"].includes(normalized)) {
    return "failed";
  }
  if (["queued", "pending", "waiting"].includes(normalized)) {
    return "pending";
  }
  return "processing";
}

async function fetchBufferFromUrl(url) {
  if (!url) {
    throw new Error("URL inválida para download da imagem");
  }

  const isBlobUrl = typeof url === "string" && url.includes("vercel-storage.com");

  let response;

  if (isBlobUrl) {
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (token) {
      try {
        response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const message = `Não foi possível baixar a imagem gerada (${response.status})`;
          throw new Error(message);
        }
      } catch (error) {
        console.warn(
          "Falha ao baixar imagem via fetch autenticado do Blob, tentando requisição pública",
          error
        );
        response = undefined;
      }
    }
  }

  if (!response) {
    response = await fetch(url);
  }

  if (!response.ok) {
    const message = `Não foi possível baixar a imagem gerada (${response.status})`;
    throw new Error(message);
  }

  const arrayBuffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") || "image/png";

  return { buffer: Buffer.from(arrayBuffer), contentType };
}

async function uploadToBlob({
  buffer,
  contentType,
  orderId,
  extension,
  prefix = "generated",
  access = "public",
}) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN não configurado");
  }

  const safeExtension = extension || guessFileExtension(contentType) || "png";
  const safeOrder = (orderId || "imagem").replace(/[^a-zA-Z0-9_-]/g, "-");
  const rawPrefix = (prefix || "generated")
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
  const safePrefix = rawPrefix || "generated";
  const filename = `${safePrefix}/${safeOrder}-${Date.now()}.${safeExtension}`;

  try {
    const payload = await putAsBlob({
      buffer,
      contentType,
      filename,
      access,
      token,
    });

    return (
      payload?.url ||
      payload?.downloadUrl ||
      (payload?.pathname
        ? `${BLOB_ENDPOINT}/${payload.pathname.replace(/^\//, "")}`
        : null)
    );
  } catch (error) {
    const statusCode = error?.status ?? error?.statusCode ?? "desconhecido";
    let message =
      error?.message ||
      error?.code ||
      `Falha ao enviar imagem para o blob (${statusCode})`;

    if (typeof message === "object" && message !== null) {
      try {
        message = JSON.stringify(message);
      } catch (stringifyError) {
        message = `Falha ao enviar imagem para o blob`;
      }
    }

    if (typeof message !== "string") {
      message = String(message);
    }

    throw new Error(message);
  }
}

async function putAsBlob({ buffer, contentType, filename, access, token }) {
  const upload = await putBlob(filename, buffer, {
    access: access === "public" ? "public" : "private",
    contentType: contentType || "image/png",
    token,
  });

  return upload;
}

async function deleteBlobByUrl(url) {
  if (!url) return false;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN não configurado");
  }

  const normalizedUrl = url.startsWith("http")
    ? url
    : `${BLOB_ENDPOINT}/${url.replace(/^\/+/, "")}`;

  try {
    await deleteBlob(normalizedUrl, { token });
    return true;
  } catch (error) {
    const statusCode = error?.status ?? error?.statusCode;
    if (statusCode === 404 || error?.code === "not_found") {
      return false;
    }

    const message =
      error?.message ||
      error?.code ||
      `Falha ao remover imagem do blob (${statusCode || "desconhecido"})`;
    throw new Error(message);
  }
}

export {
  BLOB_ENDPOINT,
  parseDataUrl,
  guessFileExtension,
  mapGenerationRow,
  normalizeRemoteStatus,
  fetchBufferFromUrl,
  uploadToBlob,
  deleteBlobByUrl,
};
