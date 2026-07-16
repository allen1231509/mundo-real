"use client";

import { useEffect, useRef, useState } from "react";

import { BRAND } from "@/lib/brand";

type Tool = {
  emoji: string;
  gradient: string;
  shadow: string;
  size: number;
  fontSize: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  depth: number;
  animation: string;
  duration: string;
};

const TOOLS: Tool[] = [
  {
    emoji: "🖌️",
    gradient: `linear-gradient(135deg,${BRAND.orange},${BRAND.yellow})`,
    shadow: "rgba(255,122,26,.4)",
    size: 96,
    fontSize: 46,
    top: "6%",
    left: "2%",
    depth: 52,
    animation: "tool-bob-1",
    duration: "6.5s",
  },
  {
    emoji: "✏️",
    gradient: `linear-gradient(135deg,${BRAND.teal},${BRAND.green})`,
    shadow: "rgba(18,194,194,.4)",
    size: 84,
    fontSize: 40,
    top: "0%",
    right: "6%",
    depth: 40,
    animation: "tool-bob-2",
    duration: "7.5s",
  },
  {
    emoji: "✂️",
    gradient: `linear-gradient(135deg,${BRAND.purple},${BRAND.pink})`,
    shadow: "rgba(139,47,201,.4)",
    size: 92,
    fontSize: 44,
    top: "40%",
    right: "-2%",
    depth: 60,
    animation: "tool-bob-3",
    duration: "8s",
  },
  {
    emoji: "🖍️",
    gradient: `linear-gradient(135deg,${BRAND.pink},#ff5ca8)`,
    shadow: "rgba(224,33,138,.4)",
    size: 88,
    fontSize: 42,
    bottom: "6%",
    left: "6%",
    depth: 46,
    animation: "tool-bob-4",
    duration: "7s",
  },
  {
    emoji: "🧵",
    gradient: `linear-gradient(135deg,${BRAND.yellow},${BRAND.orange})`,
    shadow: "rgba(255,207,26,.45)",
    size: 78,
    fontSize: 38,
    bottom: "2%",
    right: "14%",
    depth: 34,
    animation: "tool-bob-2",
    duration: "6s",
  },
  {
    emoji: "📐",
    gradient: `linear-gradient(135deg,${BRAND.green},#4fd694)`,
    shadow: "rgba(24,181,107,.4)",
    size: 74,
    fontSize: 36,
    top: "44%",
    left: "-4%",
    depth: 28,
    animation: "tool-bob-1",
    duration: "8.5s",
  },
];

const CONFETTI = [
  { top: "22%", left: "44%", size: 18, color: BRAND.pink, radius: 6, duration: "4s" },
  { top: "70%", left: "30%", size: 14, color: BRAND.teal, radius: 999, duration: "5s" },
  { top: "16%", left: "70%", size: 16, color: BRAND.yellow, radius: 999, duration: "4.6s" },
  { top: "80%", left: "66%", size: 12, color: BRAND.purple, radius: 4, duration: "3.6s" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function HeroVisual() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const scene = sceneRef.current;
    if (!scene) return;
    const parItems = Array.from(
      scene.querySelectorAll<HTMLElement>("[data-depth]"),
    );

    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      const cx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const cy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      parItems.forEach((el) => {
        const depth = Number(el.dataset.depth) || 20;
        const tx = -cx * depth * 0.4;
        const ty = -cy * depth * 0.4;
        const rx = cy * (depth * 0.06);
        const ry = -cx * (depth * 0.06);
        el.style.transform = `translate3d(${tx}px,${ty}px,0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };
    const onLeave = () => parItems.forEach((el) => (el.style.transform = ""));

    scene.addEventListener("mousemove", onMove);
    scene.addEventListener("mouseleave", onLeave);
    return () => {
      scene.removeEventListener("mousemove", onMove);
      scene.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={sceneRef}
      className="relative h-[360px] sm:h-[440px] lg:h-[500px]"
      style={{ perspective: 1100 }}
    >
      <div
        data-depth={14}
        className="absolute top-1/2 left-1/2 z-[2] -mt-[140px] -ml-[140px] size-[280px] transition-transform duration-300 ease-out"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 20deg,${BRAND.pink},${BRAND.purple},${BRAND.teal},${BRAND.green},${BRAND.yellow},${BRAND.orange},${BRAND.pink})`,
            animation: reducedMotion ? undefined : "disc-spin 26s linear infinite",
            boxShadow: `0 30px 70px rgba(139,47,201,.4), inset 0 0 60px rgba(255,255,255,.25)`,
          }}
        />
        <div
          className="absolute inset-[30px] flex items-center justify-center overflow-hidden rounded-full text-[96px]"
          style={{
            background: BRAND.cream,
            boxShadow: "inset 0 8px 24px rgba(42,36,64,.12)",
            animation: reducedMotion ? undefined : "float-y 5s ease-in-out infinite",
          }}
        >
          🎨
        </div>
        <div
          className="absolute inset-0 rounded-full border-[3px]"
          style={{
            borderColor: "rgba(224,33,138,.35)",
            animation: reducedMotion ? undefined : "ring-pulse 3.2s ease-out infinite",
          }}
        />
      </div>

      {TOOLS.map((tool, i) => (
        <div
          key={i}
          data-depth={tool.depth}
          className="absolute z-[4] transition-transform duration-300 ease-out"
          style={{ top: tool.top, bottom: tool.bottom, left: tool.left, right: tool.right }}
        >
          <div
            className="flex items-center justify-center rounded-[28px] transition-[filter] duration-300 hover:brightness-110 hover:saturate-125"
            style={{
              width: tool.size,
              height: tool.size,
              fontSize: tool.fontSize,
              background: tool.gradient,
              boxShadow: `0 18px 36px ${tool.shadow}`,
              animation: reducedMotion
                ? undefined
                : `${tool.animation} ${tool.duration} ease-in-out infinite`,
            }}
          >
            {tool.emoji}
          </div>
        </div>
      ))}

      {!reducedMotion &&
        CONFETTI.map((c, i) => (
          <div
            key={i}
            data-depth={70 + i * 6}
            className="absolute z-[6] transition-transform duration-300 ease-out"
            style={{
              top: c.top,
              left: c.left,
              width: c.size,
              height: c.size,
              borderRadius: c.radius,
              background: c.color,
              animation: `confetti-bounce ${c.duration} ease-in-out infinite`,
            }}
          />
        ))}
    </div>
  );
}
