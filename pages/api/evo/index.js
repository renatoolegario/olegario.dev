/**
 * EVO Webhook Receiver (Next.js / Vercel)
 * ------------------------------------------------------------
 * Arquivo: /pages/api/v1/evo/index.js
 */

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "25mb",
        },
    },
};

// =====================
// Buffers (memória) - igual Express
// ⚠️ Em Vercel pode resetar a qualquer momento.
// =====================
const LOG_MAX = 2000;
const INGEST_MAX = 2000;

const logBuffer = [];
const ingestBuffer = [];

// =====================
// Body log (FULL + preview)
// =====================
const MAX_LOG_CHARS = 12000;
const PREVIEW_CHARS = 800;

function safeJsonStringify(value) {
    try {
        return JSON.stringify(value, null, 2);
    } catch (e) {
        return `<<JSON.stringify falhou: ${e?.message || "erro desconhecido"}>>`;
    }
}

function pushLog(level, msg, extra = null) {
    const item = { ts: new Date().toISOString(), level, msg, extra };
    logBuffer.push(item);
    if (logBuffer.length > LOG_MAX) logBuffer.shift();

    // ✅ imprime no console
    if (extra !== null) console.log(`[${item.ts}] [${level}] ${msg}`, extra);
    else console.log(`[${item.ts}] [${level}] ${msg}`);
}

function pushIngest(payload, meta) {
    const item = {
        ts: new Date().toISOString(),
        meta,
        payload,
    };
    ingestBuffer.push(item);
    if (ingestBuffer.length > INGEST_MAX) ingestBuffer.shift();

    // ✅ imprime no console
    console.log(`[${item.ts}] [INGEST]`, { meta, payload });
}

function logBodyFully(tag, body, pushLogFn) {
    const bodyStr = typeof body === "string" ? body : safeJsonStringify(body);

    const info = {
        typeof: typeof body,
        keys: body && typeof body === "object" ? Object.keys(body) : "not-an-object",
        length: bodyStr.length,
        preview: bodyStr.slice(0, PREVIEW_CHARS),
        fullTruncated:
            bodyStr.length <= MAX_LOG_CHARS ? bodyStr : bodyStr.slice(0, MAX_LOG_CHARS),
        truncated: bodyStr.length > MAX_LOG_CHARS,
    };

    // ✅ console
    console.log(`[BODY] ${tag} typeof:`, info.typeof);
    console.log(`[BODY] ${tag} keys:`, info.keys);
    console.log(`[BODY] ${tag} length:`, info.length);
    console.log(`[BODY] ${tag} preview:`, info.preview);
    console.log(
        `[BODY] ${tag} FULL${info.truncated ? " (TRUNCATED)" : ""}:`,
        info.fullTruncated
    );

    // ✅ guarda no buffer de logs também
    pushLogFn("info", `BODY ${tag}`, {
        typeof: info.typeof,
        keys: info.keys,
        length: info.length,
        preview: info.preview,
        truncated: info.truncated,
    });

    return info;
}

// =====================
// Helper: meta do request - igual Express (adaptado Next)
// =====================
function getReqMeta(req) {
    const xf = req.headers["x-forwarded-for"]?.toString();
    const ip = (xf ? xf.split(",")[0].trim() : null) || req.socket?.remoteAddress || "unknown";

    return {
        ip,
        ua: req.headers["user-agent"] || null,
        contentType: req.headers["content-type"] || null,
        path: req.url || null,
        method: req.method,
        host: req.headers["host"] || null,
    };
}

// =====================
// EVO helpers (resposta por cmd)
// =====================
function getCloudTime() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return (
        `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    );
}

function evoResponseForCmd(cmdRaw, body) {
    const cmd = String(cmdRaw || "").toLowerCase();

    if (cmd === "reg") {
        return {
            ret: "reg",
            result: true,
            cloudtime: getCloudTime(),
            nosenduser: true,
        };
    }

    if (cmd === "sendlog") {
        const count =
            typeof body?.count === "number"
                ? body.count
                : Array.isArray(body?.record)
                    ? body.record.length
                    : 0;

        const logindex = typeof body?.logindex === "number" ? body.logindex : 0;

        return {
            ret: "sendlog",
            result: true,
            count,
            logindex,
            cloudtime: getCloudTime(),
            access: 1,
            message: "message",
        };
    }

    return {
        ret: cmd || "unknown",
        result: true,
        cloudtime: getCloudTime(),
    };
}

// =====================
// ✅ Handler Next.js - igual Express em comportamento
// =====================
export default async function handler(req, res) {
    // ✅ Só POST (webhook)
    if (req.method !== "POST") {
        pushLog("warn", "METHOD NOT ALLOWED (expected POST)", {
            method: req.method,
            url: req.url,
        });

        // manter 200 “amigável”
        return res.status(200).json(evoResponseForCmd("reg", {}));
    }

    try {
        const meta = getReqMeta(req);
        const payload = req.body;

        // log geral igual Express
        pushLog("info", "POST /api/v1/evo recebido", { meta });

        // body log igual Express
        logBodyFully("EVO", payload, pushLog);

        // guarda ingest igual Express
        pushIngest(payload, { ...meta, source: "evo" });

        // responde conforme cmd
        const cmd = payload && typeof payload === "object" ? payload.cmd : undefined;
        const response = evoResponseForCmd(cmd, payload);

        pushLog("info", "Respondendo EVO", { cmd, response });
        return res.status(200).json(response);
    } catch (err) {
        pushLog("error", "Erro no webhook EVO", { message: err?.message, stack: err?.stack });

        // mesmo em erro, responder 200
        const response = evoResponseForCmd("reg", {});
        pushLog("info", "ERROR -> Respondendo EVO", { response });

        return res.status(200).json(response);
    }
}
