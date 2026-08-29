"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { REGISTER_URL } from "@/lib/data";
import { asset } from "@/lib/site";

// ─────────────────────────────────────────────────────────────────────────────
// This header is matched to edufulness.com/dsa. Measured off the live DSA
// page and mirrored here:
//
//   bar height   h-[68px] lg:h-[76px]
//   logo         h-[28px] w-auto sm:h-[34px]   (560x174 wordmark)
//   course label font-body text-[12.5px] font-medium, #8A8A96
//   nav links    text-[14px] font-medium, #8A8A96 -> #F4F4F6 on hover
//   CTA          text-[14px] font-semibold, px-5 py-3 sm:py-2.5, rounded-full
//   tap targets  min-h-[44px] on every control
//
// Two things stay deliberately different, with reasons:
//   - container width. DSA is max-w-[1300px]; this page's sections are
//     max-w-6xl, and widening only the header would leave the logo hanging
//     outside the content column.
//   - CTA text color. DSA puts white on a dark blue gradient; this gradient
//     is light violet -> cyan, where white fails contrast, so the dark
//     `void` ink stays.
// ─────────────────────────────────────────────────────────────────────────────
const LOGO = {
  src: "/logos/efnlogo.png",
  width: 560,
  height: 174,
};

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
        // Measure the bar rather than hard-coding it: it is 68px tall below
        // lg and 76px from lg up, and a stale constant leaves headings
        // tucked under the header on one of the two.
        const bar =
          document.querySelector("header")?.getBoundingClientRect().height ?? 69;

        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - (bar + 16),
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
      <div className="mx-auto flex h-[68px] max-w-6xl items-center gap-4 px-6 lg:h-[76px]">
        {/* Brand lockup goes to the main edufulness site, not back up the page.
            "Back to top" lives in the footer for that. */}
        <a
          href="https://edufulness.com"
          aria-label="edufulness home"
          className="group flex min-h-[44px] shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Image
            src={asset(LOGO.src)}
            alt="edufulness"
            width={LOGO.width}
            height={LOGO.height}
            priority
            sizes="(min-width: 640px) 110px, 90px"
            className="h-[28px] w-auto shrink-0 sm:h-[34px]"
          />
          {/* Course label, styled exactly like the DSA one: body font,
              12.5px, medium, muted grey, with the leading slash. */}
          <span className="hidden whitespace-nowrap font-body text-[12.5px] font-medium text-nav-muted lg:inline">
            / Building Agentic AI Applications
          </span>
          {/* Below lg the long title would push the CTA off-screen. */}
          <span className="hidden whitespace-nowrap font-body text-[12.5px] font-medium text-nav-muted sm:inline lg:hidden">
            / Agentic AI
          </span>
        </a>

        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative inline-flex min-h-[44px] items-center rounded-full px-3 text-[14px] font-medium transition-colors ${
                    isActive ? "text-nav-ink" : "text-nav-muted hover:text-nav-ink"
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
            className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-full bg-agent-gradient px-5 py-3 text-[14px] font-semibold text-void shadow-glow transition-transform hover:scale-[1.03] sm:py-2.5"
          >
            Reserve a seat
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface/60 text-nav-ink transition-colors hover:border-border-strong md:hidden"
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
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-[14px] font-medium transition-colors ${
                    active === link.href
                      ? "bg-surface text-nav-ink"
                      : "text-nav-muted hover:bg-surface hover:text-nav-ink"
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
