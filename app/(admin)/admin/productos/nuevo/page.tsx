import type { Metadata } from "next";

import { ProductForm } from "@/features/admin/components/product-form";
import { getCategories } from "@/services/categories";

export const metadata: Metadata = { title: "Nuevo producto" };

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nuevo producto</h1>
        <p className="text-muted-foreground">
          Completa la información y sube al menos una imagen.
        </p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
