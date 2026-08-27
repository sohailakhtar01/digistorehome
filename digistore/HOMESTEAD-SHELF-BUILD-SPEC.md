# thehomesteadshelf.com — Master Build Specification

**Single source of truth for building and launching this site.**
Written 2026-08-25. Drop this file into the Next.js project root and treat it as
the operating brief. Everything an agent or a human needs is in this one file.

---

# 0. READ THIS FIRST — TWO FINDINGS THAT CHANGE THE PLAN

Both landed today, after the domain was bought. The domain purchase is still
correct. The *content plan* has to change.

## 0.1 The branded market is small AND shrinking

Live Google Ads volume, US, pulled 2026-08-25:

| Keyword | Volume/mo | Trend |
|---|---|---|
| `medicinal garden kit` | **110** | **210 (Jan 26) → 70 (Jul 26) = −67%** |
| `medicinal garden kit reviews` | **40** | 20 last month |
| `medicinal garden kit review` | **40** | 20 last month |
| `medicinal seed kit` | 40 | declining |
| `nicole apelian medicinal garden kit` | 10 | flat |
| `medicinal garden kit nicole apelian` | 10 | flat |
| `nicole apelian garden kit` | **no data** | below threshold |
| `medicinal garden kit scam` | **no data** | below threshold |
| `is the medicinal garden kit legit` | **no data** | below threshold |
| `backyard pharmacy` (non-brand) | **140** | largest in the set |

**Do the honest math.** Our "primary target query" gets 40/mo on *Google*. Bing
runs roughly 7–8% of Google's US volume, so Bing is plausibly **3–5 searches a
month** for that phrase. At #1 with 30% CTR that is **~1 visitor/month**. At the
vendor's own stated 1-sale-per-14-visitors, that is **one sale every ~14 months.**

**Caveats, applied fairly — this is a floor, not a verdict:**
- Google Ads under-reports and buckets long-tail terms. "No data" means *below
  reporting threshold*, not zero. Bing autosuggest volunteers 8 related searches
  for this brand, so real people do type them.
- The whole branded cluster sums to **~250/mo on Google**, not 40.
- This audience — preppers, homesteaders, 45+ — **over-indexes on Bing**. The real
  Bing share here is plausibly well above 8%. I have no Bing volume figure and
  will not invent one.
- Still: the trend line is down 67% in six months. Treat the offer as **mature,
  possibly past peak.**

### What this means
**DO NOT build a single-product Medicinal Garden Kit site.** The branded query
cannot support one. **Build the portfolio site** — which is precisely what this
domain was chosen for. Had we bought `medicinal-garden-kit.com`, we would now own
a domain welded to a 40/mo declining query. The portfolio domain survives this
finding intact. That is the entire reason it won.

**Medicinal Garden Kit is ONE review among many. Not the site.**

## 0.2 The affiliate agreement restricts what we may publish

From `medicinalseedkit.com/affiliates/`, verbatim:

> - *"No negative marketing tactics are allowed"* — no **"non-positive reviews and scam promotions"**
> - Cannot use negative words such as **"scam"** in campaigns
> - *"Our product is not available for Facebook, YT, Instagram, Tik Tok, Pinterest or Bing/Google **paid advertising**"*
> - No SPAM / safelists · No cash rebates · No cookie stuffing · No false endorsements
> - **Must follow FTC guidelines**
> - Violation penalty: **"immediate and permanent ban"**

**Consequences, binding:**

1. **KILL the `medicinal garden kit scam` keyword target.** Prohibited by contract,
   and it has no measurable volume anyway. Remove it from every plan.
2. **No paid ads anywhere.** Organic only. (This was already the plan.)
3. **Organic YouTube is ambiguous** — the sentence reads as *paid* advertising on
   those platforms, but "YT" is listed. **Email the affiliate manager and get it in
   writing before producing video.** Do not assume.
4. **The review must be genuinely positive to comply** — see §8 for how that
   coexists with honesty. It does, but only if written a specific way.

---

# 1. MISSION AND NON-NEGOTIABLES

**Mission:** a small, genuinely useful homesteading & preparedness review
publication that earns affiliate commissions by being the most accurate resource
on each product it covers.

**Non-negotiables. These override speed, ranking, and revenue. Every time.**

1. **Never make a disease claim.** No "cures", "treats", "heals", "prevents",
   "remedy for X condition". Not in copy, headings, alt text, meta, or schema.
2. **Never fabricate.** No invented test results, no fake author personas, no
   stock photos passed off as our own garden, no made-up review counts, no
   invented star ratings, no fake scarcity or countdown timers.
