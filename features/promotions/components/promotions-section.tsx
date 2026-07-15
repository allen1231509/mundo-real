import { MessageCircle, Tag } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getActivePromotions } from "@/services/promotions";
import { getBusinessSettings } from "@/services/settings";

export async function PromotionsSection() {
  const [promotions, settings] = await Promise.all([
    getActivePromotions(),
    getBusinessSettings(),
  ]);

  if (promotions.length === 0) return null;

  return (
    <section id="promociones" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Promociones
        </h2>
        <p className="text-muted-foreground">
          Aprovecha nuestros descuentos por tiempo limitado.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {promotions.map((promotion) => {
          const whatsappUrl = settings.whatsapp
            ? buildWhatsAppUrl(
                settings.whatsapp,
                `Hola, quisiera más información sobre la promoción "${promotion.name}".`,
              )
            : null;

          return (
            <div
              key={promotion.id}
              className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm"
            >
              {promotion.image && (
                <div className="relative aspect-16/9">
                  <Image
                    src={promotion.image}
                    alt={promotion.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{promotion.name}</h3>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    <Tag className="size-3" />-{promotion.percentage}%
                  </span>
                </div>
                {promotion.description && (
                  <p className="text-sm text-muted-foreground">
                    {promotion.description}
                  </p>
                )}
                {whatsappUrl && (
                  <Button
                    nativeButton={false}
                    render={
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    variant="outline"
                    size="sm"
                    className="mt-auto w-fit"
                  >
                    <MessageCircle className="size-4" />
                    Preguntar por WhatsApp
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
