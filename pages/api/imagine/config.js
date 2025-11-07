export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const {
    MODEL,
    PRICE,
    TYPE_INTEGRACTION,
    NUMBER_APLICATION,
  } = process.env;

  return res.status(200).json({
    model: MODEL || "Modelo", 
    price: PRICE ? Number(PRICE) : null,
    integrationType: TYPE_INTEGRACTION || null,
    applicationNumber: NUMBER_APLICATION || null,
  });
}
