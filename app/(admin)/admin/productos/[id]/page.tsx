import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductForm } from "@/features/admin/components/product-form";
import { getCategories } from "@/services/categories";
import { getProductById } from "@/services/products";

export const metadata: Metadata = { title: "Editar producto" };

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Editar producto
        </h1>
        <p className="text-muted-foreground">{product.name}</p>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
