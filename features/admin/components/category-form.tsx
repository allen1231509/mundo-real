"use client";

import { useActionState, useEffect, useState } from "react";

import { createCategory, updateCategory, type ActionState } from "@/actions/categories";
import { IconPreview } from "@/features/admin/components/icon-preview";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/features/admin/components/submit-button";
import { slugify } from "@/lib/slug";
import type { Category } from "@/types";

const initialState: ActionState = { error: null };

export function CategoryForm({
  category,
  onSuccess,
}: {
  category?: Category;
  onSuccess: () => void;
}) {
  const action = category
    ? updateCategory.bind(null, category.id)
    : createCategory;
  const [state, formAction] = useActionState(action, initialState);

  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(category));
  const [icon, setIcon] = useState(category?.icon ?? "");
  const [color, setColor] = useState(category?.color ?? "#6366f1");

  useEffect(() => {
    if (state.success) onSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-4">
      <DialogHeader>
        <DialogTitle>
          {category ? "Editar categoría" : "Nueva categoría"}
        </DialogTitle>
      </DialogHeader>

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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Ícono (Lucide)</Label>
          <div className="flex items-center gap-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border">
              <IconPreview icon={icon} className="size-4" />
            </div>
            <Input
              id="icon"
              name="icon"
              placeholder="palette"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              aria-label="Color de la categoría"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="size-9 shrink-0 cursor-pointer rounded-lg border"
            />
            <Input
              id="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort_order">Orden</Label>
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={category?.sort_order ?? 0}
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <DialogFooter>
        <DialogClose
          render={
            <button type="button" className="text-sm text-muted-foreground" />
          }
        >
          Cancelar
        </DialogClose>
        <SubmitButton>
          {category ? "Guardar cambios" : "Crear categoría"}
        </SubmitButton>
      </DialogFooter>
    </form>
  );
}
