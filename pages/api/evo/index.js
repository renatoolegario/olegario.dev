/**
 * EVO Webhook Receiver (Next.js / Vercel)
 * ------------------------------------------------------------
 * Arquivo: /pages/api/evo/index.js
 *
 * Objetivo
 * - Receber requisições REST (webhook) do EVO Facial 50 (ou similar)
 * - Printar o corpo COMPLETO do payload (em JSON stringify) para depuração nos Vercel Logs
 * - Retornar 200 rápido para evitar retries do equipamento
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
 * - Em Vercel, logs muito grandes podem ser truncados. Por isso:
 *   - imprimimos JSON completo (stringify),
 *   - imprimimos também tamanho e preview (primeiros chars) para garantir visibilidade.
 * - Se o equipamento enviar payload grande (ex: imagem/base64),
 *   ajuste o `sizeLimit` em `config` abaixo.
 * - Em produção, você pode adicionar autenticação via token (header)
 *   para evitar spam (ex: X-EVO-TOKEN).
 */

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb", // ajuste se necessário
        },
    },
};

const MAX_LOG_CHARS = 12000; // evita estourar log (Vercel pode truncar mesmo assim)
const PREVIEW_CHARS = 800;

function safeJsonStringify(value) {
    try {
        return JSON.stringify(value, null, 2);
    } catch (e) {
        // fallback pra casos raros (circular)
        return `<<JSON.stringify falhou: ${e?.message || "erro desconhecido"}>>`;
    }
}

function logBodyFully(tag, body) {
    const bodyStr = typeof body === "string" ? body : safeJsonStringify(body);

    console.log(`[EVO] ${tag} typeof`, typeof body);
    console.log(`[EVO] ${tag} keys`, body && typeof body === "object" ? Object.keys(body) : "not-an-object");

    // Tamanho + preview garantem depuração mesmo se truncar
    console.log(`[EVO] ${tag} length`, bodyStr.length);
    console.log(`[EVO] ${tag} preview`, bodyStr.slice(0, PREVIEW_CHARS));

    // Log “quase completo” (limitado por segurança)
    if (bodyStr.length <= MAX_LOG_CHARS) {
        console.log(`[EVO] ${tag} FULL`, bodyStr);
    } else {
        console.log(
            `[EVO] ${tag} FULL (TRUNCATED to ${MAX_LOG_CHARS} chars)`,
            bodyStr.slice(0, MAX_LOG_CHARS)
        );
    }
}

export default async function handler(req, res) {
    const startedAt = Date.now();

    // Healthcheck simples
    if (req.method === "GET") {
        console.log("[EVO] GET /api/evo (healthcheck)", {
            at: new Date().toISOString(),
            ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown",
            userAgent: req.headers["user-agent"],
        });

        return res.status(200).json({ ok: true, message: "EVO endpoint up" });
    }

    // Apenas POST
    if (req.method !== "POST") {
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
        // Proteção opcional por token:
        // const token = req.headers["x-evo-token"];
        // if (process.env.EVO_TOKEN && token !== process.env.EVO_TOKEN) {
        //   console.log("[EVO] Unauthorized attempt", { token });
        //   return res.status(401).json({ ok: false });
        // }

        const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";

        console.log("[EVO] Webhook recebido", {
            at: new Date().toISOString(),
            method: req.method,
            path: req.url,
            ip,
            contentType: req.headers["content-type"],
            userAgent: req.headers["user-agent"],
        });

        // HEADERS (completo)
        console.log("[EVO] HEADERS", req.headers);

        // BODY (completo, serializado)
        // Em Next.js, req.body já vem parseado quando Content-Type é application/json
        logBodyFully("BODY", req.body);

        const elapsedMs = Date.now() - startedAt;

        // Responda rápido pra evitar retries do equipamento
        // Alguns equipamentos gostam de { ret: 0 } / { result: "ok" } — mas 200 + ok=true geralmente basta.
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
