"use client";

import { Pencil, Plus } from "lucide-react";
import { useState } from "react";

import { deleteCategory } from "@/actions/categories";
import { IconPreview } from "@/features/admin/components/icon-preview";
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
import { CategoryForm } from "@/features/admin/components/category-form";
import { DeleteButton } from "@/features/admin/components/delete-button";
import type { Category } from "@/types";

function CategoryDialogButton({
  category,
  trigger,
}: {
  category?: Category;
  trigger: React.ReactElement;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-md">
        <CategoryForm category={category} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export function CategoryTable({ categories }: { categories: Category[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CategoryDialogButton
          trigger={
            <Button type="button">
              <Plus className="size-4" />
              Nueva categoría
            </Button>
          }
        />
      </div>

      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoría</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Orden</TableHead>
              <TableHead className="w-24 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Aún no hay categorías.
                </TableCell>
              </TableRow>
            )}
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex size-8 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${category.color}1a`,
                        color: category.color,
                      }}
                    >
                      <IconPreview icon={category.icon} className="size-4" />
                    </div>
                    {category.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {category.slug}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {category.sort_order}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <CategoryDialogButton
                      category={category}
                      trigger={
                        <Button type="button" variant="ghost" size="icon-sm">
                          <Pencil className="size-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                      }
                    />
                    <DeleteButton
                      action={deleteCategory}
                      id={category.id}
                      itemLabel={`la categoría "${category.name}"`}
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
