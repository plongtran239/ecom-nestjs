import { z } from 'zod';

export const VariantSchema = z.object({
  value: z.string(),
  options: z.array(z.string()),
});

export const VariantsSchema = z.array(VariantSchema).superRefine((variants, ctx) => {
  // Kiểm tra variants và variant option có bị trùng hay không
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    const isExist = variants.findIndex((v) => v.value.toLowerCase() === variant.value.toLowerCase()) !== i;
    if (isExist) {
      return ctx.addIssue({
        code: 'custom',
        message: `Giá trị ${variant.value} đã tồn tại trong danh sách variants. Vui lòng kiểm tra lại.`,
        path: ['variants'],
      });
    }
    const isExistOption = variant.options.some((option, index) => {
      const isExistOption = variant.options.findIndex((o) => o.toLowerCase() === option.toLowerCase()) !== index;
      return isExistOption;
    });
    if (isExistOption) {
      return ctx.addIssue({
        code: 'custom',
        message: `Variant ${variant.value} chứa các option trùng tên với nhau. Vui lòng kiểm tra lại.`,
        path: ['variants'],
      });
    }
  }
});

export const ProductSchema = z.object({
  id: z.number(),
  publishedAt: z.coerce.date().nullable(),
  name: z.string().trim().max(500),
  basePrice: z.number().positive(),
  virtualPrice: z.number().positive(),
  brandId: z.number().positive(),
  images: z.array(z.string()),
  variants: VariantsSchema, // Json field represented as a record

  createdById: z.number().nullable(),
  updatedById: z.number().nullable(),
  deletedById: z.number().nullable(),
  deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProductType = z.infer<typeof ProductSchema>;
export type VariantsType = z.infer<typeof VariantsSchema>;