3. **Disclose the affiliate relationship** above the fold on every monetised page.
   FTC requires clear and conspicuous. Non-negotiable and also contractually
   required.
4. **Never copy vendor sales copy.** The previous owner of
   `medicinal-garden-kit.com` built a doorway page from duplicated VSL copy and
   the domain is now dead. Do not repeat that.
5. **Traditional use ≠ clinical evidence.** Every herb mention is framed as
   traditional/historical use. Always.
6. **No doorway pages, no cloaking, no thin auto-generated content.**
7. **If a fact cannot be verified, mark it UNKNOWN or leave it out.**

---

# 2. VERIFIED FACTS — use these, do not re-derive

## The offer
| Field | Value |
|---|---|
| Product | **Medicinal Garden Kit** |
| Creator | **Nicole Apelian, Ph.D** |
| Sales page | `https://medicinalseedkit.com/kit/` |
| Headline | *"The Most Important Thing That's Probably Missing From Your Backyard"* |
| Contents | 10 seed packets, **4,818 non-GMO seeds** — Chicory, Yarrow, California Poppy, Marshmallow, Chamomile, Evening Primrose, Lavender, Echinacea, Calendula, Feverfew |
| Included guide | *Herbal Medicinal Guide: From Seeds to Remedies* |
| Bonuses | *Healing Yourself At Home With Household Items* · *Wild Edible and Medicinal Herbs You Can Forage* (each stated $29 value) |
| Support | 24/7 one-on-one support (vendor claim) |
| **Guarantee** | **365 days money-back** — verified on the live page |
| Price | $59 + $4.99 shipping (verify at publish time) |
| Vendor | **Global Brother SRL** — Romania; returns Austin, TX; payments via Digistore24 |

## Affiliate terms
| Field | Value |
|---|---|
| Commission | **72% initial**, 90% digital upsells, 75% physical upsells |
| Max per sale | up to **$213.65** |
| Vendor-stated EPC | **$2.75** |
| Vendor-stated conversion | **~1 sale per 14 visitors (7.1%)** |
| Digistore24 product ID | **379812** |
| Affiliate ID | **sohailakhtar01** |
| Creatives | 2 email swipes, 5 banners (available on the affiliates page) |

## About Nicole Apelian — what is TRUE and what to never say
**Verified true:**
- Real, publicly documented person. BS Biology, **McGill University**.
- **PhD, Prescott College, 2013 — Cultural Anthropology & Sustainability
  Education.** Dissertation publicly retrievable.
- History Channel *Alone*, **seasons 2 and 5**; 57 days solo, Vancouver Island.
- Has Multiple Sclerosis. Former Peace Corps; field biologist in Botswana.

**Never write:**
- ❌ "PhD from McGill" — **false.** McGill is the bachelor's. A competitor
  currently ranking on our target SERP gets this wrong; getting it right is a
  differentiator.
- ❌ "Dr. Apelian" in any medical context, or any implication she is a physician.
  **She is not a medical doctor.** Refer to her as a herbalist, biologist and
  survival instructor with a PhD in cultural anthropology.
- ❌ Any claim that her herbs treat, cure or prevent any condition.

**Known context (see §8 for how to handle):** the FTC sent her a warning letter
on 8 May 2020 regarding COVID-prevention claims for **herbal tinctures sold on
her separate apothecary site** — not this seed kit. It was a warning letter only:
no lawsuit, no adjudication, no penalty.

---

# 3. THE TRACKING LINK — FIX THIS BEFORE ANYTHING SHIPS

**The link supplied uses a URL fragment and is fragile:**

```
❌ https://medicinalseedkit.com/kit/#aff=sohailakhtar01
```

A `#fragment` is **never sent to the server**. Attribution depends entirely on
client-side JavaScript reading `location.hash`. If their script fails, or a
browser or privacy extension strips the hash, **the commission is silently lost
and you will never know.**

**Use the official Digistore24 server-side redirect. Tested today — resolves in 2
hops to `https://medicinalseedkit.com/kit/?aff=sohailakhtar01` (`?` query param,
server-visible):**

```
✅ https://www.digistore24.com/redir/379812/sohailakhtar01/CAMPAIGN
```

**Use the `CAMPAIGN` slot on every link so you can tell which page earns.** One
campaign token per placement:

