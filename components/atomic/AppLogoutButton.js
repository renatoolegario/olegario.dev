import { LogOut } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AppLogoutButton({ className = '' }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    try {
      setIsSubmitting(true);
      await fetch('/api/app/logout', {
        method: 'POST',
      });
    } finally {
      router.replace('/app');
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      <LogOut className="h-4 w-4" />
      {isSubmitting ? 'Saindo...' : 'Sair'}
    </button>
  );
}
