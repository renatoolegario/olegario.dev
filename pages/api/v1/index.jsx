// ajuste este import conforme sua estrutura
import routes from 'api/v1/routes';
import getDb from 'infra/database/database.jsx';

const ALLOWED_ORIGINS = ['http://localhost:3000'];

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
}

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') return res.status(200).json({ ok: true });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return res.status(415).json({ error: 'Content-Type deve ser application/json' });
  }

  let rota, dados, token;
  try {
    ({ rota, dados, token } = req.body || {});
  } catch {
    return res.status(400).json({ error: 'Body inválido (JSON esperado)' });
  }

  if (!rota) return res.status(400).json({ error: 'Rota não informada' });
  if (!token && rota !== 'auth') return res.status(403).json({ error: 'Acesso não autorizado' });

  const fn = routes?.[rota];
  if (typeof fn !== 'function') return res.status(400).json({ error: 'Rota não suportada' });

  let db;
  try {
    // Se você quiser passar schema via header/body, resolva aqui:
    const schema = process.env.SCHEMA || undefined; // se vazio cai em "developer" pelo getDb
    db = await getDb(schema);     // retorna CLIENT com .query() e .release()

    const result = await fn(db, dados || {}, token);
    return res.status(200).json(result);
  } catch (error) {
    console.error(`Erro na rota ${rota}:`, error);
    return res.status(500).json({ error: `Erro interno do servidor - ${error?.message || 'desconhecido'}` });
  } finally {
    if (db) db.release();         // sempre liberar o client
  }
}
