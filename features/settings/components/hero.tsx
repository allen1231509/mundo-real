"use client";

import { motion } from "framer-motion";
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
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 dark:from-violet-900 dark:via-fuchsia-800 dark:to-orange-700" />

      <motion.div
        aria-hidden
        className="absolute -top-24 -left-16 -z-10 size-72 rounded-full bg-yellow-300/50 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-10 -right-20 -z-10 size-80 rounded-full bg-sky-300/40 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 left-1/3 -z-10 size-72 rounded-full bg-emerald-300/40 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:py-28 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="font-heading text-4xl leading-tight font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-md text-lg text-white/90">{subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#categorias" />}
              className="bg-white font-semibold text-violet-700 shadow-lg shadow-black/10 hover:bg-white/90"
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
                className="border-white/70 bg-white/10 text-white hover:bg-white/20"
              >
                <MessageCircle className="size-4" />
                Escríbenos
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative aspect-4/3 overflow-hidden rounded-[2.5rem] bg-white/10 shadow-2xl ring-4 ring-white/40 backdrop-blur-sm"
        >
          {settings.hero_banner ? (
            <Image
              src={settings.hero_banner}
              alt={settings.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-white/70">
              <Palette className="size-16" />
              <span className="text-sm font-medium">
                Imagen próximamente
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
