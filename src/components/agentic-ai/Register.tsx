"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { REGISTER_URL } from "@/lib/data";

const isExternal = /^https?:\/\//i.test(REGISTER_URL);

export default function Register() {
  return (
    <section id="register" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-radial-glow"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grain-surface relative overflow-hidden rounded-3xl border border-border-subtle bg-agent-gradient-soft px-6 py-10 text-center sm:py-14 sm:px-14"
        >
          {/* soft dot texture, fading out toward the bottom */}
          <div
            className="pointer-events-none absolute inset-0 bg-dot-grid bg-dot-grid opacity-30"
            style={{
              maskImage: "radial-gradient(70% 60% at 50% 0%, black 0%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(70% 60% at 50% 0%, black 0%, transparent 80%)",
            }}
            aria-hidden="true"
          />

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan">
              / Ready to start?
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Reserve your seat in the next cohort
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-balance text-ink-secondary">
              Twelve weeks of live sessions, three core projects, and a capstone —
              built alongside a small group, guided step by step.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4">
              {REGISTER_URL ? (
                <a
                  href={REGISTER_URL}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group inline-flex items-center gap-2 rounded-full bg-agent-gradient px-8 py-4 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.03]"
                >
                  Register your seat
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ) : (
                <>
                  <span
                    aria-disabled="true"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-agent-gradient px-8 py-4 text-sm font-semibold text-void opacity-60"
                  >
                    Register your seat
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <p className="text-xs text-ink-muted">
                    Registration opens shortly — check back soon.
                  </p>
                </>
              )}

              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Live sessions · Recordings included · Beginner-friendly
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
