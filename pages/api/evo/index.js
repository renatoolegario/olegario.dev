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

export default async function handler(req, res) {
    // Healthcheck simples
    if (req.method === "GET") {
        return res.status(200).json({ ok: true });
    }

    if (req.method !== "POST") {
        return res.status(405).end();
    }

    try {
        console.log("[EVO] HEADERS", req.headers);
        logBodyFully("BODY", req.body);

        const body = req.body || {};
        const cmd = body.cmd;
        const sn = body.sn;

        let responsePayload;

        /**
         * =========================================================
         * PROTOCOLO EVO — RESPOSTAS EXATAS
         * =========================================================
         */

        // 1️⃣ Handshake obrigatório
        if (cmd === "reg") {
            responsePayload = {
                ret: "reg",
                result: true,
                cloudtime: getCloudTime(),
            };

            console.log("[EVO] REG OK", responsePayload);
        }

        // 2️⃣ ACK mínimo para qualquer outro comando
        else if (cmd) {
            responsePayload = {
                ret: cmd,
                result: true,
            };

            // alguns firmwares aceitam sn, outros ignoram — seguro omitir
            console.log("[EVO] ACK CMD", responsePayload);
        }

        // 3️⃣ Fallback defensivo
        else {
            responsePayload = {
                ret: "unknown",
                result: true,
            };

            console.log("[EVO] ACK UNKNOWN", responsePayload);
        }

        // ⚠️ IMPORTANTE:
        // - status 200
        // - JSON puro
        // - sem campos extras
        return res.status(200).json(responsePayload);
    } catch (err) {
        console.error("[EVO] Erro no webhook", err);

        // Mesmo em erro, muitos devices preferem 200
        return res.status(200).json({
            ret: "error",
            result: false,
        });
    }
}
