"use client";

import { useEffect, useRef, useState } from "react";
import { AFFILIATE_LINK_PROPS } from "@/lib/affiliates";

/**
 * Persistent offer bar for small screens.
 *
 * Desktop has the sticky BuyCard in the rail. Mobile had nothing: once the
 * buy card near the top scrolled away there was no route to the offer until
 * the mid-page CTA, which on a review this long is a lot of scrolling with no
 * way to act on having been convinced.
 *
 * What this is not: there is no countdown, no stock counter, no "3 people are
 * viewing this". The bar states the price, the guarantee and where the link
 * goes. A reader who has decided gets a shorter path; a reader who has not is
 * not pressured, and nothing here claims anything that is not true.
 *
 * It appears only once `anchorId` has scrolled off the top of the screen, so
 * it never covers the offer while the offer is still on screen, and it carries
 * its own affiliate label — 16 CFR 255 wants disclosure close to the link, and
 * a persistent element can be read far from the disclosure at the top.
 */
export default function StickyOfferBar({
  anchorId,
  href,
  price,
  shipping,
  guaranteeDays,
  label = "Check current price",
}) {
  const [show, setShow] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // Only once the anchor has passed ABOVE the viewport. Without the
        // boundingClientRect check the bar also appears while the anchor is
        // still below the fold, which means showing it before the reader has
        // reached the offer at all.
        setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    io.observe(anchor);
    return () => io.disconnect();
  }, [anchorId]);

  return (
    <>
      {/* Keeps the bar from covering the end of the page. */}
      <div aria-hidden="true" className={show ? "h-24 lg:hidden" : "hidden"} />
      <div
        ref={barRef}
        role="region"
        aria-label="Medicinal Garden Kit offer"
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 py-3 shadow-[0_-4px_16px_-6px_rgba(26,24,21,0.18)] backdrop-blur transition-transform duration-200 lg:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl font-semibold">${price}</span>
              <span className="text-xs text-subtle">+ ${shipping} ship</span>
            </p>
            <p className="truncate text-[0.6875rem] text-subtle">
              {guaranteeDays}-day guarantee · affiliate link
            </p>
          </div>
          <a
            href={href}
            {...AFFILIATE_LINK_PROPS}
            data-plain
            tabIndex={show ? 0 : -1}
            aria-hidden={show ? undefined : true}
            className="shrink-0 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
          >
            {label}
          </a>
        </div>
      </div>
    </>
  );
}
