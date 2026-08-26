# Master keyword map — evidence-led, 2026-08-26

Source: DataForSEO Labs `keyword_suggestions` across all ten kit species plus four
cross-cutting topics, then `serp/google/organic` intent checks on the terms that
looked most attractive. US / en / desktop. Raw JSON in `raw/dfs/`.

Filter applied: **KD 0–30**, matching the ceiling set in Semrush.

> Keywords whose `keyword_difficulty` came back null are counted as **UNKNOWN**,
> never as zero. Missing data is not a difficulty of zero.

---

## The finding that changes everything: KD is not enough

`echinacea seeds` reports **27,100/mo at KD 0**. On paper that is the best keyword
in the entire dataset. Here is the actual SERP:

```
1  burpee.com                 Echinacea Seeds and Plants
2  parkseed.com               Echinacea Seeds & Plants | 30+ Varieties
3  edenbrothers.com           Echinacea Seeds | Shop 16 Varieties
4  swallowtailgardenseeds.com Echinacea Seeds - Perennial Flower Seeds
6  johnnyseeds.com            Echinacea (Coneflower)
7  anniesheirloomseeds.com    Organic Echinacea
8  rareseeds.com              Echinacea Seeds for Planting
9  bulkwildflowers.com        Bulk Coneflower Seeds
```

Nine of nine are shops, with a `popular_products` shopping carousel on top.
Google has decided this query means *sell me seeds*. No review site ranks there,
and no amount of good writing will change that.

**Why KD said 0.** DataForSEO computes difficulty from the backlink profiles of the
top-ranking *pages*. Retailer category pages carry very few page-level links even
when the domain is enormous. KD 0 here means "these pages have no links", not
"this SERP is open". Reading it as opportunity is how people waste a year.

`lavender seeds` (9,900/mo, KD 0) is the same: Amazon, Seed Therapy, Eden Brothers,
Ferry Morse, Rare Seeds, Johnny's.

### The three gates

A keyword is only a target if it clears all three:

1. **KD 0–30** — the filter set in Semrush. Necessary, nowhere near sufficient.
2. **SERP shape** — are the ranking pages *blogs*, or are they *shops*? Check
   before writing. A `popular_products` or `local_pack` feature is a red flag.
3. **Commercial fit** — would this visitor ever buy a medicinal seed kit?

---

## Gate 2 in action: the same plant, two different SERPs

`how to harvest echinacea seeds` — 1,000/mo, KD 0, RD **0**:

```
1  growitbuildit.com          THE Easiest Way to Harvest Echinacea Seeds
2  reddit.com                 Are my coneflowers ready to harvest for seeds?
3  evergrowingfarm.com        Sowing, Growing, and Harvesting Echinacea
5  southernliving.com         How And When To Harvest Coneflower Seeds
7  gracegritsgarden.com       How to harvest Coneflower Seeds
8  ecofriendlyhomestead.com   How I Harvest Echinacea Seeds
```

Independent blogs, one magazine, one Reddit thread. **This is a SERP we can enter.**

`what do coneflower seeds look like` — 1,300/mo, KD 0, RD 0, ranked #1 by
`singlegirlsdiy.com`. Features `images` and `short_videos`, so original photography
is part of the ranking signal, not decoration.

---

## Target list — cleared all three gates

| Cluster | Real vol/mo | KD | RD | SERP verdict |
|---|---|---|---|---|
| harvest echinacea / coneflower seeds | ~1,000 | 0 | **0** | Independent blogs — **open** |
| what do echinacea / coneflower seeds look like | ~1,300 | 0 | 4 | Tiny blogs + Reddit — **open** |
| how to collect coneflower seeds | ~1,000 | 0 | **0** | Same cluster — **open** |
| germinating echinacea seeds | 1,300 | 0 | 4 | Informational — **open** |
| cold stratification for lavender seeds | 1,300 | 0 | 2 | We already rank-target this |
| seeds that need cold stratification | ~680 | 0 | 3–11 | List intent — **open** |
| what do yarrow seeds look like | 260 | 0 | 16 | **open** |
| feverfew plant identification / pictures | ~800 | 0 | 0–15 | Image intent — **open** |
| chicory plant pictures / images | ~4,400 | 0–9 | 6–67 | Mixed; the RD-6 variant only |
| when to plant echinacea seeds | 1,300 | 0 | 1 | Mixed, Clemson `.edu` present — **harder** |

