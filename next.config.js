/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger Premium is Apache + PHP with no Node runtime, so the site is
  // exported to plain HTML/CSS/JS that gets uploaded to public_html.
  output: "export",

  // The site lives at edufulness.com/agentic-ai, not at the domain root.
  // basePath rewrites every internal route and asset URL to sit under that
  // folder — without it every /_next/... request 404s once uploaded.
  basePath: "/agentic-ai",

  // Emits /agentic-ai/index.html rather than /agentic-ai.html, which is what
  // Apache serves when someone visits the directory.
  trailingSlash: true,

  // There is no Node server to run the image optimiser, so images are served
  // exactly as they sit in /public.
  images: { unoptimized: true },
};

module.exports = nextConfig;
