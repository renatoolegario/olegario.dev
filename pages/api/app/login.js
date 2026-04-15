import {
  createSessionCookie,
  getConfiguredAppPassword,
  sanitizeNextPath,
} from '../../../utils/appAuth';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const configuredPassword = getConfiguredAppPassword();
  if (!configuredPassword) {
    return res.status(500).json({
      message: 'Senha do app não configurada no ambiente do projeto.',
    });
  }

  const { password = '', nextPath = '/app' } = req.body || {};

  if (password !== configuredPassword) {
    return res.status(401).json({
      message: 'Senha inválida. Confira e tente novamente.',
    });
  }

  res.setHeader('Set-Cookie', createSessionCookie());
  return res.status(200).json({
    ok: true,
    nextPath: sanitizeNextPath(nextPath),
  });
}
