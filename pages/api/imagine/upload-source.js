import {
  deleteBlobByUrl,
  guessFileExtension,
  parseDataUrl,
  uploadToBlob,
} from "../../../utils/generation";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { imageDataUrl, orderId, originalFileName } = req.body || {};

    if (!imageDataUrl) {
      return res
        .status(400)
        .json({ message: "imageDataUrl é obrigatório" });
    }

    const { base64, mimeType } = parseDataUrl(imageDataUrl);

    if (!base64) {
      return res
        .status(400)
        .json({ message: "Imagem inválida ou não suportada" });
    }

    try {
      const buffer = Buffer.from(base64, "base64");
      const reference =
        orderId || originalFileName || `imagem-${Date.now()}`;

      const blobUrl = await uploadToBlob({
        buffer,
        contentType: mimeType || "image/png",
        orderId: reference,
        extension: guessFileExtension(mimeType),
        prefix: "source",
      });

      return res.status(200).json({ blobUrl });
    } catch (error) {
      console.error("Erro ao salvar imagem enviada no blob", error);
      return res.status(500).json({
        message:
          error.message ||
          "Não foi possível armazenar temporariamente a imagem para geração.",
      });
    }
  }

  if (req.method === "DELETE") {
    const { blobUrl } = req.body || {};

    if (!blobUrl) {
      return res.status(400).json({ message: "blobUrl é obrigatório" });
    }

    try {
      await deleteBlobByUrl(blobUrl);
      return res.status(204).end();
    } catch (error) {
      console.error("Erro ao remover imagem temporária do blob", error);
      return res.status(500).json({
        message:
          error.message || "Não foi possível remover a imagem temporária.",
      });
    }
  }

  res.setHeader("Allow", ["POST", "DELETE"]);
  return res.status(405).json({ message: "Método não permitido" });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
