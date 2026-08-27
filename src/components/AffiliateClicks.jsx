"use client";

import { useEffect } from "react";

/**
 * Reports affiliate link clicks to Clarity as custom events.
 *
 * This is the number that predicts Digistore earnings. Page views say how many
 * people arrived; only the outbound click says how many were persuaded, and
 * everything between the two — which guide they landed on, whether they
 * reached the review, whether they scrolled as far as a CTA — is guesswork
 * without it.
 *
 * Each link already carries its own campaign token in the URL, so the event
 * name distinguishes the placements from each other. Digistore24 reports which
 * placement earned a *sale*; this reports which placement earned a *click*.
 * The gap between the two is the sales page's problem, not ours, and knowing
 * which of the two is leaking is the difference between fixing the right thing
 * and guessing.
 *
 * One delegated listener rather than handlers on each link: the links are
 * rendered by server components and adding a click handler to each would make
 * every one of them a client component for no benefit.
 */
export default function AffiliateClicks() {
  useEffect(() => {
    function onClick(e) {
      const link = e.target?.closest?.('a[href*="digistore24.com/redir/"]');
      if (!link) return;

      // .../redir/<product>/<affiliate>/<campaign>
      const campaign = link.href.split("/").filter(Boolean).pop() ?? "unknown";

      // Optional chaining throughout: Clarity is blocked by plenty of ad
      // blockers, and a tracking failure must never break an outbound click.
      try {
        window.clarity?.("event", `affiliate-click-${campaign}`);
      } catch {
        /* analytics is never worth breaking the page for */
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
