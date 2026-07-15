"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { createProduct, updateProduct, type ActionState } from "@/actions/products";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImageGalleryUploader } from "@/features/admin/components/image-gallery-uploader";
import { SubmitButton } from "@/features/admin/components/submit-button";
import { slugify } from "@/lib/slug";
import type { Category, ProductWithCategory } from "@/types";

const initialState: ActionState = { error: null };
const NONE_VALUE = "__none__";

export function ProductForm({
  product,
  categories,
}: {
  product?: ProductWithCategory;
  categories: Category[];
}) {
  const router = useRouter();
  const action = product
    ? updateProduct.bind(null, product.id)
    : createProduct;
  const [state, formAction] = useActionState(action, initialState);

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [categoryId, setCategoryId] = useState(
    product?.category_id ?? NONE_VALUE,
  );

  useEffect(() => {
    if (state.success) router.push("/admin/productos");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  const categoryLabels: Record<string, string> = Object.fromEntries(
    categories.map((c) => [c.id, c.name]),
  );

  const initialImages = product
    ? [product.main_image, ...product.images].filter(
        (src): src is string => Boolean(src),
      )
    : [];

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label>Imágenes</Label>
        <ImageGalleryUploader name="images" initialImages={initialImages} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            required
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">Precio (S/)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step="0.01"
            defaultValue={product?.price ?? 0}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min={0}
            defaultValue={product?.stock ?? 0}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Marca</Label>
          <Input id="brand" name="brand" defaultValue={product?.brand ?? ""} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category_id">Categoría</Label>
        <input
          type="hidden"
          name="category_id"
          value={categoryId === NONE_VALUE ? "" : categoryId}
        />
        <Select value={categoryId} onValueChange={(v) => setCategoryId(String(v))}>
          <SelectTrigger
            id="category_id"
            className="w-full sm:w-64"
            aria-label="Categoría del producto"
          >
            <SelectValue placeholder="Sin categoría">
              {(value: string) =>
                value === NONE_VALUE
                  ? "Sin categoría"
                  : (categoryLabels[value] ?? "Sin categoría")
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE_VALUE}>Sin categoría</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Switch id="featured" name="featured" defaultChecked={product?.featured} />
          <Label htmlFor="featured">Destacado</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="active"
            name="active"
            defaultChecked={product?.active ?? true}
          />
          <Label htmlFor="active">Activo (visible en la tienda)</Label>
        </div>
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <SubmitButton>
        {product ? "Guardar cambios" : "Crear producto"}
      </SubmitButton>
    </form>
  );
}
