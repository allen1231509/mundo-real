"use client";

import { motion } from "framer-motion";

import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  eyebrowColor = BRAND.pink,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  eyebrowColor?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "mb-10 space-y-1.5",
        align === "center" && "mx-auto max-w-xl text-center",
        className,
      )}
    >
      {eyebrow && (
        <div
          className="text-[15px] font-extrabold tracking-wide uppercase"
          style={{ color: eyebrowColor }}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[#2a2440] sm:text-4xl dark:text-white">
        {title}
      </h2>
      {subtitle && <p className="text-[#6a6484] dark:text-white/70">{subtitle}</p>}
    </motion.div>
  );
}
