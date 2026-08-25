"use client";

import { FormEvent, useState } from "react";

// Set NEXT_PUBLIC_CONTACT_ENDPOINT once the PHP backend is live, e.g.
// NEXT_PUBLIC_CONTACT_ENDPOINT=https://api.yoursite.com/contact.php
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!CONTACT_ENDPOINT) {
      // No backend wired up yet — mirrors the reference site's behavior.
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan">/ Ready to start?</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Build agents, not just prompts.
        </h2>
        <p className="mt-4 max-w-xl text-ink-secondary">
          Leave your details and we&apos;ll reach out with what the bootcamp
          covers, how it&apos;s taught, and how to reserve your spot.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label htmlFor="name" className="mb-2 block text-sm text-ink-secondary">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-cyan"
            />
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="email" className="mb-2 block text-sm text-ink-secondary">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-cyan"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-2 block text-sm text-ink-secondary">
              Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full resize-none rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-cyan"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-agent-gradient px-6 py-3 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Submit"}
            </button>

            {status === "success" && (
              <p className="mt-3 text-sm text-cyan">Thanks — we&apos;ll be in touch soon.</p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-ink-muted">
                {CONTACT_ENDPOINT
                  ? "Something went wrong — please try again."
                  : "Form endpoint not connected yet."}
              </p>
            )}
          </div>
        </form>

        <p className="mt-6 text-xs text-ink-muted">
          We store your name and email only to reply about this course.
        </p>
      </div>
    </section>
  );
}
