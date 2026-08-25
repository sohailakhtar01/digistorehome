import Link from "next/link";
import { REVIEWS } from "@/lib/reviews";
import { Breadcrumbs, PageHeader } from "@/components/ui";

export const metadata = {
  title: "Product Reviews",
  description:
    "Independent, research-based reviews of homesteading, gardening and preparedness products. What is in the box, what the sales page glosses over, and who should skip it.",
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

      <p className="mt-10 text-sm leading-relaxed text-subtle">
        More reviews are in progress. We publish one when it is genuinely
        finished rather than filling the page with stubs.
      </p>
    </div>
  );
}
