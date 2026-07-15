import type { PromotionWithProductIds } from "@/services/promotions";
import type { Promotion } from "@/types";

export function getDiscountedPrice(price: number, percentage: number): number {
  return Math.round(price * (1 - percentage / 100) * 100) / 100;
}

/** Mapa producto -> mejor promoción activa aplicable (mayor porcentaje). */
export function buildPromotionMap(
  promotions: PromotionWithProductIds[],
): Map<string, Promotion> {
  const map = new Map<string, Promotion>();

  for (const { promotion_products, ...promotion } of promotions) {
    for (const { product_id } of promotion_products) {
      const current = map.get(product_id);
      if (!current || promotion.percentage > current.percentage) {
        map.set(product_id, promotion);
      }
    }
  }

  return map;
}
