import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

const PRODUCTS_BUCKET = "products";

/** Recibe el cliente de Supabase del caller (server o browser) por inyección de dependencia. */
export function getProductImagePublicUrl(
  supabase: SupabaseClient<Database>,
  path: string,
) {
  return supabase.storage.from(PRODUCTS_BUCKET).getPublicUrl(path).data
    .publicUrl;
}

export async function uploadProductImage(
  supabase: SupabaseClient<Database>,
  file: File,
  path: string,
) {
  const { error } = await supabase.storage
    .from(PRODUCTS_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  return getProductImagePublicUrl(supabase, path);
}

export async function deleteProductImage(
  supabase: SupabaseClient<Database>,
  path: string,
) {
  const { error } = await supabase.storage
    .from(PRODUCTS_BUCKET)
    .remove([path]);

  if (error) throw error;
}
