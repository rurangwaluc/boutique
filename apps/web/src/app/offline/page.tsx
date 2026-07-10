import Link from 'next/link';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFC] px-4 py-8 text-[#222222] dark:bg-[#161616] dark:text-[#F5F5F5]">
      <section className="mx-auto flex min-h-[80vh] max-w-xl items-center">
        <div className="w-full rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm dark:border-[#343434] dark:bg-[#222222] sm:p-8">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--primary)]">
            Offline
          </p>
          <h1 className="mt-3 font-display text-4xl font-black tracking-tight">
            You are offline
          </h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#6B7280] dark:text-[#A3A3A3]">
            La Elegant Boutique is installed, but this page needs internet to load fresh shop data.
            Check your connection and try again.
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--primary)] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[var(--primary-strong)]"
          >
            Try again
          </Link>
        </div>
      </section>
    </main>
  );
}
