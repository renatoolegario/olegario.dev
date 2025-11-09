import { v4 as uuidv4 } from "uuid";
import { normalizeMercadoPagoOrder } from "../../../utils/normalizeMercadoPagoOrder";
import { reverterConversaoCripto } from "../../../utils/crypto";
import {
  registerMercadoPagoOrder,
} from "../../../infra/database/paymentsRepository";

async function createMercadoPagoOrder({
  email,
  externalReference,
  modelType,
}) {
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
    metadata: {
      description,
      modelType: modelType || null,
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

    await registerMercadoPagoOrder({
      email: decryptedEmail,
      encryptedEmail,
      normalizedOrder,
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
