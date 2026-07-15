import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { buildLocalBusinessJsonLd } from "@/lib/json-ld";
import { getBusinessSettings } from "@/services/settings";

export const revalidate = 60;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getBusinessSettings();
  const jsonLd = buildLocalBusinessJsonLd(settings);

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
