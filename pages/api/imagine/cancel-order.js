import getDb from "infra/database";
import { deleteBlobByUrl } from "../../../utils/generation";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { orderId } = req.body || {};
  const normalizedOrderId =
    typeof orderId === "string" ? orderId.trim() : String(orderId || "").trim();

  if (!normalizedOrderId) {
    return res.status(400).json({ message: "orderId é obrigatório" });
  }

  const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
  const client = await getDb(schema);

  let generationRows = [];

  try {
    await client.query("BEGIN");

    const generationResult = await client.query(
      `
        SELECT source_image_blob_url, result_image_url
        FROM generated_images
        WHERE order_id = $1;
      `,
      [normalizedOrderId]
    );

    generationRows = generationResult.rows || [];

    if (generationRows.length > 0) {
      await client.query(
        `
          DELETE FROM generated_images
          WHERE order_id = $1;
        `,
        [normalizedOrderId]
      );
    }

    const paymentResult = await client.query(
      `
        DELETE FROM player_payments
        WHERE order_id = $1
        RETURNING order_id;
      `,
      [normalizedOrderId]
    );

    const removedPayments = paymentResult.rowCount > 0;
    const removedGenerations = generationRows.length > 0;

    if (!removedPayments && !removedGenerations) {
      await client.query("ROLLBACK");
      return res
        .status(404)
        .json({ message: "Nenhum registro encontrado para este pedido" });
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao cancelar pedido:", error);
    return res
      .status(500)
      .json({ message: error.message || "Erro interno ao cancelar pedido" });
  } finally {
    client.release();
  }

  const blobUrls = generationRows
    .flatMap((row) => [row.source_image_blob_url, row.result_image_url])
    .filter(
      (url) => typeof url === "string" && url.includes("vercel-storage.com")
    );

  if (blobUrls.length > 0) {
    const uniqueUrls = [...new Set(blobUrls)];
    await Promise.all(
      uniqueUrls.map((url) =>
        deleteBlobByUrl(url).catch((cleanupError) => {
          console.error(
            "Erro ao remover imagem associada ao pedido cancelado:",
            cleanupError
          );
          return null;
        })
      )
    );
  }

  return res.status(200).json({ success: true });
}
