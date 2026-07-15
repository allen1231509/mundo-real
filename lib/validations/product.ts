import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "El slug es requerido")
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa minúsculas, números y guiones"),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  category_id: z.string().uuid().optional().or(z.literal("")),
  price: z.coerce.number().nonnegative("El precio no puede ser negativo"),
  stock: z.coerce.number().int().nonnegative("El stock no puede ser negativo"),
  brand: z.string().trim().max(100).optional().or(z.literal("")),
  featured: z.coerce.boolean().default(false),
  active: z.coerce.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
