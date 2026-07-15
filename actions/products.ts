"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { uploadProductImage } from "@/lib/supabase/storage";
import { productSchema } from "@/lib/validations/product";

export type ActionState = { error: string | null; success?: boolean };

export async function uploadProductImageAction(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Archivo inválido" };
  }

  const supabase = await createClient();
  const extension = file.name.split(".").pop() || "jpg";
  const path = `products/${crypto.randomUUID()}.${extension}`;

  try {
    const url = await uploadProductImage(supabase, file, path);
    return { url };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Error al subir la imagen",
    };
  }
}

function parseProductForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    brand: formData.get("brand"),
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
  });
}

function getImagesFromForm(formData: FormData): {
  main_image: string | null;
  images: string[];
} {
  const images = formData.getAll("images").filter((v): v is string => typeof v === "string" && v.length > 0);
  return { main_image: images[0] ?? null, images: images.slice(1) };
}

function revalidateProductPaths(slug?: string) {
  revalidatePath("/admin/productos");
  revalidatePath("/", "layout");
  revalidatePath("/catalogo");
  if (slug) revalidatePath(`/producto/${slug}`);
}

export async function createProduct(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const { main_image, images } = getImagesFromForm(formData);
  const supabase = await createClient();

  const { error } = await supabase.from("products").insert({
    name: parsed.data.name,
    slug: parsed.data.slug,
    description: parsed.data.description || null,
    category_id: parsed.data.category_id || null,
    price: parsed.data.price,
    stock: parsed.data.stock,
    brand: parsed.data.brand || null,
    featured: parsed.data.featured,
    active: parsed.data.active,
    main_image,
    images,
  });

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "Ya existe un producto con ese slug"
          : error.message,
    };
  }

  revalidateProductPaths(parsed.data.slug);
  return { error: null, success: true };
}

export async function updateProduct(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const { main_image, images } = getImagesFromForm(formData);
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description || null,
      category_id: parsed.data.category_id || null,
      price: parsed.data.price,
      stock: parsed.data.stock,
      brand: parsed.data.brand || null,
      featured: parsed.data.featured,
      active: parsed.data.active,
      main_image,
      images,
    })
    .eq("id", id);

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "Ya existe un producto con ese slug"
          : error.message,
    };
  }

  revalidateProductPaths(parsed.data.slug);
  return { error: null, success: true };
}

export async function deleteProduct(formData: FormData): Promise<void> {
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);

  revalidateProductPaths();
}

export async function toggleProductField(
  id: string,
  field: "active" | "featured",
  value: boolean,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const update = field === "active" ? { active: value } : { featured: value };
  const { error } = await supabase.from("products").update(update).eq("id", id);

  if (error) return { error: error.message };

  revalidateProductPaths();
  return { error: null };
}
