"use client";

import { programStats } from "@/lib/data";
import { useCountUp } from "@/lib/useCountUp";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: displayed } = useCountUp(value);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <div className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {displayed}
        <span className="bg-agent-gradient bg-clip-text text-transparent">{suffix}</span>
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-ink-muted">{label}</div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-border-subtle bg-surface/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:gap-8 sm:py-10 sm:grid-cols-4">
        {programStats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
