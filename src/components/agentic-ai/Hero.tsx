"use client";

import { motion } from "framer-motion";
import AgentWorkflowDiagram from "./AgentWorkflowDiagram";
import { REGISTER_URL } from "@/lib/data";

export default function Hero() {
  return (
    <section id="main" className="relative overflow-hidden">
      {/* Decorative glow. It is absolutely positioned, so without
          pointer-events-none it paints over the static content below and
          swallows every click on the CTAs. */}
      <div
        className="pointer-events-none absolute inset-0 bg-radial-glow"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.04fr,0.96fr] md:pb-28 md:pt-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">
            / Live cohort · Beginner-friendly · Recordings included
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Building{" "}
            <span className="bg-agent-gradient bg-clip-text text-transparent">
              Agentic AI
            </span>{" "}
            Applications
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-secondary sm:text-lg"
          >
            An 8-week cohort that takes you from Python and AI basics to
            LLMs, RAG, LangChain, CrewAI, LangGraph, orchestration, and no-code
            agent workflows — guided step by step. Ship 6+ portfolio projects
            and a capstone along the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-agent-gradient px-6 py-3 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.03]"
            >
              Reserve your seat
            </a>
            <a
              href="#curriculum"
              className="rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
            >
              See the curriculum
            </a>
          </motion.div>

          <p className="mt-6 text-sm text-ink-muted">
            Interactive live sessions · Recordings available
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AgentWorkflowDiagram />
        </motion.div>
      </div>
    </section>
  );
}
