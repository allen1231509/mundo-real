import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/features/products/components/product-card";
import { BRAND } from "@/lib/brand";
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
    <section id="destacados" className="bg-[#f7f4ff] py-16 dark:bg-white/[.03]">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Lo más pedido"
          eyebrowColor={BRAND.purple}
          title="Destacados"
          subtitle="Una selección de nuestros productos más populares."
        />

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
