import { FolderTree, Package, PackageX, Tag } from "lucide-react";
import Link from "next/link";

import { getCategories } from "@/services/categories";
import { getAllProductsForAdmin } from "@/services/products";
import { getAllPromotionsForAdmin } from "@/services/promotions";

function isCurrentlyValid(start: string, end: string, active: boolean) {
  const today = new Date().toISOString().slice(0, 10);
  return active && start <= today && end >= today;
}

export default async function AdminDashboardPage() {
  const [products, categories, promotions] = await Promise.all([
    getAllProductsForAdmin(),
    getCategories(),
    getAllPromotionsForAdmin(),
  ]);

  const activeProducts = products.filter((p) => p.active).length;
  const outOfStock = products.filter((p) => p.stock <= 0).length;
  const activePromotions = promotions.filter((p) =>
    isCurrentlyValid(p.start_date, p.end_date, p.active),
  ).length;

  const stats = [
    {
      label: "Productos",
      value: products.length,
      hint: `${activeProducts} activos`,
      icon: Package,
      href: "/admin/productos",
    },
    {
      label: "Sin stock",
      value: outOfStock,
      hint: "productos agotados",
      icon: PackageX,
      href: "/admin/productos",
    },
    {
      label: "Categorías",
      value: categories.length,
      hint: "en el catálogo",
      icon: FolderTree,
      href: "/admin/categorias",
    },
    {
      label: "Promociones vigentes",
      value: activePromotions,
      hint: `${promotions.length} en total`,
      icon: Tag,
      href: "/admin/promociones",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Resumen de tu tienda.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, hint, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="space-y-2 rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon className="size-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{hint}</p>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="rounded-2xl border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            Aún no tienes productos. Empieza agregando el primero.
          </p>
          <Link
            href="/admin/productos/nuevo"
            className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
          >
            Crear producto →
          </Link>
        </div>
      )}
    </div>
  );
}
