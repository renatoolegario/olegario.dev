import Link from 'next/link';
import { Home, ListTodo } from 'lucide-react';
import AppLogoutButton from '../atomic/AppLogoutButton';

function NavigationLink({ href, label, Icon }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/65 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/60 hover:text-white"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export default function AppShell({
  eyebrow = 'Área interna',
  title,
  description,
  authenticated = false,
  actions = null,
  children,
}) {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-slate-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-400/12 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-800/80 bg-slate-950/55 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200/90">
              olegario.dev
            </p>
            <h1 className="text-xl font-semibold text-white">Painel de objetivos</h1>
          </div>

          {authenticated ? (
            <div className="flex flex-wrap items-center gap-3">
              <NavigationLink href="/app" label="Painel" Icon={Home} />
              <NavigationLink href="/app/tasks" label="Tarefas" Icon={ListTodo} />
              <AppLogoutButton />
            </div>
          ) : null}
        </header>

        <section className="premium-card rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200/90">
                {eyebrow}
              </p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
              <p className="max-w-2xl text-base leading-7 text-slate-300">{description}</p>
            </div>

            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </section>

        <div className="mt-8 flex-1">{children}</div>
      </main>
    </div>
  );
}
