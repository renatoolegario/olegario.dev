/**
 * EVO Webhook Receiver (Next.js / Vercel)
 * ------------------------------------------------------------
 * Arquivo: /pages/api/evo/index.js
 *
 * Objetivo
 * - Receber requisições REST (webhook) do EVO Facial 50 (ou similar)
 * - Logar tudo no console para depuração (Vercel Logs)
 *
 * Como configurar no equipamento
 * - URL: https://SEU-DOMINIO.vercel.app/api/evo
 * - Método: POST
 * - Content-Type: application/json (se houver opção)
 *
 * Como testar localmente
 * - Rode: npm run dev
 * - Teste:
 *   curl -X POST "http://localhost:3000/api/evo" \
 *     -H "Content-Type: application/json" \
 *     -d '{"teste": true, "evento": "ping"}'
 *
 * Observações importantes
 * - Este endpoint apenas loga e retorna 200 OK rapidamente.
 * - Se o equipamento enviar payload grande (ex: imagem/base64),
 *   ajuste o `sizeLimit` em `config` abaixo.
 * - Em produção, você pode adicionar autenticação via token (header)
 *   para evitar spam (ex: X-EVO-TOKEN).
 */

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "5mb", // aumente se o EVO enviar base64/imagens
        },
    },
};

export default async function handler(req, res) {
    const startedAt = Date.now();

    // Permite bater no endpoint via navegador sem erro
    if (req.method === "GET") {
        console.log("[EVO] GET /api/evo (healthcheck)", {
            at: new Date().toISOString(),
            ip:
                req.headers["x-forwarded-for"] ||
                req.socket?.remoteAddress ||
                "unknown",
            userAgent: req.headers["user-agent"],
        });

        return res.status(200).json({ ok: true, message: "EVO endpoint up" });
    }

    // Apenas POST (webhook)
    if (req.method !== "POST") {
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
        // Se quiser proteger com token:
        // const token = req.headers["x-evo-token"];
        // if (process.env.EVO_TOKEN && token !== process.env.EVO_TOKEN) {
        //   console.log("[EVO] Unauthorized attempt", { token });
        //   return res.status(401).json({ ok: false });
        // }

        const ip =
            req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";

        // Logs úteis (sem vazar tudo se for enorme)
        console.log("[EVO] Webhook recebido", {
            at: new Date().toISOString(),
            method: req.method,
            path: req.url,
            ip,
            contentType: req.headers["content-type"],
            userAgent: req.headers["user-agent"],
        });

        // Corpo (JSON)
        // Importante: em Next.js, req.body já vem parseado (se JSON)
        console.log("[EVO] BODY (raw)", req.body);

        // Caso o equipamento mande algo diferente de JSON
        // (ex: string), loga também o tipo
        console.log("[EVO] BODY (typeof)", typeof req.body);

        // Headers completos (às vezes vem device-id, evento, etc.)
        console.log("[EVO] HEADERS", req.headers);

        const elapsedMs = Date.now() - startedAt;

        // Responda rápido pra evitar reenvio/retry do equipamento
        return res.status(200).json({
            ok: true,
            received: true,
            elapsed_ms: elapsedMs,
        });
    } catch (err) {
        console.error("[EVO] Erro no webhook", err);
        return res.status(500).json({ ok: false, error: "Internal error" });
    }
}
