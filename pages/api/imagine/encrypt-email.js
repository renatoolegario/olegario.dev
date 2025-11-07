import { conversaoCripto } from "utils/crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Email inválido" });
  }

  try {
    const sanitizedEmail = email.trim().toLowerCase();
    const encryptedEmail = conversaoCripto(sanitizedEmail);

    return res.status(200).json({ encryptedEmail });
  } catch (error) {
    console.error("Erro ao criptografar email:", error);
    return res.status(500).json({ message: "Não foi possível processar a criptografia" });
  }
}
