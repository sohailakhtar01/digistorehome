import Link from "next/link";
import { HERBS, PUBLISHED_HERB_GUIDES, stratificationHerbs } from "@/lib/herbs";
import { VIDEOS, getHerbImage } from "@/lib/media";
import { EDITOR, SITE } from "@/lib/site";
import VideoEmbed from "@/components/VideoEmbed";
import {
  Breadcrumbs,
  Callout,
  DifficultyBadge,
  FAQ,
  Figure,
  JsonLd,
  KitCallout,
  MedicalDisclaimer,
  PageHeader,
  TableOfContents,
  slugifyHeading,
} from "@/components/ui";

const PUBLISHED = "2026-08-25";

export const metadata = {
  title: "How to Cold Stratify Seeds",
  description:
    "How to cold stratify seeds in a refrigerator, which species actually need it, how long each one takes, and what to do when mould appears.",
  alternates: { canonical: "/guides/cold-stratification" },
  openGraph: {
    type: "article",
    title: "How to Cold Stratify Seeds",
    description:
      "The refrigerator method, which seeds need it, and how long each takes.",
    url: "/guides/cold-stratification",
    publishedTime: PUBLISHED,
    images: [{ url: "/img/og/cold-stratification.jpg", width: 1200, height: 630 }],
  },
};

const STEPS = [
  "Dampen a handful of clean sand, vermiculite or a folded paper towel until it is barely moist. Squeeze it hard and no water should run out. This is the step people get wrong — wet medium rots seed, and rotted seed cannot be rescued.",
  "Mix the seed through the medium, or fold it into the towel, so every seed is in contact with moisture but not sitting in water.",
  "Seal it in a zip bag or small lidded container. Label it with the species and the date you started — four weeks is longer than you will remember accurately.",
  "Put it in the main body of the refrigerator, not the freezer door and not the freezer. You are aiming for roughly 1–5°C (34–40°F).",
  "Check it once a week. Look for mould, and for seeds that have started to sprout early. Discard anything furry; plant anything sprouting immediately.",
  "At the end of the period, sow as you normally would for that species. Handle any seed with a visible root tip gently — that root is the plant.",
];

const FAQ_ITEMS = [
  {
    question: "What is cold stratification?",
    answer:
      "It is a period of cold, moist storage that mimics winter and breaks a seed's natural dormancy. Many temperate perennials evolved to drop seed in autumn and germinate in spring, and they use a spell of cold as the signal that winter has passed. Without it, germination is erratic or does not happen at all.",
  },
  {
    question: "How long should seeds be cold stratified?",
    answer:
      "It varies by species. Four weeks suits most temperate perennials, including echinacea. Lavender does better with three to six weeks, and some tree and shrub seeds need three months or more. Check the species rather than applying one number to everything.",
  },
  {
    question: "Can I just put seeds in the freezer instead?",
    answer:
      "No. Stratification needs cold and moisture together, at temperatures above freezing. A freezer is too cold, and freezing damp seed can damage it. Use the main body of the refrigerator, around 1–5°C.",
  },
  {
    question: "How wet should the medium be?",
    answer:
      "Barely damp. Squeeze a handful and no water should run out — it should feel cool and slightly moist, not wet. Excess moisture in a sealed bag is the main cause of mould, which is the one way to make results worse than doing nothing.",
  },
  {
    question: "Do I need to stratify if I sow in autumn?",
    answer:
      "No. Sowing directly outdoors in late autumn lets the actual winter do the job, which is how these plants evolved to work. It is less effort than the refrigerator method and often gives better results, at the cost of less control over where seedlings appear.",
  },
  {
    question: "What if mould appears in the bag?",
    answer:
      "Open it, discard any seed that is furry or has gone soft, and let the rest air for a few minutes before resealing with fresher, drier medium. Mould usually means the medium was too wet or the bag was never opened during the period.",
  },
  {
    question: "Which seeds do not need stratification?",
    answer:
      "Most annuals and many Mediterranean herbs germinate fine without it — calendula, chamomile, chicory, feverfew and California poppy among them. Stratifying seed that does not need it usually does no harm, but it wastes four weeks.",
  },
  // The three below are the questions people actually type, taken from Search
  // Console rather than guessed at: the species-specific yes/no. Each is
  // answered in its first sentence, because a hedged answer is no use to
  // somebody holding a seed packet and it will not be read aloud or lifted
  // into a snippet either.
  {
    question: "Do coneflower (echinacea) seeds need cold stratification?",
    answer:
      "Yes. Echinacea germinates erratically without it and reliably with it, and four weeks of cold, moist storage is enough. Mix the seed through barely damp sand, seal it in a labelled bag, and leave it in the main body of the refrigerator — not the freezer — before sowing as normal. Autumn sowing outdoors achieves the same thing without the fridge.",
  },
  {
    question: "Does feverfew need cold stratification?",
    answer:
      "No. Feverfew germinates readily at ordinary room temperature and a cold period gains you nothing. What it does need is light, so surface sow it and press it onto the compost rather than burying it — sowing feverfew too deep is the usual reason a tray comes up empty, and it gets mistaken for a dormancy problem.",
  },
  {
    question: "Do calendula seeds need cold stratification?",
    answer:
      "No. Calendula is the easiest seed in this collection and needs no cold treatment at all. It wants the opposite of feverfew: darkness to germinate, so sow it about 6mm deep. Expect flowers roughly six to eight weeks after sowing.",
  },
];

