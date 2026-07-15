"use client";

import { Pencil, Plus } from "lucide-react";
import { useState } from "react";

import { deletePromotion } from "@/actions/promotions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteButton } from "@/features/admin/components/delete-button";
import { PromotionForm } from "@/features/admin/components/promotion-form";
import type { PromotionWithProductIds } from "@/services/promotions";
import type { Product } from "@/types";

function isCurrentlyValid(promotion: PromotionWithProductIds): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return (
    promotion.active &&
    promotion.start_date <= today &&
    promotion.end_date >= today
  );
}

function PromotionDialogButton({
  promotion,
  products,
  trigger,
}: {
  promotion?: PromotionWithProductIds;
  products: Product[];
  trigger: React.ReactElement;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-lg">
        <PromotionForm
          promotion={promotion}
          products={products}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export function PromotionTable({
  promotions,
  products,
}: {
  promotions: PromotionWithProductIds[];
  products: Product[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <PromotionDialogButton
          products={products}
          trigger={
            <Button type="button">
              <Plus className="size-4" />
              Nueva promoción
            </Button>
          }
        />
      </div>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Promoción</TableHead>
              <TableHead>Descuento</TableHead>
              <TableHead>Vigencia</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-24 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Aún no hay promociones.
                </TableCell>
              </TableRow>
            )}
            {promotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell className="font-medium">{promotion.name}</TableCell>
                <TableCell>-{promotion.percentage}%</TableCell>
                <TableCell className="text-muted-foreground">
                  {promotion.start_date} — {promotion.end_date}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {promotion.promotion_products.length}
                </TableCell>
                <TableCell>
                  {isCurrentlyValid(promotion) ? (
                    <Badge>Vigente</Badge>
                  ) : promotion.active ? (
                    <Badge variant="outline">Fuera de rango</Badge>
                  ) : (
                    <Badge variant="secondary">Inactiva</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <PromotionDialogButton
                      promotion={promotion}
                      products={products}
                      trigger={
                        <Button type="button" variant="ghost" size="icon-sm">
                          <Pencil className="size-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                      }
                    />
                    <DeleteButton
                      action={deletePromotion}
                      id={promotion.id}
                      itemLabel={`la promoción "${promotion.name}"`}
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
