import { MessageCircle, Palette } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { BusinessSettings } from "@/types";

export function Hero({ settings }: { settings: BusinessSettings }) {
  const title =
    settings.hero_title ?? "Todo para tus proyectos creativos, en Tarapoto";
  const subtitle =
    settings.hero_subtitle ??
    "Arte, pintura, manualidades, telas y útiles escolares en un solo lugar. Calidad y variedad para cada proyecto.";
  const whatsappUrl = settings.whatsapp
    ? buildWhatsAppUrl(
        settings.whatsapp,
        `Hola, quisiera más información sobre los productos de ${settings.name}.`,
      )
    : null;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/20" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">{subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#categorias" />}
            >
              Explorar catálogo
            </Button>
            {whatsappUrl && (
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <MessageCircle className="size-4" />
                Escríbenos
              </Button>
            )}
          </div>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-primary/5 ring-1 ring-border">
          {settings.hero_banner ? (
            <Image
              src={settings.hero_banner}
              alt={settings.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-primary/40">
              <Palette className="size-16" />
              <span className="text-sm font-medium">
                Imagen próximamente
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
