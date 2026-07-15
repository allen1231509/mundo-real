"use client";

import { motion } from "framer-motion";
import { Award, MapPin, MessageCircle, Sparkles } from "lucide-react";

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Amplia variedad",
    description:
      "Arte, manualidades, telas, papeles y material escolar en un solo lugar.",
    gradient: "from-fuchsia-500 to-purple-500",
  },
  {
    icon: Award,
    title: "Calidad garantizada",
    description: "Materiales seleccionados pensando en cada proyecto.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: MapPin,
    title: "En el corazón de Tarapoto",
    description: "Fácil de encontrar y visitar.",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    icon: MessageCircle,
    title: "Atención cercana",
    description: "Te ayudamos a elegir por WhatsApp antes de tu visita.",
    gradient: "from-emerald-400 to-teal-500",
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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-6xl px-4 py-16"
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, description, gradient }) => (
          <motion.div
            key={title}
            variants={itemVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-3 text-center sm:text-left"
          >
            <div
              className={`mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md sm:mx-0`}
            >
              <Icon className="size-7" />
            </div>
            <h3 className="font-heading font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
