"use client";

import { motion } from "framer-motion";

import { BRAND } from "@/lib/brand";
import type { BusinessSettings } from "@/types";

export function StorySection({ settings }: { settings: BusinessSettings }) {
  const story =
    settings.story ??
    `${settings.name} nació en Tarapoto con el propósito de acompañar la creatividad de cada cliente: estudiantes, docentes, artistas y familias que buscan los materiales adecuados para sus proyectos. Con el tiempo, hemos crecido para ofrecer una selección cada vez más amplia, siempre con la misma atención cercana del primer día.`;

  return (
    <section className="px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[36px] bg-[#2a2440] p-10 text-white sm:p-14"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-2"
          style={{
            background: `linear-gradient(90deg,${BRAND.pink},${BRAND.purple},${BRAND.orange},${BRAND.yellow},${BRAND.teal},${BRAND.green})`,
          }}
        />
        <div
          className="text-[15px] font-extrabold tracking-wide uppercase"
          style={{ color: BRAND.yellow }}
        >
          Nuestra historia
        </div>
        <h2 className="font-heading mt-2.5 text-3xl leading-[1.1] font-extrabold sm:text-4xl">
          Un rincón creativo en el corazón de Tarapoto
        </h2>
        <p className="mt-4 text-lg leading-relaxed whitespace-pre-line text-[#c9c4dd]">
          {story}
        </p>
      </motion.div>
    </section>
  );
}
