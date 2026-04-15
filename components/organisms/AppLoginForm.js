import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AppLoginForm({ nextPath = '/app' }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!password.trim()) {
      setError('Informe a senha para continuar.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch('/api/app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          nextPath,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message || 'Não foi possível autenticar agora.');
        return;
      }

      await router.replace(data.nextPath || nextPath || '/app');
    } catch (submitError) {
      setError('Falha ao validar a senha. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="premium-card rounded-[2rem] p-6 sm:p-8"
    >
      <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
        <ShieldCheck className="h-6 w-6" />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200/90">
          Área protegida
        </p>
        <h2 className="text-3xl font-semibold text-white">Entrar no app interno</h2>
        <p className="max-w-xl text-sm leading-6 text-slate-300">
          Use a senha configurada no ambiente do projeto para liberar a navegação
          nesta área.
        </p>
      </div>

      <label className="mt-8 block space-y-3">
        <span className="text-sm font-semibold text-slate-200">Senha</span>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-950/70 px-4 py-3">
          <LockKeyhole className="h-5 w-5 text-slate-400" />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite a senha do app"
            className="w-full border-0 bg-transparent text-base text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </label>

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ArrowRight className="h-4 w-4" />
        {isSubmitting ? 'Validando...' : 'Entrar no app'}
      </button>

      <p className="mt-4 text-xs leading-6 text-slate-400">
        Depois da autenticação, a sessão fica salva em cookie para você navegar nas
        páginas internas sem repetir a senha a todo momento.
      </p>
    </form>
  );
}
