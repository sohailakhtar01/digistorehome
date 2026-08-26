import Link from "next/link";
import SeedCalendar from "@/components/SeedCalendar";
import { HERBS, stratificationHerbs } from "@/lib/herbs";
import { EDITOR, SITE } from "@/lib/site";
import {
  Breadcrumbs,
  Callout,
  FAQ,
  JsonLd,
  KitCallout,
  MedicalDisclaimer,
  PageHeader,
} from "@/components/ui";

const PUBLISHED = "2026-08-26";

// Target cluster (DataForSEO, US, 2026-08-26). These are the "when" variants
// that sit alongside each species guide rather than inside it:
//   lavender seeds when to plant            4,400  RD 0
//   when to plant echinacea seeds           1,300  RD 1
//   coneflower seeds when to plant            590  RD 4
//   when to plant california poppy seeds      480  RD 4
//   when to sow calendula seeds               390  RD 4
//   when to plant yarrow seeds                210  RD 2
//
// Note: the generic "seed starting calendar" term returns no keywords above
// threshold, and "when to start seeds indoors" (2,900) is a vegetable query
// dominated by tomatoes and peppers at RD 25-102. This page is not aimed at
// those — it answers the question for the ten species we actually cover.
export const metadata = {
  title: "When to Plant Each of the 10 Medicinal Herbs (Frost Date Calculator)",
  description:
    "Enter your last frost date and get the exact week to stratify, sow and transplant each of the ten medicinal herbs — including the three that need a month in the refrigerator first.",
  alternates: { canonical: "/guides/when-to-plant" },
  openGraph: {
    type: "article",
    title: "When to Plant Each of the 10 Medicinal Herbs",
    description:
      "A frost-date calculator for stratifying, sowing and transplanting all ten species.",
    url: "/guides/when-to-plant",
    publishedTime: PUBLISHED,
  },
};

const FAQ_ITEMS = [
  {
    question: "When should I start medicinal herb seeds indoors?",
    answer:
      "It depends entirely on the species and on your own last frost date. Lavender needs the longest run — roughly fourteen weeks before last frost once you allow for stratification. Echinacea and marshmallow need about eleven. Feverfew and yarrow want seven. Calendula and chamomile only need five. California poppy, chicory and evening primrose should not be started indoors at all.",
  },
  {
    question: "Which of these seeds need cold stratification first?",
    answer:
      "Echinacea, lavender and marshmallow in practice, and evening primrose optionally. Stratification happens before sowing, so it has to be counted into the schedule — that is why the calculator puts a separate refrigerator date ahead of the sowing date for those species.",
  },
  {
    question: "What is a last frost date and how do I find mine?",
    answer:
      "It is the average date of the last spring frost in your area, and almost all seed timing is expressed relative to it. Your local agricultural extension service publishes it, and most experienced vegetable growers nearby will know it. It is an average, not a guarantee — a late cold snap beats any calendar.",
  },
  {
    question: "Which seeds should never be started indoors?",
    answer:
      "California poppy, chicory and evening primrose all form taproots early and resent being moved. Transplanting them is the single most common reason they fail. Sow them where they are to grow. California poppy in particular wants cool soil, so it goes in earlier than the others rather than later.",
  },
  {
    question: "Is it too late to start if I have missed the date?",
    answer:
      "Usually not, for the easy ones. Calendula and chamomile flower within about eight weeks of sowing, so a late start still gives a season. The perennials — echinacea, yarrow, lavender, marshmallow — were not going to flower in year one anyway, so a few weeks late costs you very little. The one to be strict about is California poppy, which sulks in warm soil.",
  },
  {
    question: "Can I sow any of these in autumn instead?",
    answer:
      "Yes, and for the stratifying species it is often the better option. Sowing echinacea, lavender or marshmallow outdoors in late autumn lets the real winter do the cold period, which is less work than the refrigerator and frequently gives better results. The trade-off is less control over where and when seedlings appear.",
  },
];

