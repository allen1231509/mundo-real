import type { Database } from "@/types/database";

export type { Database, Json } from "@/types/database";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];
export type CategoryUpdate = Database["public"]["Tables"]["categories"]["Update"];

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export type Promotion = Database["public"]["Tables"]["promotions"]["Row"];
export type PromotionInsert = Database["public"]["Tables"]["promotions"]["Insert"];
export type PromotionUpdate = Database["public"]["Tables"]["promotions"]["Update"];

export type PromotionProduct =
  Database["public"]["Tables"]["promotion_products"]["Row"];

export type BusinessSettings =
  Database["public"]["Tables"]["business_settings"]["Row"];
export type BusinessSettingsUpdate =
  Database["public"]["Tables"]["business_settings"]["Update"];

/** Producto con su categoría embebida, tal como se consulta en el catálogo. */
export type ProductWithCategory = Product & {
  category: Category | null;
};

/** Producto con la promoción activa aplicada, para calcular precio con descuento. */
export type ProductWithPromotion = ProductWithCategory & {
  activePromotion: Promotion | null;
};
