"use client";

import { Menu, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { BusinessSettings } from "@/types";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Categorías", href: "/#categorias" },
  { label: "Promociones", href: "/#promociones" },
  { label: "Ubicación", href: "/#ubicacion" },
];

export function NavbarClient({ settings }: { settings: BusinessSettings }) {
  const [open, setOpen] = useState(false);
  const whatsappUrl = settings.whatsapp
    ? buildWhatsAppUrl(
        settings.whatsapp,
        `Hola, quisiera más información sobre los productos de ${settings.name}.`,
      )
    : null;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">{settings.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {whatsappUrl && (
            <Button
              nativeButton={false}
              render={
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />
              }
              className="hidden sm:inline-flex"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Abrir menú</span>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{settings.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                {whatsappUrl && (
                  <Button
                    nativeButton={false}
                    render={
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    onClick={() => setOpen(false)}
                  >
                    <MessageCircle className="size-4" />
                    Escribir por WhatsApp
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
