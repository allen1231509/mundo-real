"use client";

import { useActionState, useEffect } from "react";

import {
  createPromotion,
  updatePromotion,
  type ActionState,
} from "@/actions/promotions";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ProductPicker } from "@/features/admin/components/product-picker";
import { SubmitButton } from "@/features/admin/components/submit-button";
import type { PromotionWithProductIds } from "@/services/promotions";
import type { Product } from "@/types";

const initialState: ActionState = { error: null };

export function PromotionForm({
  promotion,
  products,
  onSuccess,
}: {
  promotion?: PromotionWithProductIds;
  products: Product[];
  onSuccess: () => void;
}) {
  const action = promotion
    ? updatePromotion.bind(null, promotion.id)
    : createPromotion;
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) onSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-4">
      <DialogHeader>
        <DialogTitle>
          {promotion ? "Editar promoción" : "Nueva promoción"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" defaultValue={promotion?.name} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={promotion?.description ?? ""}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="percentage">Descuento %</Label>
          <Input
            id="percentage"
            name="percentage"
            type="number"
            min={1}
            max={100}
            step="0.01"
            defaultValue={promotion?.percentage}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="start_date">Desde</Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            defaultValue={promotion?.start_date}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_date">Hasta</Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            defaultValue={promotion?.end_date}
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="active"
          name="active"
          defaultChecked={promotion?.active ?? true}
        />
        <Label htmlFor="active">Activa</Label>
      </div>

      <div className="space-y-2">
        <Label>Productos incluidos</Label>
        <ProductPicker
          products={products}
          name="product_ids"
          defaultSelectedIds={promotion?.promotion_products.map(
            (p) => p.product_id,
          )}
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
          {promotion ? "Guardar cambios" : "Crear promoción"}
        </SubmitButton>
      </DialogFooter>
    </form>
  );
}
