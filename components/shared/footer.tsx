import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/shared/social-icons";
import { BRAND } from "@/lib/brand";
import { getBusinessSettings } from "@/services/settings";

export async function Footer() {
  const settings = await getBusinessSettings();
  const year = new Date().getFullYear();

  const socials = [
    { href: settings.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: settings.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: settings.tiktok, label: "TikTok", Icon: TikTokIcon },
  ].filter((social) => Boolean(social.href));

  return (
    <footer className="bg-[#1c1830] text-[#c9c4dd]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="font-heading flex size-10 items-center justify-center rounded-xl text-base font-extrabold text-white"
              style={{
                background: `conic-gradient(from 45deg,${BRAND.pink},${BRAND.purple},${BRAND.orange},${BRAND.yellow},${BRAND.teal},${BRAND.green},${BRAND.pink})`,
              }}
            >
              M
            </div>
            <span className="font-heading text-xl font-extrabold text-white">
              {settings.name}
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed">
            Tu tienda de arte y manualidades en Tarapoto. Materiales para
            crear, aprender y disfrutar.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading text-[17px] font-bold text-white">
            Contacto
          </h3>
          <div className="space-y-2 text-sm">
            {settings.address && (
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" style={{ color: BRAND.pink }} />
                {settings.address}
              </p>
            )}
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0" style={{ color: BRAND.teal }} />
                {settings.phone}
              </a>
            )}
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0" style={{ color: BRAND.yellow }} />
                {settings.email}
              </a>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading text-[17px] font-bold text-white">
            Horario
          </h3>
          {settings.schedule && (
            <p className="text-sm whitespace-pre-line">{settings.schedule}</p>
          )}

          {socials.length > 0 && (
            <div className="flex gap-3 pt-1">
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-sm opacity-70">
        © {year} {settings.name} · Tarapoto, Perú
      </div>
    </footer>
  );
}
