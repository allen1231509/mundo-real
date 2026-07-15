"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // el usuario canceló el share nativo
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" variant="outline" size="lg" onClick={handleShare}>
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? "Enlace copiado" : "Compartir"}
    </Button>
  );
}
