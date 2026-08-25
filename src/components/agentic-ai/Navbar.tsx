"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#curriculum", label: "Curriculum" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-void/85 backdrop-blur-md border-b border-border-subtle" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#main" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-agent-gradient text-[11px] font-bold text-void">
            A
          </span>
          Building Agentic AI Applications
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-secondary transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full bg-agent-gradient px-4 py-2 text-sm font-medium text-void shadow-glow transition-transform hover:scale-[1.03]"
        >
          Reserve a seat
        </a>
      </div>
    </header>
  );
}
