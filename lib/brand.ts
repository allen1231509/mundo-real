/** Paleta de marca "DecoArt · Pinceladas" usada en el rediseño colorido de la home. */
export const BRAND = {
  pink: "#e0218a",
  purple: "#8b2fc9",
  orange: "#ff7a1a",
  yellow: "#ffcf1a",
  teal: "#12c2c2",
  green: "#18b56b",
  ink: "#2a2440",
  cream: "#fffdf8",
} as const;

/** Ciclo de colores de marca para tarjetas/badges generados dinámicamente por índice. */
export const BRAND_CYCLE = [
  BRAND.pink,
  BRAND.purple,
  BRAND.teal,
  BRAND.green,
  BRAND.orange,
] as const;

export function brandAt(index: number): string {
  return BRAND_CYCLE[index % BRAND_CYCLE.length];
}
