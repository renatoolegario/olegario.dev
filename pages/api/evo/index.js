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
    const startedAt = Date.now();

    // Healthcheck
    if (req.method === "GET") {
        console.log("[EVO] GET /api/evo (healthcheck)", {
            at: new Date().toISOString(),
            ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown",
            userAgent: req.headers["user-agent"],
        });

        return res.status(200).json({ ok: true, message: "EVO endpoint up" });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    try {
        const ip =
            req.headers["x-forwarded-for"] ||
            req.socket?.remoteAddress ||
            "unknown";

        console.log("[EVO] Webhook recebido", {
            at: new Date().toISOString(),
            method: req.method,
            path: req.url,
            ip,
            contentType: req.headers["content-type"],
            userAgent: req.headers["user-agent"],
        });

        console.log("[EVO] HEADERS", req.headers);

        logBodyFully("BODY", req.body);

        const body = req.body || {};
        const cmd = body.cmd;
        const sn = body.sn;

        let responsePayload = {
            ret: cmd || "unknown",
            result: true,
        };

        /**
         * =========================================================
         * PROTOCOLO EVO — TRATAMENTO OBRIGATÓRIO
         * =========================================================
         */

        // REGISTRO DO EQUIPAMENTO (OBRIGATÓRIO)
        if (cmd === "reg") {
            responsePayload = {
                ret: "reg",
                result: true,
                cloudtime: getCloudTime(),
            };

            console.log("[EVO] Respondendo REG com cloudtime", responsePayload);
        }

        // ACK GENÉRICO PARA OUTROS COMANDOS (log, rtlog, newlog, etc)
        else {
            responsePayload = {
                ret: cmd,
                sn,
                result: true,
            };

            console.log("[EVO] Respondendo ACK genérico", responsePayload);
        }

        const elapsedMs = Date.now() - startedAt;

        return res.status(200).json({
            ...responsePayload,
            elapsed_ms: elapsedMs,
        });
    } catch (err) {
        console.error("[EVO] Erro no webhook", err);
        return res.status(500).json({ ok: false, error: "Internal error" });
    }
}
