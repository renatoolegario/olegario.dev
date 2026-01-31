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
 * Gera a resposta no formato esperado de acordo com o cmd recebido.
 * Regras do protocolo:
 * - JSON com chaves minúsculas
 * - HTTP 200
 */
function evoResponseForCmd(cmdRaw, body) {
    const cmd = String(cmdRaw || "").toLowerCase();

    // cmd: reg  -> ret: reg, result: true, cloudtime, nosenduser (opcional)
    if (cmd === "reg") {
        return {
            ret: "reg",
            result: true,
            cloudtime: getCloudTime(),
            nosenduser: true,
        };
    }

    // cmd: sendlog -> ret: sendlog, result: true, count, logindex, cloudtime (access/message opcionais)
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
            // opcionais para modo "server_verify" / online:
            access: 1,
            message: "message",
        };
    }

    // fallback genérico (caso você receba outros cmd do protocolo)
    // Mantém o padrão de sempre retornar 200 e JSON com ret/result.
    return {
        ret: cmd || "unknown",
        result: true,
        cloudtime: getCloudTime(),
    };
}

function safeParseBody(body) {
    // Next.js geralmente já entrega objeto em req.body,
    // mas em alguns cenários pode vir string.
    if (typeof body === "string") {
        try {
            return JSON.parse(body);
        } catch {
            return body; // mantém string
        }
    }
    return body;
}

export default async function handler(req, res) {
    // Healthcheck simples (não interfere no POST)
    if (req.method === "GET") {
        return res.status(200).json({ ok: true });
    }

    // Para qualquer método diferente de POST, devolve 200 com payload “safe”
    if (req.method !== "POST") {
        const payload = evoResponseForCmd("reg", {}); // responde algo válido e aceito
        console.log("[EVO] NON-POST -> returning payload", payload);
        return res.status(200).json(payload);
    }

    try {
        console.log("[EVO] HEADERS", req.headers);

        const parsedBody = safeParseBody(req.body);
        logBodyFully("BODY", parsedBody);

        const cmd = parsedBody && typeof parsedBody === "object" ? parsedBody.cmd : undefined;

        // Responde conforme o cmd recebido (reg, sendlog, etc)
        const payload = evoResponseForCmd(cmd, parsedBody);
        console.log("[EVO] RETURNING PAYLOAD", payload);

        return res.status(200).json(payload);
    } catch (err) {
        console.error("[EVO] Erro no webhook", err);

        // Mesmo em erro, ainda responde 200 e com formato válido
        const payload = evoResponseForCmd("reg", {});
        console.log("[EVO] ERROR -> returning payload", payload);

        return res.status(200).json(payload);
    }
}
