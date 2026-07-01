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
    customerType: string;
    size: string | null;
    color: string | null;
    unit: string;
    batchNumber: string | null;
    supplierName: string | null;
    buyingPrice: string;
    sellingPrice: string;
    wholesalePrice: string;
    wholesaleMinQuantity: number;
    quantity: number;
    minQuantity: number;
    expiryDate: string | null;
    notes: string | null;
  };
};

const inputClass =
  'h-11 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-bold text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-soft)]';

const selectClass = inputClass;

const customerTypes = ['Women', 'Men', 'Unisex'];

export function ProductForm({ product, backHref }: ProductFormProps) {
  const action = product ? updateProductAction.bind(null, product.id) : createProductAction;
  const [state, formAction, pending] = useActionState(action, {});
  const safeBackHref = backHref || '/products';

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="itemType" value="PRODUCT" />

      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">
          Product details
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="name" className="text-sm font-black text-[var(--text)]">
              Product name
            </label>
            <input
              id="name"
              name="name"
              defaultValue={product?.name || ''}
              placeholder="Example: Pink dress, black heels, leather handbag"
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
              placeholder="Example: Dresses, shoes, handbags, earrings"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="customerType" className="text-sm font-black text-[var(--text)]">
              For who?
            </label>
            <select
              id="customerType"
              name="customerType"
              defaultValue={product?.customerType || 'Women'}
              required
              className={selectClass}
            >
              {customerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="size" className="text-sm font-black text-[var(--text)]">
              Size
            </label>
            <input
              id="size"
              name="size"
              defaultValue={product?.size || ''}
              placeholder="S, M, L, 38, 39, one size..."
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="color" className="text-sm font-black text-[var(--text)]">
              Color
            </label>
            <input
              id="color"
              name="color"
              defaultValue={product?.color || ''}
              placeholder="Pink, black, gold..."
              className={inputClass}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
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
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">
          Prices
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="buyingPrice" className="text-sm font-black text-[var(--text)]">
              Bought for
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
              Retail price
            </label>
            <input
              id="sellingPrice"
              name="sellingPrice"
              inputMode="decimal"
              defaultValue={product?.sellingPrice || '0'}
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="wholesalePrice" className="text-sm font-black text-[var(--text)]">
              Wholesale price
            </label>
            <input
              id="wholesalePrice"
              name="wholesalePrice"
              inputMode="decimal"
              defaultValue={product?.wholesalePrice || ''}
              placeholder="Optional"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="wholesaleMinQuantity" className="text-sm font-black text-[var(--text)]">
              Wholesale starts from
            </label>
            <input
              id="wholesaleMinQuantity"
              name="wholesaleMinQuantity"
              type="number"
              min="0"
              defaultValue={product?.wholesaleMinQuantity ?? 0}
              required
              className={inputClass}
            />
            <p className="text-xs font-bold text-[var(--muted)]">
              Example: 6 means wholesale price starts from 6 pieces.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">
          Stock
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
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
              Warn me when left with
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
        </div>
      </section>

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
          className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-3 text-sm font-bold text-[var(--text)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-soft)]"
        />
      </div>

      {state.error ? (
        <div className="rounded-2xl border border-[var(--danger)] bg-[var(--primary-soft)] px-4 py-3 text-sm font-bold text-[var(--text)]">
          {state.error}
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Link
          href={safeBackHref}
          className="inline-flex h-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-black text-[var(--text)] shadow-sm transition hover:border-[var(--primary)] hover:bg-[var(--surface)]"
        >
          Back
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-2xl bg-[var(--primary)] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[var(--primary-strong)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? 'Saving...' : product ? 'Save changes' : 'Save product'}
        </button>
      </div>
    </form>
  );
}
