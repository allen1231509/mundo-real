"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <AlertTriangle className="size-12 text-destructive" />
      <h1 className="text-3xl font-bold tracking-tight">Algo salió mal</h1>
      <p className="max-w-md text-muted-foreground">
        Ocurrió un error inesperado. Intenta de nuevo en unos momentos.
      </p>
      <Button type="button" onClick={reset}>
        Reintentar
      </Button>
    </div>
  );
}
