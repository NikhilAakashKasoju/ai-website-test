import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const TITLE = "Building Agentic AI Applications — Live Cohort";
const DESCRIPTION =
  "A 12-week live cohort taking you from Python and AI fundamentals to production-ready agentic systems with LangChain, LangGraph, CrewAI, and n8n.";

// The public origin, used for absolute URLs in social previews. Without a
// metadataBase, Next cannot build absolute URLs for social previews and logs
// a warning on every build.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://edufulness.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  // Tab logo — the original file in /public, unmodified. The %20 are the
  // spaces in the filename, which a URL has to escape. basePath is NOT applied
  // to metadata icons by Next, so the /agentic-ai prefix is written out here.
  icons: {
    icon: "/agentic-ai/logos/efn%20favicon%20logo%20new.png",
    apple: "/agentic-ai/logos/efn%20favicon%20logo%20new.png",
  },
  openGraph: {
    type: "website",
    siteName: "edufulness",
    title: TITLE,
    description: DESCRIPTION,
    url: "/agentic-ai",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
