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

const MAX_LOG_CHARS = 12000;
const PREVIEW_CHARS = 800;

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

/**
 * ✅ Log RAW (EXATO do seu snippet)
 */
function logEvoBodyRaw(req) {
    console.log("========== EVO BODY RAW ==========");
    console.log("typeof req.body:", typeof req.body);

    try {
        console.log("req.body (raw):", req.body);
    } catch (e) {
        console.log("req.body (raw) FAILED:", e);
    }

    let bodyString = "";

    try {
        bodyString =
            typeof req.body === "string"
                ? req.body
                : JSON.stringify(req.body, null, 2);
    } catch (e) {
        bodyString = "<<JSON.stringify falhou>>";
    }

    console.log("BODY length:", bodyString.length);
    console.log("BODY preview (800 chars):", bodyString.slice(0, PREVIEW_CHARS));

    if (bodyString.length <= MAX_LOG_CHARS) {
        console.log("BODY FULL:", bodyString);
    } else {
        console.log("BODY FULL (TRUNCATED):", bodyString.slice(0, MAX_LOG_CHARS));
    }

    console.log("========== END EVO BODY ==========");
}

export default async function handler(req, res) {
    // ✅ Só POST. (Webhook EVO é POST.)
    if (req.method !== "POST") {
        console.log("[EVO] METHOD NOT ALLOWED", req.method);

        // Se você quer 100% “não quebrar device”, pode devolver 200 aqui.
        // Mas o certo REST seria 405.
        return res.status(200).json(evoResponseForCmd("reg", {}));
    }

    try {
        // Debug forte: confirma que entrou no handler
        console.log("🔥 EVO HIT", req.method, req.url);

        // headers
        console.log("[EVO] HEADERS", req.headers);

        // body completo (snippet)
        logEvoBodyRaw(req);

        // resposta conforme cmd
        const cmd = req.body && typeof req.body === "object" ? req.body.cmd : undefined;
        const payload = evoResponseForCmd(cmd, req.body);

        console.log("[EVO] RETURNING PAYLOAD", payload);
        return res.status(200).json(payload);
    } catch (err) {
        console.error("[EVO] Erro no webhook", err);

        // Mesmo em erro, responder 200 e formato válido
        const payload = evoResponseForCmd("reg", {});
        console.log("[EVO] ERROR -> returning payload", payload);
        return res.status(200).json(payload);
    }
}
