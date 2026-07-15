import type { Metadata } from "next";

import { PromotionTable } from "@/features/admin/components/promotion-table";
import { getAllProductsForAdmin } from "@/services/products";
import { getAllPromotionsForAdmin } from "@/services/promotions";

export const metadata: Metadata = { title: "Promociones" };

export default async function AdminPromotionsPage() {
  const [promotions, products] = await Promise.all([
    getAllPromotionsForAdmin(),
    getAllProductsForAdmin(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Promociones</h1>
        <p className="text-muted-foreground">
          Crea descuentos por tiempo limitado y asígnalos a productos.
        </p>
      </div>

      <PromotionTable promotions={promotions} products={products} />
    </div>
  );
}
