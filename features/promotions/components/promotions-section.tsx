import { SectionHeading } from "@/components/shared/section-heading";
import { BRAND } from "@/lib/brand";
import { getActivePromotions } from "@/services/promotions";
import { getBusinessSettings } from "@/services/settings";

import { PromotionsGridClient } from "./promotions-grid-client";

export async function PromotionsSection() {
  const [promotions, settings] = await Promise.all([
    getActivePromotions(),
    getBusinessSettings(),
  ]);

  if (promotions.length === 0) return null;

  return (
    <section id="promociones" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Aprovecha"
        eyebrowColor={BRAND.orange}
        title="Promociones"
        subtitle="Aprovecha nuestros descuentos por tiempo limitado."
      />

      <PromotionsGridClient
        promotions={promotions}
        whatsapp={settings.whatsapp}
        businessName={settings.name}
      />
    </section>
  );
}
