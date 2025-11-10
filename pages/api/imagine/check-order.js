import { normalizeMercadoPagoOrder } from "../../../utils/normalizeMercadoPagoOrder";
import getDb from "infra/database";
import { upsertPaymentRecord } from "./create-order";

function isChargingEnabled() {
  const value = process.env.COBRANCA;

  if (value === undefined || value === null) {
    return true;
  }

  const normalized = value.toString().trim().toLowerCase();

  return !["false", "0", "off", "no"].includes(normalized);
}

async function updateOrderFromMercadoPago({ orderId, normalizedOrder, rawOrder }) {
  if (!orderId) {
    throw new Error("orderId é obrigatório para atualizar o pedido");
  }

  const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
  const client = await getDb(schema);

  try {
    const existingRecord = await client.query(
      `
        SELECT player_email, encrypted_email, model_type
        FROM player_payments
        WHERE order_id = $1
        LIMIT 1;
      `,
      [orderId]
    );

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
      client,
      email,
      encryptedEmail,
      order: normalizedOrder,
      rawOrder,
      modelType: metadataModelType,
    });
  } finally {
    client.release();
  }
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

  if (!isChargingEnabled()) {
    try {
      const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
      const client = await getDb(schema);

      try {
        const result = await client.query(
          `
            SELECT
              order_id,
              status,
              status_detail,
              total_amount,
              total_paid_amount,
              currency,
              external_reference,
              qr_code,
              qr_code_base64
            FROM player_payments
            WHERE order_id = $1
            LIMIT 1;
          `,
          [orderId]
        );

        if (result.rowCount === 0) {
          return res.status(404).json({ message: "Pedido não encontrado" });
        }

        const row = result.rows[0];
        const status = row.status || "paid";
        const statusDetail =
          row.status_detail ||
          "Cobrança desativada neste ambiente. Pagamento aprovado automaticamente.";

        return res.status(200).json({
          orderId: row.order_id,
          status,
          statusDetail,
          qrData: row.qr_code || null,
          qrImage: row.qr_code_base64 || null,
          totalAmount: row.total_amount ?? null,
          totalPaidAmount: row.total_paid_amount ?? null,
          currency: row.currency || null,
          externalReference: row.external_reference || null,
          expirationTime: null,
          order: {
            id: row.order_id,
            status,
            statusDetail,
            qrData: row.qr_code || null,
            qrImage: row.qr_code_base64 || null,
            totalAmount: row.total_amount ?? null,
            totalPaidAmount: row.total_paid_amount ?? null,
            currency: row.currency || null,
            externalReference: row.external_reference || null,
          },
          chargingEnabled: false,
        });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("Erro ao consultar pedido sem cobrança:", error);
      return res
        .status(500)
        .json({ message: error.message || "Erro interno ao consultar pedido" });
    }
  }

  const { ACCESS_TOKEN } = process.env;

  if (!ACCESS_TOKEN) {
    return res.status(500).json({ message: "ACCESS_TOKEN não configurado" });
  }

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/orders/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || "Erro ao consultar pagamento");
    }

    const data = await response.json();
    const normalizedOrder = normalizeMercadoPagoOrder(data);

    await updateOrderFromMercadoPago({
      orderId,
      normalizedOrder,
      rawOrder: data,
    });

    return res.status(200).json({
      orderId: normalizedOrder.id,
      status: normalizedOrder.status,
      statusDetail: normalizedOrder.statusDetail,
      qrData: normalizedOrder.qrData,
      qrImage: normalizedOrder.qrImage,
      totalAmount: normalizedOrder.totalAmount,
      externalReference: normalizedOrder.externalReference,
      expirationTime: normalizedOrder.expirationTime,
      order: normalizedOrder,
    });
  } catch (error) {
    console.error("Erro ao consultar status do pagamento:", error);
    return res
      .status(500)
      .json({ message: error.message || "Erro interno ao consultar status" });
  }
}
