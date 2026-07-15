"use client";

import { ImageOff, Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { deleteProduct, toggleProductField } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteButton } from "@/features/admin/components/delete-button";
import { formatPrice } from "@/lib/format";
import type { ProductWithCategory } from "@/types";

function ProductToggle({
  productId,
  field,
  defaultChecked,
}: {
  productId: string;
  field: "active" | "featured";
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const [isPending, startTransition] = useTransition();

  return (
    <Switch
      checked={checked}
      disabled={isPending}
      onCheckedChange={(value) => {
        setChecked(value);
        startTransition(async () => {
          const result = await toggleProductField(productId, field, value);
          if (result.error) setChecked(!value);
        });
      }}
    />
  );
}

export function ProductTable({
  products,
  initialQuery,
}: {
  products: ProductWithCategory[];
  initialQuery: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (query !== initialQuery) {
        router.push(query ? `${pathname}?q=${encodeURIComponent(query)}` : pathname);
      }
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-64"
        />
        <Button
          type="button"
          nativeButton={false}
          render={<Link href="/admin/productos/nuevo" />}
        >
          <Plus className="size-4" />
          Nuevo producto
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Destacado</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead className="w-24 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  {query
                    ? "No se encontraron productos."
                    : "Aún no hay productos. Crea el primero."}
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                      {product.main_image ? (
                        <Image
                          src={product.main_image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground/40">
                          <ImageOff className="size-4" />
                        </div>
                      )}
                    </div>
                    <span className="line-clamp-1 font-medium">
                      {product.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {product.category?.name ?? "—"}
                </TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {product.stock}
                </TableCell>
                <TableCell>
                  <ProductToggle
                    productId={product.id}
                    field="featured"
                    defaultChecked={product.featured}
                  />
                </TableCell>
                <TableCell>
                  <ProductToggle
                    productId={product.id}
                    field="active"
                    defaultChecked={product.active}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      nativeButton={false}
                      render={<Link href={`/admin/productos/${product.id}`} />}
                    >
                      <Pencil className="size-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <DeleteButton
                      action={deleteProduct}
                      id={product.id}
                      itemLabel={`"${product.name}"`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
