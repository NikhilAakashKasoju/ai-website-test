"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { weeks } from "@/lib/data";

function WeekCard({
  week,
  open,
  onToggle,
}: {
  week: (typeof weeks)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `week-panel-${week.number}`;

  return (
    <div className="grain-surface overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-card">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
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
            id={panelId}
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
  // Week 1 opens by default, matching the original behaviour.
  const [openWeeks, setOpenWeeks] = useState<number[]>([weeks[0].number]);

  const allOpen = openWeeks.length === weeks.length;

  function toggleWeek(number: number) {
    setOpenWeeks((prev) =>
      prev.includes(number) ? prev.filter((n) => n !== number) : [...prev, number]
    );
  }

  function toggleAll() {
    setOpenWeeks(allOpen ? [] : weeks.map((w) => w.number));
  }

  return (
    <section id="curriculum" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">/ The path</p>
      <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        From AI fundamentals to production agents
      </h2>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-ink-secondary">
          Eight weeks, each building on the last. Open a week to see exactly what
          it covers.
        </p>

        <button
          onClick={toggleAll}
          aria-label={allOpen ? "Collapse all weeks" : "Expand all weeks"}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface sm:self-auto"
        >
          {allOpen ? (
            <ChevronsDownUp className="h-4 w-4 text-cyan transition-transform duration-300 group-hover:-translate-y-px" />
          ) : (
            <ChevronsUpDown className="h-4 w-4 text-cyan transition-transform duration-300 group-hover:translate-y-px" />
          )}
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="mt-10 space-y-4">
        {weeks.map((week) => (
          <WeekCard
            key={week.number}
            week={week}
            open={openWeeks.includes(week.number)}
            onToggle={() => toggleWeek(week.number)}
          />
        ))}
      </div>
    </section>
  );
}
