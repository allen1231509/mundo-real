"use client";

import { ImagePlus, Loader2, Star, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";

import { uploadProductImageAction } from "@/actions/products";

const MAX_FILE_SIZE_MB = 10;

export function ImageGalleryUploader({
  name,
  initialImages,
}: {
  name: string;
  initialImages?: string[];
}) {
  const [images, setImages] = useState<string[]>(initialImages ?? []);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, startUpload] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    setError(null);

    const tooLarge = fileArray.find(
      (file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024,
    );
    if (tooLarge) {
      setError(
        `"${tooLarge.name}" pesa ${(tooLarge.size / 1024 / 1024).toFixed(1)}MB. El máximo es ${MAX_FILE_SIZE_MB}MB.`,
      );
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    startUpload(async () => {
      for (const file of fileArray) {
        const formData = new FormData();
        formData.set("file", file);
        try {
          const result = await uploadProductImageAction(formData);
          if ("url" in result) {
            setImages((prev) => [...prev, result.url]);
          } else {
            setError(result.error);
          }
        } catch {
          setError("No se pudo subir la imagen. Intenta de nuevo.");
        }
      }
    });

    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((img) => img !== url));
  }

  function makeMain(url: string) {
    setImages((prev) => [url, ...prev.filter((img) => img !== url)]);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((url, index) => (
          <div
            key={url}
            className="group relative size-24 overflow-hidden rounded-lg border bg-muted"
          >
            <Image src={url} alt="" fill className="object-cover" sizes="96px" />
            {index === 0 && (
              <span className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                Principal
              </span>
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => makeMain(url)}
                  aria-label="Hacer principal"
                  className="flex size-7 items-center justify-center rounded-full bg-white/90 text-foreground"
                >
                  <Star className="size-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => removeImage(url)}
                aria-label="Quitar imagen"
                className="flex size-7 items-center justify-center rounded-full bg-white/90 text-destructive"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex size-24 flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <ImagePlus className="size-5" />
          )}
          <span className="text-xs">Agregar</span>
        </button>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {images.map((url) => (
        <input key={url} type="hidden" name={name} value={url} />
      ))}
    </div>
  );
}
