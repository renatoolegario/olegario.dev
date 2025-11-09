import { sql } from "@vercel/postgres";

function parseNumber(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function extractPaymentDetails(order) {
  const payment = order?.transactions?.payments?.[0] || {};
  const paymentMethod = payment?.paymentMethod || {};

  return {
    paymentId: payment?.id || null,
    paymentStatus: payment?.status || null,
    paymentStatusDetail: payment?.statusDetail || null,
    paymentAmount: parseNumber(payment?.amount),
    paymentPaidAmount: parseNumber(payment?.paidAmount),
    paymentReferenceId: payment?.referenceId || null,
    paymentMethodId: paymentMethod?.id || null,
    paymentMethodType: paymentMethod?.type || null,
    paymentTicketUrl: paymentMethod?.ticketUrl || null,
    qrCode: paymentMethod?.qrCode || order?.qrData || null,
    qrCodeBase64: paymentMethod?.qrCodeBase64 || order?.qrImage || null,
    dateOfExpiration: payment?.dateOfExpiration || order?.expirationTime || null,
    paidAt: payment?.paidAt || (order?.status === "processed" ? order?.lastUpdatedDate : null),
  };
}

async function upsertPaymentRecord({
  email,
  encryptedEmail,
  order,
  rawOrder,
  modelType,
}) {
  if (!order?.id) {
    throw new Error("Pedido inválido recebido do Mercado Pago");
  }

  if (!email) {
    throw new Error("Email do jogador é obrigatório para registrar o pedido");
  }

  const sanitizedEmail = email.trim().toLowerCase();
  const paymentDetails = extractPaymentDetails(order);
  let normalizedModelType = null;

  if (typeof modelType === "string") {
    normalizedModelType = modelType.trim() || null;
  } else if (modelType !== undefined && modelType !== null) {
    normalizedModelType = String(modelType);
  }

  const rawOrderData = rawOrder ? JSON.stringify(rawOrder) : "{}";

  const result = await sql`
    INSERT INTO player_payments (
      player_email,
      encrypted_email,
      order_id,
      external_reference,
      status,
      status_detail,
      total_amount,
      total_paid_amount,
      currency,
      payment_id,
      payment_status,
      payment_status_detail,
      payment_amount,
      payment_paid_amount,
      payment_reference_id,
      payment_method_id,
      payment_method_type,
      payment_ticket_url,
      model_type,
      qr_code,
      qr_code_base64,
      date_of_expiration,
      paid_at,
      raw_response
    ) VALUES (
      ${sanitizedEmail},
      ${encryptedEmail},
      ${order.id},
      ${order.externalReference},
      ${order.status},
      ${order.statusDetail},
      ${parseNumber(order.totalAmount)},
      ${parseNumber(order.totalPaidAmount)},
      ${order.currency || null},
      ${paymentDetails.paymentId},
      ${paymentDetails.paymentStatus},
      ${paymentDetails.paymentStatusDetail},
      ${paymentDetails.paymentAmount},
      ${paymentDetails.paymentPaidAmount},
      ${paymentDetails.paymentReferenceId},
      ${paymentDetails.paymentMethodId},
      ${paymentDetails.paymentMethodType},
      ${paymentDetails.paymentTicketUrl},
      ${normalizedModelType},
      ${paymentDetails.qrCode},
      ${paymentDetails.qrCodeBase64},
      ${paymentDetails.dateOfExpiration},
      ${paymentDetails.paidAt},
      ${rawOrderData}::jsonb
    )
    ON CONFLICT (order_id) DO UPDATE
    SET
      external_reference = EXCLUDED.external_reference,
      status = EXCLUDED.status,
      status_detail = EXCLUDED.status_detail,
      total_amount = EXCLUDED.total_amount,
      total_paid_amount = EXCLUDED.total_paid_amount,
      currency = EXCLUDED.currency,
      payment_id = EXCLUDED.payment_id,
      payment_status = EXCLUDED.payment_status,
      payment_status_detail = EXCLUDED.payment_status_detail,
      payment_amount = EXCLUDED.payment_amount,
      payment_paid_amount = EXCLUDED.payment_paid_amount,
      payment_reference_id = EXCLUDED.payment_reference_id,
      payment_method_id = EXCLUDED.payment_method_id,
      payment_method_type = EXCLUDED.payment_method_type,
      payment_ticket_url = EXCLUDED.payment_ticket_url,
      model_type = COALESCE(EXCLUDED.model_type, player_payments.model_type),
      qr_code = EXCLUDED.qr_code,
      qr_code_base64 = EXCLUDED.qr_code_base64,
      date_of_expiration = EXCLUDED.date_of_expiration,
      paid_at = COALESCE(EXCLUDED.paid_at, player_payments.paid_at),
      raw_response = ${rawOrderData}::jsonb,
      updated_at = NOW()
    RETURNING *;
  `;

  return result.rows[0] || null;
}

export async function registerMercadoPagoOrder({
  email,
  encryptedEmail,
  normalizedOrder,
  rawOrder,
  modelType,
}) {
  return upsertPaymentRecord({
    email,
    encryptedEmail,
    order: normalizedOrder,
    rawOrder,
    modelType,
  });
}

export async function updateOrderFromMercadoPago({
  orderId,
  normalizedOrder,
  rawOrder,
}) {
  if (!orderId) {
    throw new Error("orderId é obrigatório para atualizar o pedido");
  }

  const existingRecord = await sql`
    SELECT player_email, encrypted_email, model_type
    FROM player_payments
    WHERE order_id = ${orderId}
    LIMIT 1;
  `;

  if (existingRecord.rowCount === 0) {
    return null;
  }

  const {
    player_email: email,
    encrypted_email: encryptedEmail,
    model_type: modelType,
  } = existingRecord.rows[0];

  const metadataModelType =
    normalizedOrder?.metadata?.modelType ??
    normalizedOrder?.metadata?.model_type ??
    normalizedOrder?.metadata?.type ??
    modelType;

  return upsertPaymentRecord({
    email,
    encryptedEmail,
    order: normalizedOrder,
    rawOrder,
    modelType: metadataModelType,
  });
}
