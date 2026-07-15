import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { Promotion } from "@/types";

/** Promociones vigentes hoy (activas y dentro de su rango de fechas). */
export const getActivePromotions = cache(async (): Promise<Promotion[]> => {
  const supabase = createPublicClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("active", true)
    .lte("start_date", today)
    .gte("end_date", today)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
});

export type PromotionWithProductIds = Promotion & {
  promotion_products: { product_id: string }[];
};

/** Promociones vigentes hoy, con los ids de los productos a los que aplican. */
export const getActivePromotionsWithProducts = cache(
  async (): Promise<PromotionWithProductIds[]> => {
    const supabase = createPublicClient();
    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("promotions")
      .select("*, promotion_products(product_id)")
      .eq("active", true)
      .lte("start_date", today)
      .gte("end_date", today);

    if (error) throw error;
    return data as PromotionWithProductIds[];
  },
);

/** Todas las promociones (activas, inactivas, vencidas), para el panel admin. */
export const getAllPromotionsForAdmin = cache(
  async (): Promise<PromotionWithProductIds[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("promotions")
      .select("*, promotion_products(product_id)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as PromotionWithProductIds[];
  },
);

export const getPromotionById = cache(
  async (id: string): Promise<PromotionWithProductIds | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("promotions")
      .select("*, promotion_products(product_id)")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data as PromotionWithProductIds | null;
  },
);
