'use client';

import React from 'react';
import { Briefcase, TrendingUp, Users } from 'lucide-react';
import Button from '../atomic/Button';

export default function DifferentialSection() {
  const cards = [
    {
      title: 'Foco em MVP',
      description: 'Priorizo tempo de lançamento e custo operacional mínimo, evitando desperdícios técnicos desde o primeiro dia.',
      icon: Briefcase,
    },
    {
      title: 'Sócio Técnico',
      description: 'Para projetos com alto potencial, atuo como sócio técnico, assumindo a execução completa da infraestrutura e do sistema.',
      icon: Users,
    },
    {
      title: 'Arquitetura Sólida',
      description: 'Stack escolhida com foco em melhor custo-benefício, escalabilidade real e manutenibilidade a longo prazo.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="differential" className="py-24 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-800/[0.05] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Mais que Código, <span className="text-emerald-500">Estratégia</span>
          </h2>
          <p className="text-lg text-slate-400">
            Não busco apenas escrever linhas de código. Busco resolver problemas reais de negócio com tecnologia escalável e eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="p-8 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400">
                <card.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <Button variant="outline" className="px-8 py-4 text-lg border-emerald-500/50 hover:bg-emerald-500/10" onClick={() => window.location.href = 'https://api.whatsapp.com/send/?phone=5534992399036'}>
                Vamos conversar sobre o seu negócio
            </Button>
        </div>
      </div>
    </section>
  );
}
