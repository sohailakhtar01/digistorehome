# Keyword strategy — DataForSEO evidence, 2026-08-26

All figures below are **DataForSEO** values (Google Ads volume, DataForSEO Labs
difficulty and backlink averages), captured 2026-08-26, US / en / desktop.
Nothing here is estimated or filled in by hand.

**Read `search_volume` as a cluster, not a phrase.** Google Ads bundles close
variants, so "coneflower seeds" and "coneflower echinacea seeds" both report
27,100 because they are the same bundle counted twice. Treat a cluster total as
directional. **`RD` = `avg_backlinks_info.referring_domains`** — the average
number of linking domains held by pages currently ranking. It is the single best
proxy we have for "can a site with no links rank here".

---

## 1. The branded cluster is real, winnable, and very small

Complete set of branded keywords DataForSEO holds — this is all three of them:

| Keyword | Volume/mo | RD | Yearly trend | Intent |
|---|---|---|---|---|
| medicinal garden kit | 110 | 4.2 | **-67%** | transactional |
| medicinal garden kit reviews | 40 | **0.3** | **+200%** | informational |
| medicinal garden kit review | 40 | **0.3** | — | informational |
| **Total** | **190** | | | |

**What this means.** RD 0.3 says the pages ranking for the review terms have
essentially no backlinks — we can take those positions on content quality alone.
But 190 searches a month is the entire ceiling of the branded cluster, and the
head term is down 67% year over year.

**So the review page is a conversion asset, not a traffic asset.** It should win
its terms and it probably can. It will not, by itself, produce meaningful volume.
Any plan that rests on the branded term alone is a plan to earn very little.

---

## 2. Where the actual traffic is: the coneflower discovery

Echinacea's common name is **coneflower**, and that is what people search. It is
one of the ten kit species and we already have `/guides/echinacea`.

| Keyword | Volume/mo | RD |
|---|---|---|
| coneflower seeds | 27,100 | 2 |
| coneflower echinacea seeds | 27,100 | 3 |
| coneflower from seeds | 27,100 | 1 |
| purple coneflower seeds | 14,800 | 2 |
| plant purple coneflower seeds | 14,800 | 1 |
| what do coneflower seeds look like | 1,300 | **0** |
| how to collect coneflower seeds | 1,000 | **0** |
| how to harvest coneflower seeds | 1,000 | **0** |
| how to harvest purple coneflower seeds | 1,000 | **0** |
| when to plant coneflower seeds | 1,000 | 1 |
| harvesting coneflower seeds | 590 | **0** |
| coneflower seeds how to plant | 880 | **0** |

Two things stand out. The head cluster runs at RD 1–3, which is nearly nothing.
And there is a whole **harvest-and-identify sub-cluster at RD 0** — roughly
5,000–6,000 searches a month across it — that no page with any link profile is
serving. Our echinacea guide currently says nothing about harvesting seed or what
the seed looks like.

## 3. The lavender cluster is proven winnable by a site our size

`nextdoorhomestead.com` ranks with **one blog post**, `/blog/grow-lavender-containers-from-seed/`:

| Keyword | Volume/mo | RD | Their position |
|---|---|---|---|
| lavender from seed | 9,900 | **0** | 2 |
| seed starting mix for lavender | 5,400 | **0** | 3 |
| germinating lavender seeds | 4,400 | **0** | 3 |
| growing lavender from seed | 4,400 | 1 | 2 |
| planting lavender seeds | 4,400 | **0** | 3 |
| lavender when to plant seeds | 4,400 | 24 | 2 |
| how to grow lavender plants | 4,400 | 36 | 3 |

One article, top-3 across a ~35,000/mo cluster, on terms whose ranking pages
average zero referring domains. This is the clearest evidence in the whole
dataset that **content quality, not links, is the binding constraint here.**

## 4. What the mature competitor does differently

`chestnutherbs.com` holds **895** ranked keywords in the top 20. Their pattern is
one deep article per plant, targeting the **plant name itself** rather than only
"how to grow it":

| Keyword | Volume/mo | RD | Their position |
|---|---|---|---|
| herbal garden | 12,100 | **6** | 7 |
| herb garden | 12,100 | 14 | 9 |
| garden herbs | 12,100 | 33 | 10 |
| purple dead nettle | 14,800 | 12 | 3 |
| calendula | 90,500 | 74 | 9 |

`herbal garden` at 12,100/mo with RD 6 is the standout — a category page we do
not have.

Their high-volume wins (hibiscus at 450,000, violet at 201,000) sit behind RD
75–120 and are not reachable. The per-plant pages at RD 6–20 are.

---

## 5. Seasonality — the reason to publish now

`coneflower seeds` monthly history:

```
2025-08  33,100     2026-02  18,100
2025-09  27,100     2026-03  33,100
2025-10  18,100     2026-04  49,500   <- peak
2025-11  12,100     2026-05  40,500
2025-12   9,900     2026-06  18,100
2026-01  14,800     2026-07  18,100   <- now
```

Demand peaks March–May and bottoms in December. We are in the trough. A page
published today has six to eight months to be crawled, indexed and aged before
the **spring 2027 season**, which is when seed buying — and therefore commission
— actually happens. Publishing in March is publishing too late.

---

## 6. Priority order

Ranked by (cluster volume x low RD x how little work it is):

1. **Expand `/guides/echinacea` to own "coneflower".** Retitle around the common
   name, add a harvesting section and a seed-identification section with photos.
   Targets the RD-0 sub-cluster nobody serves.
2. **New guide: harvesting and saving seed.** Cross-species. Feeds the RD-0
   harvest terms across echinacea, calendula, chamomile and yarrow at once.
3. **Expand `/guides/lavender`** to match the coverage depth that has
   `nextdoorhomestead.com` at #2 — germination medium, containers, timing.
4. **New hub page: `/guides/herbal-garden`** targeting `herbal garden` /
   `herb garden` (12,100/mo, RD 6–14). Links to every plant guide. This is the
   internal-linking spine the site currently lacks.
5. **Publish the eight missing plant guides.** Only echinacea and lavender exist;
   the kit has ten species and each one is a keyword cluster.
6. **Leave the review page mostly alone.** It is already positioned for a
   190/mo cluster at RD 0.3. Point internal links at it from every guide above.

---

## 7. Technical check — one real defect

`/v3/on_page/instant_pages` on the review page, same date:

- `onpage_score` **97.44**
- 3,760 words, 14 internal links, 5 external, CLS 0, 28KB transferred
- **`"is_www": true` while `canonical` reads `https://thehomesteadshelf.com/...`**

The crawler was redirected apex to www and then served a page claiming the apex
as canonical. Independent confirmation of the redirect conflict. Fix is one
setting: make the apex primary in Vercel. Bing has the apex registered
(`https://thehomesteadshelf.com/`, verified), so the apex must win.

Minor, optional: title is 87 characters and will truncate in SERPs around 60.
`meta_keywords` is present and is ignored by every major engine — harmless.
