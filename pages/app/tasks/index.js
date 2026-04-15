import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Home, LayoutList } from 'lucide-react';
import AppTaskCard from '../../../components/molecules/AppTaskCard';
import AppShell from '../../../components/organisms/AppShell';
import { requireAppAuth } from '../../../utils/appAuth';
import { appTasks } from '../../../utils/appTasks';

export default function AppTasksPage() {
  return (
    <>
      <Head>
        <title>Tarefas do App | Olegário.Dev</title>
      </Head>

      <AppShell
        authenticated
        title="Lista de objetivos"
        description="Cada bloco leva para uma página própria, mantendo a estrutura simples e totalmente hardcoded neste momento."
        eyebrow="Hub de tarefas"
        actions={
          <>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/65 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao painel
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              <Home className="h-4 w-4" />
              Ir para o início
            </Link>
          </>
        }
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {appTasks.map((task) => (
            <AppTaskCard key={task.slug} task={task} />
          ))}
        </div>

        <section className="premium-card mt-8 rounded-[2rem] p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
            <LayoutList className="h-4 w-4" />
            Estrutura atual
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
              <p className="font-semibold text-white">1. Painel `/app`</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Faz a autenticação e resume as frentes disponíveis.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
              <p className="font-semibold text-white">2. Hub `/app/tasks`</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Centraliza a lista de objetivos com navegação direta para cada item.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
              <p className="font-semibold text-white">3. Páginas individuais</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Cada objetivo tem sua própria rota para documentar o foco principal.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
              <p className="font-semibold text-white">4. Cookie de sessão</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Depois do login, as páginas internas continuam liberadas até a saída ou
                expiração da sessão.
              </p>
            </div>
          </div>
        </section>
      </AppShell>
    </>
  );
}

export async function getServerSideProps(context) {
  const authRedirect = requireAppAuth(context);
  if (authRedirect) {
    return authRedirect;
  }

  return {
    props: {},
  };
}
