import getDb from "infra/database";
import { deleteBlobByUrl } from "../../../utils/generation";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { orderId, encryptedEmail } = req.body || {};
  const normalizedOrderId =
    typeof orderId === "string"
      ? orderId.trim()
      : String(orderId || "").trim();
  const normalizedToken =
    typeof encryptedEmail === "string"
      ? encryptedEmail.trim()
      : String(encryptedEmail || "").trim();

  if (!normalizedOrderId) {
    return res.status(400).json({ message: "orderId é obrigatório" });
  }

  if (!normalizedToken) {
    return res
      .status(400)
      .json({ message: "encryptedEmail é obrigatório para recuperar o pedido" });
  }

  const schema = process.env.DB_SCHEMA || process.env.POSTGRES_SCHEMA;
  const client = await getDb(schema);

  let transactionStarted = false;
  let generationRows = [];

  try {
    const paymentResult = await client.query(
      `
        SELECT
          id,
          encrypted_email,
          qr_code,
          qr_code_base64,
          date_of_expiration,
          status,
          status_detail
        FROM player_payments
        WHERE order_id = $1
        LIMIT 1;
      `,
      [normalizedOrderId]
    );

    if (paymentResult.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Pagamento não encontrado para este pedido." });
    }

    const payment = paymentResult.rows[0];

    if (payment.encrypted_email !== normalizedToken) {
      return res
        .status(403)
        .json({ message: "Token do pedido inválido para consulta." });
    }

    const expirationDate = payment.date_of_expiration
      ? new Date(payment.date_of_expiration)
      : null;
    const isExpired =
      expirationDate &&
      !Number.isNaN(expirationDate.getTime()) &&
      expirationDate.getTime() < Date.now();

    if (isExpired) {
      transactionStarted = true;
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

      await client.query(
        `
          DELETE FROM generated_images
          WHERE order_id = $1;
        `,
        [normalizedOrderId]
      );

      await client.query(
        `
          DELETE FROM player_payments
          WHERE order_id = $1;
        `,
        [normalizedOrderId]
      );

      await client.query("COMMIT");
      transactionStarted = false;

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
                "Erro ao remover imagem associada ao pagamento expirado:",
                cleanupError
              );
              return null;
            })
          )
        );
      }

      return res.status(410).json({
        message:
          "O QR Code deste pedido expirou. Removemos os dados para que você possa iniciar um novo pedido.",
      });
    }

    return res.status(200).json({
      orderId: normalizedOrderId,
      status: payment.status || "pending",
      statusDetail: payment.status_detail || null,
      qrData: payment.qr_code || null,
      qrImage: payment.qr_code_base64 || null,
      expirationTime: payment.date_of_expiration || null,
    });
  } catch (error) {
    if (transactionStarted) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error(
          "Erro ao desfazer transação ao limpar pagamento expirado:",
          rollbackError
        );
      }
    }

    console.error("Erro ao recuperar pagamento pendente:", error);
    return res.status(500).json({
      message: error.message || "Erro interno ao recuperar pagamento pendente.",
    });
  } finally {
    client.release();
  }
}
