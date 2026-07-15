import type { Metadata } from "next";

import { ProductTable } from "@/features/admin/components/product-table";
import { getAllProductsForAdmin } from "@/services/products";

export const metadata: Metadata = { title: "Productos" };

interface AdminProductsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const { q } = await searchParams;
  const products = await getAllProductsForAdmin(q);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Productos</h1>
        <p className="text-muted-foreground">
          Administra el catálogo: precios, stock, imágenes y visibilidad.
        </p>
      </div>

      <ProductTable products={products} initialQuery={q ?? ""} />
    </div>
  );
}
