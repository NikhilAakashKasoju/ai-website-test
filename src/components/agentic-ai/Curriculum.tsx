"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { weeks } from "@/lib/data";

function WeekCard({ week, defaultOpen }: { week: (typeof weeks)[number]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="grain-surface overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-card">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-5 px-6 py-5 text-left transition-colors hover:bg-surface-hover"
      >
        <span className="font-mono text-sm text-cyan">
          {String(week.number).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <h3 className="font-display text-lg font-medium text-ink">{week.title}</h3>
          <p className="mt-1 text-sm text-ink-secondary">{week.blurb}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid gap-4 border-t border-border-subtle px-6 py-5 sm:grid-cols-3">
              {week.topics.map((topic) => (
                <div key={topic.day}>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                    {topic.day}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {topic.points.map((point) => (
                      <li key={point} className="text-sm leading-snug text-ink-secondary">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Curriculum() {
  return (
    <section id="curriculum" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">/ The path</p>
      <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        From AI fundamentals to production agents
      </h2>
      <p className="mt-4 max-w-2xl text-ink-secondary">
        Eight weeks, each building on the last. Open a week to see exactly what
        it covers.
      </p>

      <div className="mt-10 space-y-4">
        {weeks.map((week, i) => (
          <WeekCard key={week.number} week={week} defaultOpen={i === 0} />
        ))}
      </div>

      <div className="mt-10 flex items-center gap-3 rounded-2xl border border-border-subtle bg-agent-gradient-soft px-6 py-5">
        <span className="h-2 w-2 shrink-0 rounded-full bg-cyan" />
        <p className="text-sm text-ink-secondary">
          Complete all sessions to earn a bootcamp certificate you can share on
          your profile.
        </p>
      </div>
    </section>
  );
}
