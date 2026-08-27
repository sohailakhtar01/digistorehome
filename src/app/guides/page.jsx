import { publishedHerbs } from "@/lib/herbs";
import { getHerbGuide } from "@/lib/herbGuides";
import { Breadcrumbs, KitCallout, LinkCard, PageHeader } from "@/components/ui";

export const metadata = {
  title: "Growing Guides",
  description:
    "Practical, species-specific growing guides for medicinal and kitchen herbs — including the ones that are genuinely difficult from seed.",
  alternates: { canonical: "/guides" },
};

// The four non-species guides, in the order a reader is most likely to need
// them: the overview first, then the technique that unblocks three species,
// then the tool, then the harvest guide.
const FEATURED = [
  {
    href: "/guides/medicinal-herbs-to-grow",
    eyebrow: "Overview",
    title: "10 medicinal herbs to grow at home, ranked by difficulty",
    action: "Read the ranking",
    body: "The honest ranking — which are foolproof, which have one specific catch, and which three need a month in the refrigerator before they will cooperate.",
  },
  {
    href: "/guides/cold-stratification",
    eyebrow: "Technique",
    title: "Cold stratification: the four-week step that fixes stubborn seed",
    action: "Read the method",
    body: "The refrigerator method step by step, which species actually need it, how long each one takes, and what to do when mould appears.",
  },
  {
    href: "/guides/when-to-plant",
    eyebrow: "Free tool",
    title: "When to plant each of the 10 medicinal herbs",
    action: "Open the calculator",
    body: "Put in your last frost date and get the week to stratify, sow and transplant every species — including the three that need a month in the refrigerator before the sowing clock even starts.",
  },
  {
    href: "/guides/harvesting-coneflower-seeds",
    eyebrow: "Technique",
    title: "How to harvest coneflower seeds (echinacea)",
    action: "Read the guide",
    body: "When the cone is ready, how to get the seed out without shredding your hands, how to tell seed from chaff, and what viable echinacea seed actually looks like.",
  },
];

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
        {FEATURED.map((g) => (
          <li key={g.href}>
            <LinkCard
              href={g.href}
              eyebrow={g.eyebrow}
              title={g.title}
              action={g.action}
            >
              {g.body}
            </LinkCard>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-serif text-2xl font-semibold">
        Guides by species
      </h2>
      <p className="mt-2.5 leading-relaxed text-muted">
        One guide for each of the ten plants, leading with the specific thing
        that makes people fail with that plant.
      </p>

      <ul className="mt-7 flex flex-col gap-5">
        {herbs.map((h) => {
          const guide = getHerbGuide(h.slug);
          return (
            <li key={h.slug}>
              <LinkCard
                href={`/guides/${h.slug}`}
                eyebrow={`${h.difficulty} · ${h.lifecycle}`}
                title={guide.title}
              >
                {guide.standfirst}
              </LinkCard>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-sm leading-relaxed text-subtle">
        All ten species above have a guide. Each one leads with the specific
        thing that makes people fail with that plant, because that is the part
        the seed packet leaves out.
      </p>

      <div className="mt-8">
        <KitCallout
          herb="Every species on this page"
          note="The guides stand on their own — you do not need the kit to use them."
        />
      </div>
    </div>
  );
}
