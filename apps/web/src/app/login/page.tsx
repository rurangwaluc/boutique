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
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-sm font-black text-white shadow-sm">
              LE
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--text)]">
                La Elegant Boutique
              </p>
              <p className="text-xs font-bold text-[var(--muted)]">
                Owner and employee access
              </p>
            </div>
          </div>

          <ThemeToggle />
        </header>

        <section className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--primary)]">
                Boutique access
              </p>
              <h1 className="boutique-display text-5xl font-bold leading-none text-[var(--text)]">
                Sign in
              </h1>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[var(--muted)]">
                Open the shop dashboard to manage sales, stock, customers, and daily work.
              </p>
            </div>

            <div className="business-card rounded-3xl p-5 sm:p-6">
              <LoginForm />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-black text-[var(--muted)]">
              <span className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-2 py-3">
                Sales
              </span>
              <span className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-2 py-3">
                Stock
              </span>
              <span className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-2 py-3">
                Customers
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
