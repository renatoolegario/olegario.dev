import React from 'react';
import SocialLinks from '../molecules/SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Vamos construir algo <span className="text-emerald-500">incrível?</span></h3>
            <p className="text-slate-400 mb-8 max-w-md">
              Estou sempre em busca de desafios técnicos e parcerias estratégicas. Se você tem uma ideia validada ou um problema complexo, entre em contato.
            </p>
            <SocialLinks />
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Menu</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Início</a></li>
                <li><a href="#projects" className="text-slate-400 hover:text-emerald-400 transition-colors">Projetos</a></li>
                <li><a href="#differential" className="text-slate-400 hover:text-emerald-400 transition-colors">Processo</a></li>
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
        </div>
      </div>
    </footer>
  );
}
