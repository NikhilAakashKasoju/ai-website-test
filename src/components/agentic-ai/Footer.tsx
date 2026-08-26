export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              Building Agentic AI Applications
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              An 8-week live cohort on generative AI and agentic systems.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted">On this page</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-secondary">
              <li><a href="#curriculum" className="hover:text-ink">Curriculum</a></li>
              <li><a href="#projects" className="hover:text-ink">Projects</a></li>
              <li><a href="#skills" className="hover:text-ink">Skills</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted">Join</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-secondary">
              <li><a href="#register" className="hover:text-ink">Reserve your seat</a></li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-xs text-ink-muted">
          © {new Date().getFullYear()} Building Agentic AI Applications. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
