"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

import { BRAND } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Promotion } from "@/types";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const PANELS = [
  { gradient: `linear-gradient(135deg,${BRAND.pink},${BRAND.purple})`, shadow: "rgba(139,47,201,.35)", icon: "🖼️" },
  { gradient: `linear-gradient(135deg,${BRAND.orange},${BRAND.yellow})`, shadow: "rgba(255,122,26,.35)", icon: "🎨" },
  { gradient: `linear-gradient(135deg,${BRAND.teal},${BRAND.green})`, shadow: "rgba(18,194,194,.35)", icon: "🧶" },
];

export function PromotionsGridClient({
  promotions,
  whatsapp,
  businessName,
}: {
  promotions: Promotion[];
  whatsapp: string | null;
  businessName: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {promotions.map((promotion, i) => {
        const whatsappUrl = whatsapp
          ? buildWhatsAppUrl(
              whatsapp,
              `Hola, quisiera más información sobre la promoción "${promotion.name}" de ${businessName}.`,
            )
          : null;
        const panel = PANELS[i % PANELS.length];

        return (
          <motion.div
            key={promotion.id}
            variants={cardVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="relative flex min-h-[240px] flex-col overflow-hidden rounded-[28px] p-8 text-white shadow-[0_18px_40px_-10px_var(--shadow-color)]"
            style={{ background: panel.gradient, ["--shadow-color" as string]: panel.shadow }}
          >
            {promotion.image ? (
              <div className="absolute inset-0">
                <Image
                  src={promotion.image}
                  alt=""
                  fill
                  className="object-cover opacity-25"
                />
              </div>
            ) : (
              <div aria-hidden className="absolute -right-7 -bottom-7 text-[150px] opacity-15">
                {panel.icon}
              </div>
            )}

            <span className="font-heading absolute top-5 right-5 rounded-2xl bg-white px-4 py-2.5 text-2xl font-extrabold text-[#2a2440] shadow-lg">
              -{promotion.percentage}%
            </span>

            <div className="relative mt-auto flex flex-col gap-2">
              <h3 className="font-heading max-w-[75%] text-2xl leading-tight font-extrabold">
                {promotion.name}
              </h3>
              {promotion.description && (
                <p className="max-w-xs text-[15px] font-medium text-white/90">
                  {promotion.description}
                </p>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  <MessageCircle className="size-4" />
                  Preguntar por WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
