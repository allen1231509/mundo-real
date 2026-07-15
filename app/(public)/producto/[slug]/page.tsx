import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/features/products/components/product-card";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ShareButton } from "@/features/products/components/share-button";
import { StockBadge } from "@/features/products/components/stock-badge";
import { formatPrice } from "@/lib/format";
import { buildProductJsonLd } from "@/lib/json-ld";
import { buildPromotionMap, getDiscountedPrice } from "@/lib/pricing";
import { getSiteUrl } from "@/lib/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getProductBySlug, getRelatedProducts } from "@/services/products";
import { getActivePromotionsWithProducts } from "@/services/promotions";
import { getBusinessSettings } from "@/services/settings";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return {};

  const description =
    product.description ?? `${product.name} — disponible en Mundo Real.`;
  const productUrl = `${getSiteUrl()}/producto/${product.slug}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: productUrl },
    openGraph: {
      type: "website",
      title: product.name,
      description,
      url: productUrl,
      images: product.main_image ? [{ url: product.main_image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const [related, settings, promotions] = await Promise.all([
    getRelatedProducts(product.category_id, product.id),
    getBusinessSettings(),
    getActivePromotionsWithProducts(),
  ]);

  const promotionMap = buildPromotionMap(promotions);
  const activePromotion = promotionMap.get(product.id) ?? null;
  const discountedPrice = activePromotion
    ? getDiscountedPrice(product.price, activePromotion.percentage)
    : null;

  const productUrl = `${getSiteUrl()}/producto/${product.slug}`;
  const whatsappUrl = settings.whatsapp
    ? buildWhatsAppUrl(
        settings.whatsapp,
        `Hola, quisiera más información sobre "${product.name}" (${productUrl}).`,
      )
    : null;

  const images = [product.main_image, ...product.images].filter(
    (src): src is string => Boolean(src),
  );

  const jsonLd = buildProductJsonLd(product, discountedPrice ?? product.price);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/catalogo" className="hover:text-foreground">
          Catálogo
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <Link
              href={`/catalogo?categoria=${product.category.slug}`}
              className="hover:text-foreground"
            >
              {product.category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={images} productName={product.name} />

        <div className="space-y-6">
          <div className="space-y-2">
            {product.category && (
              <Badge variant="secondary">{product.category.name}</Badge>
            )}
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            {product.brand && (
              <p className="text-muted-foreground">{product.brand}</p>
            )}
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            {discountedPrice !== null && activePromotion ? (
              <>
                <span className="text-3xl font-bold">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <Badge variant="destructive">
                  -{activePromotion.percentage}%
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <StockBadge stock={product.stock} />

          {product.description && (
            <p className="whitespace-pre-line text-muted-foreground">
              {product.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {whatsappUrl && (
              <Button
                size="lg"
                nativeButton={false}
                render={
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <MessageCircle className="size-4" />
                Comprar por WhatsApp
              </Button>
            )}
            <ShareButton title={product.name} url={productUrl} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                activePromotion={promotionMap.get(relatedProduct.id) ?? null}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
