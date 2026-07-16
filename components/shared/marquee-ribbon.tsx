import { BRAND } from "@/lib/brand";

const WORDS = [
  "ARTE",
  "PINTURA",
  "FOAMI",
  "TELAS",
  "PAPELERÍA",
  "MANUALIDADES",
  "ESCOLAR",
  "DIBUJO",
  "CREATIVIDAD",
  "COLOR",
];

const COLORS = [BRAND.pink, BRAND.purple, BRAND.teal, BRAND.green, BRAND.yellow, BRAND.orange];

export function MarqueeRibbon() {
  const items = [...WORDS, ...WORDS];

  return (
    <div className="-my-2 -rotate-[1.4deg] overflow-hidden bg-[#2a2440] py-3.5">
      <div
        aria-hidden
        className="font-heading flex w-max gap-0 text-xl font-extrabold whitespace-nowrap [animation:marquee-scroll_26s_linear_infinite] sm:text-2xl"
      >
        {items.map((word, i) => (
          <span key={i} className="px-6" style={{ color: COLORS[i % COLORS.length] }}>
            ✦ {word}
          </span>
        ))}
      </div>
    </div>
  );
}
