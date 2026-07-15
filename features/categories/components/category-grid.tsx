import Link from "next/link";

import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { getCategories } from "@/services/categories";

export async function CategoryGrid() {
  const categories = await getCategories();

  if (categories.length === 0) return null;

  return (
    <section id="categorias" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Categorías
        </h2>
        <p className="text-muted-foreground">
          Encuentra justo lo que necesitas para tu próximo proyecto.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/catalogo?categoria=${category.slug}`}
            className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              className="flex size-12 items-center justify-center rounded-full"
              style={{
                backgroundColor: `${category.color}1a`,
                color: category.color,
              }}
            >
              <DynamicIcon icon={category.icon} className="size-6" />
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
