"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="border-y border-border-subtle bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan">/ What you walk away with</p>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Ten skills, stacked on top of each other
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface px-5 py-4"
            >
              <span className="font-mono text-xs text-ink-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-ink">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
