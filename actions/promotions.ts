"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { promotionSchema } from "@/lib/validations/promotion";

export type ActionState = { error: string | null; success?: boolean };

function parsePromotionForm(formData: FormData) {
  return promotionSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    percentage: formData.get("percentage"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    active: formData.get("active") === "on",
    product_ids: formData.getAll("product_ids"),
  });
}

function revalidatePromotionPaths() {
  revalidatePath("/admin/promociones");
  revalidatePath("/", "layout");
  revalidatePath("/catalogo");
}

export async function createPromotion(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parsePromotionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const supabase = await createClient();
  const { data: promotion, error } = await supabase
    .from("promotions")
    .insert({
      name: parsed.data.name,
      description: parsed.data.description || null,
      percentage: parsed.data.percentage,
      start_date: parsed.data.start_date,
      end_date: parsed.data.end_date,
      active: parsed.data.active,
    })
    .select("id")
    .single();

  if (error || !promotion) {
    return { error: error?.message ?? "No se pudo crear la promoción" };
  }

  if (parsed.data.product_ids.length > 0) {
    const { error: linkError } = await supabase
      .from("promotion_products")
      .insert(
        parsed.data.product_ids.map((product_id) => ({
          promotion_id: promotion.id,
          product_id,
        })),
      );
    if (linkError) return { error: linkError.message };
  }

  revalidatePromotionPaths();
  return { error: null, success: true };
}

export async function updatePromotion(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parsePromotionForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("promotions")
    .update({
      name: parsed.data.name,
      description: parsed.data.description || null,
      percentage: parsed.data.percentage,
      start_date: parsed.data.start_date,
      end_date: parsed.data.end_date,
      active: parsed.data.active,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  const { error: clearError } = await supabase
    .from("promotion_products")
    .delete()
    .eq("promotion_id", id);
  if (clearError) return { error: clearError.message };

  if (parsed.data.product_ids.length > 0) {
    const { error: linkError } = await supabase
      .from("promotion_products")
      .insert(
        parsed.data.product_ids.map((product_id) => ({
          promotion_id: id,
          product_id,
        })),
      );
    if (linkError) return { error: linkError.message };
  }

  revalidatePromotionPaths();
  return { error: null, success: true };
}

export async function deletePromotion(formData: FormData): Promise<void> {
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const supabase = await createClient();
  await supabase.from("promotions").delete().eq("id", id);

  revalidatePromotionPaths();
}
