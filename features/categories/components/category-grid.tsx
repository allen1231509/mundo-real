import { SectionHeading } from "@/components/shared/section-heading";
import { getCategories } from "@/services/categories";

import { CategoryGridClient } from "./category-grid-client";

export async function CategoryGrid() {
  const categories = await getCategories();

  if (categories.length === 0) return null;

  return (
    <section id="categorias" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Explora"
        title="Categorías"
        subtitle="Encuentra justo lo que necesitas para tu próximo proyecto."
      />

      <CategoryGridClient categories={categories} />
    </section>
  );
}
