"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Email signup.
 *
 * The reason this exists is seasonal, not decorative. Search demand for these
 * species is wildly seasonal — coneflower seed runs about 9,900 a month in
 * December against 49,500 in April — so most people who read a growing guide
 * in autumn are not going to buy seed for another five months. Without a list
 * that reader is gone. With one, autumn traffic is still reachable in spring,
 * which is when it converts.
 *
 * What is promised here has to stay small enough to actually deliver. "A few
 * emails a year when the sowing windows open" is honest and keepable. Promising
 * a personalised reminder schedule would not be, until the automation behind it
 * genuinely exists.
 */
export default function EmailCapture({
  heading = "Get a nudge when it is time to sow",
  blurb = "Most of these seeds are started months before anything happens in the garden, and the window is easy to miss. We send a short email when each one opens.",
  cta = "Email me the sowing windows",
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setState("done");
        setEmail("");
      } else {
        setState("error");
        setError(data.error ?? "Something went wrong. Try again in a moment.");
      }
    } catch {
      setState("error");
      setError("Could not reach the server. Check your connection.");
    }
  }

  if (state === "done") {
    return (
      <aside className="not-prose my-8 rounded-xl border border-accent/30 bg-accent-soft px-5 py-6">
        <p className="font-serif text-lg font-semibold">You are on the list.</p>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
          Check your inbox for a confirmation. If it is not there in a few
          minutes it will be in spam, and marking it &ldquo;not spam&rdquo; is
          the only way the later ones arrive.
        </p>
      </aside>
    );
  }

  return (
    <aside className="not-prose my-8 rounded-xl border border-line-strong bg-surface-sunk px-5 py-6">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
        Seasonal reminders
      </p>
      <h2 className="mt-2 font-serif text-xl font-semibold leading-snug">
        {heading}
      </h2>
      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{blurb}</p>

      <form onSubmit={onSubmit} className="mt-4">
        {/* Honeypot: never shown, never announced, never tabbable. */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <label htmlFor="ec-email" className="sr-only">
            Email address
          </label>
          <input
            id="ec-email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={state === "error" || undefined}
            aria-describedby={state === "error" ? "ec-error" : undefined}
            className="min-w-0 flex-1 rounded-lg border border-line-strong bg-surface px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/25"
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="shrink-0 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === "sending" ? "Adding you…" : cta}
          </button>
        </div>

        {state === "error" ? (
          <p id="ec-error" role="alert" className="mt-2.5 text-sm text-crimson">
            {error}
          </p>
        ) : null}

        <p className="mt-3 text-xs leading-relaxed text-subtle">
          A few emails a year, when the windows open. No selling your address on,
          unsubscribe in one click.{" "}
          <Link
            href="/privacy"
            className="underline decoration-line-strong underline-offset-2 transition-colors hover:decoration-accent"
          >
            Privacy
          </Link>
          .
        </p>
      </form>
    </aside>
  );
}
