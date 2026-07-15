"use client";

import { motion } from "framer-motion";

import type { BusinessSettings } from "@/types";

export function StorySection({ settings }: { settings: BusinessSettings }) {
  const story =
    settings.story ??
    `${settings.name} nació en Tarapoto con el propósito de acompañar la creatividad de cada cliente: estudiantes, docentes, artistas y familias que buscan los materiales adecuados para sus proyectos. Con el tiempo, hemos crecido para ofrecer una selección cada vez más amplia, siempre con la misma atención cercana del primer día.`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-transparent py-16">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-400/10 via-orange-300/10 to-sky-300/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl px-4 text-center"
      >
        <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          Nuestra historia
        </h2>
        <p className="mt-4 text-muted-foreground whitespace-pre-line">
          {story}
        </p>
      </motion.div>
    </section>
  );
}
