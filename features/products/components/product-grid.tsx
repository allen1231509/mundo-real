"use client";

import { Loader2, SearchX } from "lucide-react";
import { useState, useTransition } from "react";

import { loadMoreProducts } from "@/actions/catalog";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/features/products/components/product-card";
import type { ProductSearchParams } from "@/services/products";
import type { Category, Product, Promotion } from "@/types";

export function ProductGrid({
  initialProducts,
  initialHasMore,
  filters,
  promotionMap,
  categories,
}: {
  initialProducts: Product[];
  initialHasMore: boolean;
  filters: ProductSearchParams;
  promotionMap: Record<string, Promotion>;
  categories: Category[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(filters.page ?? 1);
  const [isPending, startTransition] = useTransition();

  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  function handleLoadMore() {
    const nextPage = page + 1;
    startTransition(async () => {
      const result = await loadMoreProducts({ ...filters, page: nextPage });
      setProducts((prev) => [...prev, ...result.products]);
      setHasMore(result.hasMore);
      setPage(nextPage);
    });
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center text-muted-foreground">
        <SearchX className="size-10" />
        <p>No encontramos productos que coincidan con tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              category: categoryMap.get(product.category_id ?? "") ?? null,
            }}
            activePromotion={promotionMap[product.id] ?? null}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isPending}
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Cargar más
          </Button>
        </div>
      )}
    </div>
  );
}
