"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS, type SortOption } from "@/lib/validations/catalog";
import type { Category } from "@/types";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Novedades",
  price_asc: "Precio: menor a mayor",
  price_desc: "Precio: mayor a menor",
  name_asc: "Nombre (A-Z)",
};

const ALL_VALUE = "__all__";

export function CatalogFilters({
  categories,
  brands,
}: {
  categories: Category[];
  brands: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    // Cualquier cambio de filtro reinicia la paginación.
    params.delete("pagina");
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (query !== (searchParams.get("q") ?? "")) {
        updateParams({ q: query || null });
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const hasActiveFilters = Array.from(searchParams.keys()).some((key) =>
    ["q", "categoria", "marca", "precioMin", "precioMax"].includes(key),
  );

  const categoryLabels: Record<string, string> = Object.fromEntries(
    categories.map((c) => [c.slug, c.name]),
  );
  const brandLabels: Record<string, string> = Object.fromEntries(
    brands.map((b) => [b, b]),
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select
          value={searchParams.get("categoria") ?? ALL_VALUE}
          onValueChange={(value) =>
            updateParams({
              categoria: value === ALL_VALUE ? null : String(value),
            })
          }
        >
          <SelectTrigger className="w-44" aria-label="Filtrar por categoría">
            <SelectValue placeholder="Categoría">
              {(value: string) =>
                !value || value === ALL_VALUE
                  ? "Todas las categorías"
                  : (categoryLabels[value] ?? value)
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {brands.length > 0 && (
          <Select
            value={searchParams.get("marca") ?? ALL_VALUE}
            onValueChange={(value) =>
              updateParams({
                marca: value === ALL_VALUE ? null : String(value),
              })
            }
          >
            <SelectTrigger className="w-40" aria-label="Filtrar por marca">
              <SelectValue placeholder="Marca">
                {(value: string) =>
                  !value || value === ALL_VALUE
                    ? "Todas las marcas"
                    : (brandLabels[value] ?? value)
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Todas las marcas</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Input
          type="number"
          inputMode="decimal"
          min={0}
          placeholder="Precio mín."
          defaultValue={searchParams.get("precioMin") ?? ""}
          onBlur={(e) => updateParams({ precioMin: e.target.value || null })}
          className="w-32"
        />
        <Input
          type="number"
          inputMode="decimal"
          min={0}
          placeholder="Precio máx."
          defaultValue={searchParams.get("precioMax") ?? ""}
          onBlur={(e) => updateParams({ precioMax: e.target.value || null })}
          className="w-32"
        />

        <Select
          value={searchParams.get("orden") ?? "newest"}
          onValueChange={(value) => updateParams({ orden: String(value) })}
        >
          <SelectTrigger className="w-52" aria-label="Ordenar productos por">
            <SelectValue placeholder="Ordenar por">
              {(value: SortOption) => SORT_LABELS[value] ?? value}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {SORT_LABELS[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              router.push(pathname);
            }}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
