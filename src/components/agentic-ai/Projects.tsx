"use client";

import { motion } from "framer-motion";
import { projects, additionalProjects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">/ Build, don&apos;t just watch</p>
      <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Three core projects, built end to end
      </h2>
      <p className="mt-4 max-w-2xl text-ink-secondary">
        Each project layers on the last — from a single retrieval-augmented
        assistant to a full multi-agent system that plans, researches, and
        executes on its own.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="grain-surface flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 shadow-card"
          >
            <span className="font-mono text-sm text-cyan">
              Project {String(project.number).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg font-medium leading-snug text-ink">
              {project.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border-subtle bg-void/60 px-3 py-1 text-xs text-ink-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border-subtle bg-surface/60 p-6">
        <p className="text-sm text-ink-secondary">
          Along the way, you&apos;ll also build:{" "}
          {additionalProjects.map((p, i) => (
            <span key={p}>
              <span className="text-ink">{p}</span>
              {i < additionalProjects.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
