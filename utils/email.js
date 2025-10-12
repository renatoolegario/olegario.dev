import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export async function sendNewProductEmail({ email, name, token }) {
  const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  const loginLink = `${process.env.NEXT_PUBLIC_BASE_URL}/login`;

  await resend.emails.send({
    from: `"${process.env.PLATAFORMA}" <naoresponda@${process.env.PLATAFORMA.toLowerCase().replace(' ', '')}.com>`,
    to: email,
    subject: `Um novo produto/serviço foi adicionado à sua conta`,
    html: `
      <p>Olá ${name},</p>
      <p>Um novo produto/serviço foi adicionado à sua conta na plataforma ${process.env.PLATAFORMA}.</p>
      <p>Você pode acessar sua conta clicando no link abaixo:</p>
      <p><a href="${loginLink}">${loginLink}</a></p>
      <p>Caso seja seu primeiro acesso ou você tenha esquecido sua senha, clique no link abaixo para criar uma nova senha:</p>
      <p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>
    `,
  });
}