**Volume note.** Google Ads bundles close variants, so "how to harvest echinacea
seeds", "how to harvest coneflower seeds" and "how to harvest seeds from
coneflowers" all report 1,000 because they are one bundle counted three times. The
cluster is worth roughly 1,000/mo, not 3,000. Reported honestly here because
inflating it would only set up a disappointment later.

## Rejected, with reasons

| Cluster | Vol/mo | Why rejected |
|---|---|---|
| echinacea seeds | 27,100 | Gate 2 — 9/9 retailers plus a shopping carousel |
| lavender seeds | 9,900 | Gate 2 — Amazon and five seed shops |
| calendula seeds | 9,900 | Gate 2 — same retail pattern |
| yarrow seeds | 8,100 | Gate 2 — same |
| california poppy seeds | 18,100 | Gate 2 — transactional intent, retail SERP |
| marshmallow root | 49,500 | Gate 3 — supplement buyers, not gardeners. RD 50–90 |
| evening primrose oil | 22,200 | Gate 3 — a supplement query. We sell seeds |
| seed starting mix | 33,100 | Gate 3 — product query, and off our topic |
| how to harvest sunflower seeds | 3,600 | Gate 3 — sunflower is not in the kit |

Marshmallow and evening primrose deserve a note: both report enormous volume, but
the volume is for **oil and supplement** queries. Someone searching "evening
primrose oil in pregnancy" is not a seed-kit buyer, and writing that page on a
gardening site would be commercially useless and, given the subject matter,
editorially reckless. Skipped on purpose.

---

## On the Semrush seeds

Four seeds were researched at KD 0–30 in Semrush. Against the three gates:

| Seed | Vol | Avg KD | Verdict |
|---|---|---|---|
| how to compost | 27,680 | 17 | Gates 1 and 2 pass. Gate 3 **weak** — homesteading-adjacent, sells no seeds |
| how to start a garden | 6,050 | 23 | Gates 1 and 2 pass. Gate 3 **weak** — broad beginner intent |
| how to grow basil | 14,420 | 21 | Gates 1 and 2 pass. Gate 3 **partial** — herb growing, but basil is not in the kit |
| gluten free bread recipe | 104,810 | 17 | Gate 3 **fails outright** — no path to a seed-kit sale |

The KD ceiling was set correctly. The seeds were not chosen against the site's
topic. **This is precisely the mechanism that turns a review site into a content
farm:** a pile of unrelated low-difficulty articles, each individually defensible,
collectively signalling that the site is about nothing. Topical focus is the asset
here — one product, ten species, and a narrow claim to expertise.

If a homesteading widening is wanted later, `how to compost` is the only one of the
four worth revisiting, and only once the ten species pages exist.

---

## Correction to my earlier recommendation

I previously proposed a `/guides/herbal-garden` hub on the strength of
`herbal garden` — 12,100/mo, KD 6, RD 6. The SERP check does not support it:

```
1  theherbalgardens.com   (a shop)          + local_pack
6  botanicalinterests.com (a shop)          + popular_products
7  shop.epicgardening.com (a shop)
9  yelp.com               (a business listing)
```

Google reads a meaningful share of this query as **local business** intent — there
is a store called The Herbal Gardens in Miramar, Florida. `chestnutherbs.com` does
rank at #3, so content is not locked out, but this is not the clean RD-6 opening
the metrics implied. **Downgraded from priority 4 to optional.** A hub page is
still worth building for internal linking; it should just not be justified by this
term.

---

## Build order

1. **Expand `/guides/echinacea` into the harvest and identification cluster.**
   Add: what echinacea seed looks like, when the cone is ready, how to separate
   seed from chaff, how to store it. The SERP carries an `images` feature, so
   photography is a ranking input. Retitle around **coneflower**, the common name
   people actually search.
2. **New guide: saving seed from the ten kit species.** Scoped to our species only —
   not sunflowers or zinnias, which carry more volume but no commercial fit.
3. **Deepen `/guides/lavender`** on germination specifics, where the RD-0
   informational long tails sit.
4. **The eight missing species guides**, each targeting its identification and
   growing long tails rather than its retail head term.
5. **Hub page** for internal linking, justified on site architecture rather than on
   the `herbal garden` keyword.
