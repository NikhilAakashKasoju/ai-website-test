// The sub-folder the site is served from: edufulness.com/agentic-ai
//
// ⚠️ Keep this in sync with `basePath` in next.config.js. They cannot import
// each other — next.config.js is CommonJS and loads before TypeScript exists.
//
// Why this file is needed at all: Next rewrites routes and /_next/* asset URLs
// for basePath automatically, but with `images: { unoptimized: true }` (which
// static export forces) the <Image> component emits its `src` verbatim. So
// every image in /public must be prefixed by hand or it 404s once uploaded.
export const BASE_PATH = "/agentic-ai";

/** Prefix a /public path with the base path. asset("/logos/x.png") → "/agentic-ai/logos/x.png" */
export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path; // already absolute
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}
