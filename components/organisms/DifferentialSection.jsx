'use client';

import React from 'react';
import { Clock3, Hammer, MessageSquare, RefreshCw, Rocket } from 'lucide-react';
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
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
            {card.step}
          </span>
          Etapa
        </div>
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
      step: '1',
      title: 'Reunião e alinhamento',
      description: 'Entendo sua ideia, o objetivo do MVP e o que realmente precisa entrar na primeira versão para validar com clareza.',
      icon: MessageSquare,
    },
    {
      step: '2',
      title: 'Desenvolvimento enxuto',
      description: 'Construo o MVP com foco no essencial para colocar no ar rápido, sem elevar custo com complexidade desnecessária.',
      icon: Hammer,
    },
    {
      step: '3',
      title: 'Primeira versão apresentada',
      description: 'Entre 1 e 7 dias, você já consegue ver uma primeira versão funcional e entender os próximos passos com mais segurança.',
      icon: Rocket,
    },
    {
      step: '4',
      title: 'Melhoria contínua com PDCA',
      description: 'Depois da primeira entrega, seguimos com ajustes e evoluções contínuas para melhorar resultados, usabilidade e operação.',
      icon: RefreshCw,
    },
  ];

  return (
    <section id="differential" className="py-24 bg-slate-900/45 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(34,211,238,0.10),transparent_35%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="rise">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200">
              <Clock3 size={16} className="text-emerald-300" />
              Entrega inicial entre 1 e 7 dias
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Transformo sua ideia em uma <span className="text-emerald-400">solução real</span>
            </h2>
            <p className="text-lg text-slate-300">
              Com um processo enxuto, entrego a primeira versão entre 1 e 7 dias e estruturo a evolução de forma escalável, sem perder qualidade nem desempenho.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
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
              Quero tirar meu MVP do papel
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
