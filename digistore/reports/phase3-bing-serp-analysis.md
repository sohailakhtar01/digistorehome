# Phase 3 — Live Bing SERP & Demand Research

| | |
|---|---|
| Input | `reports/phase3-bing-research-queue.csv` (30 products) |
| SERP source | DataForSEO `/v3/serp/bing/organic/live/regular` — **Bing organic** |
| SERP geo | `location_code 2840` (United States), `language_code en`, desktop |
| Volume source | DataForSEO → **Google Ads** `keywords_data/google_ads/search_volume/live` |
| Volume geo | United States, English, 12-month average + monthly series |
| Capture date | **2026-08-24** (all figures) |
| Raw captures | `data/serp/findings.md` |

> No domains were checked. No purchases made. Nothing below is a prediction that any
> product will generate sales.

---

## 1. Headline finding — read this before anything else

**The Bing SERPs for these products are genuinely weak. They are weak because almost
nobody searches for them.**

Measured US search volume (Google Ads, 12-month average, captured 2026-08-24):

| Query | US volume/mo | Trend |
|---|---|---|
| `tube magic` | **1,600** | stable |
| `the lost superfoods` | 210 | **declining** (320 → 140 over 12 mo) |
| `medicinal garden kit` | 110 | **declining** (210 Jan → 70 Jul) |
| `home doctor book` | 90 | **declining** |
| `medicinal garden kit review` | 40 | erratic |
| `lost superfoods review` | **10** | negligible |
| `anti looter kit` | **no data — below reporting threshold** | — |
| `anti looter kit review` | **no data — below reporting threshold** | — |
| `encyclopedia of power foods` | **no data — below reporting threshold** | — |
| `tubemagic review` | **no data — below reporting threshold** | — |

This is the central result of Phase 3, and it cuts directly against the stated plan.

**Two compounding problems for a Bing-only, exact-match-domain, branded-review strategy:**

1. **These are Google numbers.** Bing's US share is materially smaller — commonly cited
   in the region of 5–10% of Google's query volume. I did **not** measure Bing volume
   directly (see §2 — the Bing Webmaster keyword API is unavailable on this account), so
   treat any Bing figure as an **estimate, not a measurement**. On that basis
   `medicinal garden kit review` at 40/mo on Google plausibly means **single-digit
   monthly searches on Bing**.
2. **Ranking #1 for a query nobody searches yields no revenue.** At ~4 Bing searches/month,
   a #1 position with a strong 30% CTR is roughly **1 visitor per month**. Even at the
   Medicinal Garden Kit's excellent 18% cart conversion, that is not a business.

**Where the demand actually is** — problem-led queries, not brand names:

| Query | US volume/mo | CPC | Relevant product |
|---|---|---|---|
| `herbal remedies book` | **5,400** | $1.16 | Medicinal Garden Kit, Home Doctor, Power Foods |
| `long term food storage` | **1,300** | $3.04 | The Lost SuperFoods |
| `youtube automation tools` | 170 | **$10.16** | Tube Magic |
| `medicinal herbs to grow at home` | 110 | $0.31 | Medicinal Garden Kit |
| `survival food to stockpile` | 70 | $3.34 | The Lost SuperFoods |
| `home defense kit` | 50 | — | Anti-Looter Kit |
| `best ai tools for youtube` | 30 | $6.45 | Tube Magic |
| `home security without electricity` | 10 | — | Anti-Looter Kit |
| `how to make a rug tufting` | 10 | $0.17 | Tufting Mastery |

`herbal remedies book` alone carries **49× the volume** of `medicinal garden kit review`,
and `long term food storage` **130×** that of `lost superfoods review`. The viable
strategy is a problem-led topical cluster that converts into the product — not an
exact-match domain chasing a brand name with negligible demand.

---

## 2. Data reliability — a fault that had to be engineered around

**The Bing SERP API returned invalid data on roughly half of all calls.** It
intermittently returns a SERP for only the *first meaningful token* of the query.
Confirmed instances, all captured this session:

| Query sent | SERP actually returned |
|---|---|
| `medicinal garden kit review` | AAPC medical-coding pages (`medicinal` → *medical*) |
| `the lost superfoods review` | *Lost* (TV series) — Wikipedia, IMDb, Netflix |
| `anti-looter kit review` | Rihanna's album *Anti* |
| `joseph's well review` | Joseph (Genesis), Joseph's Pizza |
| `home doctor book review` | Home Depot, Zillow, Realtor.com |
| `tube magic ai review` | YouTube.com |
| `self sufficient backyard book review` | Self.inc (credit builder) |
| `pineal guardian supplement review` | Tubidy MP3 download sites |

