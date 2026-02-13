import './globals.css';

export const metadata = {
  title: 'Olegário Dev - Arquiteto de Software & Fundador Técnico',
  description: 'Landing Page de Alta Conversão para o mercado de tecnologia.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-slate-400 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
