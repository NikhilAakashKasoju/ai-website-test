"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { pricing, REGISTER_URL } from "@/lib/data";

const isExternal = /^https?:\/\//i.test(REGISTER_URL);

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan">/ Enrolment</p>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          One price, everything included
        </h2>
        <p className="mt-4 max-w-2xl text-ink-secondary">
          No tiers and no add-ons — every seat gets the full twelve weeks, the
          recordings, and the doubt-clearing calls.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grain-surface mt-8 overflow-hidden rounded-3xl sm:mt-10 border border-border-subtle bg-surface shadow-card"
        >
          <div className="grid md:grid-cols-[1.05fr_1fr]">
            {/* price */}
            <div className="border-b border-border-subtle bg-agent-gradient-soft px-6 py-8 sm:px-7 sm:py-9 md:border-b-0 md:border-r md:px-9 md:py-10">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-cyan/30 bg-void/40 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cyan">
                  {pricing.discountNote}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <span className="font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
                  {pricing.currentPrice}
                </span>
                <span
                  className="pb-2 font-display text-2xl font-medium text-ink-muted line-through decoration-ink-muted/70 decoration-2"
                  aria-label={`Original price ${pricing.originalPrice}`}
                >
                  {pricing.originalPrice}
                </span>
              </div>

              <p className="mt-2 text-sm text-ink-secondary">
                One-time payment for the full cohort.
              </p>

              <ul className="mt-7 space-y-2.5">
                {pricing.included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={REGISTER_URL}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-agent-gradient px-7 py-3.5 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.03]"
              >
                Register your seat
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* schedule */}
            <div className="px-6 py-8 sm:px-7 sm:py-9 md:px-9 md:py-10">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Schedule
              </p>

              <dl className="mt-5 divide-y divide-border-subtle">
                {pricing.schedule.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                  >
                    <dt className="text-sm text-ink-secondary">{row.label}</dt>
                    <dd className="font-display text-sm font-medium text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border-subtle bg-void/40 px-4 py-3.5">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-ink-secondary">
                  Weekend sessions, so the cohort works alongside a full-time
                  job. Miss one and the recording is there the same week.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
