/**
 * EVO Webhook Receiver (Next.js / Vercel)
 * ------------------------------------------------------------
 * Arquivo: /pages/api/evo/index.js
 */

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};

const MAX_LOG_CHARS = 12000;
const PREVIEW_CHARS = 800;

function safeJsonStringify(value) {
    try {
        return JSON.stringify(value, null, 2);
    } catch (e) {
        return `<<JSON.stringify falhou: ${e?.message || "erro desconhecido"}>>`;
    }
}

function logBodyFully(tag, body) {
    const bodyStr = typeof body === "string" ? body : safeJsonStringify(body);

    console.log(`[EVO] ${tag} typeof`, typeof body);
    console.log(
        `[EVO] ${tag} keys`,
        body && typeof body === "object" ? Object.keys(body) : "not-an-object"
    );

    console.log(`[EVO] ${tag} length`, bodyStr.length);
    console.log(`[EVO] ${tag} preview`, bodyStr.slice(0, PREVIEW_CHARS));

    if (bodyStr.length <= MAX_LOG_CHARS) {
        console.log(`[EVO] ${tag} FULL`, bodyStr);
    } else {
        console.log(
            `[EVO] ${tag} FULL (TRUNCATED to ${MAX_LOG_CHARS} chars)`,
            bodyStr.slice(0, MAX_LOG_CHARS)
        );
    }
}

function getCloudTime() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");

    return (
        `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    );
}

/**
 * Resposta EXATA exigida pelo servidor EVO.
 * - Sem campos extras
 * - JSON puro
 * - HTTP 200
 */
function evoExactResponse() {
    return {
        ret: "reg",
        result: 1,
        cloudtime: getCloudTime(),
    };
}

export default async function handler(req, res) {
    // Healthcheck simples (não interfere no POST)
    if (req.method === "GET") {
        return res.status(200).json({ ok: true });
    }

    // Para qualquer método diferente de POST, devolve 200 com a resposta exata
    // (alguns devices/servidores são chatos com status != 200)
    if (req.method !== "POST") {
        const payload = evoExactResponse();
        console.log("[EVO] NON-POST -> returning exact payload", payload);
        return res.status(200).json(payload);
    }

    try {
        console.log("[EVO] HEADERS", req.headers);
        logBodyFully("BODY", req.body);

        // Independente do conteúdo (cmd/sn/etc), responder SEMPRE igual
        const payload = evoExactResponse();
        console.log("[EVO] RETURNING EXACT PAYLOAD", payload);

        return res.status(200).json(payload);
    } catch (err) {
        console.error("[EVO] Erro no webhook", err);

        // Mesmo em erro, ainda responde 200 e no formato exato
        const payload = evoExactResponse();
        console.log("[EVO] ERROR -> returning exact payload", payload);

        return res.status(200).json(payload);
    }
}
