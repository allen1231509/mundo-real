import type { Metadata } from "next";

import { CatalogFilters } from "@/features/products/components/catalog-filters";
import { ProductGrid } from "@/features/products/components/product-grid";
import { buildPromotionMap } from "@/lib/pricing";
import { catalogSearchParamsSchema } from "@/lib/validations/catalog";
import { getCategories } from "@/services/categories";
import {
  getProductBrands,
  searchProducts,
  type ProductSearchParams,
} from "@/services/products";
import { getActivePromotionsWithProducts } from "@/services/promotions";

const CATALOG_DESCRIPTION =
  "Explora todos nuestros materiales de arte y manualidades.";

export const metadata: Metadata = {
  title: "Catálogo",
  description: CATALOG_DESCRIPTION,
  openGraph: {
    title: "Catálogo",
    description: CATALOG_DESCRIPTION,
    type: "website",
  },
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

interface CatalogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogPage({
  searchParams,
}: CatalogPageProps) {
  const raw = await searchParams;
  const parsed = catalogSearchParamsSchema.parse({
    q: firstValue(raw.q),
    categoria: firstValue(raw.categoria),
    marca: firstValue(raw.marca),
    precioMin: firstValue(raw.precioMin),
    precioMax: firstValue(raw.precioMax),
    orden: firstValue(raw.orden),
    pagina: firstValue(raw.pagina),
  });

  const searchFilters: ProductSearchParams = {
    query: parsed.q,
    categorySlug: parsed.categoria,
    brand: parsed.marca,
    minPrice: parsed.precioMin,
    maxPrice: parsed.precioMax,
    sort: parsed.orden,
    page: parsed.pagina,
  };

  const [{ products, hasMore }, categories, brands, promotions] =
    await Promise.all([
      searchProducts(searchFilters),
      getCategories(),
      getProductBrands(),
      getActivePromotionsWithProducts(),
    ]);

  const promotionMap = Object.fromEntries(buildPromotionMap(promotions));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Catálogo</h1>
        <p className="text-muted-foreground">
          Encuentra materiales de arte, manualidades y mucho más.
        </p>
      </div>

      <div className="mb-8">
        <CatalogFilters categories={categories} brands={brands} />
      </div>

      <h2 className="sr-only">Resultados</h2>
      <ProductGrid
        initialProducts={products}
        initialHasMore={hasMore}
        filters={searchFilters}
        promotionMap={promotionMap}
        categories={categories}
      />
    </div>
  );
}
