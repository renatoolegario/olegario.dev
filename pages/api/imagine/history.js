import getDb from "infra/database";
import { mapGenerationRow } from "../../../utils/generation";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { encryptedEmail, limit, playerEmail } = req.query || {};

  if (!encryptedEmail || typeof encryptedEmail !== "string") {
    return res
      .status(400)
      .json({ message: "encryptedEmail é obrigatório para consultar o histórico" });
  }

  const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
  const client = await getDb(schema);

  try {
    const normalizedLimit = Number.parseInt(limit, 10);
    const hasValidLimit = Number.isFinite(normalizedLimit) && normalizedLimit > 0;
    const safeLimit = hasValidLimit ? Math.min(normalizedLimit, 100) : 50;

    const conditions = ["encrypted_email = $1"];
    const values = [encryptedEmail];
    let nextIndex = 2;

    if (playerEmail && typeof playerEmail === "string") {
      const normalizedEmail = playerEmail.trim().toLowerCase();
      if (normalizedEmail) {
        conditions.push(`LOWER(player_email) = $${nextIndex}`);
        values.push(normalizedEmail);
        nextIndex += 1;
      }
    }

    values.push(safeLimit);

    const query = `
      SELECT *
      FROM generated_images
      WHERE ${conditions.length > 1 ? `(${conditions.join(" OR ")})` : conditions[0]}
      ORDER BY created_at DESC
      LIMIT $${nextIndex};
    `;

    const result = await client.query(query, values);
    const generations = result.rows.map(mapGenerationRow);

    return res.status(200).json({ generations });
  } catch (error) {
    console.error("Erro ao consultar histórico de imagens geradas:", error);
    return res.status(500).json({
      message: error.message || "Erro interno ao consultar o histórico",
    });
  } finally {
    client.release();
  }
}
