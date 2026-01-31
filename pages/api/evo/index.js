/**
 * EVO Webhook Receiver (Next.js / Vercel) - PAGES ROUTER
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

function getCloudTimeMinus3() {
    const date = new Date();
    date.setHours(date.getHours() - 3);
    return date;
}


function evoResponseForCmd(cmdRaw, body) {
    const cmd = String(cmdRaw || "").toLowerCase();

    if (cmd === "reg") {
        return {
            ret: "reg",
            result: true,
            cloudtime: getCloudTimeMinus3(),
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
            cloudtime: getCloudTimeMinus3(),
            access: 1,
            message: "Ponto Registrado",
        };

    }

    return {
        ret: cmd || "unknown",
        result: true,
        cloudtime: getCloudTimeMinus3(),
    };
}

function getReqMeta(req) {
    const xf = req.headers["x-forwarded-for"]?.toString();
    const ip =
        (xf ? xf.split(",")[0].trim() : null) ||
        req.socket?.remoteAddress ||
        "unknown";

    return {
        ip,
        ua: req.headers["user-agent"] || null,
        contentType: req.headers["content-type"] || null,
        host: req.headers["host"] || null,
        path: req.url || null,
        method: req.method,
    };
}

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
    // ✅ LOG “HIT” sempre, pra provar que entrou no arquivo
    console.log("🔥 EVO ROUTE HIT", {
        method: req.method,
        url: req.url,
        host: req.headers?.host,
    });

    // ✅ (opcional) CORS / preflight — alguns ambientes mandam OPTIONS antes do POST
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        // responde 200 e payload EVO “amigável”
        return res.status(200).json(evoResponseForCmd("reg", {}));
    }

    // ✅ Só POST é o esperado, mas para device “chato” devolvemos 200 mesmo assim
    if (req.method !== "POST") {
        const meta = getReqMeta(req);
        console.log("[EVO] NON-POST RECEIVED", meta);
        return res.status(200).json(evoResponseForCmd("reg", {}));
    }

    try {
        const meta = getReqMeta(req);

        console.log("[EVO] META", meta);
        console.log("[EVO] HEADERS", req.headers);

        // ✅ snippet de logs (body full/preview)
        logEvoBodyRaw(req);

        const cmd =
            req.body && typeof req.body === "object" ? req.body.cmd : undefined;

        const payload = evoResponseForCmd(cmd, req.body);

        console.log("[EVO] RETURNING PAYLOAD", payload);
        return res.status(200).json(payload);
    } catch (err) {
        console.error("[EVO] Erro no webhook", err);

        const payload = evoResponseForCmd("reg", {});
        console.log("[EVO] ERROR -> returning payload", payload);

        return res.status(200).json(payload);
    }
}
