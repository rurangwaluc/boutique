'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createProductAction, updateProductAction } from '@/lib/products/actions';

type ProductFormProps = {
  backHref?: string;
  product?: {
    id: string;
    itemType: 'PRODUCT' | 'SERVICE';
    name: string;
    category: string;
    unit: string;
    batchNumber: string | null;
    supplierName: string | null;
    buyingPrice: string;
    sellingPrice: string;
    quantity: number;
    minQuantity: number;
    expiryDate: string | null;
    notes: string | null;
  };
};

const inputClass =
  'h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-semibold text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-pink-100 dark:focus:ring-pink-950/40';

export function ProductForm({ product, backHref }: ProductFormProps) {
  const action = product ? updateProductAction.bind(null, product.id) : createProductAction;
  const [state, formAction, pending] = useActionState(action, {});
  const safeBackHref = backHref || '/products';

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="itemType" value="PRODUCT" />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-black text-[var(--text)]">
            Product name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={product?.name || ''}
            placeholder="Example: Women dress, handbag, heels, T-shirt"
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-black text-[var(--text)]">
            Category
          </label>
          <input
            id="category"
            name="category"
            defaultValue={product?.category || ''}
            placeholder="Clothes, shoes, handbags, accessories..."
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="unit" className="text-sm font-black text-[var(--text)]">
            Count by
          </label>
          <input
            id="unit"
            name="unit"
            defaultValue={product?.unit || ''}
            placeholder="Piece, pair, set, box..."
            required
            className={inputClass}
          />
          <p className="text-xs font-bold text-[var(--muted)]">
            Use the way this product is counted in the boutique.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="buyingPrice" className="text-sm font-black text-[var(--text)]">
            Cost each
          </label>
          <input
            id="buyingPrice"
            name="buyingPrice"
            inputMode="decimal"
            defaultValue={product?.buyingPrice || '0'}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="sellingPrice" className="text-sm font-black text-[var(--text)]">
            Retail selling price
          </label>
          <input
            id="sellingPrice"
            name="sellingPrice"
            inputMode="decimal"
            defaultValue={product?.sellingPrice || ''}
            placeholder="Example: 25000"
            className={inputClass}
          />
          <p className="text-xs font-bold text-[var(--muted)]">
            Wholesale pricing will be handled in the boutique inventory upgrade.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-black text-[var(--text)]">
            Quantity now
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            defaultValue={product?.quantity ?? 0}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="minQuantity" className="text-sm font-black text-[var(--text)]">
            Warn me when quantity reaches
          </label>
          <input
            id="minQuantity"
            name="minQuantity"
            type="number"
            min="0"
            defaultValue={product?.minQuantity ?? 5}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="expiryDate" className="text-sm font-black text-[var(--text)]">
            Date to check again
          </label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="date"
            defaultValue={product?.expiryDate || ''}
            className={inputClass}
          />
          <p className="text-xs font-bold text-[var(--muted)]">
            Optional. Use it for seasonal items or slow-moving stock.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="supplierName" className="text-sm font-black text-[var(--text)]">
            Supplier
          </label>
          <input
            id="supplierName"
            name="supplierName"
            defaultValue={product?.supplierName || ''}
            placeholder="Optional"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-black text-[var(--text)]">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={product?.notes || ''}
          rows={4}
          placeholder="Optional"
          className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-3 text-sm font-semibold text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-pink-100 dark:focus:ring-pink-950/40"
        />
      </div>

      {state.error ? (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-800 dark:border-yellow-900/60 dark:bg-yellow-950/40 dark:text-yellow-200">
          {state.error}
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Link
          href={safeBackHref}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-black text-[var(--text)] shadow-sm transition hover:border-[var(--primary)] hover:bg-[var(--surface)]"
        >
          Back
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-lg bg-[var(--primary)] px-5 text-sm font-black text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? 'Saving...' : product ? 'Save changes' : 'Save product'}
        </button>
      </div>
    </form>
  );
}
