import { v4 as uuidv4 } from "uuid";
import { normalizeMercadoPagoOrder } from "../../../utils/normalizeMercadoPagoOrder";
import { reverterConversaoCripto } from "../../../utils/crypto";
import getDb from "infra/database";

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
    dateOfExpiration:
      payment?.dateOfExpiration || order?.expirationTime || null,
    paidAt:
      payment?.paidAt ||
      (order?.status === "processed" ? order?.lastUpdatedDate : null),
  };
}

async function upsertPaymentRecord({
  email,
  encryptedEmail,
  order,
  rawOrder,
  modelType,
  client: providedClient,
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
  const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
  const client = providedClient || (await getDb(schema));
  const shouldRelease = !providedClient;

  const query = `
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
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      $10,
      $11,
      $12,
      $13,
      $14,
      $15,
      $16,
      $17,
      $18,
      $19,
      $20,
      $21,
      $22,
      $23,
      CAST($24 AS jsonb)
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
      raw_response = EXCLUDED.raw_response,
      updated_at = NOW()
    RETURNING *;
  `;

  const values = [
    sanitizedEmail,
    encryptedEmail,
    order.id,
    order.externalReference,
    order.status,
    order.statusDetail,
    parseNumber(order.totalAmount),
    parseNumber(order.totalPaidAmount),
    order.currency || null,
    paymentDetails.paymentId,
    paymentDetails.paymentStatus,
    paymentDetails.paymentStatusDetail,
    paymentDetails.paymentAmount,
    paymentDetails.paymentPaidAmount,
    paymentDetails.paymentReferenceId,
    paymentDetails.paymentMethodId,
    paymentDetails.paymentMethodType,
    paymentDetails.paymentTicketUrl,
    normalizedModelType,
    paymentDetails.qrCode,
    paymentDetails.qrCodeBase64,
    paymentDetails.dateOfExpiration,
    paymentDetails.paidAt,
    rawOrderData,
  ];

  try {
    const result = await client.query(query, values);
    return result.rows[0] || null;
  } finally {
    if (shouldRelease) {
      client.release();
    }
  }
}

async function createMercadoPagoOrder({ email, externalReference, modelType }) {
  const { ACCESS_TOKEN, PRICE, MODEL } = process.env;

  if (!ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN não configurado");
  }

  const parsedAmount = Number.parseFloat(PRICE);
  const hasValidAmount = Number.isFinite(parsedAmount);
  const numericAmount = hasValidAmount ? parsedAmount : 0;
  const normalizedAmount = hasValidAmount
    ? parsedAmount.toFixed(2)
    : numericAmount.toFixed(2);

  const description = MODEL || "Imagine";
  const fallbackExternalReference = `imagine-${Date.now()}`;
  const normalizedExternalReference =
    externalReference?.toString().trim() || fallbackExternalReference;

  const normalizedEmail = email?.toString().trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Email do pagador é obrigatório");
  }

  const idempotencyKey = uuidv4();

  const body = {
    type: "online",
    total_amount: normalizedAmount,
    external_reference: normalizedExternalReference,
    payer: {
      email: normalizedEmail,
    },
    transactions: {
      payments: [
        {
          amount: normalizedAmount,
          payment_method: { id: "pix", type: "bank_transfer" },
        },
      ],
    },
  };

  const response = await fetch("https://api.mercadopago.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "X-Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let errorText;
    let errorData = null;

    try {
      errorText = await response.text();
      errorData = JSON.parse(errorText);
    } catch (parseError) {
      errorData = errorText || null;
    }

    const errorMessage =
      errorData?.message ||
      errorData?.error ||
      `Mercado Pago retornou o status ${response.status} (${
        response.statusText || "sem descrição"
      })`;

    const error = new Error(
      `Erro ao criar pedido no Mercado Pago: ${errorMessage}`
    );
    error.status = response.status;
    error.statusText = response.statusText;
    error.response = errorData;
    throw error;
  }

  const data = await response.json();

  if (!data?.external_reference && normalizedExternalReference) {
    data.external_reference = normalizedExternalReference;
  }

  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { encryptedEmail, externalReference, modelType } = req.body || {};

  if (!encryptedEmail) {
    return res.status(400).json({ message: "Email criptografado obrigatório" });
  }

  if (!externalReference) {
    return res.status(400).json({ message: "externalReference é obrigatório" });
  }

  try {
    const decryptedEmail = reverterConversaoCripto(encryptedEmail);

    if (!decryptedEmail) {
      return res.status(400).json({ message: "Email inválido" });
    }

    const normalizedModelType =
      typeof modelType === "string"
        ? modelType.trim() || null
        : modelType !== undefined && modelType !== null
          ? String(modelType)
          : null;

    const orderResponse = await createMercadoPagoOrder({
      email: decryptedEmail,
      externalReference,
      modelType: normalizedModelType,
    });

    const normalizedOrder = normalizeMercadoPagoOrder(orderResponse);
    const externalReferenceResponse =
      normalizedOrder.externalReference || externalReference;

    await upsertPaymentRecord({
      email: decryptedEmail,
      encryptedEmail,
      order: normalizedOrder,
      rawOrder: orderResponse,
      modelType: normalizedModelType,
    });

    return res.status(200).json({
      orderId: normalizedOrder.id,
      status: normalizedOrder.status,
      statusDetail: normalizedOrder.statusDetail,
      qrData: normalizedOrder.qrData,
      qrImage: normalizedOrder.qrImage,
      totalAmount: normalizedOrder.totalAmount,
      externalReference: externalReferenceResponse,
      expirationTime: normalizedOrder.expirationTime,
      order: normalizedOrder,
    });
  } catch (error) {
    console.error("Erro ao criar pedido no Mercado Pago:", {
      message: error?.message,
      status: error?.status,
      statusText: error?.statusText,
      response: error?.response,
    });

    return res.status(500).json({
      message: error.message || "Erro interno ao gerar pedido",
      details: {
        status: error?.status,
        statusText: error?.statusText,
        response: error?.response || null,
      },
    });
  }
}

export { upsertPaymentRecord };
