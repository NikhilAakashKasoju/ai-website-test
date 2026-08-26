"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { REGISTER_URL } from "@/lib/data";

const links = [
  { href: "#curriculum", label: "Curriculum" },
  { href: "#pricing", label: "Pricing" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // One scroll listener drives both the header background and the active link,
  // so we never run two observers over the same event.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // The section whose top has most recently passed under the header wins.
      const marker = window.scrollY + 140;
      let current: string | null = null;
      for (const link of links) {
        const el = document.querySelector(link.href);
        if (el instanceof HTMLElement && el.offsetTop <= marker) current = link.href;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  // The browser's native anchor scroll gets cancelled when the mobile menu
  // collapses out from under the link, so drive the scroll ourselves. The
  // offset clears the sticky header; if JS fails the plain href still works.
  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) return;

    e.preventDefault();
    const wasOpen = menuOpen;
    setMenuOpen(false);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Wait out the menu collapse so the target's final offset is correct.
    window.setTimeout(
      () => {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 112,
          behavior: reduced ? "auto" : "smooth",
        });
        history.replaceState(null, "", href);
      },
      wasOpen ? 280 : 0
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-border-subtle bg-void/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Wordmark left, links + CTA grouped together on the right. */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 sm:h-20 md:h-24">
        <a
          href="#main"
          className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight text-ink"
        >
          <Image
            src="/logos/efn platform logo new.png"
            alt="edufulness"
            width={1536}
            height={1024}
            priority
            // Without this Next serves a 3840px variant of a logo that renders
            // at ~110px. Costs real bandwidth on a free instance.
            sizes="(min-width: 768px) 110px, 70px"
            className="h-11 w-auto shrink-0 sm:h-14 md:h-[72px]"
          />
          <span className="hidden whitespace-nowrap lg:inline">
            Building Agentic AI Applications
          </span>
          {/* Below sm the logo alone carries the brand — the CTA and menu
              button need the width more than a second wordmark does. */}
          <span className="hidden whitespace-nowrap sm:inline lg:hidden">
            Agentic AI
          </span>
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          <nav className="mr-1 hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? "text-ink" : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-agent-gradient px-4 py-2 text-sm font-medium text-void shadow-glow transition-transform hover:scale-[1.03]"
          >
            Reserve a seat
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-ink transition-colors hover:bg-surface md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border-subtle md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col px-6 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={active === link.href ? "true" : undefined}
                  className={`rounded-lg px-3 py-3 text-sm transition-colors ${
                    active === link.href
                      ? "bg-surface text-ink"
                      : "text-ink-secondary hover:bg-surface hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
