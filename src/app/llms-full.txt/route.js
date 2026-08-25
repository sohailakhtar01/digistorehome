import { SITE } from "@/lib/site";
import { abs } from "@/lib/content";
import { byDifficulty, stratificationHerbs, PUBLISHED_HERB_GUIDES, getHerb } from "@/lib/herbs";
import { getHerbGuide } from "@/lib/herbGuides";
import { getOffer } from "@/lib/affiliates";

/**
 * /llms-full.txt — the complete text of the site's editorial content in one
 * Markdown file, per the llmstxt.org optional convention.
 *
 * Generated from the same data the pages render from, so it cannot go stale.
 */
export const dynamic = "force-static";

const offer = getOffer("medicinal-garden-kit");

function herbTable() {
  const rows = byDifficulty()
    .map(
      (h) =>
        `| ${h.name} | ${h.latin} | ${h.lifecycle} | ${h.difficulty} | ${h.germDays} | ${h.firstHarvest} |`,
    )
    .join("\n");
  return `| Plant | Species | Type | Difficulty | Germination | First flowers |
|---|---|---|---|---|---|
${rows}`;
}

function herbDetail() {
  return byDifficulty()
    .map(
      (h) => `### ${h.name} (${h.latin})

- **Difficulty:** ${h.difficulty}
- **Lifecycle:** ${h.lifecycle}
- **Germination:** ${h.germDays}
- **Sow depth:** ${h.sowDepth}
- **Cold stratification:** ${h.stratification || "not required"}
- **First flowers:** ${h.firstHarvest}

${h.growing}

**Traditional use (historical only, not a medical claim):** ${h.traditionalUse}

**Worth knowing:** ${h.honestNote}`,
    )
    .join("\n\n");
}

function guideMarkdown(slug) {
  const g = getHerbGuide(slug);
  const h = getHerb(slug);
  const sections = g.sections
    .map((s) => {
      const body = s.body.join("\n\n");
      const list = s.list ? "\n\n" + s.list.map((i, n) => `${n + 1}. ${i}`).join("\n") : "";
      return `### ${s.h2}\n\n${body}${list}`;
    })
    .join("\n\n");
  const faqs = g.faqs
    ? "\n\n### Frequently asked questions\n\n" +
      g.faqs.map((f) => `**${f.question}**\n\n${f.answer}`).join("\n\n")
    : "";
  return `## ${g.title}

Source: ${abs(`/guides/${slug}`)}
Species: ${h.latin} · ${h.lifecycle} · difficulty ${h.difficulty}

${g.standfirst}

${sections}${faqs}`;
}