export default function Page() {
  const strat = stratificationHerbs().map((h) => h.name.split(" (")[0]);
  const direct = HERBS.filter((h) => h.timing.method === "direct").map((h) =>
    h.name.split(" (")[0],
  );

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}/guides/when-to-plant#article`,
    headline:
      "When to Plant Each of the 10 Medicinal Herbs (Frost Date Calculator)",
    description: metadata.description,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    inLanguage: "en-US",
    author: { "@id": `${SITE.url}/#editor` },
    publisher: { "@id": `${SITE.url}/#organization` },
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntityOfPage: `${SITE.url}/guides/when-to-plant`,
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
        name: "When to plant",
        item: `${SITE.url}/guides/when-to-plant`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          { href: "/guides/when-to-plant", label: "When to plant" },
        ]}
      />

      <PageHeader
        eyebrow="Tool"
        title="When to Plant Each of the 10 Medicinal Herbs"
        standfirst="Every seed packet says “start indoors 6–8 weeks before last frost” and none of them tell you that three of these need a month in the refrigerator before that clock even starts. Put your frost date in and the arithmetic is done for you."
        meta={`By ${EDITOR.name} · Published 26 August 2026`}
      />

      <div className="mt-8">
        <SeedCalendar />
      </div>

      <div className="prose-shelf mt-12">
        <h2 id="why-the-dates-differ">Why the dates differ so much</h2>
        <p>
          The ten species in this collection do not share a schedule, and
          treating them as though they do is the most common way a first attempt
          goes wrong. There are three groups.
        </p>

        <h3>The three that need a refrigerator first</h3>
        <p>
          {strat.join(", ")} all germinate erratically without a cold, moist
          period. That period happens <em>before</em> sowing, so it has to be
          added to the front of the schedule — which is why lavender ends up
          starting around fourteen weeks before your last frost while calendula
          only needs five.
        </p>
        <p>
          If that sounds like a lot of planning, there is a shortcut:{" "}
          <Link href="/guides/cold-stratification">
            sow them outdoors in late autumn instead
          </Link>{" "}
          and let winter do it.
        </p>

        <h3>The three that must never be transplanted</h3>
        <p>
          {direct.join(", ")} form taproots almost immediately and resent being
          moved. Starting them in modules and planting them out is the usual
          cause of failure, so the calculator gives them a single direct-sowing
          date rather than an indoor start.
        </p>
        <p>
          California poppy is the odd one: it wants <em>cool</em> soil, so it
          goes in earlier than everything else rather than later.
        </p>

        <h3>The four that are simply easy</h3>
        <p>
          Calendula, chamomile, feverfew and yarrow ask for nothing unusual.
          Sow, keep damp, wait. Two of them need light to germinate and so must
          be surface sown rather than buried, which the table notes.
        </p>

        <Callout tone="note" title="One honest caveat about year one">
          Several of these are perennials or biennials and will not flower in
          their first summer no matter how well you time the sowing. Yarrow,
          echinacea, marshmallow and lavender usually flower in year two, and
          evening primrose always does. A calendar cannot fix that, and any page
          implying otherwise is selling you something.
        </Callout>

        <KitCallout
          herb="All ten species above"
          note="If you are working from the kit, every date in the table applies to what is in that box."
        />
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
          <li>
            <Link
              href="/guides/cold-stratification"
              className="text-accent underline underline-offset-2"
            >
              Cold stratification: the four-week step that fixes stubborn seed
            </Link>
          </li>
          <li>
            <Link
              href="/guides/medicinal-herbs-to-grow"
              className="text-accent underline underline-offset-2"
            >
              All 10 medicinal herbs, ranked by how hard they are to grow
            </Link>
          </li>
          <li>
            <Link
              href="/reviews/medicinal-garden-kit"
              className="text-accent underline underline-offset-2"
            >
              Medicinal Garden Kit review — is the seed kit worth it?
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
