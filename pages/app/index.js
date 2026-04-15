import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, FolderKanban, LockKeyhole, PanelTop } from 'lucide-react';
import AppTaskCard from '../../components/molecules/AppTaskCard';
import AppLoginForm from '../../components/organisms/AppLoginForm';
import AppShell from '../../components/organisms/AppShell';
import {
  isAppAuthenticatedRequest,
  sanitizeNextPath,
} from '../../utils/appAuth';
import { appTasks } from '../../utils/appTasks';

export default function AppHomePage({ isAuthenticated, nextPath }) {
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>App | Olegário.Dev</title>
        </Head>

        <AppShell
          title="Acesso ao app interno"
          description="Esta área guarda os objetivos hardcoded e só libera navegação depois da autenticação por senha."
          eyebrow="Login necessário"
        >
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <AppLoginForm nextPath={nextPath} />

            <section className="premium-card rounded-[2rem] p-6 sm:p-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                <PanelTop className="h-6 w-6" />
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/90">
                  O que existe aqui
                </p>
                <h2 className="text-3xl font-semibold text-white">
                  Painel simples para centralizar as frentes do momento
                </h2>
                <p className="text-sm leading-7 text-slate-300">
                  Depois do login, você navega entre a lista de objetivos e as páginas
                  individuais de YouTube, Instagram, UaiStack e Estratégias.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {appTasks.map((task, index) => (
                  <div
                    key={task.slug}
                    className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-sm font-semibold text-slate-200">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{task.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {task.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
                <div className="flex items-center gap-2 font-semibold">
                  <LockKeyhole className="h-4 w-4" />
                  Sessão protegida por cookie
                </div>
                <p className="mt-2">
                  Ao autenticar, a navegação interna fica liberada até o cookie expirar
                  ou você sair manualmente.
                </p>
              </div>
            </section>
          </div>
        </AppShell>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Painel do App | Olegário.Dev</title>
      </Head>

      <AppShell
        authenticated
        title="Objetivos conectados em um painel único"
        description="Tudo está hardcoded por enquanto, com navegação rápida entre a visão geral e as páginas específicas de cada frente."
        eyebrow="Área liberada"
        actions={
          <Link
            href="/app/tasks"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            <FolderKanban className="h-4 w-4" />
            Abrir lista de tarefas
          </Link>
        }
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {appTasks.map((task) => (
            <AppTaskCard key={task.slug} task={task} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="premium-card rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200/90">
              Visão geral
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Estrutura inicial pronta para navegar e evoluir
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              A área já nasce com autenticação, hub principal, página de tarefas e
              quatro páginas individuais para organizar cada objetivo separado.
            </p>
          </section>

          <section className="premium-card rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/90">
              Próximo clique
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Entre na lista de tarefas para abrir cada frente com mais contexto
            </h2>
            <Link
              href="/app/tasks"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/65 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
              Ir para /app/tasks
            </Link>
          </section>
        </div>
      </AppShell>
    </>
  );
}

export async function getServerSideProps(context) {
  const isAuthenticated = isAppAuthenticatedRequest(context.req);
  const nextPath = sanitizeNextPath(
    typeof context.query.next === 'string' ? context.query.next : '/app'
  );

  if (isAuthenticated && nextPath !== '/app') {
    return {
      redirect: {
        destination: nextPath,
        permanent: false,
      },
    };
  }

  return {
    props: {
      isAuthenticated,
      nextPath,
    },
  };
}
