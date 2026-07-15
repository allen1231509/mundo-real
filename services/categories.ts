import { cache } from "react";

import { createPublicClient } from "@/lib/supabase/public";
import type { Category } from "@/types";

// Lectura 100% pública (RLS: public_read_categories using (true)).
export const getCategories = cache(async (): Promise<Category[]> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
});
