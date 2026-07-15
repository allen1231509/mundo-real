import type { Metadata } from "next";

import { CategoryTable } from "@/features/admin/components/category-table";
import { getCategories } from "@/services/categories";

export const metadata: Metadata = { title: "Categorías" };

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Categorías</h1>
        <p className="text-muted-foreground">
          Administra las categorías del catálogo.
        </p>
      </div>

      <CategoryTable categories={categories} />
    </div>
  );
}