| Placement | Link |
|---|---|
| Review page, top CTA | `.../379812/sohailakhtar01/rev-top` |
| Review page, mid CTA | `.../379812/sohailakhtar01/rev-mid` |
| Review page, final CTA | `.../379812/sohailakhtar01/rev-end` |
| Comparison table | `.../379812/sohailakhtar01/compare` |
| Homepage card | `.../379812/sohailakhtar01/home` |

**Implementation:** central config, never hardcoded inline.

```js
// src/lib/affiliates.js
const DS24 = (product, campaign) =>
  `https://www.digistore24.com/redir/${product}/sohailakhtar01/${campaign}`;

export const OFFERS = {
  medicinalGardenKit: {
    name: "Medicinal Garden Kit",
    productId: "379812",
    link: (campaign) => DS24("379812", campaign),
    price: 59,
    shipping: 4.99,
    guaranteeDays: 365,
  },
};
```

Every outbound affiliate link: `rel="sponsored nofollow noopener"` and
`target="_blank"`.

---

# 4. REALISTIC EXPECTATIONS — set these now

**Correction to an earlier figure I gave you.** I previously computed **$8.06 per
referred click** from the marketplace export ($45.70 × 18% "cart conversion").
The vendor's own affiliate page states **EPC $2.75** and **1 sale per 14 visitors
(7.1%)**. The vendor's number is the more meaningful one — that 18% was almost
certainly order-form conversion, not sales-page conversion. **Plan on ~$2.75–3.25
per visitor sent, not $8.06.** Still good. Three times lower than I said.

| Horizon | Realistic |
|---|---|
| Launch day | Indexed within days via Bing Webmaster Tools. Indexed ≠ ranked. |
| 30 days | Not ranking, or positions ~50–100. Expect **zero sales.** |
| 60–90 days | Positions ~11–30. Possible first sale. |
| 6–12 months | Positions 3–10 achievable on the branded review query. |

**No ranking is promised.** With this volume, a *single* product page is a hobby.
**The portfolio is the business** — 15–30 reviews compounding, which is exactly
what `consumerhealthdigest.com` does (ranked in 23 of 30 SERPs we measured).

---

# 5. SITE ARCHITECTURE

```
/                        Homepage — what this site is, latest reviews
/reviews/                Review index
/reviews/medicinal-garden-kit/          ← flagship, build first
/guides/                 Informational hub (the real traffic engine)
/guides/medicinal-herbs-to-grow/
/guides/growing-echinacea-from-seed/
/guides/growing-lavender-from-seed/
/about/                  Who runs this, methodology, why trust us
/disclosure/             Affiliate + editorial disclosure (FTC)
/contact/
/privacy/  /terms/
```

**Rule:** `/reviews/` monetises, `/guides/` earns the traffic and the topical
authority. Non-brand informational terms (`backyard pharmacy` 140/mo,
`medicinal herbs to grow`, per-herb growing guides) are **larger and more stable**
than the branded review query. Build both from day one.

---

# 6. CONTENT PLAN — priority order

### Tier 1 — ship today
1. **Homepage** — clear positioning, no fluff
2. **`/reviews/medicinal-garden-kit/`** — the flagship (§8 standard)
3. **`/disclosure/`** — FTC affiliate + editorial policy
4. **`/about/`** — real identity, real methodology

### Tier 2 — week 1
5. `/guides/medicinal-herbs-to-grow/` — targets the non-brand cluster
6. Per-herb growing guides: **Echinacea and Lavender first** — they are the two
   with the most reported germination difficulty, so they are the highest-value
   honest content, and the questions are real.
7. `/reviews/` index

### Tier 3 — weeks 2–6, one per week
8. Remaining 8 herb guides (Chicory, Yarrow, California Poppy, Marshmallow,
   Chamomile, Evening Primrose, Calendula, Feverfew)
9. Additional product reviews from the validated shortlist — **Lost Frontier
   Handbook**, The Lost SuperFoods, Home Doctor, Anti-Looter Kit
10. A comparison page once ≥3 products are reviewed

---

# 7. THE FLAGSHIP REVIEW — required structure

`/reviews/medicinal-garden-kit/`
**Target: `medicinal garden kit reviews` · Minimum 2,000 words of real substance.**

```
1.  H1: Medicinal Garden Kit Review (2026): What You Actually Get for $59
2.  AFFILIATE DISCLOSURE — visible above the fold, not a footer link
3.  Verdict box — who it's for, who it isn't, price, guarantee, rating
4.  What's in the box — all 10 herbs, 4,818 seeds, the guide, 2 bonuses
5.  Herb-by-herb: what it is, how hard to germinate, traditional use only
6.  Germination reality — Echinacea and Lavender ARE slow. Say so. This is the
    single most useful honest thing on the page and no competitor leads with it.