Control queries (`best running shoes`, `prodentim review`) returned correct SERPs, and
retrying a failed query often succeeded — so the endpoint works and the fault is
transient, not a property of these niches.

**Why this mattered more than a normal API annoyance:** a truncated SERP shows *none of
the real competitors*. Read naively it looks like an empty, uncontested SERP — the most
attractive possible result, and completely false. Every capture in this report was
therefore validated for brand-token relevance before use, retried on failure, and
recorded as `NO_VALID_DATA` if it never validated. **No unvalidated SERP is interpreted
as "weak competition" anywhere in this report.**

**Also unavailable:** the Bing Webmaster Tools keyword API (`get_keyword_data`,
`get_keyword_stats`, `get_related_keywords`) returns HTTP 400 on this account, so
**no Bing-native search volume exists in this analysis**. All volume is Google's,
explicitly labelled as such.

### Coverage achieved

| Status | Count | Products |
|---|---|---|
| **Validated Bing SERP** | **7 of 30** | Medicinal Garden Kit, Anti-Looter Kit, The Lost SuperFoods, Encyclopedia of Power Foods, Tube Magic, PinealXT, Tufting Mastery |
| Partial signal (adjacent SERP only) | 2 | Reflux Summit, US Immigration Survival |
| `NO_VALID_DATA` after repeated retries | 21 | Home Doctor (4 attempts), David's Shield, Joseph's Well, Self-Sufficient Backyard, Idrotherapy, Midas Manifestation, Remixable, Pineal Guardian, and 13 others |

**This is a real limitation and I am not going to paper over it.** 23 of 30 products
lack a validated Bing SERP. The seven that do validate are, however, the highest-scoring
and most commercially coherent of the queue, and the demand data in §1 applies to the
whole set regardless of SERP coverage.

---

## 3. Validated SERP findings

### 3.1 Medicinal Garden Kit — weakest competition observed

Two validated captures (`medicinal garden kit review`, `medicinal garden kit worth it complaints`).

| # | Domain | Page type | Notes |
|---|---|---|---|
| 1 | therealrealreviews.com | affiliate review | Mar 2026 |
| 2 | healthreviewnetwork.com | affiliate review | Nov 2025 |
| 3 | foodnourish.net | affiliate review | **Mar 2023 — 3 years stale** |
| 4 | thewisdomshed.com | affiliate review | Jul 2026 |
| 5 | supplementsdiary.com | affiliate review | "Scam Risks, Seeds, and Results" |
| 9 | medicinalgardenkit.net | **EMD** | page 2 — *not* #1 |
| p2 | **github.com** | **parasite spam** | a GitHub repo used as a review page |
| p2 | **researchgate.net** | **parasite spam** | a "publication" used as affiliate content |
| ads | mygardyn, northspore, amazon, bestproductsreviews | 4 paid advertisers | |

**Weaknesses:** zero authority publishers; zero major brands; a three-year-old page still
ranking; and most tellingly, **GitHub and ResearchGate pages outranking real websites**.
Parasite-SEO placeholders holding page-one positions is direct evidence that Bing has
nothing better to rank. Four paid advertisers confirm genuine commercial intent behind
the query.

**Counterweight:** branded demand is only 110/mo and **falling** (210 → 70 in six months).

### 3.2 The Lost SuperFoods — a scraped duplicate ranks #2

| # | Domain | Notes |
|---|---|---|
| 1 | **biopreneur.com.ng** | a **.ng** domain ranking #1 on a US commercial query |
| 2 | **bitudi.com** | **identical title to #1 — scraped/duplicated content** |
| 3 | bestsurvivalbooks.com | Jul 2026 |
| 4 | askaprepper.com | **Aug 2020 — 6 years stale** |
| 5 | backyardfreedomlab.com | notes the author is "a fictional frontman" |
| 6, 9 | goodreads.com | |
| 10 | amazon.com | **the book is sold directly on Amazon** |

**Weaknesses:** the weakest competitor set in the study — a low-authority foreign blog at
#1, a scraped duplicate at #2, and a six-year-old page at #4.

**Counterweight:** Amazon and Goodreads both rank, meaning the book is purchasable
outside the Digistore24 funnel — a buyer can find it without your affiliate link. One
ranking competitor openly states the listed author is fabricated, which constrains how
enthusiastically the product can be endorsed.

