import { normalizeMercadoPagoOrder } from "../../../utils/normalizeMercadoPagoOrder";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({ message: "orderId é obrigatório" });
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
      throw new Error(errorData?.message || "Erro ao consultar pedido" );
    }

    const data = await response.json();
    const normalizedOrder = normalizeMercadoPagoOrder(data);

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
    console.error("Erro ao consultar status do pedido:", error);
    return res.status(500).json({ message: error.message || "Erro interno ao consultar status" });
  }
}
