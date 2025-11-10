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

export { parseDataUrl, guessFileExtension, mapGenerationRow, normalizeRemoteStatus };
