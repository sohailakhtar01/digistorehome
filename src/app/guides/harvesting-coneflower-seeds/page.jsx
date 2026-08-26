import Link from "next/link";
import { getSeedImage } from "@/lib/media";
import { SITE } from "@/lib/site";
import {
  Breadcrumbs,
  Callout,
  FAQ,
  Figure,
  JsonLd,
  MedicalDisclaimer,
  PageHeader,
  TableOfContents,
} from "@/components/ui";

const PUBLISHED = "2026-08-26";

// Target cluster (DataForSEO, US, checked 2026-08-26). Every one of these has
// an average of 0-5 referring domains across its ranking pages, and the SERP is
// independent blogs rather than seed retailers — see
// research/keyword-map-master.md for why that distinction decides everything.
//   how to harvest coneflower seeds / echinacea seeds   ~1,000
//   what do coneflower seeds look like                  ~1,300
//   how to collect coneflower seeds                     ~1,000
//   harvesting coneflower seeds                            590
export const metadata = {
  title:
    "How to Harvest Coneflower Seeds (Echinacea): When, How, and What the Seed Looks Like",
  description:
    "How to tell when an echinacea seed head is ready, how to get the seed out without shredding your hands, how to separate seed from chaff, and what viable coneflower seed actually looks like.",
  alternates: { canonical: "/guides/harvesting-coneflower-seeds" },
  openGraph: {
    type: "article",
    title: "How to Harvest Coneflower Seeds (Echinacea)",
    description:
      "When the cone is ready, how to extract the seed, and what viable seed looks like.",
    url: "/guides/harvesting-coneflower-seeds",
    publishedTime: PUBLISHED,
  },
};

const STEPS = [
  "Wait until the cone is dark brown, dry and stiff, and the petals have shrivelled and dropped. A green or springy cone is not ready, and seed taken early will not germinate.",
  "Cut the stem 15-20 cm below the head on a dry day. Damp seed heads go mouldy in storage faster than almost anything else you will harvest.",
  "Wear gloves. The dried bracts around each seed harden into genuinely sharp spines — this is the step everyone underestimates, and it is why most people give up halfway.",
  "Hold the head over a bowl and rub or roll the cone between gloved fingers. Seed and chaff come away together as a coarse, prickly mixture.",
  "Separate seed from chaff. Tip the mixture between two bowls in front of a fan on its lowest setting, or breathe gently across it: the light chaff drifts off and the heavier seed stays put.",
  "Dry the cleaned seed on paper for about a week somewhere airy and out of direct sun, then store it in a labelled paper envelope somewhere cool and dark.",
];

const FAQ_ITEMS = [
  {
    question: "What do coneflower seeds look like?",
    answer:
      "Each seed is a small, hard, wedge-shaped achene about 4-5 mm long, tan to greyish-brown, broader at one end and tapering to a point. They are easy to confuse with the chaff they sit among: the chaff is the dark, stiff, spiny bract that surrounds each seed on the cone. Seed is pale, dense and blunt; chaff is dark, light and sharp.",
  },
  {
    question: "When should I harvest coneflower seeds?",
    answer:
      "Once the cone has gone dark brown, dry and hard, and the petals have fallen. In most temperate regions that is late summer into autumn. If you can dent the cone with a fingernail or it still feels springy, leave it longer.",
  },
  {
    question: "How do I know if the seed is viable?",
    answer:
      "Viable seed feels firm and solid between your fingers and has some weight to it. Empty husks are flat, papery and noticeably light. A float test is often suggested, but it wets the seed and is not reliable for echinacea, so sorting by feel and appearance is the better approach.",
  },
  {
    question: "Do harvested coneflower seeds need cold stratification?",
    answer:
      "Yes, in practice. Home-saved echinacea seed germinates erratically when sown straight into warm soil. Roughly four weeks of cold, moist storage before sowing markedly improves both the rate and the evenness of germination, or you can sow outdoors in autumn and let winter do it.",
  },
  {
    question: "Will seed saved from my coneflowers grow true to the parent plant?",
    answer:
      "Straight Echinacea purpurea usually comes reasonably true. Named cultivars and hybrids frequently do not — seedlings from a fancy coloured cultivar often revert to ordinary purple-pink. If you want an exact copy of a particular plant, divide it rather than sowing its seed.",
  },
  {
    question: "How long do coneflower seeds stay viable?",
    answer:
      "Kept dry, cool and dark, echinacea seed is generally sound for about three years, with germination gradually declining after the first year. Label the envelope with the year you collected it, because you will not remember.",
  },
  {
    question: "Should I leave some seed heads on the plant?",
    answer:
      "Worth doing. Goldfinches and other small birds feed on echinacea seed through autumn and winter, and standing seed heads give the plant a chance to self-sow. Taking some and leaving some costs nothing.",
  },
];

