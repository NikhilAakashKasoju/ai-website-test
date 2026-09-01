"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
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

// The other edufulness cohorts, shown in the "Courses" dropdown. This page's
// own course is deliberately absent — the footer follows the same rule and
// never links a page to itself. The dot colours echo each course's flagship
// section on edufulness.com, so the two surfaces agree.
//
// These are sibling pages on the same domain, so they open in the SAME tab:
// this is site navigation, not an outbound reference, and target="_blank"
// on your own site just litters people's tab bars.
const COURSES = [
  {
    label: "Azure Data Engineering",
    href: "https://edufulness.com/data-engineering",
    dot: "#2F74F0",
  },
  {
    label: "Data Structures and Algorithms",
    href: "https://edufulness.com/dsa",
    dot: "#F0B429",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Courses dropdown. Opens on click (touch + keyboard) and on mouse hover,
// closes on Escape, outside pointerdown, or focus leaving the group.
// ─────────────────────────────────────────────────────────────────────────────
function CoursesMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>();
  const reduced = useReducedMotion();

  // "Pinned" = opened deliberately by click or keyboard, rather than by the
  // mouse passing over. Without this, hovering opens the menu and the click
  // that follows reads as a toggle and shuts it again — so a user who hovers
  // and then clicks to open it watches it snap closed. Pinned menus ignore
  // mouse-leave and only close on click, Escape, outside press or blur.
  const pinned = useRef(false);

  const shut = () => {
    pinned.current = false;
    setOpen(false);
  };

  // Hover-close is delayed so the diagonal trip from the button down to the
  // panel doesn't dismiss the menu mid-travel.
  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (pinned.current) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) shut();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      shut();
      btnRef.current?.focus(); // Escape must land focus somewhere sensible.
    };

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && openNow()}
      onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
      // Tabbing past the last item closes the menu behind you.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) shut();
      }}
    >
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="courses-menu"
        onClick={() => {
          // Only a click on an already-pinned menu closes it; a click on a
          // hover-opened one pins it instead of dismissing it.
          if (open && pinned.current) shut();
          else {
            pinned.current = true;
            openNow();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            pinned.current = true;
            setOpen(true);
            // Wait for the panel to mount before reaching into it.
            requestAnimationFrame(() =>
              panelRef.current?.querySelector("a")?.focus()
            );
          }
        }}
        className={`inline-flex min-h-[44px] items-center gap-1 rounded-full px-3 text-[14px] font-medium transition-colors duration-200 ${
          open ? "text-nav-ink" : "text-nav-muted hover:text-nav-ink"
        }`}
      >
        Courses
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="courses-menu"
            role="menu"
            aria-label="Other courses"
            initial={{ opacity: 0, y: reduced ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            // w-max, not a fixed width: the panel sizes to its longest
            // label, so "Data Structures and Algorithms" stays on one line
            // whatever metrics the font lands with. min/max keep it sane.
            className="absolute right-0 top-full z-50 w-max min-w-[15rem] max-w-[22rem] overflow-hidden rounded-xl border border-border-subtle bg-surface p-1.5 shadow-xl shadow-black/40"
          >
            <p className="px-3 pb-1.5 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Also from edufulness
            </p>
            {COURSES.map((course) => (
              <a
                key={course.href}
                href={course.href}
                role="menuitem"
                onClick={shut}
                className="flex min-h-[40px] items-center gap-2.5 rounded-lg px-3 py-2 text-[14px] font-medium leading-snug text-nav-muted transition-colors hover:bg-surface-hover hover:text-nav-ink focus-visible:bg-surface-hover focus-visible:text-nav-ink"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: course.dot }}
                  aria-hidden="true"
                />
                {course.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          {/* lg, not md: with "Courses" added, five items + the long brand
              title + the CTA overflow a 768px bar. Below lg it all lives in
              the drawer instead. */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "true" : undefined}
                  // Colour is the only thing that moves — dim by default,
                  // white on hover and while you are inside that section.
                  // No pill, no weight change: the DSA header keeps
                  // `font-medium` fixed and swaps text-muted -> text-text.
                  className={`inline-flex min-h-[44px] items-center rounded-full px-3 text-[14px] font-medium transition-colors duration-200 ${
                    isActive ? "text-nav-ink" : "text-nav-muted hover:text-nav-ink"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <CoursesMenu />
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
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface/60 text-nav-ink transition-colors hover:border-border-strong lg:hidden"
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
            className="overflow-hidden border-t border-border-subtle lg:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col px-6 py-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={active === link.href ? "true" : undefined}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-[14px] font-medium transition-colors duration-200 ${
                    active === link.href
                      ? "text-nav-ink"
                      : "text-nav-muted hover:text-nav-ink"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              {/* No nested dropdown on touch — two extra rows behind a
                  disclosure would be more tapping for less. */}
              <p className="mt-2 border-t border-border-subtle px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                Also from edufulness
              </p>
              {COURSES.map((course) => (
                <a
                  key={course.href}
                  href={course.href}
                  className="flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 text-[14px] font-medium text-nav-muted transition-colors duration-200 hover:text-nav-ink"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: course.dot }}
                    aria-hidden="true"
                  />
                  {course.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
