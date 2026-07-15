import type { MetadataRoute } from "next";

import { createPublicClient } from "@/lib/supabase/public";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const supabase = createPublicClient();

  const { data: products } = await supabase
    .from("products")
    .select("slug, updated_at")
    .eq("active", true);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/catalogo`, changeFrequency: "daily", priority: 0.9 },
  ];

  const productRoutes: MetadataRoute.Sitemap = (products ?? []).map(
    (product) => ({
      url: `${siteUrl}/producto/${product.slug}`,
      lastModified: product.updated_at,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  return [...staticRoutes, ...productRoutes];
}
