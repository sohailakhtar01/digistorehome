import Link from "next/link";
import { publishedHerbs } from "@/lib/herbs";
import { getHerbGuide } from "@/lib/herbGuides";
import { Breadcrumbs, PageHeader } from "@/components/ui";

export const metadata = {
  title: "Growing Guides",
  description:
    "Practical, species-specific growing guides for medicinal and kitchen herbs — including the ones that are genuinely difficult from seed.",
  alternates: { canonical: "/guides" },
};

export default function Page() {
  const herbs = publishedHerbs();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
        ]}
      />
      <PageHeader
        eyebrow="Guides"
        title="Growing guides"
        standfirst="Species-specific, practical guidance. We start with the plants that cause the most trouble, because that is where a guide is actually worth reading."
      />

      <ul className="mt-8 flex flex-col gap-5">
        <li>
          <Link
            href="/guides/medicinal-herbs-to-grow"
            data-plain
            className="group block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Overview
            </p>
            <h2 className="mt-2 font-serif text-xl font-semibold group-hover:text-accent">
              10 medicinal herbs to grow at home, ranked by difficulty
            </h2>
            <p className="mt-2.5 leading-relaxed text-muted">
              The honest ranking — which are foolproof, which have one specific
              catch, and which three need a month in the refrigerator before
              they will cooperate.
            </p>
          </Link>
        </li>

        <li>
          <Link
            href="/guides/cold-stratification"
            data-plain
            className="group block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Technique
            </p>
            <h2 className="mt-2 font-serif text-xl font-semibold group-hover:text-accent">
              Cold stratification: the four-week step that fixes stubborn seed
            </h2>
            <p className="mt-2.5 leading-relaxed text-muted">
              The refrigerator method step by step, which species actually need
              it, how long each one takes, and what to do when mould appears.
            </p>
          </Link>
        </li>

        <li>
          <Link
            href="/guides/harvesting-coneflower-seeds"
            data-plain
            className="group block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Technique
            </p>
            <h2 className="mt-2 font-serif text-xl font-semibold group-hover:text-accent">
              How to harvest coneflower seeds (echinacea)
            </h2>
            <p className="mt-2.5 leading-relaxed text-muted">
              When the cone is ready, how to get the seed out without shredding
              your hands, how to tell seed from chaff, and what viable echinacea
              seed actually looks like.
            </p>
          </Link>
        </li>

        {herbs.map((h) => {
          const guide = getHerbGuide(h.slug);
          return (
            <li key={h.slug}>
              <Link
                href={`/guides/${h.slug}`}
                data-plain
                className="group block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {h.difficulty} · {h.lifecycle}
                </p>
                <h2 className="mt-2 font-serif text-xl font-semibold group-hover:text-accent">
                  {guide.title}
                </h2>
                <p className="mt-2.5 leading-relaxed text-muted">
                  {guide.standfirst}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-sm leading-relaxed text-subtle">
        Guides for the remaining species are being written. We would rather
        publish two good ones than ten thin ones.
      </p>
    </div>
  );
}