export default function Page() {
  const strat = stratificationHerbs();

  // Three groups, not two, and the distinction is the whole point of the page.
  //
  //   fridge     timing.stratWeeks > 0 — we give it a refrigerator date
  //   benefits   germinates better after cold, but is direct sown, so winter
  //              in the ground does the job (evening primrose)
  //   noStrat    does not need it, and stratifying it wastes a month
  //
  // The table previously listed only the first two, which meant somebody
  // searching "does feverfew need cold stratification" found no feverfew row
  // and therefore no answer — on the page that exists to answer exactly that.
  const fridge = HERBS.filter((h) => h.timing.stratWeeks > 0);
  const benefits = HERBS.filter(
    (h) => h.stratification && h.timing.stratWeeks === 0,
  );
  const noStrat = HERBS.filter((h) => !h.stratification);
  const tableRows = [...fridge, ...benefits, ...noStrat];
  const headings = [
    "What cold stratification actually does",
    "The refrigerator method, step by step",
    "How long each seed needs",
    "Which seeds do not need it at all",
    "When it goes wrong",
    "The easier alternative: autumn sowing",
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}/guides/cold-stratification#article`,
    headline:
      "Cold Stratification of Seeds: The Four-Week Step That Fixes Stubborn Germination",
    description: metadata.description,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    inLanguage: "en-US",
    author: { "@id": `${SITE.url}/#editor` },
    publisher: { "@id": `${SITE.url}/#organization` },
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntityOfPage: `${SITE.url}/guides/cold-stratification`,
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to cold stratify seeds in a refrigerator",
    description:
      "A four-week cold, moist treatment that breaks seed dormancy in temperate perennials.",
    totalTime: "P28D",
    supply: [
      { "@type": "HowToSupply", name: "Seeds requiring stratification" },
      { "@type": "HowToSupply", name: "Clean sand, vermiculite or paper towel" },
      { "@type": "HowToSupply", name: "Sealable bag or lidded container" },
    ],
    tool: [{ "@type": "HowToTool", name: "Refrigerator" }],
    step: STEPS.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.url}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Cold stratification",
        item: `${SITE.url}/guides/cold-stratification`,
      },
    ],
  };

  const echinaceaImg = getHerbImage("echinacea");

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <JsonLd data={articleLd} />
      <JsonLd data={howToLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          { href: "/guides/cold-stratification", label: "Cold stratification" },
        ]}
      />

      <PageHeader
        eyebrow="Technique"
        title="Cold Stratification: The Four-Week Step That Fixes Stubborn Seed"
        standfirst="Some seeds will not germinate properly until they think a winter has passed. Here is how to give them one in a refrigerator — and which seeds actually need it."
        meta={`By ${EDITOR.name} · Updated 25 August 2026`}
      />

      {echinaceaImg ? (
        <Figure
          src={echinaceaImg.src}
          alt={echinaceaImg.alt}
          width={900}
          height={675}
          priority
          sizes="(max-width: 768px) 100vw, 720px"
          caption="Echinacea is the classic case: patchy without a cold period, even and reliable with one."
          credit={`Photo: ${echinaceaImg.author} / Wikimedia Commons (${echinaceaImg.license})`}
        />
      ) : null}

      <TableOfContents
        headings={headings}
        extra={[{ id: "faq", label: "Frequently asked questions" }]}
      />

      <div className="prose-shelf mt-8">
        <section>
          <h2 id={slugifyHeading(headings[0])}>{headings[0]}</h2>
          <p>
            A seed is not simply waiting for warmth. Many temperate perennials
            carry a chemical brake — a dormancy mechanism that stops them
            sprouting the moment they hit the ground in autumn, which would be
            fatal a few weeks later when frost arrives.
          </p>
          <p>
            That brake is released by a sustained period of cold and damp. In
            nature, the seed lies under leaf litter through winter, the cold
            gradually breaks down germination inhibitors, and by spring the seed
            is primed to sprout as soon as the soil warms.
          </p>
          <p>
            Cold stratification is simply that winter, performed on purpose, in
            a refrigerator, at a time of your choosing. It is not a trick or a
            growth hormone. You are supplying a condition the seed already
            expects.
          </p>
        </section>

        <section>
          <h2 id={slugifyHeading(headings[1])}>{headings[1]}</h2>
          <p>
            The whole method takes about ten minutes of work and four weeks of
            waiting. Nothing here needs special equipment.
          </p>
          <ol>
            {STEPS.map((s) => (
              <li key={s.slice(0, 40)}>{s}</li>
            ))}
          </ol>
        </section>

        <Callout tone="warn" title="The single most common mistake">
          <p>
            <strong>Barely damp, not wet.</strong> Almost every failed
            stratification comes down to too much water in a sealed bag. Damp
            medium breaks dormancy; wet medium grows mould and rots the seed. If
            you can see water pooling anywhere in the bag, there is too much.
          </p>
        </Callout>

        <p>
          If you would rather see the difference than take it on trust, this
          side-by-side test on coneflower seed is the clearest demonstration we
          have found:
        </p>
      </div>

      <VideoEmbed video={VIDEOS.echinaceaStratification} />

      <div className="prose-shelf">
        <section>
          <h2 id={slugifyHeading(headings[2])}>{headings[2]}</h2>
          <p>
            Duration is species-specific, and applying one number to everything
            is the second most common mistake. The more common one is
            stratifying seed that never needed it — a month lost for nothing.
          </p>
          {/* This plain sentence exists because it is the answer to the
              question people actually type: "does feverfew need cold
              stratification", "do calendula seeds need cold stratification".
              Naming every species in prose, not only in the table, means the
              answer survives being read aloud or lifted into a search snippet. */}
          <p>
            Of the ten herbs in a typical medicinal seed collection,{" "}
            <strong>
              {fridge.map((h) => h.name.split(" (")[0].toLowerCase()).join(", ")}{" "}
              need a cold period
            </strong>
            . Evening primrose benefits from one but is direct sown, so it takes
            its cold from the ground over winter instead.{" "}
            <strong>
              {noStrat
                .map((h) => h.name.split(" (")[0].toLowerCase())
                .join(", ")}{" "}
              do not need it at all
            </strong>{" "}
            — sow them without.
          </p>
        </section>
      </div>

      <div className="not-prose my-7 overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-sunk text-left">
              <th className="px-4 py-3 font-semibold">Seed</th>
              <th className="px-4 py-3 font-semibold">Needs it?</th>
              <th className="px-4 py-3 font-semibold">Cold period</th>
              <th className="px-4 py-3 font-semibold">Difficulty</th>
              <th className="px-4 py-3 font-semibold">Guide</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((h) => {
              const needs = h.timing.stratWeeks > 0;
              const optional = !needs && Boolean(h.stratification);
              return (
              <tr key={h.slug} className="border-b border-line last:border-0">
                <td className="px-4 py-3.5">
                  <span className="font-semibold">
                    {h.name.split(" (")[0]}
                  </span>
                  <br />
                  <em className="text-xs text-subtle">{h.latin}</em>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.08em] ${
                      needs
                        ? "bg-crimson-soft text-crimson"
                        : optional
                          ? "bg-gold-soft text-[#7a5615]"
                          : "bg-accent-soft text-accent-ink"
                    }`}
                  >
                    {needs ? "Yes" : optional ? "Optional" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-muted">
                  {needs
                    ? h.stratification
                    : optional
                      ? "Not in a fridge — sow in autumn and let winter do it"
                      : "Not needed — sow without"}
                </td>
                <td className="px-4 py-3.5">
                  <DifficultyBadge level={h.difficulty} />
                </td>
                <td className="px-4 py-3.5">
                  {PUBLISHED_HERB_GUIDES.includes(h.slug) ? (
                    <Link
                      href={`/guides/${h.slug}`}
                      className="text-accent underline underline-offset-2"
                    >
                      Read
                    </Link>
                  ) : (
                    <span className="text-subtle">—</span>
                  )}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="prose-shelf">
        <section>
          <h2 id={slugifyHeading(headings[3])}>{headings[3]}</h2>
          <p>
            Stratifying seed that does not need it rarely does harm, but it
            costs you a month for nothing. These germinate readily without any
            cold treatment:
          </p>
          <ul>
            {noStrat.map((h) => (
              <li key={h.slug}>
                <strong>{h.name.split(" (")[0]}</strong> — {h.germDays}
                {h.sowDepth.toLowerCase().includes("surface")
                  ? ", surface sow (needs light)"
                  : ""}
              </li>
            ))}
          </ul>
          <p>
            As a rough rule: annuals and Mediterranean species generally do not
            need a cold period, while temperate perennials from continental
            climates often do.
          </p>
        </section>

        <section>
          <h2 id={slugifyHeading(headings[4])}>{headings[4]}</h2>
          <h3>Mould in the bag</h3>
          <p>
            The medium was too wet, or the bag was never opened. Discard furry or
            softened seed, air the rest briefly, and reseal with drier medium.
            Weekly checks exist precisely to catch this before it spreads.
          </p>
          <h3>Seeds sprouting inside the refrigerator</h3>
          <p>
            This is success arriving early, not a problem. Plant those seeds
            immediately and handle them gently — the white tip is the root, and
            breaking it kills the seedling.
          </p>
          <h3>Nothing germinates even after stratification</h3>
          <p>
            Check three things before blaming the seed: whether the species needs
            light and was buried, whether the soil was warm enough after sowing,
            and whether the seed was old. Viability declines with age, and some
            species are short-lived in storage.
          </p>
        </section>

        <section>
          <h2 id={slugifyHeading(headings[5])}>{headings[5]}</h2>
          <p>
            There is a method that requires no refrigerator, no bags and no
            weekly checks: sow directly outdoors in late autumn and let the
            actual winter do the work. This is how these plants evolved to
            reproduce, and results are frequently better than the indoor method.
          </p>
          <p>
            The trade-off is control. Outdoor-sown seed germinates where you put
            it, on its own schedule, and some will be lost to weather and
            wildlife. If you want a known number of seedlings at a known time,
            the refrigerator gives you that. If you want the least work, autumn
            sowing wins.
          </p>

          <KitCallout
            herb="Echinacea, lavender and marshmallow &mdash; the three species on this page that need a cold period &mdash;"
            note="All three arrive in the same box, which is exactly why the kit is worth reading about before you order it: three of the ten are the difficult ones."
          />
        </section>
      </div>

      <section className="mt-12">
        <h2 id="faq" className="mb-4 scroll-mt-24 font-serif text-2xl font-semibold">
          Frequently asked questions
        </h2>
        <FAQ items={FAQ_ITEMS} />
      </section>

      <div className="mt-10">
        <MedicalDisclaimer />
      </div>

      <nav className="mt-10 border-t border-line pt-8">
        <h2 className="font-serif text-xl font-semibold">Related</h2>
        <ul className="mt-4 flex flex-col gap-2 text-[0.95rem]">
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
          <li>
            <Link
              href="/guides/medicinal-herbs-to-grow"
              className="text-accent underline underline-offset-2"
            >
              10 medicinal herbs to grow, ranked by difficulty
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
