'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import GithubContribCalendar from '../molecules/GithubContribCalendar';
import Reveal from '../molecules/Reveal';

function formatMetric(value, { suffix = '', fallback = 'N/D' } = {}) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'number') return `${value.toLocaleString('pt-BR')}${suffix}`;
  return `${value}${suffix}`;
}

export default function Hero() {
  const [metrics, setMetrics] = useState(null);
  const [metricsError, setMetricsError] = useState('');

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setMetricsError('');
        const response = await fetch('/api/landing/metrics?username=renatoolegario');
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || 'Falha ao carregar metricas');
        }

        if (active) {
          setMetrics(payload?.data?.counts || null);
        }
      } catch (error) {
        if (active) {
          setMetricsError(error?.message || 'Falha ao carregar metricas');
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    if (!metrics) {
      return [
        { label: 'Anos de XP', value: '...' },
        { label: 'Negocios proprios', value: '...' },
        { label: 'Projetos no portfolio', value: '...' },
        { label: 'Contribuicoes GitHub', value: '...' },
      ];
    }

    return [
      { label: 'Anos de XP', value: formatMetric(metrics.years_experience, { suffix: '+' }) },
      { label: 'Negocios proprios', value: formatMetric(metrics.own_ventures, { suffix: '+' }) },
      { label: 'Projetos no portfolio', value: formatMetric(metrics.projects_total, { suffix: '+' }) },
      { label: 'Contribuicoes GitHub', value: formatMetric(metrics.github_contributions) },
    ];
  }, [metrics]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-left">
            <Reveal variant="fade">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Disponivel para novos projetos</span>
              </div>
            </Reveal>

            <Reveal variant="lift" delay={100}>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                Arquiteto de Software <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400">
                  & Fundador Tecnico
                </span>
              </h1>
            </Reveal>

            <Reveal variant="lift" delay={180}>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                Arquitetura, backend, frontend e infraestrutura com foco em tirar MVPs do papel, validar rapido e manter operacao com custo previsivel.
              </p>
            </Reveal>

            <Reveal variant="rise" delay={260}>
              <div className="flex flex-wrap items-center gap-8 text-slate-500">
                {stats.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <div>
                      <span className="block text-3xl font-bold text-white">{item.value}</span>
                      <span className="text-sm font-medium text-slate-300">{item.label}</span>
                    </div>
                    {index < stats.length - 1 ? (
                      <div className="h-8 w-px bg-slate-800 hidden sm:block" />
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </Reveal>

            {metricsError ? (
              <p className="mt-4 text-sm text-amber-300">
                Algumas metricas nao puderam ser atualizadas em tempo real no momento.
              </p>
            ) : null}
          </div>

          <Reveal variant="rise" delay={220}>
            <div className="relative">
              <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto lg:ml-auto rounded-full p-2 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-slate-700/80 backdrop-blur-sm">
                <Image
                  src="/olegario.jpeg"
                  alt="Renato Olegario"
                  width={384}
                  height={384}
                  priority
                  className="w-full h-full object-cover rounded-full border-4 border-slate-950 shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={320}>
          <div className="flex justify-center overflow-x-auto pb-4">
            <GithubContribCalendar username="renatoolegario" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
