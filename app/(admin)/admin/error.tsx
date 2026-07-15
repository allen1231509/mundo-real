"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-20 text-center">
      <AlertTriangle className="size-10 text-destructive" />
      <h2 className="text-xl font-semibold">Algo salió mal</h2>
      <p className="max-w-md text-muted-foreground">
        No se pudo completar la operación. Intenta de nuevo.
      </p>
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={reset}>
          Reintentar
        </Button>
        <Button type="button" nativeButton={false} render={<Link href="/admin" />}>
          Ir al dashboard
        </Button>
      </div>
    </div>
  );
}
