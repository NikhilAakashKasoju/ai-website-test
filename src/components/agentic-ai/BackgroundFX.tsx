// Fixed, full-viewport background layer sitting behind all page content.
// Three layers: a fading dot grid for texture, two slow-drifting blurred
// gradient blobs for depth/color, and a sparse starfield that twinkles.
//
// Star positions are generated with a seeded PRNG (not Math.random()) so the
// server-rendered and client-hydrated output match exactly — avoids React
// hydration warnings you'd otherwise get from per-render randomness.

function seededRandom(seed: number) {
  // mulberry32
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seededRandom(42);

const stars = Array.from({ length: 45 }, (_, i) => {
  const left = `${(rand() * 100).toFixed(2)}%`;
  const top = `${(rand() * 100).toFixed(2)}%`;
  // Three size tiers so the field reads as depth rather than a uniform grid.
  const roll = rand();
  const size = roll > 0.85 ? 5 : roll > 0.5 ? 3.5 : 2.5;
  return {
    id: i,
    left,
    top,
    size,
    // Larger stars carry a soft halo; the small ones stay crisp.
    glow: size >= 3.5 ? `0 0 ${size * 2.5}px rgba(255,255,255,0.55)` : "none",
    delay: `${(rand() * 4).toFixed(2)}s`,
    duration: `${(3 + rand() * 3).toFixed(2)}s`,
  };
});

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* base wash */}
      <div className="absolute inset-0 bg-void" />

      {/* fading dot grid */}
      <div
        className="absolute inset-0 bg-dot-grid bg-dot-grid opacity-40"
        style={{
          maskImage:
            "radial-gradient(80% 60% at 50% 0%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 0%, black 0%, transparent 75%)",
        }}
      />

      {/* drifting gradient blobs */}
      <div className="absolute -left-32 top-[-10%] h-[420px] w-[420px] animate-float-slow rounded-full bg-violet/20 blur-[120px]" />
      <div className="absolute -right-24 top-[20%] h-[380px] w-[380px] animate-float-slow-reverse rounded-full bg-cyan/15 blur-[130px]" />
      <div className="absolute bottom-[-15%] left-[30%] h-[360px] w-[360px] animate-float-slow rounded-full bg-violet/10 blur-[140px]" />

      {/* twinkling starfield */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            boxShadow: star.glow,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}
