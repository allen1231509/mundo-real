/** Arma un link wa.me a partir del número (formato `business_settings.whatsapp`, sin "+") y un mensaje. */
export function buildWhatsAppUrl(whatsapp: string, message: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
