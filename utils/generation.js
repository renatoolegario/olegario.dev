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
  const response = await fetch(url);
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

  const response = await fetch(`${BLOB_ENDPOINT}/${filename}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-blob-meta-access": access === "public" ? "public" : "private",
      "Content-Type": contentType || "image/png",
    },
    body: buffer,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    let message =
      errorData?.message ||
      errorData?.error ||
      errorData?.code ||
      `Falha ao enviar imagem para o blob (${response.status})`;

    if (typeof message === "object" && message !== null) {
      try {
        message = JSON.stringify(message);
      } catch (error) {
        message = `Falha ao enviar imagem para o blob (${response.status})`;
      }
    }

    if (typeof message !== "string") {
      message = String(message);
    }

    throw new Error(message);
  }

  const payload = await response.json();

  return (
    payload?.url ||
    payload?.downloadUrl ||
    (payload?.pathname
      ? `${BLOB_ENDPOINT}/${payload.pathname.replace(/^\//, "")}`
      : null)
  );
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

  const response = await fetch(normalizedUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    return false;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.message ||
      errorData?.error ||
      `Falha ao remover imagem do blob (${response.status})`;
    throw new Error(message);
  }

  return true;
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
