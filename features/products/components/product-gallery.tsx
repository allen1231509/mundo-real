"use client";

import { ImageOff, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-muted text-muted-foreground/40">
        <ImageOff className="size-16" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setZoomed(true)}
        aria-label="Ampliar imagen"
        className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-muted"
      >
        <Image
          src={images[activeIndex]}
          alt={productName}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <ZoomIn className="size-4" />
        </span>
      </button>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`relative size-16 shrink-0 overflow-hidden rounded-lg ring-2 transition-opacity ${
                i === activeIndex
                  ? "ring-primary"
                  : "opacity-70 ring-transparent"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <X className="size-5" />
          </button>
          <div className="relative h-full max-h-[90vh] w-full max-w-3xl">
            <Image
              src={images[activeIndex]}
              alt={productName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
