"use client";

// If you have a headshot for Satyajit, drop it in /public and swap the
// gradient placeholder circle below for an <Image /> tag.

export default function Instructors() {
  return (
    <section id="instructors" className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">/ Your instructor</p>
      <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Taught by a practitioner, not a slide-reader
      </h2>

      <div className="mt-10 max-w-xl">
        <div className="grain-surface rounded-2xl border border-border-subtle bg-surface p-6">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-agent-gradient font-display text-lg font-semibold text-void"
              aria-hidden="true"
            >
              SP
            </div>
            <div>
              <h3 className="font-display text-base font-medium text-ink">
                Satyajit Pattnaik
              </h3>
              <p className="text-sm text-ink-muted">Lead AI and Data Consultant at PALO IT</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
            Satyajit is a Data and AI expert based in Hong Kong with 14+ years
            of experience across data analytics, machine learning, and
            generative AI, working with organizations spanning
            telecommunications, insurance, and e-commerce. Alongside his
            consulting work at PALO IT, he has taught data science, AI, and
            analytics to a large global audience through live cohorts and
            online courses.
          </p>
          <div className="mt-5 flex gap-6">
            <div>
              <div className="font-display text-xl font-semibold text-ink">14+</div>
              <div className="text-xs text-ink-muted">Years experience</div>
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-ink">200,000+</div>
              <div className="text-xs text-ink-muted">Learners taught</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
