import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(100),
  slug: z
    .string()
    .trim()
    .min(1, "El slug es requerido")
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa minúsculas, números y guiones"),
  icon: z.string().trim().max(50).optional().or(z.literal("")),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, "Color hex inválido (ej: #6366f1)"),
  sort_order: z.coerce.number().int().default(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;
