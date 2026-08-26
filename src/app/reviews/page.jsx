import Link from "next/link";
import { REVIEWS } from "@/lib/reviews";
import { Breadcrumbs, PageHeader } from "@/components/ui";

export const metadata = {
  title: "Product Reviews",
  description:
    "Independent reviews of homesteading and gardening products: what is in the box, what the sales page glosses over, and who should skip it.",
  alternates: { canonical: "/reviews" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/reviews", label: "Reviews" },
        ]}
      />
      <PageHeader
        eyebrow="Reviews"
        title="Product reviews"
        standfirst="We buy, research and check before we recommend. Where we have not tested something ourselves, the review says so on the page."
      />

      <ul className="mt-8 flex flex-col gap-5">
        {REVIEWS.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/reviews/${r.slug}`}
              data-plain
              className="group block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {r.category}
              </p>
              <h2 className="mt-2 font-serif text-xl font-semibold group-hover:text-accent">
                {r.title}
              </h2>
              <p className="mt-2.5 leading-relaxed text-muted">{r.standfirst}</p>
              <p className="mt-4 text-sm text-subtle">
                {r.rating}/5 · {r.priceLabel} · Updated {r.updatedLabel}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="prose-shelf mt-14 border-t border-line pt-10">
        <h2>How a product gets reviewed here</h2>
        <p>
          The homesteading and preparedness market runs on urgency. Countdown
          timers, &ldquo;last kits available&rdquo; banners, and a long tail of
          review sites that simply restate the sales page in the third person.
          A review is only worth writing if it tells you something the seller
          would rather you did not know before you paid.
        </p>
        <p>So every review here has to do four things.</p>
        <ul>
          <li>
            <strong>Say what is actually in the box.</strong> Counts, formats,
            what is physical and what is a download, and where the numbers on
            the sales page disagree with the current packaging.
          </li>
          <li>
            <strong>Check the expert.</strong> When a product is sold on
            somebody&apos;s credentials, those credentials get verified against
            primary sources. Where other sites have them wrong, we say so and
            show the correction.
          </li>
          <li>
            <strong>Name who should not buy it.</strong> A review with no
            &ldquo;skip this if&rdquo; section is an advert. Every review here
            has one, and it is written before the recommendation.
          </li>
          <li>
            <strong>Separate research from testing.</strong> Where a product has
            not been used or grown by us, the review says so in plain language
            on the page rather than in small print at the bottom.
          </li>
        </ul>

        <h2>What is not here</h2>
        <p>
          There is one review on this page. That is deliberate — a new site with
          forty reviews has researched none of them properly, and it shows.
          Reviews go up when they are finished.
        </p>
        <p>
          In the meantime, the{" "}
          <Link href="/guides">growing guides</Link> cover the individual plants
          in far more depth than any review can, and the{" "}
          <Link href="/about">about page</Link> sets out who writes this and what
          the rules are.
        </p>
      </section>
    </div>
  );
}
