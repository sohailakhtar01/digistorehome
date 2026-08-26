// The ten species included in the Medicinal Garden Kit.
//
// EDITORIAL RULES FOR THIS FILE:
//  - `traditionalUse` describes historical/folk use ONLY. Never write a claim
//    that a plant treats, cures or prevents anything.
//  - Germination data reflects general horticultural guidance for the species,
//    not results we measured ourselves. Do not present it as our own trial.
//  - If a fact is uncertain, leave it out rather than guessing.
//
// `timing` drives the seed-starting calendar and is the same guidance written
// out in each species guide, expressed as weeks so dates can be computed:
//   method          "indoor" start in trays | "direct" sow in place | "both"
//   sowWeeksBefore  weeks before last frost to sow (0 for direct sowers, which
//                   go in at or after last frost instead)
//   stratWeeks      weeks of cold, moist stratification BEFORE that sowing date
// These are general horticultural ranges for the species, not our own trials.

export const HERBS = [
  {
    slug: "calendula",
    name: "Calendula",
    latin: "Calendula officinalis",
    lifecycle: "Annual",
    difficulty: "Easy",
    difficultyRank: 1,
    germDays: "7–14 days",
    sowDepth: "6 mm (1/4 in), covered — needs darkness",
    stratification: false,
    firstHarvest: "Same season, roughly 6–8 weeks from sowing",
    timing: {
      method: "both",
      sowWeeksBefore: 5,
      stratWeeks: 0,
      note: "Direct sowing after frost works just as well and is less work.",
    },
    summary:
      "The most forgiving plant in the kit and the best place for a beginner to start.",
    growing:
      "Calendula germinates quickly and reliably in ordinary soil, tolerates poor ground, and flowers within about two months of sowing. It self-seeds freely, so one packet realistically gives you calendula for years. Deadhead regularly and it will keep producing until frost.",
    traditionalUse:
      "The petals have a long history in folk practice of being dried and infused into oils and salves.",
    honestNote:
      "If you only succeed with one plant from this kit, it will be this one.",
  },
  {
    slug: "chicory",
    name: "Chicory",
    latin: "Cichorium intybus",
    lifecycle: "Perennial",
    difficulty: "Easy",
    difficultyRank: 2,
    germDays: "7–14 days",
    sowDepth: "6 mm (1/4 in)",
    stratification: false,
    firstHarvest: "Roots in autumn of year one; fuller in year two",
    timing: {
      method: "direct",
      sowWeeksBefore: 0,
      stratWeeks: 0,
      note: "Deep taproot — direct sow only. Sow once soil has warmed.",
    },
    summary:
      "Vigorous, hardy and almost impossible to kill once it takes hold.",
    growing:
      "Chicory forms a deep taproot, so direct sow where it will stay — it resents transplanting. It is genuinely drought tolerant once established and produces sky-blue flowers that open in the morning. Be aware it can naturalise readily in some regions.",
    traditionalUse:
      "The roasted root has been used historically as a coffee substitute and extender, particularly in Europe and the American South.",
    honestNote:
      "Check whether chicory is considered invasive in your area before planting it out.",
  },
  {
    slug: "chamomile",
    name: "German Chamomile",
    latin: "Matricaria recutita",
    lifecycle: "Annual",
    difficulty: "Easy",
    difficultyRank: 3,
    germDays: "7–14 days",
    sowDepth: "Surface sow — needs light to germinate",
    stratification: false,
    firstHarvest: "Flowers in roughly 8–10 weeks",
    timing: {
      method: "both",
      sowWeeksBefore: 5,
      stratWeeks: 0,
      note: "Surface sow. Needs light, and the surface must not dry out.",
    },
    summary: "Easy, fast and generous, provided you do not bury the seed.",
    growing:
      "The single most common mistake with chamomile is covering the seed. It requires light to germinate — press it onto the soil surface and keep it consistently moist until it sprouts. After that it is undemanding and will self-seed for following years.",
    traditionalUse:
      "The dried flowers have been taken as a calming tea across European folk tradition for centuries.",
    honestNote:
      "Surface sowing means the seedbed must not be allowed to dry out. This is the one point where chamomile is fussy.",
  },
  {
    slug: "feverfew",
    name: "Feverfew",
    latin: "Tanacetum parthenium",
    lifecycle: "Short-lived perennial",
    difficulty: "Easy",
    difficultyRank: 4,
    germDays: "10–14 days",
    sowDepth: "Surface sow — needs light to germinate",
    stratification: false,
    firstHarvest: "Usually flowers in year one if sown early",
    timing: {
      method: "indoor",
      sowWeeksBefore: 7,
      stratWeeks: 0,
      note: "Surface sow. Sown this early it usually flowers in year one.",
    },
    summary: "Reliable and enthusiastic — arguably too enthusiastic.",
    growing:
      "Like chamomile, feverfew needs light to germinate, so surface sow. Once established it self-seeds aggressively and will colonise a bed if you let it. Many gardeners treat it as a plant to contain rather than encourage.",
    traditionalUse:
      "Feverfew has a long documented history in European herbal tradition, where the leaves were used for headaches.",
    honestNote:
      "Expect volunteers everywhere the following spring. Plant it where that is welcome.",
  },
  {
    slug: "yarrow",
    name: "Yarrow",
    latin: "Achillea millefolium",
    lifecycle: "Perennial",
    difficulty: "Easy",
    difficultyRank: 5,
    germDays: "10–14 days",
    sowDepth: "Surface sow — needs light to germinate",
    stratification: false,
    firstHarvest: "Often flowers in year two",
    timing: {
      method: "indoor",
      sowWeeksBefore: 7,
      stratWeeks: 0,
      note: "Surface sow. Expect foliage only in year one.",
    },
    summary:
      "Tough, drought-tolerant and long-lived once it establishes.",
    growing:
      "Yarrow needs light to germinate and benefits from being started in trays where you can control moisture. It is slow in its first year and often does not flower until year two — this is normal and not a seed failure. Once established it is exceptionally hardy and spreads by rhizome.",
    traditionalUse:
      "Yarrow appears in wound-care folklore across many cultures; its botanical name references Achilles.",
    honestNote:
      "Do not expect flowers the first summer. Patience here is normal, not failure.",
  },
  {
    slug: "california-poppy",
    name: "California Poppy",
    latin: "Eschscholzia californica",
    lifecycle: "Annual or short-lived perennial",
    difficulty: "Moderate",
    difficultyRank: 6,
    germDays: "14–21 days",
    sowDepth: "3 mm (1/8 in), barely covered",
    stratification: false,
    firstHarvest: "Flowers in roughly 8–10 weeks",
    timing: {
      method: "direct",
      sowWeeksBefore: 0,
      stratWeeks: 0,
      note: "Taproot — never transplant. Sow as soon as soil is workable; it prefers cool soil.",
    },
    summary: "Easy to grow, but only if you direct sow it.",
    growing:
      "California poppy forms a taproot and strongly dislikes root disturbance, so it must be direct sown where it is to flower — starting it in pots and transplanting is the usual cause of failure. It prefers cool soil and poor, well-drained ground. Overwatering and rich soil both reduce flowering.",
    traditionalUse:
      "Used in Californian folk practice, historically associated with rest and calm.",
    honestNote:
      "Do not start this one indoors. Sow it directly or expect disappointment.",
  },
  {
    slug: "evening-primrose",
    name: "Evening Primrose",
    latin: "Oenothera biennis",
    lifecycle: "Biennial",
    difficulty: "Moderate",
    difficultyRank: 7,
    germDays: "14–21 days",
    sowDepth: "Surface to 3 mm — light aids germination",
    stratification: "Optional — improves consistency",
    firstHarvest: "Flowers in year TWO, not year one",
    timing: {
      method: "direct",
      sowWeeksBefore: 0,
      stratWeeks: 0,
      note: "Biennial. Direct sow; flowers in year two, not year one.",
    },
    summary:
      "Germinates readily, but it is a biennial and that surprises people.",
    growing:
      "Evening primrose spends its entire first year as a low rosette of leaves and does not flower until its second summer. Nothing has gone wrong if you see no flowers in year one — that is the plant's normal lifecycle. It self-seeds well, so after the initial wait it sustains itself.",
    traditionalUse:
      "The seed oil has a long history of traditional use; the flowers open at dusk, which gives the plant its name.",
    honestNote:
      "This is the most commonly misdiagnosed 'failure' in the kit. It is a biennial. Year one is leaves only.",
  },
  {
    slug: "marshmallow",
    name: "Marshmallow",
    latin: "Althaea officinalis",
    lifecycle: "Perennial",
    difficulty: "Hard",
    difficultyRank: 8,
    germDays: "14–28 days, erratic",
    sowDepth: "6 mm (1/4 in)",
    stratification: "Recommended — 3–4 weeks cold, moist",
    firstHarvest: "Roots usable from year two onward",
    timing: {
      method: "indoor",
      sowWeeksBefore: 7,
      stratWeeks: 4,
      note: "Stratify first, then sow. Wants consistently damp ground.",
    },
    summary:
      "Slow and uneven without cold treatment, and it needs consistent moisture.",
    growing:
      "Marshmallow germination is noticeably more consistent after a few weeks of cold, moist stratification in the refrigerator. It also genuinely prefers damp ground — it is a plant of wet meadows — so it struggles in dry beds. Give it time and water and it becomes a large, long-lived perennial.",
    traditionalUse:
      "The mucilaginous root has been used traditionally as a soothing preparation; it is the plant that gave the confection its name.",
    honestNote:
      "Stratify this one. Sown straight into warm soil, germination is often poor.",
  },
  {
    slug: "echinacea",
    name: "Echinacea (Purple Coneflower)",
    latin: "Echinacea purpurea",
    lifecycle: "Perennial",
    difficulty: "Hard",
    difficultyRank: 9,
    germDays: "10–30 days, erratic without stratification",
    sowDepth: "3–6 mm, lightly covered",
    stratification: "Strongly recommended — 4 weeks cold, moist",
    firstHarvest: "Usually flowers in year two",
    timing: {
      method: "indoor",
      sowWeeksBefore: 7,
      stratWeeks: 4,
      note: "Stratify first. Flowers in year two.",
    },
    summary:
      "One of the two seeds most likely to disappoint you, and the reason is fixable.",
    growing:
      "Echinacea germinates erratically when sown straight into warm soil. Four weeks of cold, moist stratification — seed in damp sand or a barely-damp paper towel in a sealed bag in the refrigerator — dramatically improves both rate and evenness. It is a true perennial and commonly spends year one building a root system without flowering.",
    traditionalUse:
      "Echinacea has extensive documented use among Plains Indigenous peoples of North America.",
    honestNote:
      "Along with lavender, this is the seed that generates the most complaints. Stratification is the difference between poor and good results.",
  },
  {
    slug: "lavender",
    name: "Lavender",
    latin: "Lavandula angustifolia",
    lifecycle: "Perennial",
    difficulty: "Hard",
    difficultyRank: 10,
    germDays: "14–30+ days, often uneven",
    sowDepth: "Surface sow — needs light",
    stratification: "Required in practice — 3–6 weeks cold, moist",
    firstHarvest: "Meaningful harvest usually year two or three",
    timing: {
      method: "indoor",
      sowWeeksBefore: 9,
      stratWeeks: 5,
      note: "Stratify first, surface sow, and expect slow uneven germination.",
    },
    summary:
      "Genuinely difficult from seed. This is normal, and it is not a defect in the kit.",
    growing:
      "Lavender is well known among growers as slow and unreliable from seed — commercial nurseries typically propagate it from cuttings for exactly this reason. Expect uneven germination even when you do everything right. Cold, moist stratification helps, as does surface sowing with warmth and light and considerable patience. It also needs sharp drainage and dislikes wet feet.",
    traditionalUse:
      "Dried lavender has centuries of traditional use in sachets, infusions and aromatic preparations.",
    honestNote:
      "If any seed in this kit underperforms for you, it will most likely be this one. That is the species, not the supplier.",
  },
];

export const getHerb = (slug) => HERBS.find((h) => h.slug === slug);

// Guides we have written in full. Only these are linked and sitemapped —
// we do not publish thin stubs for the rest.
// All ten kit species now have a guide. Order follows the difficulty ranking
// so the index reads from easiest to hardest.
export const PUBLISHED_HERB_GUIDES = HERBS.map((h) => h.slug);

export const publishedHerbs = () =>
  HERBS.filter((h) => PUBLISHED_HERB_GUIDES.includes(h.slug));

export const byDifficulty = () =>
  [...HERBS].sort((a, b) => a.difficultyRank - b.difficultyRank);

export const stratificationHerbs = () =>
  HERBS.filter((h) => h.stratification);
