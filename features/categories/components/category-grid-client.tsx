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
      className="grid grid-cols-2 gap-5 sm:grid-cols-3"
    >
      {categories.map((category) => {
        const textColor = getReadableTextColor(category.color);

        return (
          <motion.div
            key={category.id}
            variants={cardVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <Link
              href={`/catalogo?categoria=${category.slug}`}
              className="group relative flex min-h-[170px] flex-col overflow-hidden rounded-[26px] p-7 shadow-md transition-shadow hover:shadow-xl"
              style={{
                backgroundColor: category.color,
                color: textColor,
                boxShadow: `0 16px 34px -8px ${category.color}66`,
              }}
            >
              <DynamicIcon
                icon={category.icon}
                aria-hidden
                className="absolute -right-4 -bottom-4 size-28 opacity-20 transition-transform duration-300 group-hover:scale-110"
              />
              <div
                className="relative flex size-[52px] items-center justify-center rounded-2xl bg-white/22"
                style={{ color: textColor }}
              >
                <DynamicIcon icon={category.icon} className="size-6" />
              </div>
              <span className="font-heading relative mt-5 text-lg font-bold">
                {category.name}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
