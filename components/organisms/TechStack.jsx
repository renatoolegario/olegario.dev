import React from 'react';
import { Cloud, Database, HardDrive, Server, Zap } from 'lucide-react';
import { SiCloudflare, SiDocker, SiPostgresql, SiVercel } from 'react-icons/si';
import Reveal from '../molecules/Reveal';

const stackGroups = [
  {
    eyebrow: 'Infraestrutura',
    title: 'Pronta para picos de acesso',
    description:
      'Arquitetura preparada para absorver variações de carga com deploy previsível, distribuição global e banco serverless.',
    icon: Server,
    noteIcon: Cloud,
    note: 'Camada de entrega pensada para manter rapidez, estabilidade e elasticidade operacional.',
    items: [
      { label: 'Vercel', icon: SiVercel },
      { label: 'Docker', icon: SiDocker },
      { label: 'Cloudflare', icon: SiCloudflare },
      { label: 'Neon', icon: Zap },
    ],
  },
  {
    eyebrow: 'Armazenamento',
    title: 'Seguro e antifalhas',
    description:
      'Persistência estruturada para reduzir risco operacional, proteger dados críticos e sustentar crescimento sem gargalos.',
    icon: HardDrive,
    noteIcon: Database,
    note: 'Base relacional e armazenamento de objetos com foco em confiabilidade e recuperação.',
    items: [
      { label: 'PostgreSQL', icon: SiPostgresql },
      { label: 'Blob Storage', icon: HardDrive },
    ],
  },
];

function StackChip({ icon: Icon, label }) {
  return (
    <div className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-2.5 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
        <Icon size={16} />
      </span>
      <span className="whitespace-nowrap text-[13px] font-semibold tracking-[0.01em]">
        {label}
      </span>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="relative overflow-hidden border-t border-slate-900 bg-slate-950 py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.1),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="rise">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              Stack <span className="text-emerald-400">técnica</span>
            </h2>
            <p className="text-lg text-slate-300">
              A base técnica é desenhada para crescer com segurança, estabilidade e menos risco operacional.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {stackGroups.map((group, index) => {
            const SectionIcon = group.icon;
            const NoteIcon = group.noteIcon;

            return (
              <Reveal
                key={group.title}
                variant={index === 0 ? 'lift' : 'fade'}
                delay={index * 110}
                className="h-full"
              >
                <article className="premium-card h-full rounded-[30px] p-8 sm:p-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_38%)] pointer-events-none" />

                  <div className="flex items-start justify-between gap-6">
                    <div className="max-w-xl">
                      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {group.eyebrow}
                      </div>
                      <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                        {group.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-slate-300">
                        {group.description}
                      </p>
                    </div>

                    <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 sm:flex">
                      <SectionIcon size={28} />
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3 lg:flex-nowrap lg:gap-2.5">
                    {group.items.map((item) => (
                      <StackChip key={item.label} icon={item.icon} label={item.label} />
                    ))}
                  </div>

                  <div className="mt-8 flex items-start gap-3 border-t border-white/8 pt-5 text-sm leading-relaxed text-slate-400">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/70 text-cyan-300">
                      <NoteIcon size={18} />
                    </span>
                    <p>{group.note}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
