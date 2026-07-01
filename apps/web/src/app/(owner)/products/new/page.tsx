import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductForm } from '../product-form';

export default function NewProductPage() {
  return (
    <section className="border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm sm:p-5">
      <div className="mb-5 flex flex-col gap-4 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black tracking-tight text-[var(--text)]">
            Add product
          </h2>
          <p className="mt-1 text-sm font-medium text-[var(--muted)]">
            Add clothes, shoes, handbags, accessories, or other boutique products.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-black text-[var(--text)] shadow-sm transition hover:border-[var(--primary)] hover:bg-[var(--surface)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>
      </div>

      <ProductForm backHref="/products" />
    </section>
  );
}
