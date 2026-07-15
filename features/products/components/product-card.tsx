import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-primary/30"
    >
      <div className="relative aspect-square bg-muted">
        {product.main_image ? (
          <Image
            src={product.main_image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/40">
            <ImageOff className="size-10" />
          </div>
        )}
        {product.category && (
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 backdrop-blur"
          >
            {product.category.name}
          </Badge>
        )}
        {activePromotion && (
          <Badge
            variant="destructive"
            className="absolute right-2 top-2 backdrop-blur"
          >
            -{activePromotion.percentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>
        {product.brand && (
          <span className="text-xs text-muted-foreground">
            {product.brand}
          </span>
        )}
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          {discountedPrice !== null ? (
            <>
              <span className="text-base font-semibold">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-base font-semibold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
