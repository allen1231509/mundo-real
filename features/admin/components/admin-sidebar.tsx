"use client";

import {
  FolderTree,
  LayoutDashboard,
  Package,
  Settings,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/categorias", label: "Categorías", icon: FolderTree },
  { href: "/admin/promociones", label: "Promociones", icon: Tag },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export function AdminSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex gap-1 md:flex-col", className)}>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/admin" ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
