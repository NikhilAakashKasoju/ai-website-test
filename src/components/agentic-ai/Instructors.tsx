"use client";

// PLACEHOLDER CONTENT — swap in real instructor bios, photos, and stats
// before launch. Structure mirrors the DSA page's instructor cards.

interface Instructor {
  name: string;
  role: string;
  bio: string;
  stats: { value: string; label: string }[];
}

const instructors: Instructor[] = [
  {
    name: "Instructor name",
    role: "Role · Company",
    bio: "Add a short bio here — background, years of experience, and what shapes how they teach agentic systems.",
    stats: [
      { value: "—", label: "Years teaching" },
      { value: "—", label: "Students mentored" },
    ],
  },
];

export default function Instructors() {
  return (
    <section id="instructors" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">/ Your instructors</p>
      <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Taught by practitioners, not slide-readers
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {instructors.map((person) => (
          <div
            key={person.name}
            className="grain-surface rounded-2xl border border-dashed border-border-strong bg-surface p-6"
          >
            <div className="flex items-center gap-4">
              <div
                className="h-14 w-14 shrink-0 rounded-full bg-agent-gradient-soft"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-base font-medium text-ink">{person.name}</h3>
                <p className="text-sm text-ink-muted">{person.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{person.bio}</p>
            <div className="mt-5 flex gap-6">
              {person.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-xl font-semibold text-ink">{stat.value}</div>
                  <div className="text-xs text-ink-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink-muted">
        Placeholder — replace with real instructor details before launch.
      </p>
    </section>
  );
}
