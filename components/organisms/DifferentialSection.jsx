'use client';

import React from 'react';
import { Briefcase, TrendingUp, Users } from 'lucide-react';
import Button from '../atomic/Button';
import Reveal from '../molecules/Reveal';
import useTilt from '../../hooks/useTilt';

function DifferentialCard({ card, delay = 0 }) {
  const { cardRef, handlers } = useTilt({ maxTilt: 5 });

  return (
    <Reveal variant="lift" delay={delay}>
      <article
        ref={cardRef}
        {...handlers}
        className="premium-card tilt-card rounded-2xl p-8"
      >
        <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-300 border border-emerald-500/20">
          <card.icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
        <p className="text-slate-300 leading-relaxed">
          {card.description}
        </p>
      </article>
    </Reveal>
  );
}

export default function DifferentialSection() {
  const cards = [
    {
      title: 'Foco em MVP',
      description: 'Priorizo tempo de lancamento e custo operacional minimo, evitando desperdicios tecnicos desde o primeiro dia.',
      icon: Briefcase,
    },
    {
      title: 'Socio Tecnico',
      description: 'Para projetos com alto potencial, atuo como socio tecnico assumindo execucao completa da arquitetura e da operacao.',
      icon: Users,
    },
    {
      title: 'Arquitetura Solida',
      description: 'Stack definida pelo melhor custo-beneficio, com escalabilidade real e manutencao previsivel a longo prazo.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="differential" className="py-24 bg-slate-900/45 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(34,211,238,0.10),transparent_35%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="rise">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Mais que codigo, <span className="text-emerald-400">estrategia</span>
            </h2>
            <p className="text-lg text-slate-300">
              O objetivo nao e apenas entregar funcionalidade. E criar tecnologia que sustente crescimento real do negocio.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <DifferentialCard key={card.title} card={card} delay={index * 100} />
          ))}
        </div>

        <Reveal variant="fade" delay={220}>
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              className="px-8 py-4 text-lg border-emerald-500/50 hover:bg-emerald-500/10"
              onClick={() => { window.location.href = 'https://api.whatsapp.com/send/?phone=5534992399036'; }}
            >
              Vamos conversar sobre o seu negocio
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
