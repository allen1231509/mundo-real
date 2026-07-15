"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { categorySchema } from "@/lib/validations/category";

export type ActionState = { error: string | null; success?: boolean };

function parseCategoryForm(formData: FormData) {
  return categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    icon: formData.get("icon"),
    color: formData.get("color"),
    sort_order: formData.get("sort_order"),
  });
}

function revalidateCategoryPaths() {
  revalidatePath("/admin/categorias");
  revalidatePath("/", "layout");
}

export async function createCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseCategoryForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("categories").insert({
    name: parsed.data.name,
    slug: parsed.data.slug,
    icon: parsed.data.icon || null,
    color: parsed.data.color,
    sort_order: parsed.data.sort_order,
  });

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "Ya existe una categoría con ese slug"
          : error.message,
    };
  }

  revalidateCategoryPaths();
  return { error: null, success: true };
}

export async function updateCategory(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseCategoryForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .update({
      name: parsed.data.name,
      slug: parsed.data.slug,
      icon: parsed.data.icon || null,
      color: parsed.data.color,
      sort_order: parsed.data.sort_order,
    })
    .eq("id", id);

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "Ya existe una categoría con ese slug"
          : error.message,
    };
  }

  revalidateCategoryPaths();
  return { error: null, success: true };
}

export async function deleteCategory(formData: FormData): Promise<void> {
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const supabase = await createClient();
  await supabase.from("categories").delete().eq("id", id);

  revalidateCategoryPaths();
}
