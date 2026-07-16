"use client";

import { motion } from "framer-motion";
import { Award, HandCoins, Headset, LayoutGrid, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/features/settings/components/hero-visual";
import { BRAND } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { BusinessSettings } from "@/types";

const HERO_BENEFITS = [
  { label: "Calidad Garantizada", icon: Award, color: BRAND.pink },
  { label: "Precios Justos", icon: HandCoins, color: BRAND.yellow },
  { label: "Gran Variedad", icon: LayoutGrid, color: BRAND.green },
  { label: "Atención Personalizada", icon: Headset, color: BRAND.teal },
];

function splitTitleHighlight(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 2) return { lead: "", highlight: title };
  return {
    lead: words.slice(0, -2).join(" "),
    highlight: words.slice(-2).join(" "),
  };
}

export function Hero({ settings }: { settings: BusinessSettings }) {
  const title = settings.hero_title ?? "Donde tus ideas cobran color";
  const subtitle =
    settings.hero_subtitle ??
    "Pinturas, telas, foami, papelería y útiles escolares. Todo lo que estudiantes, docentes, artistas y familias necesitan para crear.";
  const { lead, highlight } = splitTitleHighlight(title);
  const whatsappUrl = settings.whatsapp
    ? buildWhatsAppUrl(
        settings.whatsapp,
        `Hola, quisiera más información sobre los productos de ${settings.name}.`,
      )
    : null;

  return (
    <section
      className="relative overflow-hidden bg-[length:300%_300%] bg-[linear-gradient(120deg,#fff0f7,#f3ecff,#fff6e6,#e8fbf6)] [animation:hero-gradient_16s_ease_infinite] dark:bg-[linear-gradient(120deg,#241a3d,#1c1830,#1a2e2c,#241a3d)]"
    >
      <div
        aria-hidden
        className="absolute -top-20 -left-16 -z-0 size-72 rounded-full opacity-40 blur-3xl [animation:hero-blob_14s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(circle, ${BRAND.pink}, transparent 70%)` }}
      />
      <div
        aria-hidden
        className="absolute top-10 -right-10 -z-0 size-72 rounded-full opacity-35 blur-3xl [animation:hero-blob_18s_ease-in-out_infinite_reverse]"
        style={{ background: `radial-gradient(circle, ${BRAND.teal}, transparent 70%)` }}
      />
      <div
        aria-hidden
        className="absolute -bottom-24 left-1/3 -z-0 size-80 rounded-full opacity-30 blur-3xl [animation:hero-blob_20s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(circle, ${BRAND.yellow}, transparent 70%)` }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:py-24 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#8b2fc9] shadow-md shadow-black/5 dark:bg-white/10 dark:text-[#c9a3ff]">
            🎨 Arte y manualidades en Tarapoto
          </span>
          <h1 className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-[#2a2440] text-balance sm:text-5xl lg:text-6xl dark:text-white">
            {lead ? `${lead} ` : ""}
            <span className="bg-gradient-to-r from-[#e0218a] via-[#ff7a1a] to-[#ffcf1a] bg-clip-text text-transparent">
              {highlight}
            </span>
          </h1>
          <p className="max-w-md text-lg text-[#5a5372] dark:text-white/80">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-x-7 gap-y-4 pt-1">
            {HERO_BENEFITS.map(({ label, icon: Icon, color }) => (
              <div
                key={label}
                className="flex w-24 flex-col items-center gap-2 text-center"
              >
                <span
                  className="flex size-12 items-center justify-center rounded-full text-white shadow-lg"
                  style={{ background: color, boxShadow: `0 8px 18px ${color}55` }}
                >
                  <Icon className="size-5" />
                </span>
                <span className="text-xs leading-tight font-extrabold text-[#4a4360] dark:text-white/85">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#categorias" />}
              className="h-auto rounded-2xl bg-gradient-to-r from-[#e0218a] to-[#8b2fc9] px-7 py-3.5 text-base font-extrabold text-white shadow-lg shadow-[#8b2fc9]/35 transition-transform hover:-translate-y-0.5 hover:brightness-105"
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
                className="h-auto rounded-2xl border-transparent bg-white px-7 py-3.5 text-base font-extrabold text-[#2a2440] shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5 dark:bg-white/10 dark:text-white"
              >
                <MessageCircle className="size-4" />
                Escríbenos
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