### 3.3 Tube Magic — the only product with real demand

| # | Domain | Notes |
|---|---|---|
| 1 | medium.com | a personal Medium post |
| 2 | insightstacker.com | |
| 3 | busymomsidehustle.com | |
| 4–6 | aitool-review.com, sanishtech.com, solvemyproblemlab.com | small blogs |
| 7 | sterahub.substack.com | a Substack post |
| 8 | tubemagic-review.com | EMD-style domain — *not* #1 |
| ad | tubemagic.com | official site buying its own brand |

**Weaknesses:** Medium and Substack posts holding page-one positions is a strong
signal that no committed site owns this query.

**Counterweight:** related searches are `tube magic ai free trial`, `tube magic ai free` —
users hunting free access, not buyers. Phase 2 flagged the $265.11 net as **lifetime
subscription value on a $47/month product**, not a single-sale payout, and its **1% cart
conversion is the weakest** of any shortlisted product.

### 3.4 Anti-Looter Kit — best economics, no measurable demand

| # | Domain | Notes |
|---|---|---|
| 1 | askaprepper.com | Feb 2026 |
| 2 | thecountyreview.com | Jul 2026 |
| 3 | thebuyersreviews.com | "scam alert: Is it legit?" |
| 4 | behealthynh.com | **1 day old** |
| 5 | santeckpro.com | |
| 6 | **biopreneur.com.ng** | **2 days old**, .ng domain |
| 8 | scamadviser.com | |
| 10 | linkedin.com/pulse | a user-posted article |

Cross-checked on an **independent index** (different search engine), which returned the
same competitor profile plus `newswire.com` and `accessnewswire.com` — **press-release
spam** ranking for a product review query.

**Product facts** (relevant to Phase 3 risk): Jason Hanson is a **verifiable** former CIA
officer who has appeared on Fox News and NBC and authored published security books. The
kit is a **physical** product (motion sensors, tripwire, door alarms, siren jammer,
floodlight), CE-certified, with a 60-day guarantee. This is materially more defensible
than a supplement claim.

**Fatal counterweight:** `anti looter kit` and `anti looter kit review` both return **no
volume data at all** — below Google's reporting threshold. `home defense kit` is 50/mo,
`home security without electricity` 10/mo. Excellent economics (18% conversion, **3.55%
cancellation — the lowest of any shortlisted product**) pointed at a market that barely
exists in search.

### 3.5 Encyclopedia of Power Foods — weak SERP, piracy-leaning intent

