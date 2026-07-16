"use client";

import { motion } from "framer-motion";
import { Award, MapPin, MessageCircle, Sparkles } from "lucide-react";

import { BRAND } from "@/lib/brand";

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Amplia variedad",
    description:
      "Arte, manualidades, telas, papeles y material escolar en un solo lugar.",
    color: BRAND.pink,
  },
  {
    icon: Award,
    title: "Calidad garantizada",
    description: "Materiales seleccionados pensando en cada proyecto.",
    color: BRAND.purple,
  },
  {
    icon: MapPin,
    title: "En el corazón de Tarapoto",
    description: "Fácil de encontrar y visitar.",
    color: BRAND.teal,
  },
  {
    icon: MessageCircle,
    title: "Atención cercana",
    description: "Te ayudamos a elegir por WhatsApp antes de tu visita.",
    color: BRAND.green,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function BenefitsSection() {
  return (
    <section className="bg-[linear-gradient(120deg,#fff6e6,#e8fbf6)] py-16 dark:bg-[linear-gradient(120deg,#241a3d,#1a2e2c)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {BENEFITS.map(({ icon: Icon, title, description, color }) => (
          <motion.div
            key={title}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            <div
              className="mx-auto flex size-[76px] items-center justify-center rounded-[22px] text-white shadow-lg"
              style={{ background: color, boxShadow: `0 12px 26px ${color}4d` }}
            >
              <Icon className="size-8" />
            </div>
            <h3 className="font-heading mt-4 font-bold text-[#2a2440] dark:text-white">
              {title}
            </h3>
            <p className="mt-1.5 text-sm text-[#5a5372] dark:text-white/70">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
