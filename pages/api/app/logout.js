import { createExpiredSessionCookie } from '../../../utils/appAuth';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  res.setHeader('Set-Cookie', createExpiredSessionCookie());
  return res.status(200).json({ ok: true });
}
