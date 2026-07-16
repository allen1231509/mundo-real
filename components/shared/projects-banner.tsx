"use client";

import { motion } from "framer-motion";

export function ProjectsBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-2 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[32px] bg-[linear-gradient(120deg,#2a1560,#6d28c9_65%,#8b2fc9)] p-9 shadow-[0_26px_55px_-15px_rgba(58,29,110,.45)] sm:p-11 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div
          aria-hidden
          className="absolute -top-10 -left-8 size-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,207,26,.28), transparent 70%)" }}
        />
        <div className="relative text-white">
          <span className="font-heading inline-block rounded-full bg-[#ffcf1a] px-4 py-1.5 text-[13px] font-extrabold tracking-wide text-[#2a2440]">
            NUEVO
          </span>
          <h3 className="font-heading mt-4 text-3xl leading-[1.05] font-extrabold sm:text-4xl">
            Todo para tus{" "}
            <span className="bg-gradient-to-r from-[#ffcf1a] to-[#ff7a1a] bg-clip-text text-transparent">
              proyectos y tareas
            </span>
          </h3>
          <p className="mt-3 max-w-md text-[17px] leading-relaxed text-[#dccff2]">
            Descubre nuestra colección de útiles y colores increíbles, pensada
            para crear sin límites.
          </p>
          <a
            href="/catalogo"
            className="font-heading mt-5 inline-block rounded-2xl bg-[#ffcf1a] px-7 py-3 text-base font-extrabold text-[#2a2440] shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
          >
            ¡Ver más!
          </a>
        </div>
        <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-[22px] border-[6px] border-white/15 bg-white/10 text-[110px]">
          🎒
        </div>
      </motion.div>
    </section>
  );
}
