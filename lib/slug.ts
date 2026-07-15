// Rango Unicode de marcas diacríticas combinantes (U+0300 - U+036F),
// usado para quitar tildes tras normalizar a forma NFD.
const COMBINING_DIACRITICS = new RegExp(
  "[\\u0300-\\u036f]",
  "g",
);

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
