import { getSiteUrl } from "@/lib/site";
import type { BusinessSettings, ProductWithCategory } from "@/types";

export function buildLocalBusinessJsonLd(settings: BusinessSettings) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.name,
    image: settings.logo ?? undefined,
    url: siteUrl,
    telephone: settings.phone ?? undefined,
    email: settings.email ?? undefined,
    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressCountry: "PE",
        }
      : undefined,
    sameAs: [settings.facebook, settings.instagram, settings.tiktok].filter(
      (url): url is string => Boolean(url),
    ),
  };
}

export function buildProductJsonLd(
  product: ProductWithCategory,
  price: number,
) {
  const siteUrl = getSiteUrl();
  const images = [product.main_image, ...product.images].filter(
    (src): src is string => Boolean(src),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: images.length > 0 ? images : undefined,
    sku: product.id,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : undefined,
    category: product.category?.name,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/producto/${product.slug}`,
      priceCurrency: "PEN",
      price: price.toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };
}
