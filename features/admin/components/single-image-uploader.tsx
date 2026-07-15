"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";

import { uploadSettingsImageAction } from "@/actions/settings";

export function SingleImageUploader({
  name,
  kind,
  initialUrl,
  aspect = "square",
}: {
  name: string;
  kind: "logo" | "hero";
  initialUrl?: string | null;
  aspect?: "square" | "wide";
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [isUploading, startUpload] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;

    startUpload(async () => {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("kind", kind);
      const result = await uploadSettingsImageAction(formData);
      if ("url" in result) setUrl(result.url);
    });

    if (inputRef.current) inputRef.current.value = "";
  }

  const dimensions = aspect === "square" ? "size-24" : "h-24 w-48";

  return (
    <div className="space-y-2">
      <div
        className={`relative overflow-hidden rounded-lg border bg-muted ${dimensions}`}
      >
        {url ? (
          <>
            <Image src={url} alt="" fill className="object-cover" sizes="192px" />
            <button
              type="button"
              onClick={() => setUrl("")}
              aria-label="Quitar imagen"
              className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-white/90 text-destructive"
            >
              <X className="size-3.5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="flex size-full flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <ImagePlus className="size-5" />
            )}
            <span className="text-xs">Subir</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
