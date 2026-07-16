import { SectionHeading } from "@/components/shared/section-heading";
import type { BusinessSettings } from "@/types";

export function MapSection({ settings }: { settings: BusinessSettings }) {
  if (!settings.address) return null;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    settings.address,
  )}&output=embed`;

  return (
    <section id="ubicacion" className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading eyebrow="Visítanos" title="Encuéntranos" subtitle={settings.address} />

      <div className="overflow-hidden rounded-3xl border border-[#2a2440]/10 shadow-md dark:border-white/10">
        <iframe
          title={`Ubicación de ${settings.name}`}
          src={mapSrc}
          className="h-96 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
