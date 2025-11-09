// infra/database/database.jsx
import { createPool } from "@vercel/postgres";
const fallbackBd = "public";
function sanitizeSchema(schema) {
  const s = String(schema || fallbackBd).trim(); // fallback aqui
  if (!/^[a-zA-Z0-9_]+$/.test(s)) {
    console.warn('[db] SCHEMA inválido, usando "public". Valor:', s);
    return fallbackBd;
  }
  return s;
}

let _pool = null;
function getPoolSingleton() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error(
      "Variável de ambiente DATABASE_URL ou POSTGRES_URL não definida"
    );
  }

  if (!_pool) {
    _pool = createPool({ connectionString });
  }

  return _pool;
}

export default async function getDb(schema) {
  const safeSchema = sanitizeSchema(schema); // sempre cai em "developer" se não vier
  const pool = getPoolSingleton();
  const client = await pool.connect();

  await client.query(`SET search_path TO "${safeSchema}"`);

  const schemaPrefix = `"${safeSchema}".`;
  const PAT = `("?[a-zA-Z_][a-zA-Z0-9_]*"(?:\\s*\\.\\s*"?[a-zA-Z_][a-zA-Z0-9_]*")?)`;
  const OPS = [
    {
      kind: "DELETE_FROM",
      regex: new RegExp(`\\bDELETE\\s+FROM\\s+${PAT}`, "gi"),
    },
    {
      kind: "INSERT_INTO",
      regex: new RegExp(`\\bINSERT\\s+INTO\\s+${PAT}`, "gi"),
    },
    { kind: "UPDATE", regex: new RegExp(`\\bUPDATE\\s+${PAT}`, "gi") },
    { kind: "JOIN", regex: new RegExp(`\\bJOIN\\s+${PAT}`, "gi") },
    { kind: "FROM", regex: new RegExp(`\\bFROM\\s+${PAT}`, "gi") }, // SELECT
  ];

  const addSchemaToQuery = (q) => {
    if (typeof q !== "string") return q;
    const original = q;

    OPS.forEach(({ kind, regex }) => {
      q = q.replace(regex, (match, ident, offset, whole) => {
        if (ident.includes(".")) return match; // já qualificado
        if (kind === "FROM") {
          const before = whole.slice(0, offset);
          const tail = before.replace(/\s+/g, " ").slice(-12);
          if (/\bDELETE\s+$/i.test(tail)) return match;
        }
        return match.replace(ident, `${schemaPrefix}${ident}`);
      });
    });

    if (process.env.DB_DEBUG === "1" && original !== q) {
      console.info("[db] SQL reescrito:", { before: original, after: q });
    }
    return q;
  };

  const originalQuery = client.query.bind(client);
  client.query = (q, params) => originalQuery(addSchemaToQuery(q), params);

  return client; // lembre: client.release() no finally
}
