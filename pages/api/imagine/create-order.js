import { v4 as uuidv4 } from "uuid";

async function createMercadoPagoOrder({ encryptedEmail, modelType }) {
  const {
    ACCESS_TOKEN,
    PRICE,
    MODEL,
    TYPE_INTEGRACTION,
    NUMBER_APLICATION,
    USER_ID,
    PUBLIC_KEY,
  } = process.env;

  if (!ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN não configurado");
  }

  const totalAmount = Number(PRICE || 0);
  const description = `${MODEL || "Imagem"} - ${modelType}`;
  const externalReference = `imagine-${Date.now()}`;
  const idempotencyKey = uuidv4();

  const body = {
    type: "qr",
    total_amount: totalAmount,
    description,
    external_reference: externalReference,
    config: {
      qr: {
        external_pos_id: encryptedEmail,
        mode: "static",
      },
    },
    transactions: {
      payments: [
        {
          amount: totalAmount,
        },
      ],
    },
    items: [
      {
        title: MODEL || "Geração de imagem",
        unit_price: totalAmount,
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

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { encryptedEmail, modelType } = req.body || {};

  if (!encryptedEmail) {
    return res.status(400).json({ message: "Email criptografado obrigatório" });
  }

  try {
    const orderResponse = await createMercadoPagoOrder({
      encryptedEmail,
      modelType,
    });
    const orderId = orderResponse?.id || orderResponse?.order?.id;
    const qrData =
      orderResponse?.qr_data ||
      orderResponse?.qr?.data ||
      orderResponse?.point_of_interaction?.transaction_data?.qr_code;
    const qrImage =
      orderResponse?.qr_image ||
      orderResponse?.qr?.image ||
      orderResponse?.point_of_interaction?.transaction_data?.qr_code_base64;
    const status = orderResponse?.status || orderResponse?.order_status;

    return res.status(200).json({
      orderId,
      status,
      qrData,
      qrImage,
      totalAmount: orderResponse?.total_amount,
      raw: orderResponse,
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
