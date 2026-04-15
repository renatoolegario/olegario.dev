import Link from 'next/link';
import { ArrowLeft, Home, ListTodo, Target } from 'lucide-react';
import AppShell from './AppShell';

export default function AppTaskDetail({ task }) {
  return (
    <AppShell
      authenticated
      eyebrow="Detalhe da tarefa"
      title={task.title}
      description={task.summary}
      actions={
        <>
          <Link
            href="/app/tasks"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/65 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar às tarefas
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            <Home className="h-4 w-4" />
            Ir para o painel
          </Link>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="premium-card rounded-[2rem] p-6 sm:p-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
            <Target className="h-6 w-6" />
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200/90">
              Objetivo central
            </p>
            <h3 className="text-2xl font-semibold text-white">{task.objective}</h3>
            <p className="text-sm leading-7 text-slate-300">
              Esta página está hardcoded para servir como base rápida de organização
              e alinhamento da frente de trabalho.
            </p>
          </div>
        </section>

        <section className="premium-card rounded-[2rem] p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
            <ListTodo className="h-4 w-4" />
            Documentação inicial
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-2xl font-semibold text-white">Pontos registrados</h3>
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {task.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-2xl border border-slate-800/80 bg-slate-950/55 px-4 py-3"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
