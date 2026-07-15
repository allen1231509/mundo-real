import { z } from "zod";

export const SORT_OPTIONS = [
  "newest",
  "price_asc",
  "price_desc",
  "name_asc",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const catalogSearchParamsSchema = z.object({
  q: z.string().trim().max(100).optional(),
  categoria: z.string().trim().max(100).optional(),
  marca: z.string().trim().max(100).optional(),
  precioMin: z.coerce.number().nonnegative().optional(),
  precioMax: z.coerce.number().nonnegative().optional(),
  orden: z.enum(SORT_OPTIONS).default("newest"),
  pagina: z.coerce.number().int().positive().default(1),
});

export type CatalogSearchParams = z.infer<typeof catalogSearchParamsSchema>;
