import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedTaskIcon from '../atomic/AnimatedTaskIcon';

export default function AppTaskCard({ task }) {
  return (
    <Link
      href={task.href}
      className="premium-card group flex h-full flex-col rounded-3xl p-6 transition duration-300 hover:-translate-y-1"
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
        <AnimatedTaskIcon slug={task.slug} className="h-7 w-7" />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="space-y-3">
          <span className="inline-flex w-fit rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            Objetivo hardcoded
          </span>
          <h2 className="text-2xl font-semibold text-white">{task.title}</h2>
          <p className="text-sm leading-6 text-slate-300">{task.summary}</p>
        </div>

        <div className="space-y-2 rounded-2xl border border-slate-800/90 bg-slate-950/60 p-4 text-sm text-slate-300">
          <p className="font-semibold text-slate-100">Foco principal</p>
          <p className="leading-6">{task.objective}</p>
        </div>
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition group-hover:text-emerald-100">
        Abrir tarefa
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
