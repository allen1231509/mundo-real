"use server";

import {
  searchProducts,
  type ProductSearchParams,
  type ProductSearchResult,
} from "@/services/products";

/** Trae la siguiente página del catálogo para el botón "Cargar más". */
export async function loadMoreProducts(
  params: ProductSearchParams,
): Promise<ProductSearchResult> {
  return searchProducts(params);
}
