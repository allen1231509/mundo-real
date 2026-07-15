import { ProductCard } from "@/features/products/components/product-card";
import { buildPromotionMap } from "@/lib/pricing";
import { getFeaturedProducts } from "@/services/products";
import { getActivePromotionsWithProducts } from "@/services/promotions";

export async function FeaturedProducts() {
  const [products, promotions] = await Promise.all([
    getFeaturedProducts(),
    getActivePromotionsWithProducts(),
  ]);

  if (products.length === 0) return null;

  const promotionMap = buildPromotionMap(promotions);

  return (
    <section id="destacados" className="bg-muted/30 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 space-y-1">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Destacados
          </h2>
          <p className="text-muted-foreground">
            Una selección de nuestros productos más populares.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              activePromotion={promotionMap.get(product.id) ?? null}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
