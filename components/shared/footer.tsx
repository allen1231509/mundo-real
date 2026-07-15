import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/shared/social-icons";
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
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{settings.name}</h2>
          {settings.address && (
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {settings.address}
            </p>
          )}
          {settings.schedule && (
            <p className="text-sm text-muted-foreground">
              {settings.schedule}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Contacto</h3>
          {settings.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Phone className="size-4" />
              {settings.phone}
            </a>
          )}
          {settings.email && (
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Mail className="size-4" />
              {settings.email}
            </a>
          )}
        </div>

        {socials.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Síguenos</h3>
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border transition-colors hover:text-primary"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        © {year} {settings.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
