// api/v1/routes/auth.ts
import { conversaoCripto, gerarToken } from 'api/v1/utils';

// TTL padrão de sessão (horas); pode sobrescrever com env SESSION_TTL_HOURS
const SESSION_TTL_HOURS = Number(process.env.SESSION_TTL_HOURS || 24);

export default async function auth(db, dados, token) {
  try {
    const { email, senha } = dados || {};

    // 1) validação
    if (!email || !senha) {
      return { error: 'Campos obrigatórios não preenchidos.' };
    }

    // 2) autenticação de usuário
    const senhaCriptografada = await conversaoCripto(senha);
    const userRes = await db.query(
      `SELECT id FROM usuarios WHERE email = $1 AND senha = $2`,
      [email, senhaCriptografada]
    );

    if (userRes.rowCount === 0) {
      // segurança: não retornar credenciais no erro
      return { error: 'Usuário não encontrado ou credenciais inválidas.' };
    }

    const userId = userRes.rows[0].id;

    // 3) sessão única: gera novo token e sobrescreve a sessão do usuário
    const newToken = await gerarToken();

    // expiracao = agora + TTL
    // se preferir armazenar como timestamp sem timezone: use NOW() + make_interval(hours => $2)
    await db.query(
      `
      INSERT INTO sessoes (usuario_id, token, expiracao)
      VALUES ($1, $2, NOW() + ($3 || ' hours')::interval)
      ON CONFLICT (usuario_id)
      DO UPDATE SET
        token      = EXCLUDED.token,
        expiracao  = EXCLUDED.expiracao,
        atualizado_em = NOW()
      `,
      [userId, newToken, String(SESSION_TTL_HOURS)]
    );

    // 5) retorno — apenas o token
    return { token: newToken };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return { error: `Erro interno do servidor - ${error.message}` };
  }
}
