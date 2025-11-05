import { sql } from '@vercel/postgres';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        return res.status(400).json({ error: 'Token and password are required' });
      }

      const userResult = await sql`
        SELECT * FROM users WHERE password_reset_key = ${token}
      `;
      const user = userResult.rows[0];

      if (!user) {
        return res.status(400).json({ error: 'Invalid token' });
      }

      const now = new Date();
      if (now > new Date(user.password_reset_expires_at)) {
        return res.status(400).json({ error: 'Token expired' });
      }

      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

      await sql`
        UPDATE users
        SET password = ${hashedPassword}, password_reset_key = NULL, password_reset_expires_at = NULL
        WHERE id = ${user.id}
      `;

      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}