"use client";

import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  action,
  id,
  itemLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  itemLabel: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          />
        }
      >
        <Trash2 className="size-4" />
        <span className="sr-only">Eliminar</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar {itemLabel}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <form action={action}>
            <input type="hidden" name="id" value={id} />
            <AlertDialogAction
              type="submit"
              nativeButton={true}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
