import { BenefitsSection } from "@/components/shared/benefits-section";
import { MapSection } from "@/components/shared/map-section";
import { MarqueeRibbon } from "@/components/shared/marquee-ribbon";
import { ProjectsBanner } from "@/components/shared/projects-banner";
import { StorySection } from "@/components/shared/story-section";
import { CategoryGrid } from "@/features/categories/components/category-grid";
import { FeaturedProducts } from "@/features/products/components/featured-products";
import { PromotionsSection } from "@/features/promotions/components/promotions-section";
import { Hero } from "@/features/settings/components/hero";
import { getBusinessSettings } from "@/services/settings";

// ISR: sirve HTML en caché (rápido) y se revalida solo. Las Server Actions
// del admin ya fuerzan una revalidación inmediata al publicar cambios.
export const revalidate = 60;

export default async function HomePage() {
  const settings = await getBusinessSettings();

  return (
    <>
      <Hero settings={settings} />
      <MarqueeRibbon />
      <CategoryGrid />
      <ProjectsBanner />
      <FeaturedProducts />
      <PromotionsSection />
      <BenefitsSection />
      <StorySection settings={settings} />
      <MapSection settings={settings} />
    </>
  );
}
