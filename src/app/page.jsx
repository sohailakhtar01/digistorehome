import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { byDifficulty, PUBLISHED_HERB_GUIDES } from "@/lib/herbs";
import { REVIEWS } from "@/lib/reviews";
import { PRODUCT_IMAGES, getHerbImage } from "@/lib/media";
import { getHerbGuide } from "@/lib/herbGuides";
import { DifficultyBadge } from "@/components/ui";

export const metadata = {
  // Brand-first: this is the page that should win a search for the site name.
  title: `${SITE.name} — Honest Homesteading Reviews`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  const ranked = byDifficulty();
  const hard = ranked.filter((h) => h.difficulty === "Hard");
  const featured = REVIEWS[0];

  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero */}
      <section className="grid items-center gap-10 border-b border-line py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4">Independent reviews</p>
          <h1 className="text-[2.25rem] leading-[1.12] sm:text-[3.1rem] sm:leading-[1.08]">
            We tell you what you actually get before you spend the money.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            The Homestead Shelf reviews gardening, homesteading and preparedness
            products the way a friend who already owns one would: what is in the
            box, what the sales page glosses over, and who should not buy it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/reviews/${featured.slug}`}
              data-plain
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-all hover:bg-accent-hover hover:shadow-[var(--shadow-lg)]"
            >
              Read the latest review
            </Link>
            <Link
              href="/guides"
              data-plain
              className="inline-flex items-center rounded-lg border border-line-strong px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-surface-sunk"
            >
              Growing guides
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lg)]">
            <Image
              src={PRODUCT_IMAGES.hero.src}
              alt={PRODUCT_IMAGES.hero.alt}
              width={PRODUCT_IMAGES.hero.width}
              height={PRODUCT_IMAGES.hero.height}
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="h-auto w-full"
            />
          </div>
          <p className="mt-2.5 text-xs text-subtle">
            Currently reviewing: the Medicinal Garden Kit.
          </p>
        </div>
      </section>

      {/* Featured review */}
      <section className="border-b border-line py-14">
        <p className="eyebrow mb-3">Latest review</p>
        <Link
          href={`/reviews/${featured.slug}`}
          data-plain
          className="group grid gap-6 rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-sm)] transition-all hover:border-accent hover:shadow-[var(--shadow-md)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"
        >
          <div>
            <h2 className="font-serif text-2xl font-semibold group-hover:text-accent sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              {featured.standfirst}
            </p>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
              <span className="font-serif text-lg font-semibold text-foreground">
                {featured.rating}/5
              </span>
              <span aria-hidden="true">·</span>
              <span>{featured.priceLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Updated {featured.updatedLabel}</span>
            </p>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform group-hover:translate-x-1 sm:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </section>

      {/* Differentiators */}
      <section className="border-b border-line py-14">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          What we do differently
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "We say when something is hard",
              body: `${hard.length} of the ten herbs in the Medicinal Garden Kit are genuinely difficult from seed. Most reviews do not mention it. That is the kind of thing that decides whether you are happy with a purchase.`,
            },
            {
              title: "We do not claim tests we did not run",
              body: "If we have not grown it, planted it or used it, we say so on the page. No invented trials, no stock photography passed off as our own results.",
            },
            {
              title: "We check the claims",
              body: "Credentials get verified against primary sources. Where other reviews repeat something inaccurate, we correct it and show our working.",
            },
          ].map((c) => (
            <div key={c.title}>
              <div
                aria-hidden="true"
                className="mb-4 h-0.5 w-10 rounded-full bg-accent"
              />
              <h3 className="font-serif text-lg font-semibold">{c.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Herb grid */}
      <section className="border-b border-line py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Ten medicinal herbs, ranked honestly
            </h2>
            <p className="mt-2.5 max-w-2xl leading-relaxed text-muted">
              Not all of these are beginner-friendly. Three need a month in the
              refrigerator before they will cooperate.
            </p>
          </div>
          <Link
            href="/guides/medicinal-herbs-to-grow"
            data-plain
            className="text-sm font-semibold text-accent underline underline-offset-4"
          >
            See the full ranking
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {ranked.map((h) => {
            const img = getHerbImage(h.slug);
            const linked = PUBLISHED_HERB_GUIDES.includes(h.slug);
            const inner = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-sunk">
                  {img ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="p-3">
                  <p className="font-serif text-sm font-semibold leading-snug">
                    {h.name.split(" (")[0]}
                  </p>
                  <div className="mt-1.5">
                    <DifficultyBadge level={h.difficulty} />
                  </div>
                </div>
              </>
            );
            return (
              <li key={h.slug}>
                {linked ? (
                  <Link
                    href={`/guides/${h.slug}`}
                    data-plain
                    className="group block overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-md)]"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="group block overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-sm)]">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Guides */}
      <section className="py-14">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
          Growing guides
        </h2>
        <p className="mt-2.5 max-w-2xl leading-relaxed text-muted">
          Practical, species-specific guidance — starting with the two that cause
          the most trouble.
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {PUBLISHED_HERB_GUIDES.map((slug) => {
            const guide = getHerbGuide(slug);
            const img = getHerbImage(slug);
            return (
              <li key={slug}>
                <Link
                  href={`/guides/${slug}`}
                  data-plain
                  className="group flex h-full gap-4 overflow-hidden rounded-xl border border-line bg-surface p-4 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-md)]"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-sunk">
                    {img ? (
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-base font-semibold leading-snug group-hover:text-accent">
                      {guide.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">
                      {guide.standfirst}
                    </p>
                    <p
                      aria-hidden="true"
                      className="mt-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-accent"
                    >
                      Read the guide
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
