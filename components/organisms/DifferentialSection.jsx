'use client';

import React from 'react';
import { Briefcase, TrendingUp, Users } from 'lucide-react';
import Button from '../atomic/Button';

export default function DifferentialSection() {
  const cards = [
    {
      title: 'Visão de Negócio',
      description: 'Entendo de CAC, LTV e Churn. O código serve ao negócio, não o contrário.',
      icon: TrendingUp,
    },
    {
      title: 'Sócio Técnico',
      description: 'Atuo como CTO hands-on em troca de equity para projetos com alto potencial.',
      icon: Users,
    },
    {
      title: 'Foco em MVP',
      description: 'Lançamento rápido (Time-to-Market) com custo de infraestrutura otimizado.',
      icon: Briefcase,
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
            <Button variant="outline" className="px-8 py-4 text-lg border-emerald-500/50 hover:bg-emerald-500/10">
                Vamos conversar sobre o seu negócio
            </Button>
        </div>
      </div>
    </section>
  );
}
