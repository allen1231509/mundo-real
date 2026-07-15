// lucide-react no incluye íconos de marcas (Facebook, Instagram, TikTok);
// se definen aquí como SVGs propios, minimalistas y en el mismo estilo.

export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.28C16.3 4.19 15.36 4 14.27 4c-2.28 0-3.84 1.39-3.84 3.94v2.56H8v3h2.43V21h3.07Z" />
    </svg>
  );
}

export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82c-1-.98-1.6-2.32-1.6-3.82h-3.4v14.4a2.6 2.6 0 1 1-2.6-2.6c.24 0 .47.03.7.08V10.4a6 6 0 1 0 5.3 5.95V9.5a7.7 7.7 0 0 0 4.4 1.38V7.5a4.8 4.8 0 0 1-2.8-1.68Z" />
    </svg>
  );
}
