import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format";
import { getDiscountedPrice } from "@/lib/pricing";
import type { Promotion, ProductWithCategory } from "@/types";

export function ProductCard({
  product,
  activePromotion,
}: {
  product: ProductWithCategory;
  activePromotion?: Promotion | null;
}) {
  const discountedPrice = activePromotion
    ? getDiscountedPrice(product.price, activePromotion.percentage)
    : null;
  const tint = product.category?.color ? `${product.category.color}1f` : "#f3ecff";

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_12px_30px_-10px_rgba(42,36,64,.18)] transition-all hover:-translate-y-1.5 hover:shadow-[0_18px_36px_-8px_rgba(42,36,64,.26)] dark:bg-white/[.06]"
    >
      <div className="relative aspect-square" style={{ backgroundColor: tint }}>
        {product.main_image ? (
          <Image
            src={product.main_image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#2a2440]/25">
            <ImageOff className="size-10" />
          </div>
        )}
        {product.category && (
          <span
            className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-extrabold text-white"
            style={{ backgroundColor: product.category.color }}
          >
            {product.category.name}
          </span>
        )}
        {activePromotion && (
          <span className="absolute top-3 right-3 rounded-full bg-[#e0218a] px-3 py-1 text-xs font-extrabold text-white">
            -{activePromotion.percentage}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-heading line-clamp-2 text-[15px] font-bold text-[#2a2440] dark:text-white">
          {product.name}
        </h3>
        {product.brand && (
          <span className="text-xs font-semibold text-[#8a8398]">
            {product.brand}
          </span>
        )}
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          {discountedPrice !== null ? (
            <>
              <span className="font-heading text-lg font-extrabold text-[#e0218a]">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-xs font-bold text-[#b3adc2] line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-heading text-lg font-extrabold text-[#e0218a]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
