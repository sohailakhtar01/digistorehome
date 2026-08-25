import Link from "next/link";
import Image from "next/image";
import { getOffer } from "@/lib/affiliates";
import { HERBS, byDifficulty, stratificationHerbs } from "@/lib/herbs";
import { PRODUCT_IMAGES, getHerbImage, VIDEOS } from "@/lib/media";
import { SITE } from "@/lib/site";
import VideoEmbed from "@/components/VideoEmbed";
import {
  AffiliateCTA,
  AffiliateDisclosure,
  Breadcrumbs,
  BuyCard,
  Callout,
  DifficultyBadge,
  FAQ,
  Figure,
  JsonLd,
  MedicalDisclaimer,
  VerdictBox,
} from "@/components/ui";

const offer = getOffer("medicinal-garden-kit");
const REVIEWED = "2026-08-25";
const RATING = 4;

export const metadata = {
  title: "Medicinal Garden Kit Review (2026): What You Actually Get for $59",
  description:
    "An independent review of Nicole Apelian's Medicinal Garden Kit. What is in the box, which of the 10 seeds are genuinely hard to grow, how the 365-day guarantee works, and who should skip it.",
  alternates: { canonical: "/reviews/medicinal-garden-kit" },
  openGraph: {
    type: "article",
    title: "Medicinal Garden Kit Review (2026): What You Actually Get for $59",
    description:
      "What is in the box, which seeds are genuinely hard to grow, and who should skip it.",
    url: "/reviews/medicinal-garden-kit",
    publishedTime: REVIEWED,
    modifiedTime: REVIEWED,
    // og image comes from the co-located opengraph-image.jpg file convention
  },
};

const FAQ_ITEMS = [
  {
    question: "How much does the Medicinal Garden Kit cost?",
    answer:
      "$59 plus $4.99 shipping at the time of writing, as a one-time payment. There is no subscription. Prices can change, so check the official page before ordering.",
  },
  {
    question: "Is there really a 365-day guarantee?",
    answer:
      "Yes. The kit is sold with a 365-day money-back guarantee, and payment is processed through Digistore24 rather than by the vendor directly. That matters practically: the refund request goes through the payment processor, which gives you a route that does not depend on the seller responding.",
  },
  {
    question: "How many seeds do you actually get?",
    answer:
      "The current packaging and sales page state 4,818 seeds across 10 packets. Older product photography still in circulation shows a 2,409-seed version, so the count has changed between print runs. Seed counts also vary hugely by species — the dust-fine chamomile and yarrow seeds make up a large share of that total.",
  },
  {
    question: "Are the seeds non-GMO?",
    answer:
      "The vendor states the seeds are heirloom and non-GMO. For context, there are no genetically modified varieties of these ten herbs on the consumer seed market anyway, so this is less of a differentiator than the marketing implies.",
  },
  {
    question: "Which seeds in the kit are hardest to grow?",
    answer:
      "Lavender and echinacea are the two most likely to disappoint, followed by marshmallow. All three germinate far more reliably after a few weeks of cold, moist stratification. This is normal behaviour for those species and not a fault of the supplier.",
  },
  {
    question: "Will I get flowers in the first year?",
    answer:
      "From some, yes — calendula, chamomile, chicory and California poppy typically flower in their first season. Yarrow and echinacea often do not flower until year two, and evening primrose is a biennial that will not flower until its second summer at all.",
  },
  {
    question: "Is Nicole Apelian a medical doctor?",
    answer:
      "No. She holds a PhD in Cultural Anthropology and Sustainability Education from Prescott College, and a bachelor's degree in biology from McGill University. She is a herbalist, biologist and wilderness skills instructor, not a physician, and the kit should not be treated as medical guidance.",
  },
  {
    question: "Can I just buy these seeds separately?",
    answer:
      "Yes, and for some people that is the better choice. All ten species are widely available from seed suppliers, and buying individually would usually cost less. What you pay extra for here is curation into one themed set and the printed guide. If you already know what you want to grow, buying separately is cheaper.",
  },
];

