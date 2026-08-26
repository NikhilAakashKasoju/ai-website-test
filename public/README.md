# public/

Anything in this folder is served from the site root. A file at
`public/logos/edufulness.svg` is reachable at `/logos/edufulness.svg`.

Drop your images in, then point the code at them as described below.
Nothing here is required for the site to build — every image has a
fallback, so you can add them one at a time.

---

## 1. Tab logo (favicon)

Currently wired to your original logo, untouched:

```
public/logos/efn favicon logo new.png
```

It is referenced from `src/app/layout.tsx` via the `icons` field. The
spaces in the filename have to be percent-escaped in a URL, which is why
it reads `efn%20favicon%20logo%20new.png` there.

To swap in a different file, drop it in `public/logos/` and change those
two lines. If the new filename has spaces, escape them the same way — or
rename the file without spaces and skip the escaping entirely.

> Do **not** put a file at `src/app/icon.png`. That is a Next.js file
> convention and it silently overrides the `icons` field in layout.tsx.

## 2. Instructor headshots

Currently wired to your originals, untouched:

```
public/instructors/Atchyut instructor.png
public/instructors/satyajit_pattnaik.png
```

The paths live in `src/lib/data.ts` on each instructor's `photo` field.
Set `photo` to an empty string and that card falls back to a gradient
initials circle instead.

They render inside a 64px circle with `object-cover`, so square-ish
sources crop best.

## 3. Site / brand logos

Put them here:

```
public/logos/logo.svg          — full wordmark
public/logos/logo-mark.svg     — square mark only
```

SVG is strongly preferred (sharp at every size, tiny file). To use the
mark in the navbar, open `src/components/agentic-ai/Navbar.tsx` and
replace the gradient `A` span:

```tsx
<span className="flex h-7 w-7 ... bg-agent-gradient ...">A</span>
```

with:

```tsx
<Image src="/logos/logo-mark.svg" alt="" width={28} height={28} className="h-7 w-7 shrink-0" />
```

and add `import Image from "next/image";` at the top of the file.

---

## 4. Social preview image (optional but worth it)

```
public/og-image.png    — 1200×630
```

This is what renders when someone shares the link on WhatsApp, LinkedIn
or X. Without it, shared links show a blank grey box. Once added, wire it
up in `src/app/layout.tsx`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: "Building Agentic AI Applications — Live Cohort",
  description: "...",
  openGraph: {
    images: ["/og-image.png"],
  },
};
```

---

## Formats

- **SVG** for logos and icons — scales perfectly, smallest file.
- **WebP** or **JPG** for photographs. Keep headshots under ~200 KB.
- **PNG** only when you need transparency on a non-vector image.
