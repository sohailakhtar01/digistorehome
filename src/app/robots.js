import { SITE } from "@/lib/site";

/**
 * AI crawlers are allowed deliberately.
 *
 * The Bing SERPs this site targets carry a Copilot answer box that cites its
 * sources, and being one of those cited sources is a visibility channel rather
 * than a leak. The same reasoning applies to ChatGPT Search, Perplexity and
 * Claude. Blocking them would forfeit that for no gain — the content is public
 * either way, and citation is how a small site gets discovered.
 *
 * Revisit this if the site ever publishes something it does not want quoted.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
];

// Scrapers that provide no discovery value and only harvest competitive data.
const BLOCKED = ["SemrushBot", "AhrefsBot", "MJ12bot", "DotBot", "PetalBot"];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing here is private; these simply keep noise out of the index.
        disallow: ["/api/", "/_next/static/chunks/"],
      },
      // Named explicitly so the policy is legible to a human reading the file.
      { userAgent: ["Googlebot", "Bingbot"], allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
      { userAgent: BLOCKED, disallow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
