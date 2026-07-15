import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { SortOption } from "@/lib/validations/catalog";
import type { Product, ProductWithCategory } from "@/types";

export const getFeaturedProducts = cache(
  async (limit = 8): Promise<ProductWithCategory[]> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("active", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as ProductWithCategory[];
  },
);

export const getProductBySlug = cache(
  async (slug: string): Promise<ProductWithCategory | null> => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("slug", slug)
      .eq("active", true)
      .maybeSingle();

    if (error) throw error;
    return data as ProductWithCategory | null;
  },
);

export async function getRelatedProducts(
  categoryId: string | null,
  excludeProductId: string,
  limit = 4,
): Promise<ProductWithCategory[]> {
  if (!categoryId) return [];

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("active", true)
    .eq("category_id", categoryId)
    .neq("id", excludeProductId)
    .limit(limit);

  if (error) throw error;
  return data as ProductWithCategory[];
}

export const getProductBrands = cache(async (): Promise<string[]> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase.rpc("get_product_brands");

  if (error) throw error;
  return data
    .map((row: { brand: string | null }) => row.brand)
    .filter((brand: string | null): brand is string => Boolean(brand));
});

const PAGE_SIZE = 12;

export interface ProductSearchParams {
  query?: string;
  categorySlug?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  page?: number;
}

export interface ProductSearchResult {
  products: Product[];
  hasMore: boolean;
}

/** Búsqueda full-text + filtros + orden + paginación, vía la función search_products. */
export async function searchProducts(
  params: ProductSearchParams,
): Promise<ProductSearchResult> {
  const supabase = createPublicClient();
  const page = params.page ?? 1;
  const offset = (page - 1) * PAGE_SIZE;

  const { data, error } = await supabase.rpc("search_products", {
    search_query: params.query || null,
    category_slug: params.categorySlug || null,
    brand_filter: params.brand || null,
    min_price: params.minPrice ?? null,
    max_price: params.maxPrice ?? null,
    sort_by: params.sort ?? "newest",
    // Se pide uno de más para saber si hay una página siguiente sin un
    // segundo query de conteo.
    page_limit: PAGE_SIZE + 1,
    page_offset: offset,
  });

  if (error) throw error;

  const hasMore = data.length > PAGE_SIZE;
  return { products: hasMore ? data.slice(0, PAGE_SIZE) : data, hasMore };
}

/** Todos los productos (activos e inactivos), para el panel admin. */
export const getAllProductsForAdmin = cache(
  async (query?: string): Promise<ProductWithCategory[]> => {
    const supabase = await createClient();
    let request = supabase
      .from("products")
      .select("*, category:categories(*)")
      .order("created_at", { ascending: false });

    if (query) {
      request = request.ilike("name", `%${query}%`);
    }

    const { data, error } = await request;
    if (error) throw error;
    return data as ProductWithCategory[];
  },
);

export const getProductById = cache(
  async (id: string): Promise<ProductWithCategory | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data as ProductWithCategory | null;
  },
);
