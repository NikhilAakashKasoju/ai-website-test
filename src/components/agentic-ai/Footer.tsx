import Image from "next/image";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { asset } from "@/lib/site";

// ─────────────────────────────────────────────────────────────────────────────
// Shared edufulness footer. Everything site-specific sits in the constants
// below, so this file can be dropped into the DSA and Data Engineering sites
// by changing only CURRENT_COURSE, PAGE_LINKS and the blurb.
// ─────────────────────────────────────────────────────────────────────────────

const CURRENT_COURSE = "agentic-ai";

const COURSES = [
  { slug: "agentic-ai", label: "Agentic AI", href: "https://edufulness.com/agentic-ai" },
  { slug: "dsa", label: "Data Structures and Algorithms", href: "https://edufulness.com/dsa" },
  {
    slug: "data-engineering",
    label: "Azure Data Engineering",
    href: "https://edufulness.com/data-engineering",
  },
];

// Sections that actually exist on this page.
const PAGE_LINKS = [
  { href: "#curriculum", label: "Curriculum" },
  { href: "#pricing", label: "Pricing" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#instructors", label: "Instructors" },
  { href: "#register", label: "Register" },
];

// Set to "" to hide the row rather than render a dead link.
const WHATSAPP_CHANNEL =
  "https://www.whatsapp.com/channel/0029Val125n2UPBNAPAprU1G";

const currentCourse = COURSES.find((c) => c.slug === CURRENT_COURSE);
// Never link the page to itself under "Elsewhere".
const otherCourses = COURSES.filter((c) => c.slug !== CURRENT_COURSE);

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
      {children}
    </p>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    // `inline`, not inline-flex: on a label that wraps to two lines, flex
    // strands the arrow at the far right of the column instead of keeping it
    // beside the last word.
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline text-sm text-ink-secondary transition-colors hover:text-ink"
    >
      {label}
      <ArrowUpRight
        className="ml-1 inline h-3.5 w-3.5 align-[-2px] text-ink-muted transition-colors duration-200 group-hover:text-cyan"
        aria-hidden="true"
      />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-subtle">
      {/* faint dot texture, fading downward */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid bg-dot-grid opacity-25"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8">
          {/* brand */}
          <div className="lg:pr-8">
            <div className="flex items-center gap-2">
              <Image
                src={asset("/logos/efn platform logo new.png")}
                alt="edufulness"
                width={1536}
                height={1024}
                sizes="140px"
                className="h-12 w-auto shrink-0"
              />
              <span className="whitespace-nowrap text-sm text-ink-secondary">
                / {currentCourse?.label ?? "Agentic AI"}
              </span>
            </div>

            <p className="mt-5 font-display text-base text-ink">Think. Learn. Evolve.</p>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-secondary">
              A 12-week live cohort on building agentic AI systems — from Python
              and LLM fundamentals through RAG, LangChain and n8n, to agents you
              can put in production.
            </p>
          </div>

          {/* on this page */}
          <div>
            <ColumnHeading>On this page</ColumnHeading>
            <ul className="mt-4 space-y-3">
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-secondary transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* other edufulness courses */}
          <div>
            <ColumnHeading>Elsewhere</ColumnHeading>
            <ul className="mt-4 space-y-3">
              {otherCourses.map((course) => (
                <li key={course.slug}>
                  <ExternalLink href={course.href} label={course.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-ink-secondary">Atchyut Kumar</li>
              <li>
                <ExternalLink href="https://edufulness.com" label="edufulness.com" />
              </li>
              {WHATSAPP_CHANNEL && (
                <li>
                  <ExternalLink href={WHATSAPP_CHANNEL} label="WhatsApp channel" />
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            © {new Date().getFullYear()} edufulness. All rights reserved.
          </p>

          <a
            href="#main"
            className="group inline-flex items-center gap-1.5 self-start font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink sm:self-auto"
          >
            Back to top
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
