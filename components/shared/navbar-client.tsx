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
import { BRAND } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { BusinessSettings } from "@/types";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Categorías", href: "/#categorias" },
  { label: "Promociones", href: "/#promociones" },
  { label: "Ubicación", href: "/#ubicacion" },
];

function LogoBadge() {
  return (
    <div
      className="font-heading flex size-11 items-center justify-center rounded-2xl text-lg font-extrabold text-white shadow-lg"
      style={{
        background: `conic-gradient(from 45deg,${BRAND.pink},${BRAND.purple},${BRAND.orange},${BRAND.yellow},${BRAND.teal},${BRAND.green},${BRAND.pink})`,
        boxShadow: `0 8px 20px ${BRAND.pink}48`,
      }}
    >
      M
    </div>
  );
}

export function NavbarClient({ settings }: { settings: BusinessSettings }) {
  const [open, setOpen] = useState(false);
  const whatsappUrl = settings.whatsapp
    ? buildWhatsAppUrl(
        settings.whatsapp,
        `Hola, quisiera más información sobre los productos de ${settings.name}.`,
      )
    : null;

  return (
    <header className="sticky top-0 z-40 border-b border-[#2a2440]/[.07] bg-[#fffdf8]/85 backdrop-blur-md dark:border-white/10 dark:bg-[#1c1830]/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-3">
          <LogoBadge />
          <span className="font-heading hidden text-xl leading-none font-extrabold tracking-tight text-[#2a2440] sm:inline dark:text-white">
            {settings.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-bold md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#4a4360] transition-colors hover:text-[#e0218a] dark:text-white/80 dark:hover:text-[#ff8fc6]"
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
              className="hidden h-auto rounded-full bg-[#18b56b] px-5 py-2.5 font-extrabold text-white shadow-md shadow-[#18b56b]/35 hover:bg-[#18b56b]/90 sm:inline-flex"
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
