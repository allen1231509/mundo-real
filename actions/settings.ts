"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { uploadProductImage } from "@/lib/supabase/storage";
import { settingsSchema } from "@/lib/validations/settings";

export type ActionState = { error: string | null; success?: boolean };

export async function uploadSettingsImageAction(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file");
  const kind = formData.get("kind");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Archivo inválido" };
  }

  const supabase = await createClient();
  const extension = file.name.split(".").pop() || "jpg";
  const folder = kind === "logo" ? "settings/logo" : "settings/hero";
  const path = `${folder}-${crypto.randomUUID()}.${extension}`;

  try {
    const url = await uploadProductImage(supabase, file, path);
    return { url };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Error al subir la imagen",
    };
  }
}

export async function updateBusinessSettings(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = settingsSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    address: formData.get("address"),
    schedule: formData.get("schedule"),
    facebook: formData.get("facebook"),
    instagram: formData.get("instagram"),
    tiktok: formData.get("tiktok"),
    email: formData.get("email"),
    hero_title: formData.get("hero_title"),
    hero_subtitle: formData.get("hero_subtitle"),
    story: formData.get("story"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const logo = formData.get("logo");
  const heroBanner = formData.get("hero_banner");

  const supabase = await createClient();
  const { error } = await supabase
    .from("business_settings")
    .update({
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      whatsapp: parsed.data.whatsapp || null,
      address: parsed.data.address || null,
      schedule: parsed.data.schedule || null,
      facebook: parsed.data.facebook || null,
      instagram: parsed.data.instagram || null,
      tiktok: parsed.data.tiktok || null,
      email: parsed.data.email || null,
      hero_title: parsed.data.hero_title || null,
      hero_subtitle: parsed.data.hero_subtitle || null,
      story: parsed.data.story || null,
      logo: typeof logo === "string" && logo ? logo : null,
      hero_banner:
        typeof heroBanner === "string" && heroBanner ? heroBanner : null,
    })
    .eq("id", 1);

  if (error) return { error: error.message };

  revalidatePath("/admin/configuracion");
  revalidatePath("/", "layout");
  revalidatePath("/catalogo");
  return { error: null, success: true };
}