export default function Page() {
  const headings = [
    "When coneflower seed is ready to harvest",
    "What coneflower seeds actually look like",
    "How to harvest the seed, step by step",
    "Separating seed from chaff",
    "Drying and storing",
    "Will the seed grow true?",
    "Sowing what you saved",
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}/guides/harvesting-coneflower-seeds#article`,
    headline:
      "How to Harvest Coneflower Seeds (Echinacea): When, How, and What the Seed Looks Like",
    description: metadata.description,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    inLanguage: "en-US",
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntityOfPage: `${SITE.url}/guides/harvesting-coneflower-seeds`,
    about: {
      "@type": "Thing",
      name: "Echinacea purpurea",
      alternateName: "Purple coneflower",
    },
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to harvest coneflower (echinacea) seeds",
    description:
      "Cutting, extracting, cleaning and storing seed from a dried echinacea seed head.",
    totalTime: "P7D",
    supply: [
      { "@type": "HowToSupply", name: "Dried echinacea seed heads" },
      { "@type": "HowToSupply", name: "Paper envelope for storage" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Gardening gloves" },
      { "@type": "HowToTool", name: "Secateurs" },
      { "@type": "HowToTool", name: "Two bowls" },
    ],
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
        name: "Harvesting coneflower seeds",
        item: `${SITE.url}/guides/harvesting-coneflower-seeds`,
      },
    ],
  };

  const seedHead = getSeedImage("echinaceaSeedhead");
  const seed = getSeedImage("echinaceaSeed");

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
          {
            href: "/guides/harvesting-coneflower-seeds",
            label: "Harvesting coneflower seeds",
          },
        ]}
      />

      <PageHeader
        eyebrow="Technique"
        title="How to Harvest Coneflower Seeds (Echinacea)"
        standfirst="One echinacea plant will hand you several hundred seeds for free, and the whole job takes an afternoon. The two things that trip people up are harvesting too early and not realising how sharp a dried cone is."
        meta={`By ${SITE.name} · Published 26 August 2026`}
      />

      <Figure
        src={seedHead.src}
        alt={seedHead.alt}
        width={900}
        height={506}
        priority
        sizes="(max-width: 768px) 100vw, 720px"
        caption="Ready. The cone is dark, dry and hard, the petals are gone, and the bracts have stiffened into spines. Harvest any earlier and the seed inside will not be mature."
        credit={`Photo: ${seedHead.author} / Wikimedia Commons (${seedHead.license})`}
      />

      <TableOfContents
        headings={headings}
        extra={[{ id: "faq", label: "Frequently asked questions" }]}
      />

      <div className="prose-shelf mt-8">
        <section>
          <h2 id="when-coneflower-seed-is-ready-to-harvest">
            When coneflower seed is ready to harvest
          </h2>
          <p>
            Echinacea tells you when it is ready, and the signal is unambiguous
            once you know what you are looking at. The cone in the middle of the
            flower — the part that gives the plant its name — starts the season
            orange and domed and slightly soft. As seed matures it darkens
            through brown to almost black, dries out, and hardens. The pink
            petals shrivel and fall away on their own.
          </p>
          <p>
            The test is simple: press the cone with a thumbnail. If it dents, or
            gives at all, the seed inside is still filling and you should leave
            it. A ready cone is rigid, rattles slightly if you shake the stem,
            and is genuinely uncomfortable to grip bare-handed.
          </p>
          <p>
            In most temperate gardens this happens from late summer into autumn,
            usually six to eight weeks after the flower opened. There is no need
            to rush it. Seed left on a standing plant keeps perfectly well until
            you get to it, and the birds will take a share in the meantime.
          </p>
        </section>

        <Callout tone="warn" title="Harvest on a dry day">
          Seed heads taken while damp — after rain, or early on a heavy-dew
          morning — go mouldy in storage far more readily than they dry out.
          Give the plant a couple of dry days first. This one detail causes more
          failed seed batches than bad technique does.
        </Callout>

        <section>
          <h2 id="what-coneflower-seeds-actually-look-like">
            What coneflower seeds actually look like
          </h2>
          <p>
            This is where most people go wrong, because a broken-up echinacea
            cone produces two things that look superficially similar and only
            one of them is seed.
          </p>
          <p>
            The <strong>seed</strong> is a small hard achene, roughly 4–5 mm
            long, tan to greyish-brown, wedge-shaped — broad and blunt at one
            end, tapering to a point at the other. It feels dense between finger
            and thumb, and it has real weight for its size.
          </p>
          <p>
            The <strong>chaff</strong> is the stiff, dark, spiny bract that
            surrounded each seed on the cone. It is longer, much darker, sharply
            pointed, and almost weightless. It is what makes a dried cone painful
            to handle, and it is what you are trying to remove.
          </p>
        </section>

        <Figure
          src={seed.src}
          alt={seed.alt}
          width={900}
          height={600}
          sizes="(max-width: 768px) 100vw, 720px"
          caption="An echinacea cone taken apart. Top row: the dark, slender, pointed disc florets and bracts — this is chaff. Middle rows: the pale, blunt, wedge-shaped achenes — this is the seed you want. Bottom: two cones sectioned to show where the seed sits."
          credit={`Photo: ${seed.author} / Wikimedia Commons (${seed.license})`}
        />

        <p className="text-sm text-subtle">
          The quickest way to learn the difference is by feel rather than by
          eye. Roll a pinch of the mixture in your palm: seed feels like grit,
          chaff feels like dry grass.
        </p>

        <section>
          <h2 id="how-to-harvest-the-seed-step-by-step">
            How to harvest the seed, step by step
          </h2>
          <ol>
            {STEPS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 id="separating-seed-from-chaff">Separating seed from chaff</h2>
          <p>
            You do not need to get this perfect. Sowing a little chaff along with
            the seed does no harm at all — it is what happens in nature every
            autumn. Cleaning matters mainly because clean seed stores better and
            is far easier to sow at a sensible spacing.
          </p>
          <p>
            The method that works with no equipment is winnowing. Put the mixture
            in one bowl, hold a second bowl below it, and pour slowly from one to
            the other in front of a fan set to its lowest speed, or outdoors in a
            light breeze. The chaff is light enough to blow sideways; the seed
            drops straight down. Repeat three or four times and you will have
            something close to clean seed.
          </p>
          <p>
            A kitchen sieve with a mesh that lets seed through but holds the
            larger bracts also works, and is less dependent on the weather.
          </p>
        </section>

        <section>
          <h2 id="drying-and-storing">Drying and storing</h2>
          <p>
            Spread the cleaned seed in a single layer on paper somewhere airy and
            out of direct sunlight for about a week. Even seed that feels dry
            carries enough residual moisture to cause trouble in a sealed
            container.
          </p>
          <p>
            Store in a paper envelope rather than plastic — paper lets any
            remaining moisture escape instead of trapping it against the seed.
            Label it with the species and the year. Somewhere cool, dark and dry
            is enough; a refrigerator works but is not necessary.
          </p>
          <p>
            Kept that way, echinacea seed is generally reliable for around three
            years, with germination tailing off gradually after the first.
          </p>
        </section>

        <section>
          <h2 id="will-the-seed-grow-true">Will the seed grow true?</h2>
          <p>
            If your plant is straight <em>Echinacea purpurea</em> — the ordinary
            purple coneflower — seed saved from it will generally produce plants
            much like the parent.
          </p>
          <p>
            Named cultivars are a different matter. The coral, white, orange and
            double-flowered varieties sold in garden centres are usually hybrids,
            and their seedlings frequently revert to plain purple-pink or come
            out as an unpredictable mixture. That is not a failure on your part;
            it is how hybrids behave. If you want an exact copy of a specific
            plant, divide the clump in spring instead of saving its seed.
          </p>
        </section>

        <section>
          <h2 id="sowing-what-you-saved">Sowing what you saved</h2>
          <p>
            Home-saved echinacea seed has the same requirement as bought seed: it
            germinates poorly when sown straight into warm soil, and reliably
            after a cold, moist period. You have two options, and the easier one
            is the one that involves doing nothing.
          </p>
          <p>
            Either sow it outdoors in late autumn, where winter supplies the cold
            period naturally, or hold it until late winter and give it about four
            weeks in the refrigerator before sowing indoors. Both are covered in
            detail in our{" "}
            <Link href="/guides/cold-stratification">
              cold stratification guide
            </Link>
            , and the timing calendar is in the{" "}
            <Link href="/guides/echinacea">
              guide to growing echinacea from seed
            </Link>
            .
          </p>
          <p>
            One honest note on expectations: echinacea grown from seed usually
            spends its first year building roots and foliage, and flowers in year
            two. Seed you collect this autumn is unlikely to give you coneflowers
            next summer.
          </p>
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
          <li>
            <Link
              href="/guides/echinacea"
              className="text-accent underline underline-offset-2"
            >
              How to grow echinacea from seed
            </Link>
          </li>
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
              10 medicinal herbs to grow, ranked by difficulty
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