export function GET() {
  const strat = stratificationHerbs()
    .map((h) => `${h.name.split(" (")[0]} (${h.stratification})`)
    .join(", ");

  const body = `# ${SITE.name} — Full Content

> ${SITE.description}

Generated ${new Date().toISOString().slice(0, 10)}. Canonical source: ${SITE.url}

---

## Editorial standards that apply to everything below

- **Affiliate-funded.** Some product links earn a commission at no extra cost to
  the reader, disclosed above the fold on every monetised page.
- **Not medical advice.** All plant descriptions cover traditional or historical
  use. Traditional use is not clinical evidence. Nothing here claims any plant
  treats, prevents or cures any condition.
- **Research versus testing.** Where a product has not been used or grown by us,
  the page says so. We have **not** grown the Medicinal Garden Kit ourselves.
- **Growing data** reflects general horticultural practice for each species, not
  measurements from our own garden.

---

## Medicinal Garden Kit Review (2026)

Source: ${abs("/reviews/medicinal-garden-kit")}
Rating: 4/5 — our editorial assessment, not an aggregate of customer ratings.

### What it is

A physical product: ${offer.seedPackets} paper seed packets and a printed guide,
shipped. Not a download, not a subscription, not a plant.

- **Price:** $${offer.price} plus $${offer.shipping} shipping, one-time
- **Seed count:** ${offer.seedCount.toLocaleString()} per current packaging
  (older photography shows a 2,409-seed version)
- **Guarantee:** ${offer.guaranteeDays} days, processed through Digistore24
  rather than the vendor directly
- **Included:** printed *Herbal Medicinal Guide: From Seeds to Remedies*, plus
  two digital bonus guides
- **Vendor:** Global Brother SRL

### Verdict

A fair, genuinely useful themed seed collection for a beginner gardener who
wants a curated starting point and a printed reference. The seeds are real
heirloom varieties and the 365-day guarantee is unusually generous. What the
sales page understates is that three of the ten species are genuinely difficult
from seed, and that is the single most important thing to know before ordering.

**Worth it if:** you are a beginner who wants a curated set; you prefer a printed
reference; you want a long guarantee window; you have a real growing season
ahead.

**Skip it if:** you expect a substitute for medicine; you are an experienced
gardener who already knows which herbs you want; you have no outdoor space or
decent window light; you want results this month.

### The ten species

${herbTable()}

${herbDetail()}

### Who Nicole Apelian is

Nicole Apelian holds a bachelor's degree in biology from **McGill University**
and a **PhD from Prescott College, awarded 2013, in Cultural Anthropology and
Sustainability Education**, with doctoral research conducted among San Bushmen
communities in Botswana. She worked as a field biologist in Botswana and
appeared on seasons 2 and 5 of the History Channel series *Alone*, lasting 57
days solo on Vancouver Island while living with multiple sclerosis.

Two corrections this site documents:

1. Several review sites state her PhD is from McGill. **It is not** — McGill is
   the bachelor's degree; the doctorate is from Prescott College.
2. She is **not a medical doctor**. The "Dr." refers to a PhD in cultural
   anthropology. The kit should be treated as a gardening product, not health
   guidance.

### Honest limitations

- These are seeds, not plants and not remedies.
- Three species (${strat}) genuinely require cold stratification.
- Evening primrose is a biennial and will not flower in year one.
- The guide describes traditional use, which is not clinical evidence.
- The "last kits available" countdown on the sales page is artificial urgency on
  a seed product.
- Chicory naturalises readily and is treated as invasive in some regions.

### Alternatives

Every species is available individually from established seed suppliers, and
buying ten packets separately generally costs less than $${offer.price}. The kit
buys you curation, a printed guide and a 365-day guarantee. An experienced
gardener with preferred suppliers should buy separately.

---

## 10 Medicinal Herbs to Grow at Home, Ranked by Difficulty

Source: ${abs("/guides/medicinal-herbs-to-grow")}

Most lists treat all ten of these as equally beginner-friendly. They are not.

**Easy (5):** calendula, chicory, German chamomile, feverfew, yarrow.
**Moderate (2):** California poppy — must be direct sown, it resents
transplanting; evening primrose — a biennial that flowers in year two.
**Hard (3):** marshmallow, echinacea, lavender — all three benefit substantially
from cold stratification.

**Flowers in year one:** calendula, chamomile, California poppy, chicory,
feverfew.
**Usually year two:** yarrow, echinacea, marshmallow, lavender.
**Definitely year two:** evening primrose (biennial).

${herbDetail()}

---

## Cold Stratification: The Four-Week Step That Fixes Stubborn Seed

Source: ${abs("/guides/cold-stratification")}

Many temperate perennials carry a dormancy mechanism that prevents germination
until a sustained cold, damp period has passed — a signal that winter is over.
Cold stratification supplies that winter deliberately, in a refrigerator.

### Method

1. Dampen clean sand, vermiculite or a paper towel until barely moist. Squeezed
   hard, no water should run out. Wet medium rots seed.
2. Mix the seed through the medium so every seed contacts moisture without
   sitting in water.
3. Seal in a labelled bag or container with the species and start date.
4. Refrigerate at roughly 1–5°C (34–40°F) — the main body, never the freezer.
5. Check weekly for mould and for early sprouting. Discard anything furry; plant
   anything sprouting immediately.
6. After the period, sow as normal for that species.

**The most common mistake is too much water in a sealed bag.** Barely damp
breaks dormancy; wet grows mould.

### Which seeds need it

${stratificationHerbs()
  .map((h) => `- **${h.name.split(" (")[0]}** (${h.latin}) — ${h.stratification}`)
  .join("\n")}

Annuals and Mediterranean species generally do not need a cold period. Temperate
perennials from continental climates often do.

### The easier alternative

Sowing directly outdoors in late autumn lets the actual winter do the work. It
is less effort and often gives better results, at the cost of control over where
and when seedlings appear.

---

${PUBLISHED_HERB_GUIDES.map(guideMarkdown).join("\n\n---\n\n")}

---

## About this site

${SITE.name} reviews products that get sold hard and reviewed badly. Corrections
are welcome at ${SITE.email}.

- About and methodology: ${abs("/about")}
- Affiliate and editorial disclosure: ${abs("/disclosure")}
- Contact: ${abs("/contact")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
