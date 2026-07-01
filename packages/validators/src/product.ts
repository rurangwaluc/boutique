import { z } from 'zod';

const moneyPattern = /^[0-9]+(\.[0-9]{1,2})?$/;

const moneySchema = z
  .string()
  .trim()
  .regex(moneyPattern, 'Enter a valid amount.');

const optionalMoneySchema = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || moneyPattern.test(value), 'Enter a valid amount.');

const wholeNumberSchema = z
  .string()
  .trim()
  .regex(/^[0-9]+$/, 'Enter a valid number.');

export const productFormSchema = z.object({
  itemType: z.literal('PRODUCT'),
  name: z.string().trim().min(2, 'Product name is required.').max(180),
  category: z.string().trim().min(2, 'Choose a category.').max(120),
  customerType: z.string().trim().min(2, 'Choose who this is for.').max(40),
  size: z.string().trim().max(60).optional(),
  color: z.string().trim().max(80).optional(),
  supplierName: z.string().trim().max(160).optional(),
  buyingPrice: moneySchema,
  sellingPrice: moneySchema,
  wholesalePrice: optionalMoneySchema,
  wholesaleMinQuantity: wholeNumberSchema,
  quantity: wholeNumberSchema,
  minQuantity: wholeNumberSchema,
  notes: z.string().trim().max(1000).optional(),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;
