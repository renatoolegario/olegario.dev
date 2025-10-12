import { sql } from '@vercel/postgres';
import crypto from 'crypto';
import { sendNewProductEmail } from '../../utils/email';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { customer_email, customer_name, type } = req.body;

      if (!customer_email || !customer_name) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let userResult = await sql`
        SELECT * FROM users WHERE email = ${customer_email}
      `;
      let user = userResult.rows[0];

      if (!user) {
        const passwordResetKey = crypto.randomBytes(32).toString('hex');
        const passwordResetExpiresAt = new Date(Date.now() + 3600000); // 1 hour from now

        const newUserResult = await sql`
          INSERT INTO users (name, email, password_reset_key, password_reset_expires_at)
          VALUES (${customer_name}, ${customer_email}, ${passwordResetKey}, ${passwordResetExpiresAt.toISOString()})
          RETURNING *
        `;
        user = newUserResult.rows[0];
      }

      if (type === 'purchase.approved' || type === 'subscription.approved') {
        await sendNewProductEmail({
          email: user.email,
          name: user.name,
          token: user.password_reset_key,
        });
      }

      res.status(200).json({ message: 'Webhook processed successfully' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}