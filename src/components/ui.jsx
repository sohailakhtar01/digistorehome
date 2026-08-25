import Link from "next/link";
import Image from "next/image";
import { AFFILIATE_LINK_PROPS } from "@/lib/affiliates";

/* ---------------------------------------------------------------------------
   Shared UI primitives.
   No countdown timers, no fake scarcity, no invented ratings. Ever.
   --------------------------------------------------------------------------- */

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PageHeader({ eyebrow, title, standfirst, meta }) {
  return (
    <header className="border-b border-line pb-9">
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h1 className="text-[2rem] leading-[1.16] sm:text-[2.7rem] sm:leading-[1.12]">
        {title}
      </h1>
      {standfirst ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {standfirst}
        </p>
      ) : null}
      {meta ? <p className="mt-5 text-sm text-subtle">{meta}</p> : null}
    </header>
  );
}

/** Image with an optional credit line. Credits are non-negotiable for CC media. */
export function Figure({
  src,
  alt,
  width,
  height,
  credit,
  caption,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 720px",
  className = "",
}) {
  return (
    <figure className={`not-prose my-8 ${className}`}>
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-sm)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-2.5 flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed text-subtle">
          {caption ? <span className="text-muted">{caption}</span> : null}
          {credit ? <span className="text-xs">{credit}</span> : null}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * FTC affiliate disclosure. Above the fold on every monetised page.
 * Clear and conspicuous — never a footer link.
 */
export function AffiliateDisclosure() {
  return (
    <aside
      className="flex gap-3 rounded-lg border border-line bg-surface-sunk px-4 py-3.5 text-sm leading-relaxed text-muted"
      aria-label="Affiliate disclosure"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
      </svg>
      <p>
        <strong className="font-semibold text-foreground">
          How we make money:
        </strong>{" "}
        we earn a commission if you buy through links on this page, at no extra
        cost to you. We only write about products we have researched, and a
        commission never changes our assessment.{" "}
        <Link href="/disclosure" className="underline underline-offset-2">
          Full disclosure
        </Link>
        .
      </p>
    </aside>
  );
}

export function MedicalDisclaimer() {
  return (
    <aside
      className="rounded-lg border border-gold/30 bg-gold-soft px-5 py-4 text-sm leading-relaxed text-muted"
      aria-label="Health information disclaimer"
    >
      <strong className="font-semibold text-foreground">
        Educational information only.
      </strong>{" "}
      Nothing on this page is medical advice, and nothing here is intended to
      diagnose, treat, cure or prevent any condition. Traditional or historical
      use of a plant is not evidence that it works. Plants can interact with
      medications. Talk to a qualified healthcare provider before using any
      herbal preparation, and never use a plant medicinally without expert
      identification.
    </aside>
  );
}

/**
 * Affiliate call to action.
 * `campaign` is required so Digistore24 reports which placement earned.
 */
export function AffiliateCTA({
  offer,
  campaign,
  label = "Check current price",
  sublabel,
  variant = "primary",
  align = "left",
}) {
  const href = offer.buildLink(campaign);
  const isPrimary = variant === "primary";

  return (
    <div
      className={`not-prose my-8 ${align === "center" ? "text-center" : ""}`}
    >
      <a
        href={href}
        {...AFFILIATE_LINK_PROPS}
        data-plain
        className={
          isPrimary
            ? "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-4 text-[0.95rem] font-semibold text-white no-underline shadow-[var(--shadow-md)] transition-all hover:bg-accent-hover hover:shadow-[var(--shadow-lg)]"
            : "inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-5 py-3 text-sm font-semibold text-accent no-underline transition-colors hover:bg-accent-soft"
        }
      >
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
      <p className="mt-2.5 text-xs text-subtle">
        {sublabel ?? "Affiliate link — opens the official product page."}
      </p>
    </div>
  );
}

/**
 * Purchase card. Sticky rail on large screens, inline on mobile.
 *
 * `showImage` defaults off: on mobile this card sits directly beneath the hero
 * figure, so repeating the photo both looks redundant and makes the browser
 * fetch a second copy of the same file at a different width.
 */
export function BuyCard({ offer, image, showImage = false }) {
  return (
    <aside className="not-prose overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-md)]">
      {showImage && image ? (
        <div className="border-b border-line bg-surface-sunk p-4">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="320px"
            className="h-auto w-full rounded-lg"
          />
        </div>
      ) : null}
      <div className="p-5">
        <h2 className="font-serif text-lg font-semibold leading-snug">
          {offer.name}
        </h2>
        <p className="mt-1 text-sm text-subtle">by {offer.creator}</p>

        <p className="mt-4 flex items-baseline gap-1.5">
          <span className="font-serif text-3xl font-semibold">
            ${offer.price}
          </span>
          <span className="text-sm text-subtle">+ ${offer.shipping} shipping</span>
        </p>

        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
          {[
            `${offer.seedPackets} heirloom seed packets`,
            "Printed growing & remedy guide",
            `${offer.guaranteeDays}-day money-back guarantee`,
            "One-time payment, no subscription",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
              >
                <path d="m20 6-11 11-5-5" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={offer.buildLink("sidebar")}
          {...AFFILIATE_LINK_PROPS}
          data-plain
          className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          Check current price
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
        <p className="mt-2 text-center text-xs text-subtle">
          Affiliate link. Price checked August 2026.
        </p>
      </div>
    </aside>
  );
}

export function VerdictBox({ rating, ratingBasis, verdict, bestFor, notFor, facts }) {
  return (
    <section
      aria-label="Verdict summary"
      className="not-prose overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[var(--shadow-md)]"
    >
      <div className="border-b border-line bg-accent px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-serif text-lg font-semibold text-white">
            Our verdict
          </h2>
          {rating ? (
            <p className="flex items-baseline gap-1.5 text-white/80">
              <span className="font-serif text-3xl font-semibold text-white">
                {rating}
              </span>
              <span className="text-sm">/ 5</span>
            </p>
          ) : null}
        </div>
        {ratingBasis ? (
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-white/70">
            {ratingBasis}
          </p>
        ) : null}
      </div>

      <div className="px-5 py-6 sm:px-6">
        <p className="text-[1.0625rem] leading-relaxed">{verdict}</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="eyebrow mb-2.5">Worth it if</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {bestFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                  >
                    <path d="m20 6-11 11-5-5" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-crimson">
              Skip it if
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {notFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-crimson"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {facts?.length ? (
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
                  {f.label}
                </dt>
                <dd className="mt-1 font-serif text-lg font-semibold">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

export function Callout({ tone = "note", title, children }) {
  const toned =
    tone === "warn"
      ? "border-gold/35 bg-gold-soft"
      : tone === "crimson"
        ? "border-crimson/25 bg-crimson-soft"
        : "border-line bg-surface-sunk";
  return (
    <aside className={`not-prose my-7 rounded-lg border ${toned} px-5 py-4.5`}>
      {title ? (
        <p className="mb-2 font-serif text-base font-semibold">{title}</p>
      ) : null}
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </aside>
  );
}

export function FAQ({ items }) {
  return (
    <div className="not-prose divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-base font-semibold">
            {item.question}
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-accent transition-transform group-open:rotate-45"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="mt-3 text-[0.95rem] leading-relaxed text-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-subtle">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 ? (
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
            ) : null}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-muted">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                data-plain
                className="transition-colors hover:text-accent"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Turn a heading into a stable anchor id. */
export const slugifyHeading = (s) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/**
 * On-page table of contents. Gives readers a way through a long guide, and
 * gives search engines named anchors to offer as jump-to links.
 */
export function TableOfContents({ headings, extra = [] }) {
  const items = [
    ...headings.map((h) => ({ id: slugifyHeading(h), label: h })),
    ...extra,
  ];
  return (
    <nav
      aria-label="On this page"
      className="not-prose my-8 rounded-xl border border-line bg-surface-sunk px-5 py-5"
    >
      <p className="eyebrow mb-3">On this page</p>
      <ol className="flex flex-col gap-2 text-[0.95rem]">
        {items.map((it, i) => (
          <li key={it.id} className="flex gap-2.5">
            <span aria-hidden="true" className="text-subtle tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${it.id}`}
              className="text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Difficulty pill used on herb cards and tables. */
export function DifficultyBadge({ level }) {
  const styles = {
    Easy: "bg-accent-soft text-accent-ink",
    Moderate: "bg-gold-soft text-[#7a5615]",
    Hard: "bg-crimson-soft text-crimson",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.08em] ${styles[level] ?? styles.Easy}`}
    >
      {level}
    </span>
  );
}
