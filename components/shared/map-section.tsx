import type { BusinessSettings } from "@/types";

export function MapSection({ settings }: { settings: BusinessSettings }) {
  if (!settings.address) return null;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    settings.address,
  )}&output=embed`;

  return (
    <section id="ubicacion" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 space-y-1">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Visítanos
        </h2>
        <p className="text-muted-foreground">{settings.address}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border">
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