export default function Page() {
  const ranked = byDifficulty();
  const easy = ranked.filter((h) => h.difficulty === "Easy");
  const moderate = ranked.filter((h) => h.difficulty === "Moderate");
  const hard = ranked.filter((h) => h.difficulty === "Hard");
  const strat = stratificationHerbs();
  const stratNames = strat.map((h) => h.name.split(" (")[0]).join(", ");

  const reviewLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: "Medicinal Garden Kit Review (2026)",
    datePublished: REVIEWED,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    reviewRating: {
      "@type": "Rating",
      ratingValue: RATING,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": "Product",
      name: "Medicinal Garden Kit",
      category: "Garden Seeds",
      image: `${SITE.url}${PRODUCT_IMAGES.hero.src}`,
      brand: { "@type": "Brand", name: "Medicinal Garden Kit" },
      offers: {
        "@type": "Offer",
        price: offer.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: offer.salesPage,
      },
    },
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
      { "@type": "ListItem", position: 2, name: "Reviews", item: `${SITE.url}/reviews` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Medicinal Garden Kit Review",
        item: `${SITE.url}/reviews/medicinal-garden-kit`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <JsonLd data={reviewLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/reviews", label: "Reviews" },
          { href: "/reviews/medicinal-garden-kit", label: "Medicinal Garden Kit" },
        ]}
      />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        <article className="min-w-0">
          <header className="border-b border-line pb-8">
            <p className="eyebrow mb-3">Product review</p>
            <h1 className="text-[2rem] leading-[1.16] sm:text-[2.7rem] sm:leading-[1.12]">
              Medicinal Garden Kit Review (2026): What You Actually Get for $59
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Ten heirloom herb seed packets and a printed growing guide, sold by
              Nicole Apelian. Here is what arrives, which seeds are genuinely
              difficult, and who should not buy it.
            </p>
            <p className="mt-5 text-sm text-subtle">
              By {SITE.name} · Published 25 August 2026 · Research-based review
            </p>
          </header>

          <div className="mt-7">
            <AffiliateDisclosure />
          </div>

          <Figure
            src={PRODUCT_IMAGES.hero.src}
            alt={PRODUCT_IMAGES.hero.alt}
            width={PRODUCT_IMAGES.hero.width}
            height={PRODUCT_IMAGES.hero.height}
            priority
            sizes="(max-width: 1024px) 100vw, 640px"
            caption="What actually arrives: the seed pouch and the printed guide."
            credit={PRODUCT_IMAGES.hero.credit}
          />

          {/* Mobile-only buy card; the sticky rail handles desktop. */}
          <div className="lg:hidden">
            <BuyCard offer={offer} />
          </div>

          <div className="mt-8">
            <VerdictBox
              rating={RATING}
              ratingBasis="Our editorial assessment of value, honesty of the offer and quality of the contents. Not an aggregate of customer ratings."
              verdict="A fair, genuinely useful themed seed collection for a beginner gardener who wants a curated starting point and a printed reference. The seeds are real heirloom varieties and the 365-day guarantee is unusually generous. What the sales page understates is that three of the ten species are genuinely difficult from seed, and that is the single most important thing to know before you order."
              bestFor={[
                "Beginner gardeners who want a curated set rather than choosing species themselves",
                "Anyone who prefers a printed reference over bookmarked web pages",
                "People who want a long guarantee window to try something new",
                "Gardeners in temperate zones with a real growing season ahead",
              ]}
              notFor={[
                "Anyone expecting a substitute for medicine — these are seeds, not treatments",
                "Experienced gardeners who already know which herbs they want",
                "People without outdoor space, a balcony or decent window light",
                "Anyone wanting results this month — several species take a full year",
              ]}
              facts={[
                { label: "Price", value: `$${offer.price}` },
                { label: "Seed packets", value: `${offer.seedPackets}` },
                { label: "Guarantee", value: `${offer.guaranteeDays} days` },
                { label: "Format", value: "Physical" },
              ]}
            />
          </div>

          <AffiliateCTA
            offer={offer}
            campaign="rev-top"
            label="Check current price and availability"
          />

          <div className="prose-shelf mt-10">
            <h2 id="what-you-get">What you actually get in the box</h2>
            <p>
              The Medicinal Garden Kit is a physical product. You are buying ten
              paper seed packets and a printed guide, shipped to you — not a
              download, not a subscription, and not a plant. That distinction
              matters more than it sounds, because a lot of the disappointment
              around kits like this comes from people expecting something closer
              to a finished herbal remedy set.
            </p>
            <p>Here is the full contents list:</p>
            <ul>
              <li>
                <strong>Ten seed packets</strong> — chicory, yarrow, California
                poppy, marshmallow, chamomile, evening primrose, lavender,
                echinacea, calendula and feverfew
              </li>
              <li>
                <strong>{offer.seedCount.toLocaleString()} seeds in total</strong>{" "}
                according to the current packaging, spread very unevenly across
                those ten species
              </li>
              <li>
                <strong>A printed guide</strong> — <em>Herbal Medicinal Guide:
                From Seeds to Remedies</em> — covering planting and traditional
                preparation
              </li>
              <li>
                <strong>Two digital bonus guides</strong>, each listed at $29
                value: one on household items, one on foraging
              </li>
            </ul>

            <Callout title="A note on the seed count">
              <p>
                The current pouch is marked{" "}
                <strong>{offer.seedCount.toLocaleString()} non-GMO seeds</strong>.
                Older product photography still circulating online shows a{" "}
                <strong>2,409-seed</strong> version, so the count has changed
                between print runs — worth knowing if you are comparing images
                across review sites.
              </p>
              <p>
                Either way the figure does more marketing work than gardening
                work. Chamomile and yarrow seeds are dust-fine and come in the
                thousands; you get far fewer echinacea or marshmallow seeds, and
                those are the ones where a low germination rate actually costs
                you. Judge the kit on the ten species, not the headline number.
              </p>
            </Callout>

            <Figure
              src={PRODUCT_IMAGES.gardenLayout.src}
              alt={PRODUCT_IMAGES.gardenLayout.alt}
              width={PRODUCT_IMAGES.gardenLayout.width}
              height={PRODUCT_IMAGES.gardenLayout.height}
              sizes="(max-width: 1024px) 100vw, 640px"
              caption="The vendor's suggested bed layout for all ten species."
              credit={PRODUCT_IMAGES.gardenLayout.credit}
            />

            <h2 id="difficulty">
              The honest part: three of these ten are genuinely difficult
            </h2>
            <p>
              This is the section we would want to read before buying, and it is
              the one most reviews skip. The ten species in this kit are not
              equally easy. They fall into three clear groups, and knowing which
              is which before you sow will do more for your results than
              anything else in this review.
            </p>

            <h3>Easy — sow these first ({easy.length} of 10)</h3>
            <p>
              {easy.map((h) => h.name).join(", ")}. These germinate readily in
              ordinary conditions and several will flower in their first season.
              Calendula in particular is close to foolproof, and it is the right
              place for a nervous beginner to start.
            </p>

            <h3>
              Moderate — easy, but with one specific catch ({moderate.length} of 10)
            </h3>
            <p>
              California poppy germinates well but forms a taproot and strongly
              dislikes being transplanted, so it must be direct sown where it is
              to flower. Starting it in pots is the single most common reason
              people fail with it. Evening primrose germinates easily but is a{" "}
              <strong>biennial</strong> — it will produce a rosette of leaves in
              year one and will not flower until its second summer. Nothing has
              gone wrong; that is simply the plant.
            </p>

            <h3>Hard — expect uneven results ({hard.length} of 10)</h3>
            <p>
              Lavender, echinacea and marshmallow are the three that generate
              most of the complaints about kits like this one, and in every case
              the reason is horticultural rather than commercial. All three
              germinate far more reliably after a period of{" "}
              <strong>cold, moist stratification</strong> — several weeks with
              the seed in damp sand or a barely damp paper towel in a sealed bag
              in the refrigerator, simulating winter before spring sowing.
            </p>
            <p>
              Lavender is the hardest of the three and is difficult from seed for
              everyone. Commercial nurseries usually propagate it from cuttings
              precisely because seed-grown lavender is slow and unreliable. If
              one packet in this kit underperforms for you, the odds strongly
              favour it being the lavender — and that is the species behaving
              normally, not a supplier problem.
            </p>

            <Callout tone="warn" title="The one thing to do before you sow">
              <p>
                Put the {stratNames} seeds in the refrigerator for three to four
                weeks in a sealed bag with barely damp sand or paper towel before
                planting. It costs nothing, and it is the difference between
                patchy germination and good germination on the three hardest
                species in the kit.
              </p>
            </Callout>

            <p>
              If you want to see the difference rather than take our word for it,
              this side-by-side test is the clearest demonstration we have found:
            </p>
          </div>

          <VideoEmbed video={VIDEOS.echinaceaStratification} />

          <div className="prose-shelf">
            <h2 id="herb-by-herb">All ten species, one by one</h2>
            <p>
              Germination times below reflect general horticultural guidance for
              each species. We have not yet grown this kit ourselves, and we say
              so plainly rather than implying test results we do not have.
            </p>
          </div>

          <div className="not-prose my-8 overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full min-w-[38rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-sunk text-left">
                  <th className="px-4 py-3 font-semibold">Plant</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Difficulty</th>
                  <th className="px-4 py-3 font-semibold">Germination</th>
                  <th className="px-4 py-3 font-semibold">First flowers</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((h) => (
                  <tr key={h.slug} className="border-b border-line align-top last:border-0">
                    <td className="px-4 py-3.5">
                      <span className="font-semibold">{h.name}</span>
                      <br />
                      <em className="text-xs text-subtle">{h.latin}</em>
                    </td>
                    <td className="px-4 py-3.5 text-muted">{h.lifecycle}</td>
                    <td className="px-4 py-3.5">
                      <DifficultyBadge level={h.difficulty} />
                    </td>
                    <td className="px-4 py-3.5 text-muted">{h.germDays}</td>
                    <td className="px-4 py-3.5 text-muted">{h.firstHarvest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="not-prose my-10 grid gap-6 sm:grid-cols-2">
            {ranked.map((h) => {
              const img = getHerbImage(h.slug);
              return (
                <section
                  key={h.slug}
                  className="overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-sm)]"
                >
                  {img ? (
                    <div className="relative aspect-[4/3] bg-surface-sunk">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-serif text-lg font-semibold">
                        {h.name}
                      </h3>
                      <DifficultyBadge level={h.difficulty} />
                    </div>
                    <p className="mt-0.5 text-xs italic text-subtle">
                      {h.latin} · {h.lifecycle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {h.growing}
                    </p>
                    <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-subtle">
                      <strong className="font-semibold text-muted">
                        Traditionally:
                      </strong>{" "}
                      {h.traditionalUse}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-subtle">
                      <strong className="font-semibold text-muted">
                        Worth knowing:
                      </strong>{" "}
                      {h.honestNote}
                    </p>
                    {img ? (
                      <p className="mt-3 text-[0.6875rem] text-subtle">
                        Photo: {img.author} / Wikimedia Commons ({img.license})
                      </p>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="my-8">
            <MedicalDisclaimer />
          </div>

          <AffiliateCTA
            offer={offer}
            campaign="rev-mid"
            label="See the official page"
            variant="secondary"
          />

          <div className="prose-shelf">
            <h2 id="nicole-apelian">Who Nicole Apelian actually is</h2>
            <p>
              Because the kit is sold under her name, her background is a
              reasonable thing to check — and it is worth being precise, because
              a number of other reviews get this wrong.
            </p>
          </div>

          <Figure
            src={PRODUCT_IMAGES.nicoleBotswana.src}
            alt={PRODUCT_IMAGES.nicoleBotswana.alt}
            width={PRODUCT_IMAGES.nicoleBotswana.width}
            height={PRODUCT_IMAGES.nicoleBotswana.height}
            sizes="(max-width: 1024px) 100vw, 640px"
            caption="Apelian during field research with San Bushmen communities in Botswana — the work behind her doctorate."
            credit={PRODUCT_IMAGES.nicoleBotswana.credit}
          />

          <div className="prose-shelf">
            <p>
              Nicole Apelian holds a{" "}
              <strong>bachelor&apos;s degree in biology from McGill University</strong>{" "}
              and a{" "}
              <strong>
                PhD from Prescott College, awarded in 2013, in Cultural
                Anthropology and Sustainability Education
              </strong>
              . Her doctoral research was conducted with San Bushmen communities
              in Botswana. She worked as a field biologist in Botswana, and she
              appeared on seasons 2 and 5 of the History Channel series{" "}
              <em>Alone</em>, lasting 57 days solo on Vancouver Island while
              living with multiple sclerosis.
            </p>
            <p>
              Two corrections worth stating plainly. First, several review sites
              claim her PhD is from McGill — <strong>it is not</strong>; McGill
              is the bachelor&apos;s degree, and the doctorate is from Prescott
              College. Second, she is <strong>not a medical doctor</strong>. The
              &ldquo;Dr.&rdquo; in her marketing refers to a PhD in cultural
              anthropology, not a medical qualification. That is not a mark
              against her — her survival and ethnobotany credentials are real and
              verifiable — but it does mean this kit should be treated as a
              gardening product, not as health guidance.
            </p>

            <h2 id="price">Price, guarantee and how refunds actually work</h2>
            <p>
              The kit is{" "}
              <strong>
                ${offer.price} plus ${offer.shipping} shipping
              </strong>
              , paid once. There is no subscription and no recurring charge.
            </p>
            <p>
              The <strong>365-day money-back guarantee</strong> is the strongest
              part of the offer, and it is worth understanding why. Payment runs
              through <strong>Digistore24</strong>, a payment processor, rather
              than being collected by the seller directly. That means a refund
              request goes to the processor and not solely to the vendor&apos;s
              inbox — a materially better position for a buyer than a
              seller-administered promise.
            </p>
            <p>
              A full year is also long enough to matter for a seed product. You
              can sow in spring, see what comes up, and still be inside the
              window in the following winter. Very few garden products give you a
              complete growing season to judge results.
            </p>

            <h2 id="limitations">
              What we would want you to know before buying
            </h2>
            <ul>
              <li>
                <strong>These are seeds, not plants and not remedies.</strong>{" "}
                You need soil, light, water, a growing season and patience.
                Nothing in the box does anything on its own.
              </li>
              <li>
                <strong>Three species are genuinely difficult</strong> and the
                sales page does not emphasise it. Stratify them.
              </li>
              <li>
                <strong>Evening primrose will not flower in year one.</strong> It
                is a biennial. This is the most commonly misread
                &ldquo;failure&rdquo; in the kit.
              </li>
              <li>
                <strong>The guide describes traditional use.</strong> Historical
                use of a plant is not clinical evidence that it works, and this
                review makes no claim that any of these plants treats anything.
              </li>
              <li>
                <strong>
                  Ignore the &ldquo;last kits available&rdquo; countdown
                </strong>{" "}
                on the sales page. It is a seed product. Whatever urgency the
                timer implies, the decision deserves however long you want to
                take.
              </li>
              <li>
                <strong>Check chicory before planting out.</strong> It
                naturalises readily and is treated as invasive in some regions.
              </li>
            </ul>

            <h2 id="alternatives">Should you just buy the seeds separately?</h2>
            <p>
              For some readers, yes — and we would rather say so than pretend the
              kit is the only sensible route.
            </p>
            <p>
              Every species here is widely available individually from
              established seed suppliers, and buying ten packets yourself would
              generally cost less than ${offer.price}. If you already garden,
              already know which herbs you want, and do not need a printed
              reference, buying separately is the cheaper and more flexible
              option. You also get to choose your own varieties and quantities.
            </p>
            <p>What the kit actually gives you for the difference is threefold:</p>
            <ul>
              <li>
                <strong>Curation</strong> — someone has chosen a coherent themed
                set, which removes the research step for a beginner
              </li>
              <li>
                <strong>A printed guide</strong> tying the ten species together
                in one physical reference
              </li>
              <li>
                <strong>A 365-day guarantee</strong>, which is far longer than
                the typical seed retailer offers
              </li>
            </ul>
            <p>
              Whether that bundle is worth the premium depends entirely on which
              kind of buyer you are. Beginner who wants a decided-for-you
              starting point: reasonable value. Experienced gardener with
              preferred suppliers: buy the seeds separately.
            </p>
          </div>

          <Figure
            src={PRODUCT_IMAGES.calendulaOil.src}
            alt={PRODUCT_IMAGES.calendulaOil.alt}
            width={PRODUCT_IMAGES.calendulaOil.width}
            height={PRODUCT_IMAGES.calendulaOil.height}
            sizes="(max-width: 1024px) 100vw, 640px"
            caption="Calendula infusing in oil — the kind of preparation the printed guide walks through."
            credit={PRODUCT_IMAGES.calendulaOil.credit}
          />

          <div className="prose-shelf">
            <h2 id="verdict">The verdict</h2>
            <p>
              The Medicinal Garden Kit is a legitimate, fairly priced themed seed
              collection with an unusually generous guarantee. It is not a
              shortcut to anything, and it is not medicine. Bought as what it
              actually is — a curated set of ten heirloom herb seeds with a
              printed reference — it is decent value for a beginner, and the
              year-long refund window removes most of the risk of finding out.
            </p>
            <p>
              Go in knowing that lavender and echinacea will test your patience,
              that evening primrose is playing a two-year game, and that a
              refrigerator and three weeks of forethought will meaningfully
              improve your results.
            </p>
          </div>

          <AffiliateCTA
            offer={offer}
            campaign="rev-end"
            label="Check the current price on the official page"
            sublabel={`Affiliate link. ${offer.guaranteeDays}-day money-back guarantee, processed via Digistore24.`}
          />

          <div className="prose-shelf">
            <h2 id="faq">Frequently asked questions</h2>
          </div>

          <FAQ items={FAQ_ITEMS} />

          <div className="mt-10 rounded-lg border border-line bg-surface-sunk px-5 py-4 text-sm leading-relaxed text-muted">
            <p>
              <strong className="font-semibold text-foreground">
                How we researched this:
              </strong>{" "}
              we reviewed the current sales page and vendor documentation,
              verified Nicole Apelian&apos;s credentials against primary sources,
              and drew the germination guidance from established horticultural
              practice for each species. We have not grown this kit ourselves and
              do not claim to have. If that changes, we will update this page and
              say so.{" "}
              <Link href="/about" className="underline underline-offset-2">
                More about how we work
              </Link>
              .
            </p>
          </div>

          <nav className="mt-10 border-t border-line pt-8">
            <h2 className="font-serif text-xl font-semibold">Keep reading</h2>
            <ul className="mt-4 flex flex-col gap-2 text-[0.95rem]">
              <li>
                <Link
                  href="/guides/medicinal-herbs-to-grow"
                  className="text-accent underline underline-offset-2"
                >
                  The 10 medicinal herbs in this kit, ranked by how hard they are
                  to grow
                </Link>
              </li>
              {HERBS.filter((h) =>
                ["echinacea", "lavender"].includes(h.slug),
              ).map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/guides/${h.slug}`}
                    className="text-accent underline underline-offset-2"
                  >
                    How to grow {h.name.split(" (")[0].toLowerCase()} from seed
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <BuyCard offer={offer} image={PRODUCT_IMAGES.hero} showImage />
          </div>
        </aside>
      </div>
    </div>
  );
}
