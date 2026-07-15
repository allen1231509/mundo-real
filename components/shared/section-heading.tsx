"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
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
        "mb-10 space-y-2",
        align === "center" && "mx-auto max-w-xl text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-block rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}
