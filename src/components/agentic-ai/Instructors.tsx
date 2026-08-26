"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { instructors, type Instructor } from "@/lib/data";

function Avatar({ instructor }: { instructor: Instructor }) {
  if (instructor.photo) {
    return (
      <Image
        src={instructor.photo}
        alt={instructor.name}
        width={128}
        height={128}
        className="h-16 w-16 shrink-0 rounded-full border border-border-subtle object-cover"
      />
    );
  }

  // No headshot uploaded yet — fall back to the gradient initials mark.
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-agent-gradient font-display text-lg font-semibold text-void"
      aria-hidden="true"
    >
      {instructor.initials}
    </div>
  );
}

function InstructorCard({ instructor, index }: { instructor: Instructor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="grain-surface flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 shadow-card"
    >
      <div className="flex items-center gap-4">
        <Avatar instructor={instructor} />
        <div className="min-w-0">
          <h3 className="font-display text-base font-medium text-ink">
            {instructor.name}
          </h3>
          <p className="mt-0.5 text-sm text-ink-muted">{instructor.role}</p>
        </div>
      </div>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-secondary">
        {instructor.bio}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {instructor.specialties.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border-subtle bg-void/60 px-3 py-1 text-xs text-ink-secondary"
          >
            {s}
          </span>
        ))}
      </div>

      {/* wraps so three stats never force the card wider than the viewport */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 border-t border-border-subtle pt-5">
        {instructor.stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-xl font-semibold text-ink">
              {stat.value}
            </div>
            <div className="mt-0.5 text-xs text-ink-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Instructors() {
  return (
    <section id="instructors" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">
        / Your instructors
      </p>
      <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Taught by practitioners, not slide-readers
      </h2>
      <p className="mt-4 max-w-2xl text-ink-secondary">
        Two instructors who between them have shipped production systems and
        taught these fundamentals to hundreds of thousands of students.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {instructors.map((instructor, i) => (
          <InstructorCard key={instructor.name} instructor={instructor} index={i} />
        ))}
      </div>
    </section>
  );
}
