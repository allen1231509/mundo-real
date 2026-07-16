export function HeroSceneFallback() {
  return (
    <div className="relative flex size-full items-center justify-center">
      <div
        aria-hidden
        className="size-56 animate-pulse rounded-full sm:size-64"
        style={{
          background:
            "conic-gradient(from 20deg, #e0218a, #8b2fc9, #12c2c2, #18b56b, #ffcf1a, #ff7a1a, #e0218a)",
          boxShadow: "0 30px 70px -20px rgba(139,47,201,.45)",
        }}
      />
    </div>
  );
}
