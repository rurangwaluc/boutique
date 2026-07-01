'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@dispensary/db/client';
import { products } from '@dispensary/db/schema';
import { productFormSchema } from '@dispensary/validators/product';
import { requireUser } from '@/lib/auth/session';

export type ProductState = {
  error?: string;
};

function cleanOptional(value: string | undefined) {
  const cleaned = value?.trim();
  return cleaned ? cleaned : null;
}

function getFormValues(formData: FormData) {
  return {
    itemType: 'PRODUCT',
    name: formData.get('name'),
    category: formData.get('category'),
    unit: formData.get('unit'),
    batchNumber: undefined,
    supplierName: formData.get('supplierName') || undefined,
    buyingPrice: formData.get('buyingPrice'),
    sellingPrice: formData.get('sellingPrice') || undefined,
    quantity: formData.get('quantity'),
    minQuantity: formData.get('minQuantity'),
    expiryDate: formData.get('expiryDate') || undefined,
    notes: formData.get('notes') || undefined,
  };
}

export async function createProductAction(
  _previousState: ProductState,
  formData: FormData,
): Promise<ProductState> {
  await requireUser();

  const parsed = productFormSchema.safeParse(getFormValues(formData));

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message || 'Check the form.',
    };
  }

  await db.insert(products).values({
    itemType: 'PRODUCT',
    name: parsed.data.name,
    category: parsed.data.category,
    unit: parsed.data.unit,
    batchNumber: null,
    supplierName: cleanOptional(parsed.data.supplierName),
    buyingPrice: parsed.data.buyingPrice,
    sellingPrice: parsed.data.sellingPrice || '0',
    quantity: Number(parsed.data.quantity),
    minQuantity: Number(parsed.data.minQuantity),
    expiryDate: cleanOptional(parsed.data.expiryDate),
    notes: cleanOptional(parsed.data.notes),
    status: 'ACTIVE',
  });

  revalidatePath('/products');
  revalidatePath('/stock');
  revalidatePath('/sales/new');
  redirect('/products');
}

export async function updateProductAction(
  productId: string,
  _previousState: ProductState,
  formData: FormData,
): Promise<ProductState> {
  await requireUser();

  const parsed = productFormSchema.safeParse(getFormValues(formData));

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message || 'Check the form.',
    };
  }

  await db
    .update(products)
    .set({
      itemType: 'PRODUCT',
      name: parsed.data.name,
      category: parsed.data.category,
      unit: parsed.data.unit,
      batchNumber: null,
      supplierName: cleanOptional(parsed.data.supplierName),
      buyingPrice: parsed.data.buyingPrice,
      sellingPrice: parsed.data.sellingPrice || '0',
      quantity: Number(parsed.data.quantity),
      minQuantity: Number(parsed.data.minQuantity),
      expiryDate: cleanOptional(parsed.data.expiryDate),
      notes: cleanOptional(parsed.data.notes),
      updatedAt: new Date(),
    })
    .where(eq(products.id, productId));

  revalidatePath('/products');
  revalidatePath('/stock');
  revalidatePath('/sales/new');
  redirect('/products');
}

export async function archiveProductAction(formData: FormData) {
  await requireUser();

  const productId = String(formData.get('productId') || '');

  if (!productId) {
    return;
  }

  await db
    .update(products)
    .set({
      status: 'ARCHIVED',
      updatedAt: new Date(),
    })
    .where(eq(products.id, productId));

  revalidatePath('/products');
  revalidatePath('/stock');
}
