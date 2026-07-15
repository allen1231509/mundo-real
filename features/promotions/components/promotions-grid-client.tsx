"use client";

import { motion } from "framer-motion";
import { MessageCircle, Tag } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
      className="grid gap-4 sm:grid-cols-2"
    >
      {promotions.map((promotion) => {
        const whatsappUrl = whatsapp
          ? buildWhatsAppUrl(
              whatsapp,
              `Hola, quisiera más información sobre la promoción "${promotion.name}" de ${businessName}.`,
            )
          : null;

        return (
          <motion.div
            key={promotion.id}
            variants={cardVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-xl"
          >
            {promotion.image && (
              <div className="relative aspect-16/9">
                <Image
                  src={promotion.image}
                  alt={promotion.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-heading font-bold">{promotion.name}</h3>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                  <Tag className="size-3" />-{promotion.percentage}%
                </span>
              </div>
              {promotion.description && (
                <p className="text-sm text-muted-foreground">
                  {promotion.description}
                </p>
              )}
              {whatsappUrl && (
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  variant="outline"
                  size="sm"
                  className="mt-auto w-fit"
                >
                  <MessageCircle className="size-4" />
                  Preguntar por WhatsApp
                </Button>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
