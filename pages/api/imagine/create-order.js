import { v4 as uuidv4 } from "uuid";

import { normalizeMercadoPagoOrder } from "../../../utils/normalizeMercadoPagoOrder";

async function createMercadoPagoOrder({
  encryptedEmail,
  modelType,
  externalReference,
}) {
  const {
    ACCESS_TOKEN,
    PRICE,
    MODEL,
    TYPE_INTEGRACTION,
    NUMBER_APLICATION,
    USER_ID,
    PUBLIC_KEY,
    EXTERNAL_ID_CAIXA,
  } = process.env;

  if (!ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN não configurado");
  }

  const parsedAmount = Number.parseFloat(PRICE);
  const hasValidAmount = Number.isFinite(parsedAmount);
  const numericAmount = hasValidAmount ? parsedAmount : 0;
  const formattedAmount = hasValidAmount
    ? parsedAmount.toFixed(2)
    : numericAmount.toFixed(2);
  const description = MODEL || "Imagine";
  const fallbackExternalReference = `imagine-${Date.now()}`;
  const normalizedExternalReference =
    externalReference?.toString().trim() || fallbackExternalReference;
  const qrExternalPosId = EXTERNAL_ID_CAIXA?.trim() || null;
  const idempotencyKey = uuidv4();

  const body = {
    type: "qr",
    total_amount: formattedAmount,
    description,
    external_reference: normalizedExternalReference,
    config: {
      qr: {
        external_pos_id: qrExternalPosId || encryptedEmail,
        mode: "dynamic",
      },
    },
    transactions: {
      payments: [
        {
          amount: formattedAmount,
        },
      ],
    },
    items: [
      {
        title: MODEL || "Geração de imagem",
        unit_price: numericAmount,
        unit_measure: "un",
        external_code: NUMBER_APLICATION || "IMAGINE_APP",
        quantity: 1,
        external_categories: [
          {
            id: TYPE_INTEGRACTION || "qr",
          },
        ],
      },
    ],
    metadata: {
      user_id: USER_ID || null,
      public_key: PUBLIC_KEY || null,
      model: MODEL || null,
      modelType,
      integration_type: TYPE_INTEGRACTION || null,
      number_aplication: NUMBER_APLICATION || null,
      encrypted_email: encryptedEmail || null,
      external_reference: normalizedExternalReference,
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
      `Mercado Pago retornou o status ${response.status} (${response.statusText || "sem descrição"})`;

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

  const { encryptedEmail, modelType, externalReference } = req.body || {};

  if (!encryptedEmail) {
    return res.status(400).json({ message: "Email criptografado obrigatório" });
  }

  if (!externalReference) {
    return res.status(400).json({ message: "externalReference é obrigatório" });
  }

  try {
    const orderResponse = await createMercadoPagoOrder({
      encryptedEmail,
      modelType,
      externalReference,
    });
    const normalizedOrder = normalizeMercadoPagoOrder(orderResponse);
    const externalReferenceResponse =
      normalizedOrder.externalReference || externalReference;

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
    console.error("Erro ao criar ordem no Mercado Pago:", {
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
