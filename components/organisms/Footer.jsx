import React from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contacts = [
    { label: 'GitHub', icon: Github, href: 'https://github.com/renatoolegario' },
    { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/olegariodev/' },
    { label: 'Email', icon: Mail, href: 'mailto:multiplas.fr@gmail.com' },
    { label: 'WhatsApp', icon: Phone, href: 'https://api.whatsapp.com/send/?phone=5534992399036' },
  ];

  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Vamos construir algo <span className="text-emerald-500">incrível?</span></h3>
            <p className="text-slate-400 mb-8 max-w-md">
              Estou sempre em busca de desafios técnicos e parcerias estratégicas. Se você tem uma ideia validada ou um problema complexo, entre em contato.
            </p>
            <div className="flex space-x-4">
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900/50 rounded-full border border-slate-800 text-slate-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 group"
                  aria-label={contact.label}
                >
                  <contact.icon size={20} className="transform group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Menu</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Início</a></li>
                <li><a href="#projects" className="text-slate-400 hover:text-emerald-400 transition-colors">Projetos</a></li>
                <li><a href="#differential" className="text-slate-400 hover:text-emerald-400 transition-colors">Diferencial</a></li>
                <li><a href="#stack" className="text-slate-400 hover:text-emerald-400 transition-colors">Stack</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {currentYear} Olegário Dev. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Feito com <span className="text-emerald-500 mx-1">Next.js</span> e <span className="text-cyan-500 mx-1">Tailwind</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
