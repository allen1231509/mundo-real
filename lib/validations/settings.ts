import { z } from "zod";

export const settingsSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(150),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(30).optional().or(z.literal("")),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  schedule: z.string().trim().max(300).optional().or(z.literal("")),
  facebook: z.string().trim().max(300).optional().or(z.literal("")),
  instagram: z.string().trim().max(300).optional().or(z.literal("")),
  tiktok: z.string().trim().max(300).optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || z.string().email().safeParse(v).success, {
      message: "Correo inválido",
    }),
  hero_title: z.string().trim().max(200).optional().or(z.literal("")),
  hero_subtitle: z.string().trim().max(300).optional().or(z.literal("")),
  story: z.string().trim().max(3000).optional().or(z.literal("")),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
