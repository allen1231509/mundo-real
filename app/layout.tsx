import type { Metadata } from "next";
import { Baloo_2, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SkipLink } from "@/components/shared/skip-link";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { getSiteUrl } from "@/lib/site";
import { getBusinessSettings } from "@/services/settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const DEFAULT_DESCRIPTION =
  "Materiales de arte, pintura, manualidades, telas, foami y útiles escolares en Tarapoto, Perú.";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  const siteUrl = getSiteUrl();
  const description = settings.hero_subtitle ?? DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${settings.name} — Materiales de arte y manualidades en Tarapoto`,
      template: `%s — ${settings.name}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: settings.name,
      title: settings.name,
      description,
      url: siteUrl,
      images: settings.hero_banner
        ? [{ url: settings.hero_banner }]
        : settings.logo
          ? [{ url: settings.logo }]
          : [],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.name,
      description,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
