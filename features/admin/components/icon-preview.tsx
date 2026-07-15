"use client";

import { Shapes } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";

// Carga perezosa: solo descarga el ícono solicitado, no la librería completa
// (a diferencia de components/shared/dynamic-icon.tsx, que sí puede importar
// todo lucide-react porque solo se usa en Server Components).
function isValidIconName(value: string): value is IconName {
  return (iconNames as readonly string[]).includes(value);
}

export function IconPreview({
  icon,
  className,
}: {
  icon?: string | null;
  className?: string;
}) {
  if (!icon || !isValidIconName(icon)) {
    return <Shapes className={className} />;
  }

  return (
    <DynamicIcon
      name={icon}
      fallback={() => <Shapes className={className} />}
      className={className}
    />
  );
}