Competitors: healthreviewnetwork.com, covingtonreporter.com (**a local news site running
affiliate content, Jul 2024**), todayupgrades.com, biopreneur.com.ng,
encyclopediaofpowerfoods.com (**EMD at #9, page 2**), diogom.substack.com.

**Weakness:** no authority competition. **Counterweight:** related searches are dominated
by `encyclopedia of power foods pdf`, `power foods encyclopedia pdf`, `power foods pdf` —
**people looking for a free copy, not buyers** — and the brand has no measurable volume.

### 3.6 PinealXT — rejected

The SERP is **not** an affiliate-review SERP. It is saturated with near-duplicate
"official site" clones: `third-eye.colibrim.ai`, `capsules.live`, `en-us-pinealxt.com`,
`pinealxt.deliverycaviar.com`, plus `pinealxt.com` and Amazon. Only one genuine editorial
review appears (consumerhealthdigest.com).

There is little room for an honest review page, the neighbourhood is low-trust, and the
product claims pineal-gland "third eye activation" — Phase 2's HIGH risk flag is
confirmed. **Recommend dropping.** The same reasoning applies to Pineal Guardian.

### 3.7 Tufting Mastery — no brand presence

The SERP returns Wikipedia, tuftsupplies.com, clawlab.com, tufttheworld.com, tufting.co,
tuftingtutorials.com, YouTube and Instructables. The **product itself has no Bing
footprint whatsoever**, and the niche is owned by supply retailers with real inventory to
sell. `how to make a rug tufting` is 10/mo. No branded-review opportunity exists.
**Recommend dropping.**

### 3.8 Adjacent-SERP observations (partial signal)

- **Reflux Online Summit** — the generic acid-reflux space is owned by Mayo Clinic,
  Cleveland Clinic, Harvard Health, WebMD, Healthline and the NHS. A classic YMYL
  medical SERP. A new affiliate site has no realistic path here. **Recommend dropping.**
- **US Immigration Survival PRO** — the generic immigration space is owned by
  `uscis.gov`, `usa.gov`, `ice.gov`, `state.gov`. Government-dominated and
  consequence-heavy. **Recommend dropping.**

---

## 4. Exact-match domains — what the data actually shows

You said the plan is an exact-match-domain strategy. The SERPs contain a direct,
repeated test of that idea:

| EMD observed | Position |
|---|---|
| `medicinalgardenkit.net` | **#9 (page 2)** |
| `medicinalgardenkit.org` | **paid ad only** — buying traffic, not ranking |
| `encyclopediaofpowerfoods.com` | **#9 (page 2)** |
| `tubemagic-review.com` | **#8** |
| `anti-looter-kit.com` | exists — the obvious EMD is **already taken** |

**In every single observed case the exact-match domain ranks mid-page or resorts to paid
ads. Not one ranks #1.** The pages beating them are ordinary content sites
(therealrealreviews.com, askaprepper.com, medium.com) with no keyword in the domain.

This does not mean an EMD is harmful — it is a mild relevance and click-through signal.
It means **the domain is not what wins these SERPs**, and building the strategy around it
would be optimising the least influential variable. On the evidence here, the deciding
factors are content depth, freshness, and genuine first-hand detail — precisely where the
incumbents are weak.

---

## 5. Competitor weakness patterns (across all validated SERPs)

| Weakness | Evidence |
|---|---|
| **Parasite-SEO placeholders ranking** | GitHub repo and ResearchGate "publication" on page 1–2 for Medicinal Garden Kit |
| **Scraped duplicate content ranking** | bitudi.com at #2 with a byte-identical title to biopreneur.com.ng at #1 |
| **Press-release spam ranking** | newswire.com / accessnewswire.com for Anti-Looter Kit |
| **Stale content holding position** | askaprepper.com Aug 2020 (#4); foodnourish.net Mar 2023 (#3); covingtonreporter.com Jul 2024 (#2) |
| **Foreign low-authority domains on US SERPs** | biopreneur.com.ng ranks #1 (Lost SuperFoods) and #6 (Anti-Looter) |
| **Generic platforms substituting for real sites** | medium.com #1 and substack #7 for Tube Magic; LinkedIn Pulse #10 for Anti-Looter |
| **Churned same-week content** | behealthynh.com "1 day old", biopreneur "2 days old" — a churn-and-burn field |
| **No authority publishers anywhere** | Not one Wirecutter/Consumer Reports/major-publisher page in any validated commercial SERP |

**Zero major brands and zero authority publishers appear in any of these commercial
SERPs.** The competition is real but uniformly low quality. Beating it on content merit is
plainly achievable. The binding constraint is demand, not difficulty.

---

## 6. What this means

The three requirements — attractive economics, weak SERP, real demand — **do not
currently coincide in any single product**:

| Product | Economics | SERP weakness | Demand |
|---|---|---|---|
| Medicinal Garden Kit | ✅ strong | ✅ weakest | ⚠️ thin + declining |
| The Lost SuperFoods | ✅ strong | ✅ weakest | ⚠️ thin + declining |
| Anti-Looter Kit | ✅ strongest | ✅ weak | ❌ unmeasurable |
| Encyclopedia of Power Foods | ✅ good | ✅ weak | ❌ unmeasurable + piracy intent |
| Tube Magic | ⚠️ 1% conversion, recurring | ✅ weak | ✅ **only real demand (1,600/mo)** |

The resolution is not to pick a brand name and buy its domain. It is to **build in a
niche where problem-led demand is real, and monetise it with whichever product fits** —
`herbal remedies book` (5,400/mo) and `long term food storage` (1,300/mo) are each an
order of magnitude larger than every brand term measured, and both map cleanly onto the
two best-performing products.

---

## 7. Limitations

1. **23 of 30 products have no validated Bing SERP** owing to the API fault in §2.
2. **No Bing-native search volume exists.** All volume is Google's; the Bing/Google ratio
   used for interpretation is a **published rule of thumb, not a measurement**.
3. **Volume figures are Google Ads 12-month averages**, which bucket and round aggressively;
   "no data" means below reporting threshold, **not** literally zero.
4. **No sales page was opened.** Product-risk assessment still rests on titles, SERP
   snippets and one independent cross-check.
5. **SERPs are a single-day snapshot** (2026-08-24), desktop, US, and personalisation and
   volatility are not accounted for.
6. **No competitor backlink or authority metrics** were retrieved (Ahrefs is unauthorised
   on this account), so "weak authority" is inferred from domain identity and page quality,
   not from link data.
