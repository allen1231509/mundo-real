import { Shapes, type LucideIcon, type LucideProps } from "lucide-react";
import * as icons from "lucide-react";

function toPascalCase(kebab: string): string {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/** Resuelve un ícono de Lucide a partir de su nombre en kebab-case (ej: "graduation-cap"). */
export function resolveLucideIcon(name?: string | null): LucideIcon {
  if (!name) return Shapes;

  const componentName = toPascalCase(name);
  const icon = (icons as unknown as Record<string, LucideIcon>)[
    componentName
  ];

  return icon ?? Shapes;
}

export function DynamicIcon({
  icon,
  ...props
}: { icon?: string | null } & Omit<LucideProps, "name">) {
  const Icon = resolveLucideIcon(icon);
  return <Icon {...props} />;
}
