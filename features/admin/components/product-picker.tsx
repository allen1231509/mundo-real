"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import type { Product } from "@/types";

export function ProductPicker({
  products,
  name,
  defaultSelectedIds,
}: {
  products: Product[];
  name: string;
  defaultSelectedIds?: string[];
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(defaultSelectedIds ?? []),
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="pl-9"
        />
      </div>

      <div className="max-h-56 space-y-1 overflow-y-auto rounded-lg border p-2">
        {products.length === 0 && (
          <p className="p-2 text-sm text-muted-foreground">
            Todavía no hay productos creados.
          </p>
        )}
        {products.length > 0 && filtered.length === 0 && (
          <p className="p-2 text-sm text-muted-foreground">
            No hay productos que coincidan.
          </p>
        )}
        {filtered.map((product) => (
          <label
            key={product.id}
            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <input
              type="checkbox"
              name={name}
              value={product.id}
              checked={selected.has(product.id)}
              onChange={() => toggle(product.id)}
              className="size-4 rounded border-input"
            />
            {product.name}
          </label>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {selected.size} producto{selected.size === 1 ? "" : "s"} seleccionado
        {selected.size === 1 ? "" : "s"}
      </p>
    </div>
  );
}
