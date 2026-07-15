import { Compass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Compass className="size-12 text-muted-foreground" />
      <h1 className="text-3xl font-bold tracking-tight">Página no encontrada</h1>
      <p className="max-w-md text-muted-foreground">
        Puede que el enlace esté roto o que la página se haya movido.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        Volver al inicio
      </Button>
    </div>
  );
}