7.  Who Nicole Apelian actually is — correct credentials (§2). Get the PhD right.
8.  Pricing, the 365-day guarantee, how refunds actually work via Digistore24
9.  Honest limitations — see §8
10. Alternatives — buying seeds separately vs the kit. Be genuinely even-handed.
11. FAQ — schema-marked
12. Final CTA
```

**Beat the incumbent:** `shelfinsider.com` ranks #3 with a registered dietitian
who grew all ten plants. **We cannot fake that.** Two legitimate routes:
- **(a) Actually buy the kit ($59) and document germination with original photos
  over a real season.** This is the only thing that beats primary evidence.
- **(b) Until then, win on accuracy and completeness** — correct credentials,
  honest germination difficulty, real refund mechanics, genuine alternatives.

**Never claim to have grown them if we haven't.** If we haven't planted, the page
says so plainly: *"This is a research-based review; we have not yet grown the
kit ourselves."* That sentence costs some trust and buys all of it back.

---

# 8. HOW HONESTY AND THE AFFILIATE TERMS COEXIST

The contract forbids "non-positive reviews." Our standard demands accuracy. These
are reconcilable — but only one way, so follow it exactly.

**The resolution: review the product as what it actually is — a curated heirloom
seed kit with a growing guide — and do not lean on medical authority at all.**

- Recommend it **as a gardening product.** For a gardener who wants 10 curated
  heirloom herb varieties, a printed guide and a 365-day guarantee, $59 is
  genuinely reasonable value. That is a positive review and it is *true*.
- Make **zero** medical claims. Frame every herb as traditional/historical use.
- State plainly it is **not medicine and not a substitute for healthcare.**
- **Because we never use her as a medical authority, we never have to debunk her
  medical authority.** The FTC letter concerned tinctures on a separate apothecary
  site, not this seed kit. It is not load-bearing for a seed review, so it does
  not belong in the body copy.
- **But if a reader asks, answer truthfully.** If we ever write about her health
  claims, her supplements, or her book, the FTC letter becomes material and must
  be disclosed. Do not build a page that requires concealing it.

**Honest limitations that are fully compliant and must appear:**
- Echinacea and Lavender germinate slowly and unevenly — normal for the species
- These are seeds, not plants — you need time, soil, patience and a growing season
- The guide covers traditional use, not clinical treatment
- You can buy these seeds separately; the kit's value is curation + the guide
- **Ignore the "Last 60 kits available" countdown on the sales page — they are
  seeds and they do not run out.** ← Calling out artificial scarcity is honest,
  useful, and not "negative marketing" about the product itself.

**Hard line:** if the affiliate manager ever demands removal of a factually
accurate limitation, **remove the affiliate link, not the fact.** The site's
value is its credibility. Publish nothing you would not defend to a reader who
bought on your advice.

---

# 9. COMPLIANCE

**FTC disclosure — above the fold, every monetised page:**

> *We earn a commission if you buy through links on this page, at no extra cost
> to you. We only recommend products we have researched. [How we make money](/disclosure/)*

**Banned words anywhere on the site:** cure · treat · heal · remedy for [condition]
· prevents · clinically proven · doctor-recommended · FDA approved · miracle ·
guaranteed results · **scam** (contractually prohibited).

**Required framing:** "traditionally used for", "historically used by", "in
folk herbalism". Never "used to treat".

**Required on every herb page:**
> *Educational information only. Not medical advice. Herbs can interact with
> medications. Consult a qualified healthcare provider before use. Never use
> plants medicinally without expert identification.*

---

# 10. TECHNICAL BUILD (Next.js App Router, JSX)

**Stack:** Next.js App Router · Tailwind · MDX or structured JSON for content ·
static generation. Deploy on **Vercel**, custom domain `thehomesteadshelf.com`.

**Fix the boilerplate first** — `src/app/layout.jsx` currently ships
`title: "Create Next App"`. Replace:

```jsx
export const metadata = {
  metadataBase: new URL("https://thehomesteadshelf.com"),
  title: {
    default: "The Homestead Shelf — Honest Homesteading & Preparedness Reviews",
    template: "%s | The Homestead Shelf",
  },
  description:
    "Independent, research-based reviews of homesteading, gardening and preparedness products. We tell you what you actually get.",
  openGraph: { type: "website", siteName: "The Homestead Shelf", locale: "en_US" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};
```

**Required:**
- `app/sitemap.js` and `app/robots.js` (Next's built-in generators)
- Canonical URL on every page
- **JSON-LD**: `Organization` + `WebSite` sitewide; `Review` + `Product` on review
  pages (**real rating only — never invent one**); `FAQPage` on FAQ blocks;
  `BreadcrumbList` sitewide
- `next/image` for everything; WebP/AVIF; explicit width/height
- Lighthouse ≥ 95 on mobile — Bing weights page experience
- Semantic HTML, one `<h1>`, logical heading order
- No client-side-only content on indexable pages — **render text server-side**

---

# 11. INDEXING — BING FIRST

This site is built for Bing. Do these on launch day:

1. **Bing Webmaster Tools** — add and verify `thehomesteadshelf.com`, submit the
   sitemap. *(This session already has the Bing Webmaster MCP connected — it will
   give real impressions, CTR and positions: the first genuine Bing measurement
   anywhere in this project.)*
2. **IndexNow** — Bing's instant-indexing protocol. Generate a key, host it at
   `/{key}.txt`, and ping on every publish:
   ```
   POST https://api.indexnow.org/indexnow
   { "host":"thehomesteadshelf.com", "key":"<KEY>",
     "keyLocation":"https://thehomesteadshelf.com/<KEY>.txt",
     "urlList":["https://thehomesteadshelf.com/reviews/medicinal-garden-kit/"] }
   ```
3. **Google Search Console** — add it too. Google traffic is a free bonus.
4. Submit each new URL manually in Bing Webmaster Tools for the first month.

---

# 12. DESIGN

Calm, editorial, trustworthy. **Not** a hypey affiliate funnel — the aesthetic is
the credibility.

- Warm neutrals, one restrained accent (deep green or terracotta)
- Serif headings, high-legibility sans body, generous line-height
- **Mobile-first**; content column ~65–75ch
- Light/dark both supported
- **Banned:** countdown timers, fake urgency, "ONLY 3 LEFT", flashing CTAs,
  popups on entry, invented star ratings, stock photos of gardens implied to be ours
- Real byline, real about page, real contact route

---

# 13. LAUNCH CHECKLIST — TODAY

```
[ ] Domain connected to Vercel, HTTPS live, www → apex redirect
[ ] layout.jsx metadata replaced (no "Create Next App" anywhere)
[ ] Homepage, /about/, /disclosure/, /contact/ live
[ ] Flagship review live, 2,000+ words, correct Apelian credentials
[ ] All affiliate links use digistore24.com/redir/379812/sohailakhtar01/<campaign>
[ ] rel="sponsored nofollow noopener" on every affiliate link
[ ] FTC disclosure above the fold on the review
[ ] Zero disease claims — grep the banned-word list before shipping
[ ] The word "scam" appears nowhere on the site
[ ] sitemap.xml + robots.txt resolving
[ ] JSON-LD validates
[ ] Lighthouse mobile ≥ 95
[ ] Bing Webmaster Tools verified + sitemap submitted
[ ] IndexNow key live and pinged
[ ] Google Search Console verified
```

---

# 14. MEASUREMENT

Track weekly in Bing Webmaster Tools: impressions, average position, CTR per
query. Track sales in Digistore24 **by campaign token** — that tells you which
placement actually earns.

**Decision checkpoints:**
- **Day 30** — indexed and ranking anywhere? If not indexed, the technical build
  is wrong; fix before writing more.
- **Day 90** — real impressions? If impressions are near zero at decent
  positions, §0.1 was right and the branded query is too small: **pivot budget to
  the non-brand guides and add more products.**
- **Day 180** — any sales? If traffic converts below ~1%, the page or the offer
  is wrong. Re-evaluate honestly; do not keep sinking time in.

---

# 15. ABSOLUTE PROHIBITIONS

1. No disease/treatment/cure claims — anywhere, ever
2. No fabricated testing, photos, ratings, review counts or personas
3. No copied vendor sales copy
4. No hidden affiliate links or buried disclosure
5. No `#aff=` fragment links — use the Digistore24 redirect
6. The word **"scam"** — contractually prohibited
7. No paid advertising on any platform — contractually prohibited
8. No doorway pages, cloaking, spun or thin auto-generated content
9. No "PhD from McGill" — it is false
10. No claiming we grew the kit unless we actually did
11. No countdown timers or manufactured scarcity
12. **Never remove a true statement to protect a commission.** Remove the
    commission instead.

---

**Bottom line:** the domain choice survived today's volume finding — a
single-product domain would not have. Build the publication, not the funnel. The
branded query alone will not pay; **the portfolio compounding over 15–30 honest
reviews is the actual business.**
