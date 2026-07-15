import { WhatsAppButtonClient } from "@/components/shared/whatsapp-button-client";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getBusinessSettings } from "@/services/settings";

export async function WhatsAppButton() {
  const settings = await getBusinessSettings();
  if (!settings.whatsapp) return null;

  const url = buildWhatsAppUrl(
    settings.whatsapp,
    `Hola, quisiera más información sobre los productos de ${settings.name}.`,
  );

  return <WhatsAppButtonClient url={url} />;
}
