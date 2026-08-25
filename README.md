# Building Agentic AI Applications — Course Page

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion, built to match
the visual design language of edufulness.com/dsa (dark theme, gradient/glow
accents, expandable curriculum cards, animated stat counters).

## Setup

```bash
npm install
npm run dev
```

Page lives at `/agentic-ai` (the root `/` redirects there for convenience —
change or remove that redirect once this is merged into your main site).

## Structure

```
src/
  app/
    layout.tsx          # fonts + metadata
    globals.css          # base styles, focus states, reduced-motion
    agentic-ai/page.tsx  # assembles all sections
  components/agentic-ai/
    Navbar.tsx
    Hero.tsx              # signature element: animated agent reasoning-loop diagram
    StatsBar.tsx
    Curriculum.tsx         # 8-week expandable accordion
    Projects.tsx
    Skills.tsx
    Instructors.tsx        # ⚠️ placeholder content, see below
    FAQ.tsx
    Contact.tsx             # form ready for your PHP endpoint
    Footer.tsx
  lib/
    data.ts               # ALL course copy lives here — curriculum, projects, skills, FAQ
    useCountUp.ts           # stat counter animation hook
tailwind.config.ts          # design tokens: colors, gradients, shadows
```

## Things to fill in before launch

1. **Instructor bios** (`Instructors.tsx`) — currently placeholder text with a
   dashed border so it's obviously unfinished. Swap in real names, photos,
   bios, and stats.
2. **Reviews/testimonials** — no section built yet since there's no content
   for this course yet. Add a `Testimonials.tsx` modeled on `Projects.tsx`
   once you have real reviews (Udemy or otherwise).
3. **Contact form backend** — `Contact.tsx` posts JSON to
   `NEXT_PUBLIC_CONTACT_ENDPOINT`. Point that at your PHP endpoint via
   `.env.local`:
   ```
   NEXT_PUBLIC_CONTACT_ENDPOINT=https://your-api.com/contact.php
   ```
   Until it's set, the form shows "Form endpoint not connected yet." instead
   of silently failing.
4. **Design tokens** — if you pull exact colors/fonts from the live DSA site
   (e.g. from its Tailwind config or computed styles), update
   `tailwind.config.ts` and the font imports in `layout.tsx`. Everything
   else references those tokens, so it's a small, centralized change.
5. **Codecademy reference removed** — the original FAQ mentioned Codecademy's
   "Getting Started with Python for Data Science" course; that's been dropped
   per your instruction, along with the codecademy.com course link.

## Notes on content

All curriculum dates/times from your cohort schedule were intentionally
stripped — the page shows week themes and topics only, not a fixed calendar,
so it stays evergreen across cohorts. If you want a live cohort date/countdown
on the page, that's a quick addition to the Hero.
