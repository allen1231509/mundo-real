"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { getReadableTextColor } from "@/lib/color";
import type { Category } from "@/types";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function CategoryGridClient({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {categories.map((category) => {
        const textColor = getReadableTextColor(category.color);

        return (
          <motion.div
            key={category.id}
            variants={cardVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -4, rotate: -1, scale: 1.03 }}
          >
            <Link
              href={`/catalogo?categoria=${category.slug}`}
              className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-3xl p-5 text-center shadow-md transition-shadow hover:shadow-xl"
              style={{ backgroundColor: category.color, color: textColor }}
            >
              <div
                aria-hidden
                className="absolute -top-6 -right-6 size-20 rounded-full bg-white/15 transition-transform duration-300 group-hover:scale-125"
              />
              <div
                className="relative flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
                style={{ color: textColor }}
              >
                <DynamicIcon icon={category.icon} className="size-7" />
              </div>
              <span className="font-heading relative text-base font-bold">
                {category.name}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
