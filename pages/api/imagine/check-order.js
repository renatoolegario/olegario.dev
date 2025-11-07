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
    const status = data?.status || data?.order_status;

    return res.status(200).json({
      status,
      raw: data,
    });
  } catch (error) {
    console.error("Erro ao consultar status do pedido:", error);
    return res.status(500).json({ message: error.message || "Erro interno ao consultar status" });
  }
}
