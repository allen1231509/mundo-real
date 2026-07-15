import { z } from "zod";

export const promotionSchema = z
  .object({
    name: z.string().trim().min(1, "El nombre es requerido").max(150),
    description: z.string().trim().max(500).optional().or(z.literal("")),
    percentage: z.coerce
      .number()
      .positive("Debe ser mayor a 0")
      .max(100, "No puede superar 100"),
    start_date: z.string().min(1, "La fecha de inicio es requerida"),
    end_date: z.string().min(1, "La fecha de fin es requerida"),
    active: z.coerce.boolean().default(true),
    product_ids: z.array(z.string().uuid()).default([]),
  })
  .refine((data) => data.end_date >= data.start_date, {
    message: "La fecha de fin debe ser igual o posterior a la de inicio",
    path: ["end_date"],
  });

export type PromotionInput = z.infer<typeof promotionSchema>;
