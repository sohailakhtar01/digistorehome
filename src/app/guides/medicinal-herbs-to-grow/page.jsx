import Link from "next/link";
import Image from "next/image";
import {
  byDifficulty,
  stratificationHerbs,
  PUBLISHED_HERB_GUIDES,
} from "@/lib/herbs";
import { getHerbImage, VIDEOS } from "@/lib/media";
import { SITE } from "@/lib/site";
import VideoEmbed from "@/components/VideoEmbed";
import {
  Breadcrumbs,
  Callout,
  DifficultyBadge,
  JsonLd,
  MedicalDisclaimer,
  PageHeader,
} from "@/components/ui";

/** One herb, with its photograph and the honest caveat. */
function HerbCard({ herb, noteLabel = "Worth knowing" }) {
  const img = getHerbImage(herb.slug);
  const linked = PUBLISHED_HERB_GUIDES.includes(herb.slug);
  return (
    <section className="not-prose my-7 overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-sm)] sm:flex">
      {img ? (
        <div className="relative aspect-[4/3] shrink-0 bg-surface-sunk sm:aspect-auto sm:w-52">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, 208px"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="min-w-0 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold">{herb.name}</h3>
          <DifficultyBadge level={herb.difficulty} />
        </div>
        <p className="mt-0.5 text-xs italic text-subtle">
          {herb.latin} · {herb.lifecycle} · germinates {herb.germDays}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{herb.growing}</p>
        <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-subtle">
          <strong className="font-semibold text-muted">{noteLabel}:</strong>{" "}
          {herb.honestNote}
        </p>
        {linked ? (
          <p className="mt-3">
            <Link
              href={`/guides/${herb.slug}`}
              className="text-sm font-semibold text-accent underline underline-offset-4"
            >
              Full {herb.name.split(" (")[0].toLowerCase()} growing guide →
            </Link>
          </p>
        ) : null}
        {img ? (
          <p className="mt-3 text-[0.6875rem] text-subtle">
            Photo: {img.author} / Wikimedia Commons ({img.license})
          </p>
        ) : null}
      </div>
    </section>
  );
}

export const metadata = {
  title: "10 Medicinal Herbs to Grow at Home, Ranked by Difficulty",
  description:
    "A practical, honest ranking of ten classic medicinal herbs by how hard they actually are to grow from seed — including which three need cold stratification and which will not flower in year one.",
  alternates: { canonical: "/guides/medicinal-herbs-to-grow" },
  openGraph: {
    type: "article",
    title: "10 Medicinal Herbs to Grow at Home, Ranked by Difficulty",
    description:
      "Which of the classic medicinal herbs are genuinely easy from seed, and which three will test your patience.",
    url: "/guides/medicinal-herbs-to-grow",
  },
};

export default function Page() {
  const ranked = byDifficulty();
  const easy = ranked.filter((h) => h.difficulty === "Easy");
  const moderate = ranked.filter((h) => h.difficulty === "Moderate");
  const hard = ranked.filter((h) => h.difficulty === "Hard");
  const strat = stratificationHerbs();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "10 Medicinal Herbs to Grow at Home, Ranked by Difficulty",
    description: metadata.description,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/guides/medicinal-herbs-to-grow`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <JsonLd data={articleLd} />

      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          {
            href: "/guides/medicinal-herbs-to-grow",
            label: "Medicinal herbs to grow",
          },
        ]}
      />

      <PageHeader
        eyebrow="Guide"
        title="10 Medicinal Herbs to Grow at Home, Ranked by Difficulty"
        standfirst="Most lists of medicinal herbs treat all ten as equally beginner-friendly. They are not. Here is the honest ranking, and the one free step that fixes the three hardest."
        meta={`By ${SITE.name} · Updated August 2026`}
      />

      <div className="prose-shelf mt-8">
        <p>
          These ten species — chicory, yarrow, California poppy, marshmallow,
          chamomile, evening primrose, lavender, echinacea, calendula and
          feverfew — form the classic beginner&apos;s medicinal herb garden. They
          show up together in seed kits, in old herbals, and in most
          &ldquo;grow your own remedies&rdquo; lists.
        </p>
        <p>
          What those lists rarely tell you is that the difficulty range across
          them is enormous. Calendula is close to foolproof. Lavender defeats
          experienced gardeners routinely. Sowing all ten the same way on the
          same weekend is the fastest route to concluding you have a black
          thumb, when in fact you have a stratification problem.
        </p>

        <h2 id="easy">Tier 1 — Easy ({easy.length} of 10)</h2>
        <p>
          Start here. These germinate readily in ordinary conditions, need no
          special treatment, and several will flower in their first season.
        </p>
        {easy.map((h) => (
          <HerbCard key={h.slug} herb={h} />
        ))}

        <h2 id="moderate">
          Tier 2 — Easy, with one specific catch ({moderate.length} of 10)
        </h2>
        <p>
          Neither of these is difficult. Both have one requirement that, if you
          miss it, produces what looks like total failure.
        </p>
        {moderate.map((h) => (
          <HerbCard key={h.slug} herb={h} noteLabel="The catch" />
        ))}

        <h2 id="hard">Tier 3 — Genuinely difficult ({hard.length} of 10)</h2>
        <p>
          These three are where people give up. In each case the difficulty is a
          property of the species, not of the seed you bought — and in each case
          the same free intervention makes a substantial difference.
        </p>
        {hard.map((h) => (
          <HerbCard key={h.slug} herb={h} />
        ))}

        <p>
          The effect of stratification is easy to dismiss as gardening folklore.
          It is not — here it is tested side by side on coneflower seed:
        </p>
      </div>

      <VideoEmbed video={VIDEOS.echinaceaStratification} />

      <div className="prose-shelf">

        <Callout tone="warn" title="Cold, moist stratification — the free fix">
          <p>
            {strat.map((h) => h.name.split(" (")[0]).join(", ")} all germinate
            far more reliably after a few weeks of cold, moist storage before
            sowing. Mix the seed through barely damp sand, seal it in a labelled
            bag, and leave it in the refrigerator — not the freezer — for three
            to four weeks. Then sow as normal.
          </p>
          <p className="mt-2">
            Barely damp is the operative phrase. Wet seed in a sealed bag rots,
            which is the one way to make the situation worse.
          </p>
        </Callout>

        <h2 id="year-one">What to expect in year one</h2>
        <p>
          Lifecycle matters as much as germination difficulty, and it is the
          source of most misplaced disappointment:
        </p>
        <ul>
          <li>
            <strong>Flowers in year one:</strong> calendula, chamomile,
            California poppy, chicory, feverfew
          </li>
          <li>
            <strong>Usually year two:</strong> yarrow, echinacea, marshmallow,
            lavender
          </li>
          <li>
            <strong>Definitely year two — it is a biennial:</strong> evening
            primrose. It produces a rosette of leaves in year one and nothing
            else. This is not a failure.
          </li>
        </ul>

        <h2 id="order">A sensible order to plant them in</h2>
        <ol>
          <li>
            Put the {strat.map((h) => h.name.split(" (")[0]).join(", ")} seed in
            the refrigerator first — it needs a month of lead time.
          </li>
          <li>
            While that runs, sow calendula and chamomile. Fast wins build
            confidence and tell you whether your conditions are broadly right.
          </li>
          <li>
            Direct sow California poppy where it will stay. Do not start it in
            pots.
          </li>
          <li>
            Sow chicory, feverfew and yarrow — remembering that feverfew and
            yarrow are surface sown, as they need light.
          </li>
          <li>
            After four weeks, sow the stratified seed. Give lavender warmth,
            light and considerably more patience than feels reasonable.
          </li>
        </ol>

        <h2 id="traditional-use">On &ldquo;medicinal&rdquo;</h2>
        <p>
          These plants are called medicinal because of their documented history
          in folk and traditional practice, some of it stretching back
          centuries. That history is genuinely interesting and worth knowing as
          part of why these particular species have been grown together for so
          long.
        </p>
        <p>
          It is not the same as clinical evidence. Traditional use tells you
          what people did, not what works. Nothing in this guide is a claim that
          any of these plants treats, prevents or cures any condition, and
          growing them should be approached as gardening rather than as
          healthcare.
        </p>
      </div>

      <div className="mt-8">
        <MedicalDisclaimer />
      </div>

      <nav className="mt-10 border-t border-line pt-8">
        <h2 className="font-serif text-xl font-semibold">Related</h2>
        <ul className="mt-4 flex flex-col gap-2 text-[0.95rem]">
          <li>
            <Link
              href="/reviews/medicinal-garden-kit"
              className="text-accent underline underline-offset-2"
            >
              Medicinal Garden Kit review — the seed kit containing all ten
            </Link>
          </li>
          {PUBLISHED_HERB_GUIDES.map((s) => (
            <li key={s}>
              <Link
                href={`/guides/${s}`}
                className="text-accent underline underline-offset-2"
              >
                How to grow {s} from seed
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
