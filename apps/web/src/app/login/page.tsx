import { redirect } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { getCurrentUser } from '@/lib/auth/session';
import { LoginForm } from './login-form';

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <main className="auth-shell min-h-screen px-4 py-5 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between border-b border-[var(--border)] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-sm font-black text-white shadow-lg shadow-pink-500/20">
              LE
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--text)]">
                La Elegant Boutique
              </p>
              <p className="text-xs font-semibold text-[var(--muted)]">
                Owner and employee access
              </p>
            </div>
          </div>

          <ThemeToggle />
        </header>

        <section className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">
                Boutique access
              </p>
              <h1 className="text-3xl font-black tracking-tight text-[var(--text)]">
                Sign in
              </h1>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Open the shop dashboard to manage sales, stock, customers, and daily work.
              </p>
            </div>

            <div className="business-card rounded-2xl p-5 sm:p-6">
              <LoginForm />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-black text-[var(--muted)]">
              <span className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-2 py-3">
                Sales
              </span>
              <span className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-2 py-3">
                Stock
              </span>
              <span className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-2 py-3">
                Customers
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
