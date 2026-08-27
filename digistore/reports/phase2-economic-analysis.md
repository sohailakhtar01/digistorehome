# Phase 2 — Economic Opportunity Filtering

| | |
|---|---|
| Input | `data/digistore24-normalized.csv` (Phase 1 output, 1381 records) |
| Scorer | `scripts/phase2_economic_filter.py` |
| Run date | 2026-08-24 |
| Products scored | **1381** |
| Shortlisted | **100** |
| Beginner-friendly subset | **25** |
| Phase 3 Bing research queue | **30** |

> **No Bing data, search volume, domain, or ranking information was used or consulted in
> this phase.** Every number below derives from the Digistore24 marketplace export alone.
> Nothing here is a claim that any product will generate sales.

## 1. Executive summary

**1381 products were scored; 100 were shortlisted as economically attractive candidates.**

What actually characterises the strongest candidates:

1. **Published performance data is the single dominant discriminator.** Only 132 of 1381
   products (9.6%) publish both cart conversion and cancellation, yet **84 of the 100**
   shortlisted candidates come from that group. Digistore24 only reveals these figures once
   a listing has real sales history, so their presence is itself evidence of monetisation —
   the closest thing to proof this dataset contains.
2. **High commission percentage is nearly worthless as a signal.** The two largest vendors
   in the marketplace — Fitlifesolutions (241 listings) and GhulamBooks (126) — advertise
   80%% commission, and **239 of Fitlifesolutions' 241 listings are byte-identical on price,
   commission and payout ($37.00 / 80%% / $29.60), with zero affiliate-support pages and one
   listing carrying performance data between them.** These are auto-generated catalogue
   filler. A naive commission-weighted ranking would have returned almost nothing else.
3. **Payout alone does not rank.** The median net earnings is $25.97 but the top-scoring
   candidate pays $76.36 — it wins on an 16%% cart conversion and 5.41%% cancellation, not on
   the size of the cheque.
4. **The proven-conversion pool is heavily concentrated in supplements.** 51 of the 100
   shortlisted candidates are health supplements, and 51 of 100 carry a HIGH preliminary risk
   flag. This is a genuine property of the marketplace, not an artefact of scoring — and it
   is the main tension in the whole dataset (see §8).

Principal limitation: **90%% of the catalogue has no published performance data at all**, so
for most products the economic read rests on price and commission alone. Those products were
not eliminated — they are marked `EVIDENCE_LIMITED` and can still earn their place in a later
phase if the search opportunity turns out to be exceptional.

## 2. Dataset inventory (observed, before any scoring)

| Measure | Count | % of catalogue |
|---|---|---|
| Total records | 1381 | 100% |
| Distinct vendors | 485 | — |
| With net earnings/sale | 1375 | 99.6% |
| With commission data (any type) | 1381 | 100.0% |
| &nbsp;&nbsp;— percentage commission | 1368 | 99.1% |
| &nbsp;&nbsp;— flat-fee commission | 13 | 0.9% |
| With cart conversion | 136 | 9.8% |
| With cancellation rate | 134 | 9.7% |
| With **both** conversion + cancellation | 132 | 9.6% |
| With promotion status | 1380 | 99.9% |
| **Requiring vendor approval** (`Request promotion`) | 131 | 9.5% |
| **Immediately promotable** (`Promote now` + `Copy promo link`) | 1249 | 90.4% |
| Earnings per cart visitor | **0** | **absent from source — excluded from scoring** |

### Observed distributions used to calibrate the score

Thresholds were set from this dataset's own percentiles rather than from outside assumptions:

| Metric | p10 | p25 | p50 | p75 | p90 |
|---|---|---|---|---|---|
| Net earnings/sale | $5.26 | $12.50 | $25.97 | $37.50 | $111.30 |
| Cart conversion % (n=136) | 2% | 4% | 7% | 11% | 16% |
| Cancellation % (n=134) | 3.55% | 6.66% | 9.97% | 15.11% | 22.93% |
| Net ÷ front-end price | 0.34x | 0.50x | 0.60x | 0.80x | 0.94x |

The last row matters: **the median product returns only 0.60x its front-end price as net
earnings**, so a ratio above 1.0 is genuinely unusual and above 2.5 is extreme. Only 14
products in the entire catalogue exceed 1.5x.

## 3. Score methodology (100 points)

Every component is computed from observed fields only. Observed values and derived scores are
kept in separate columns of the output CSV so the two can never be confused.

| Component | Points | What it measures | Why it exists |
|---|---|---|---|
| **A. Monetisation** | 30 | Payout (20, log-saturating) + price-band fit (10) | Payout is scored on a *saturating* curve, not linearly. A $1,000 payout is not automatically better than a $60 one — beyond roughly $150/sale, payout stops being the binding constraint and market difficulty takes over, which is a Phase 5 question. The price-band term rewards the $37–$150 range that cold search traffic actually converts, and penalises both sub-$10 offers (not worth a site) and $600+ high-ticket (poor cold conversion). |
| **B. Conversion evidence** | 25 | Cart conversion (15) + cancellation (10) | Rewards demonstrated funnel performance. Unmeasured products receive a **neutral 11/25**, not zero — missing data is not evidence of failure. |
| **C. Promotion accessibility** | 15 | `Copy promo link` 15 · `Promote now` 14 · `Request promotion` 7 | Vendor approval is a real execution risk for a new affiliate, not a footnote. Penalised, never disqualifying. |
| **D. Maturity / stability** | 10 | Age band, peaking at 1–3 years | Neither "older is better" nor "newer is worse". Under 90 days is unproven; over 6 years risks a stale offer. |
| **E. Economic confidence** | 10 | Field coverage + internal consistency | How much of the economic picture is actually observed. A consistency point is awarded when net earnings reconcile plausibly (0.30–1.60x) against price × commission. |
| **F. Investigation value** | 10 | Combination bonuses | Flags products whose *combination* of traits earns a closer look in Phase 3/4 — strong payout with low cancellation, high conversion, an identifiable niche, vendor affiliate support. **Capped at 2 for auto-generated catalogue listings.** |

### Guards built into the model

**Identical-listing detection.** Listings sharing vendor + price + commission + payout are
counted; a cluster of 5 or more marks the listing as auto-generated catalogue filler. This
caps its investigation score and limits it to 2 entries in the shortlist. Without this guard
the 80%-commission template farms would have dominated the ranking.

**Diversification.** Maximum 10 candidates per vendor. Applied *after* raw scoring, so it
never promotes a weak product — it only prevents one vendor monopolising the list.

**Funnel-economics flag.** `net_to_price_ratio` classifies each product:

| Flag | Rule | Meaning |
|---|---|---|
| `NORMAL` | ≤ 1.0x | Payout consistent with a front-end sale |
| `STRONG` | 1.0–1.5x | Some upsell contribution |
| `VERY_STRONG` | 1.5–2.5x | Payout materially depends on the back end |
| `EXTREME_NEEDS_REVIEW` | > 2.5x, or a recurring price | Headline payout is a funnel-wide average, **not** what one front-end sale pays |

A high ratio is treated as **a reason to investigate, never as evidence of a superior offer.**
The catalogue's worst offender advertises "$23.40 front-end → $561.55 net" (24x) and its own
title reads *"Earn up to $480 per sale"* — a deep upsell funnel, where the advertised figure
is an average across buyers who took back-end offers, not a per-sale commission.

### Preliminary risk screen

Classified from marketplace-visible wording only (name, type, derived niche). **No sales page
was opened — that is Phase 3.** Nothing is rejected on this basis; it only informs the
beginner-friendly subset and the research queue.

| Flag | Trigger |
|---|---|
| `HIGH` | Implied treatment of a medical condition, ingestible supplements, miracle/cure language, sexual-health claims, financial-trading promises, income/get-rich promises, pseudoscientific mechanisms, aggressive weight-loss claims, gambling |
| `MEDIUM` | General supplement/diet category, make-money positioning, spiritual/manifestation, mental-health subject matter, fear-based survival marketing, or unclassified |
| `LOW` | Practical or informational positioning — courses, tools, hobbies, pets, gardening, home DIY |

## 4. Top 25 economically attractive candidates

> These are **economically attractive candidates**, not winners. No search-demand or
> competition evidence exists yet; several may not survive Phase 3 product review or Phase 5
> SERP analysis.

### 1. Joseph’s Well – Blockbuster Offer From Top Diamond Vendor

| | | | |
|---|---|---|---|
| **Vendor** | megadrought | **Price** | $84.78 |
| **Commission** | 75.00% | **Net earnings/sale** | **$76.36** |
| **Cart conversion** | 16.00% | **Cancellation** | 5.41% |
| **Promotion** | Copy promo link | **Age** | 370 days |
| **Phase 2 score** | **94.83 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | LOW | **Funnel** | NORMAL |

- **Why attractive:** $76.36 net/sale; 16% cart conversion; low 5.41% cancellation; open promotion; published performance data; 1.0y track record
- **Main concern:** none material at this stage

### 2. Unlock Earnings! Promote PinealXT!

| | | | |
|---|---|---|---|
| **Vendor** | Nutraville | **Price** | $211.10 |
| **Commission** | 55.00% | **Net earnings/sale** | **$158.86** |
| **Cart conversion** | 13.00% | **Cancellation** | 9.97% |
| **Promotion** | Promote now | **Age** | 1049 days |
| **Phase 2 score** | **92.00 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $158.86 net/sale; 13% cart conversion; open promotion; published performance data; 2.9y track record
- **Main concern:** HIGH preliminary risk: pseudoscientific mechanism claims

### 3. Anti-Looter Kit - BRAND NEW!

| | | | |
|---|---|---|---|
| **Vendor** | antilooterkit | **Price** | $201.26 |
| **Commission** | 33.00% | **Net earnings/sale** | **$53.01** |
| **Cart conversion** | 18.00% | **Cancellation** | 3.55% |
| **Promotion** | Promote now | **Age** | 572 days |
| **Phase 2 score** | **91.90 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | MEDIUM | **Funnel** | NORMAL |

- **Why attractive:** $53.01 net/sale; 18% cart conversion; low 3.55% cancellation; open promotion; published performance data; 1.6y track record
- **Main concern:** none material at this stage

### 4. Medicinal Garden Kit – BRAND NEW!

| | | | |
|---|---|---|---|
| **Vendor** | bookofren | **Price** | $74.08 |
| **Commission** | 72.00% | **Net earnings/sale** | **$45.70** |
| **Cart conversion** | 18.00% | **Cancellation** | 2.07% |
| **Promotion** | Promote now | **Age** | 1984 days |
| **Phase 2 score** | **90.32 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | MEDIUM | **Funnel** | NORMAL |

- **Why attractive:** $45.70 net/sale; 18% cart conversion; low 2.07% cancellation; open promotion; published performance data; 5.4y track record
- **Main concern:** none material at this stage

### 5. Advanced Memory Formula

| | | | |
|---|---|---|---|
| **Vendor** | soundview | **Price** | $147.65 |
| **Commission** | 60.00% | **Net earnings/sale** | **$91.44** |
| **Cart conversion** | 7.00% | **Cancellation** | 6.53% |
| **Promotion** | Promote now | **Age** | 539 days |
| **Phase 2 score** | **87.54 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $91.44 net/sale; 7% cart conversion; low 6.53% cancellation; open promotion; published performance data; 1.5y track record
- **Main concern:** HIGH preliminary risk: ingestible supplement - health claims require substantiation

### 6. 81 % Commission on US Immigration Survival PRO Bundle

| | | | |
|---|---|---|---|
| **Vendor** | IsMaria | **Price** | $50.81 |
| **Commission** | 81.00% | **Net earnings/sale** | **$32.87** |
| **Cart conversion** | 13.00% | **Cancellation** | 4.76% |
| **Promotion** | Promote now | **Age** | 398 days |
| **Phase 2 score** | **87.54 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | MEDIUM | **Funnel** | NORMAL |

- **Why attractive:** $32.87 net/sale; 13% cart conversion; low 4.76% cancellation; open promotion; published performance data; 1.1y track record
- **Main concern:** none material at this stage

### 7. The Lost SuperFoods

| | | | |
|---|---|---|---|
| **Vendor** | lostrec | **Price** | $56.78 |
| **Commission** | 75.00% | **Net earnings/sale** | **$27.31** |
| **Cart conversion** | 19.00% | **Cancellation** | 1.70% |
| **Promotion** | Promote now | **Age** | 1999 days |
| **Phase 2 score** | **87.33 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | LOW | **Funnel** | NORMAL |

- **Why attractive:** $27.31 net/sale; 19% cart conversion; low 1.70% cancellation; open promotion; published performance data; 5.5y track record
- **Main concern:** none material at this stage

### 8. David’s Shield – New High-Conv VSL (2X CVR!) \| $5M+ In Sales

| | | | |
|---|---|---|---|
| **Vendor** | blackoutusa | **Price** | $83.23 |
| **Commission** | 75.00% | **Net earnings/sale** | **$44.71** |
| **Cart conversion** | 20.00% | **Cancellation** | 9.89% |
| **Promotion** | Promote now | **Age** | 339 days |
| **Phase 2 score** | **87.24 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | LOW | **Funnel** | NORMAL |

- **Why attractive:** $44.71 net/sale; 20% cart conversion; open promotion; published performance data
- **Main concern:** none material at this stage

### 9. The Encyclopedia of Power Foods- Latest 2025/6!

| | | | |
|---|---|---|---|
| **Vendor** | dailyhealth | **Price** | $47.08 |
| **Commission** | 70.00% | **Net earnings/sale** | **$29.28** |
| **Cart conversion** | 16.00% | **Cancellation** | 8.97% |
| **Promotion** | Promote now | **Age** | 795 days |
| **Phase 2 score** | **86.59 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | LOW | **Funnel** | NORMAL |

- **Why attractive:** $29.28 net/sale; 16% cart conversion; open promotion; published performance data; 2.2y track record
- **Main concern:** none material at this stage

### 10. Promote Pineal Guardian Now!

| | | | |
|---|---|---|---|
| **Vendor** | Nutraville | **Price** | $252.93 |
| **Commission** | 70.00% | **Net earnings/sale** | **$235.62** |
| **Cart conversion** | 9.00% | **Cancellation** | 9.48% |
| **Promotion** | Promote now | **Age** | 517 days |
| **Phase 2 score** | **86.00 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $235.62 net/sale; 9% cart conversion; open promotion; published performance data; 1.4y track record
- **Main concern:** HIGH preliminary risk: pseudoscientific mechanism claims

### 11. Earn 60% Commission Promoting CircO2 Nitric Oxide Booster

| | | | |
|---|---|---|---|
| **Vendor** | soundview | **Price** | $137.35 |
| **Commission** | 60.00% | **Net earnings/sale** | **$86.88** |
| **Cart conversion** | 8.00% | **Cancellation** | 6.72% |
| **Promotion** | Promote now | **Age** | 924 days |
| **Phase 2 score** | **85.84 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $86.88 net/sale; 8% cart conversion; open promotion; published performance data; 2.5y track record
- **Main concern:** HIGH preliminary risk: ingestible supplement - health claims require substantiation

### 12. Fearless Phone Fanatic (For Cold Calling)

| | | | |
|---|---|---|---|
| **Vendor** | dezatell | **Price** | $63.77 |
| **Commission** | $30.00 flat | **Net earnings/sale** | **$21.73** |
| **Cart conversion** | 37.00% | **Cancellation** | 8.22% |
| **Promotion** | Promote now | **Age** | 452 days |
| **Phase 2 score** | **85.45 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | LOW | **Funnel** | NORMAL |

- **Why attractive:** $21.73 net/sale; 37% cart conversion; open promotion; published performance data; 1.2y track record
- **Main concern:** none material at this stage

### 13. Promote HydroLean XT Gold Now!

| | | | |
|---|---|---|---|
| **Vendor** | zenmavibe | **Price** | $270.01 |
| **Commission** | 70.00% | **Net earnings/sale** | **$87.17** |
| **Cart conversion** | 9.00% | **Cancellation** | 5.56% |
| **Promotion** | Promote now | **Age** | 703 days |
| **Phase 2 score** | **85.36 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $87.17 net/sale; 9% cart conversion; low 5.56% cancellation; open promotion; published performance data; 1.9y track record
- **Main concern:** HIGH preliminary risk: ingestible supplement - health claims require substantiation

### 14. Home Doctor – BRAND NEW!

| | | | |
|---|---|---|---|
| **Vendor** | homedoctor | **Price** | $49.65 |
| **Commission** | 75.00% | **Net earnings/sale** | **$26.83** |
| **Cart conversion** | 12.00% | **Cancellation** | 2.81% |
| **Promotion** | Promote now | **Age** | 1894 days |
| **Phase 2 score** | **85.26 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | LOW | **Funnel** | NORMAL |

- **Why attractive:** $26.83 net/sale; 12% cart conversion; low 2.81% cancellation; open promotion; published performance data; 5.2y track record
- **Main concern:** none material at this stage

### 15. Goliath XL 10

| | | | |
|---|---|---|---|
| **Vendor** | KoalaAdvertising | **Price** | $156.47 |
| **Commission** | 65.00% | **Net earnings/sale** | **$122.11** |
| **Cart conversion** | 7.00% | **Cancellation** | 8.15% |
| **Promotion** | Promote now | **Age** | 577 days |
| **Phase 2 score** | **85.19 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $122.11 net/sale; 7% cart conversion; open promotion; published performance data; 1.6y track record
- **Main concern:** HIGH preliminary risk: ingestible supplement - health claims require substantiation

### 16. Earn 60% Commission Promoting Advanced Mitochondrial Formula

| | | | |
|---|---|---|---|
| **Vendor** | soundview | **Price** | $190.10 |
| **Commission** | 60.00% | **Net earnings/sale** | **$116.19** |
| **Cart conversion** | 8.00% | **Cancellation** | 8.09% |
| **Promotion** | Promote now | **Age** | 671 days |
| **Phase 2 score** | **84.99 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $116.19 net/sale; 8% cart conversion; open promotion; published performance data; 1.8y track record
- **Main concern:** HIGH preliminary risk: ingestible supplement - health claims require substantiation

### 17. Earn 60% Commission Promoting Advanced Amino Formula

| | | | |
|---|---|---|---|
| **Vendor** | soundview | **Price** | $124.52 |
| **Commission** | 60.00% | **Net earnings/sale** | **$70.25** |
| **Cart conversion** | 7.00% | **Cancellation** | 6.66% |
| **Promotion** | Promote now | **Age** | 1361 days |
| **Phase 2 score** | **84.51 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $70.25 net/sale; 7% cart conversion; low 6.66% cancellation; open promotion; published performance data; 3.7y track record
- **Main concern:** HIGH preliminary risk: ingestible supplement - health claims require substantiation

### 18. Promote NeuroPrime Now!

| | | | |
|---|---|---|---|
| **Vendor** | zenmavibe | **Price** | $287.22 |
| **Commission** | 60.00% | **Net earnings/sale** | **$79.48** |
| **Cart conversion** | 8.00% | **Cancellation** | 5.55% |
| **Promotion** | Promote now | **Age** | 706 days |
| **Phase 2 score** | **83.99 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $79.48 net/sale; 8% cart conversion; low 5.55% cancellation; open promotion; published performance data; 1.9y track record
- **Main concern:** HIGH preliminary risk: ingestible supplement - health claims require substantiation

### 19. Scorpio Scalper

| | | | |
|---|---|---|---|
| **Vendor** | altrasoftware | **Price** | $115.50 |
| **Commission** | 65.00% | **Net earnings/sale** | **$61.57** |
| **Cart conversion** | 7.00% | **Cancellation** | 5.92% |
| **Promotion** | Promote now | **Age** | 183 days |
| **Phase 2 score** | **83.99 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $61.57 net/sale; 7% cart conversion; low 5.92% cancellation; open promotion; published performance data
- **Main concern:** HIGH preliminary risk: financial-trading promises

### 20. Idrotherapy *GET PAID ON REBILLS EACH MONTH*

| | | | |
|---|---|---|---|
| **Vendor** | koshea76 | **Price** | $119.98 |
| **Commission** | 75.00% | **Net earnings/sale** | **$97.20** |
| **Cart conversion** | 2.00% | **Cancellation** | 1.97% |
| **Promotion** | Promote now | **Age** | 374 days |
| **Phase 2 score** | **83.28 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | MEDIUM | **Funnel** | NORMAL |

- **Why attractive:** $97.20 net/sale; 2% cart conversion; low 1.97% cancellation; open promotion; published performance data; 1.0y track record
- **Main concern:** weak 2% cart conversion

### 21. iGenics - Hot New Offer in the Vision Niche!(Text and Video)

| | | | |
|---|---|---|---|
| **Vendor** | igenics | **Price** | $180.61 |
| **Commission** | 65.00% | **Net earnings/sale** | **$121.35** |
| **Cart conversion** | 10.00% | **Cancellation** | 9.37% |
| **Promotion** | Promote now | **Age** | 1481 days |
| **Phase 2 score** | **83.16 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $121.35 net/sale; 10% cart conversion; open promotion; published performance data; 4.1y track record
- **Main concern:** HIGH preliminary risk: ingestible supplement - health claims require substantiation

### 22. Help Others Overcome Their Acid Refluy \| 45% Commission

| | | | |
|---|---|---|---|
| **Vendor** | Refluxsummit | **Price** | $113.48 |
| **Commission** | 60.00% | **Net earnings/sale** | **$49.43** |
| **Cart conversion** | 7.00% | **Cancellation** | 5.19% |
| **Promotion** | Promote now | **Age** | 569 days |
| **Phase 2 score** | **83.13 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | LOW | **Funnel** | NORMAL |

- **Why attractive:** $49.43 net/sale; 7% cart conversion; low 5.19% cancellation; open promotion; published performance data; 1.6y track record
- **Main concern:** none material at this stage

### 23. Earn 60% Commission Promoting Advanced Collagen Plus!

| | | | |
|---|---|---|---|
| **Vendor** | soundview | **Price** | $145.27 |
| **Commission** | 60.00% | **Net earnings/sale** | **$116.97** |
| **Cart conversion** | 3.00% | **Cancellation** | 5.50% |
| **Promotion** | Promote now | **Age** | 671 days |
| **Phase 2 score** | **82.52 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $116.97 net/sale; 3% cart conversion; low 5.50% cancellation; open promotion; published performance data; 1.8y track record
- **Main concern:** weak 3% cart conversion; HIGH preliminary risk: ingestible supplement - health claims require substantiation

### 24. Reflux Online Summit \| Take Control of Your Acid Reflux

| | | | |
|---|---|---|---|
| **Vendor** | Refluxsummit | **Price** | $89.32 |
| **Commission** | 60.00% | **Net earnings/sale** | **$49.43** |
| **Cart conversion** | 7.00% | **Cancellation** | 5.19% |
| **Promotion** | Promote now | **Age** | 569 days |
| **Phase 2 score** | **82.13 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | LOW | **Funnel** | NORMAL |

- **Why attractive:** $49.43 net/sale; 7% cart conversion; low 5.19% cancellation; open promotion; published performance data; 1.6y track record
- **Main concern:** none material at this stage

### 25. SPARTAMAX Male Enhancement Gummies \| High EPC and Commission

| | | | |
|---|---|---|---|
| **Vendor** | midasman88 | **Price** | $193.01 |
| **Commission** | 65.00% | **Net earnings/sale** | **$148.10** |
| **Cart conversion** | 4.00% | **Cancellation** | 7.44% |
| **Promotion** | Promote now | **Age** | 319 days |
| **Phase 2 score** | **81.95 / 100** | **Evidence** | EVIDENCE_RICH |
| **Preliminary risk** | HIGH | **Funnel** | NORMAL |

- **Why attractive:** $148.10 net/sale; 4% cart conversion; open promotion; published performance data
- **Main concern:** HIGH preliminary risk: sexual-health / male-enhancement claims

## 5. Vendor concentration

The vendor cap of 10 is binding for one vendor only, so concentration is not distorting the
shortlist:

| Vendor | In shortlist | Total listings in catalogue | Note |
|---|---|---|---|
| soundview | 7 | 14 |  |
| darrelltee | 5 | 17 |  |
| zenmavibe | 4 | 10 |  |
| skyhighperformers | 4 | 6 |  |
| Nutraville | 3 | 4 |  |
| midasman88 | 3 | 3 |  |
| koshea76 | 2 | 2 |  |
| Refluxsummit | 2 | 2 |  |
| premvitality | 2 | 4 |  |
| RM7866 | 2 | 2 |  |

Contrast with the catalogue as a whole, where concentration is extreme:

| Vendor | Listings | Identical-listing block | With performance data | In shortlist |
|---|---|---|---|---|
| Fitlifesolutions | 241 | 239 identical | 1 | **1** |
| GhulamBooks | 126 | 123 identical | 0 | **0** |
| oraclefx | 35 | 21 identical | 0 | **0** |
| moneywithangie | 30 | 9 identical | 0 | **0** |
| HeikoBoos | 27 | 3 identical | 4 | **2** |
| ZeroToCommission | 18 | 8 identical | 0 | **0** |

**Fitlifesolutions and GhulamBooks together account for 367 listings — 26.6% of the entire
catalogue — and contribute 1 candidates to the shortlist.**

## 6. Niche distribution

| Niche | In shortlist | In catalogue | With performance data (catalogue) |
|---|---|---|---|
| health-supplement | 51 | 204 | 64 |
| other | 16 | 490 | 24 |
| education-courses | 10 | 173 | 17 |
| ai-software | 5 | 138 | 7 |
| weight-loss | 4 | 63 | 6 |
| survival-preparedness | 3 | 47 | 4 |
| home-diy | 2 | 7 | 1 |
| forex-crypto-trading | 2 | 40 | 2 |
| spirituality-manifest | 2 | 18 | 2 |
| mental-wellbeing | 2 | 46 | 1 |
| make-money-online | 1 | 94 | 4 |
| pets | 1 | 11 | 0 |
| fitness | 1 | 27 | 0 |

The health-supplement share of the shortlist (51/100) tracks where measured performance data
actually exists — 64 of the 132 products with published stats in the whole catalogue are
supplements. Several niches (fitness, pets, beauty, dating, gardening) have **almost no**
proven sellers at all, so any candidate from them is necessarily evidence-limited.

## 7. Risk distribution

| Preliminary risk | Shortlist | %% of shortlist | Whole catalogue |
|---|---|---|---|
| LOW | 32 | 32% | 650 |
| MEDIUM | 17 | 17% | 484 |
| HIGH | 51 | 51% | 247 |
| UNKNOWN / unscreened | 0 | 0%% | 0 |

Every product received a screen, so there is no UNKNOWN bucket. **51 of 100 shortlisted
candidates carry a HIGH flag** — overwhelmingly because they are ingestible supplements or
imply treatment of a medical condition. That is the central tension of this dataset: *the
products with the best proven economics are also the hardest to promote truthfully.* The
beginner-friendly subset in §9 exists specifically to resolve it.

## 8. Data limitations

Stated explicitly rather than silently filled:

| Limitation | Effect on Phase 2 |
|---|---|
| **90% of products (1249/1381) publish no performance statistics** | Their conversion score is a neutral 11/25 assumption, not a measurement. Their ranking rests on price, commission, age and accessibility alone. |
| **Earnings per cart visitor is entirely absent** | The brief listed it as a scoring input. It does not exist in this export and was **excluded**, not estimated. |
| **Product descriptions are absent** | The risk screen relies on product name, type and derived niche only. A product with innocuous wording could still carry aggressive claims on its sales page — Phase 3 must verify. |
| **Sales-page URLs are absent** | Links were copied as text without `href`. Phase 3 must resolve each product to its live page by search. |
| **Marketplace category was not captured** | `derived_niche` is a parser-assigned keyword label, not a source field. Used only for spreading candidates across niches; never cited as evidence. |
| **Net earnings is a funnel figure** | It reflects upsells, order bumps and refunds. It is not a guaranteed per-sale commission — see the `funnel_economics_flag` column. |
| **Cancellation is a lagging figure** | A young product may simply not have accumulated refunds yet, which can flatter its cancellation rate. |

## 9. Beginner-friendly subset (25 products)

Selected from the 100 candidates by filtering out HIGH preliminary risk, approval-gated
promotion, auto-generated listings, payouts under $15, and funnel-dependent payouts; then
re-ranked with a bonus for low risk and measured performance. Output:
`reports/beginner-friendly-shortlist.csv`.

| # | Product | Vendor | Net/sale | Conv | Cancel | Risk | Niche |
|---|---|---|---|---|---|---|---|
| 1 | Joseph’s Well – Blockbuster Offer From Top Dia | megadrought | $76.36 | 16.00% | 5.41% | LOW | other |
| 2 | Anti-Looter Kit - BRAND NEW! | antilooterkit | $53.01 | 18.00% | 3.55% | MEDIUM | health-supplement |
| 3 | The Lost SuperFoods | lostrec | $27.31 | 19.00% | 1.70% | LOW | other |
| 4 | David’s Shield – New High-Conv VSL (2X CVR!) \| | blackoutusa | $44.71 | 20.00% | 9.89% | LOW | other |
| 5 | The Encyclopedia of Power Foods- Latest 2025/6 | dailyhealth | $29.28 | 16.00% | 8.97% | LOW | other |
| 6 | Medicinal Garden Kit – BRAND NEW! | bookofren | $45.70 | 18.00% | 2.07% | MEDIUM | health-supplement |
| 7 | Fearless Phone Fanatic (For Cold Calling) | dezatell | $21.73 | 37.00% | 8.22% | LOW | other |
| 8 | Home Doctor – BRAND NEW! | homedoctor | $26.83 | 12.00% | 2.81% | LOW | other |
| 9 | 81 % Commission on US Immigration Survival PRO | IsMaria | $32.87 | 13.00% | 4.76% | MEDIUM | survival-preparedness |
| 10 | Help Others Overcome Their Acid Refluy \| 45% C | Refluxsummit | $49.43 | 7.00% | 5.19% | LOW | education-courses |
| 11 | The 5 Foot Farm: 80% Commissions and Recurring | FiveFootFarm | $17.20 | 12.00% | 9.29% | LOW | other |
| 12 | Tufting Mastery Class \| How To Make Rugs | kramis_teppich_d | $42.30 | 4.00% | 2.57% | LOW | education-courses |
| 13 | Idrotherapy *GET PAID ON REBILLS EACH MONTH* | koshea76 | $97.20 | 2.00% | 1.97% | MEDIUM | health-supplement |
| 14 | Promote the Ultimate Digital Marketing Guide e | Fitlifesolutions | $21.59 | 16.00% | 11.29% | LOW | other |
| 15 | CaviArgan | koshea76 | $87.66 | 2.00% | 1.78% | MEDIUM | health-supplement |
| 16 | Healthy Heart Solution Kit | BartonPublishing | $18.89 | 18.00% | 13.58% | LOW | other |
| 17 | Clearing Academy | Statbrook | $29.72 | 5.00% | 6.94% | LOW | education-courses |
| 18 | Backlink Bundle – Best SEO Service | praneet_brar | $81.34 | 15.00% | 52.78% | LOW | other |
| 19 | Cashflow Secrets | Moneyripples | $36.51 | 23.00% | 48.76% | LOW | education-courses |
| 20 | NEW: The Self-Sufficient Backyard | sbackyard | $27.18 | 9.00% | 1.28% | MEDIUM | survival-preparedness |
| 21 | Get Paid To Do Simple Writing Jobs Online | socialpaid | $82.97 | 9.00% | 19.99% | LOW | education-courses |
| 22 | TPP System | nemorauserr | $3405.52 | 2.00% | 4.33% | LOW | education-courses |
| 23 | Ultimate Dynamic Personal Budget in Google She | FinSavvyDesigns | $28.30 | 14.00% | 16.89% | LOW | other |
| 24 | AI Profit Sniper | aiprofitsniper | $27.35 | 14.00% | 27.21% | LOW | ai-software |
| 25 | Remixable - Founder Edition | remixable | $177.54 | 10.00% | 22.85% | LOW | ai-software |

All 25 are `EVIDENCE_RICH` (measured conversion **and** cancellation), 19 are LOW preliminary
risk and 6 MEDIUM — **none are HIGH**. Every one is immediately promotable with no approval gate.

## 10. Phase 3 Bing research queue (30 products)

Prioritised on Phase 2 score, lower preliminary risk, promotion accessibility and measured
performance, then spread across vendors (max 2) and niches (max 7). Near-duplicate listings
from one vendor are collapsed to a single entry. Output:
`reports/phase3-bing-research-queue.csv`.

| # | Product | Score | Net/sale | Risk | Confidence | Research angle |
|---|---|---|---|---|---|---|
| 1 | Joseph’s Well – Blockbuster Offer From Top D | 94.8 | $76.36 | LOW | HIGH | branded review + problem-led + alternatives |
| 2 | Anti-Looter Kit - BRAND NEW! | 91.9 | $53.01 | MEDIUM | HIGH | branded review + legit/scam + ingredients |
| 3 | The Lost SuperFoods | 87.3 | $27.31 | LOW | HIGH | branded review + problem-led + alternatives |
| 4 | David’s Shield – New High-Conv VSL (2X CVR!) | 87.2 | $44.71 | LOW | MEDIUM | branded review + problem-led + alternatives |
| 5 | The Encyclopedia of Power Foods- Latest 2025 | 86.6 | $29.28 | LOW | HIGH | branded review + problem-led + alternatives |
| 6 | Medicinal Garden Kit – BRAND NEW! | 90.3 | $45.70 | MEDIUM | HIGH | branded review + legit/scam + ingredients |
| 7 | Fearless Phone Fanatic (For Cold Calling) | 85.5 | $21.73 | LOW | HIGH | branded review + problem-led + alternatives |
| 8 | Home Doctor – BRAND NEW! | 85.3 | $26.83 | LOW | HIGH | branded review + problem-led + alternatives |
| 9 | 81 % Commission on US Immigration Survival P | 87.5 | $32.87 | MEDIUM | HIGH | branded review + problem-led how-to |
| 10 | Help Others Overcome Their Acid Refluy \| 45% | 83.1 | $49.43 | LOW | HIGH | course review + "worth it" + vs competitors |
| 11 | The 5 Foot Farm: 80% Commissions and Recurri | 81.6 | $17.20 | LOW | HIGH | branded review + problem-led + alternatives |
| 12 | Tufting Mastery Class \| How To Make Rugs | 81.0 | $42.30 | LOW | HIGH | course review + "worth it" + vs competitors |
| 13 | Unlock Earnings! Promote PinealXT! | 92.0 | $158.86 | HIGH | HIGH | branded review + legit/scam + ingredients |
| 14 | Idrotherapy *GET PAID ON REBILLS EACH MONTH* | 83.3 | $97.20 | MEDIUM | HIGH | branded review + legit/scam + ingredients |
| 15 | Tube Magic - AI Tools For Growing on YouTube | 79.0 | $265.11 | LOW | MEDIUM | tool review + alternatives + pricing |
| 16 | The Number 1 Serger and Overlocker Online Se | 81.0 | $19.28 | LOW | HIGH | project how-to + plan review |
| 17 | CaviArgan | 81.9 | $87.66 | MEDIUM | MEDIUM | branded review + legit/scam + ingredients |
| 18 | Clearing Academy | 76.7 | $29.72 | LOW | HIGH | course review + "worth it" + vs competitors |
| 19 | Cashflow Secrets | 76.5 | $36.51 | LOW | HIGH | course review + "worth it" + vs competitors |
| 20 | NEW: The Self-Sufficient Backyard | 80.3 | $27.18 | MEDIUM | HIGH | branded review + problem-led how-to |
| 21 | Get Paid To Do Simple Writing Jobs Online | 75.7 | $82.97 | LOW | MEDIUM | course review + "worth it" + vs competitors |
| 22 | Advanced Memory Formula | 87.5 | $91.44 | HIGH | HIGH | branded review + legit/scam + ingredients |
| 23 | TPP System | 75.5 | $3405.52 | LOW | MEDIUM | course review + "worth it" + vs competitors |
| 24 | AI Profit Sniper | 75.3 | $27.35 | LOW | HIGH | tool review + alternatives + pricing |
| 25 | Online Kirtan and Harmonium Course | 78.0 | $61.95 | LOW | HIGH | course review + "worth it" + vs competitors |
| 26 | Promote Pineal Guardian Now! | 86.0 | $235.62 | HIGH | HIGH | branded review + legit/scam + ingredients |
| 27 | Remixable - Founder Edition | 74.0 | $177.54 | LOW | HIGH | tool review + alternatives + pricing |
| 28 | Promote HydroLean XT Gold Now! | 85.4 | $87.17 | HIGH | HIGH | branded review + comparison + results |
| 29 | Midas Manifestation System | 77.0 | $116.24 | MEDIUM | HIGH | branded review + "does it work" |
| 30 | Shifting Vibrations - Proven Digital Manifes | 76.8 | $39.69 | MEDIUM | HIGH | branded review + "does it work" |

Risk mix: **18 LOW, 8 MEDIUM, 4 HIGH** across 8 niches. The four HIGH-risk entries are
retained deliberately: their measured economics are strong enough that they deserve a SERP
read, but they carry a standing condition that Phase 3 must clear them on claim substantiation
before any content is planned.

## 11. What Phase 3 must resolve

1. **Open the sales pages.** No descriptions or URLs exist in this export, so every claim
   assessment so far is based on a product title. This is the largest remaining unknown.
2. **Verify the supplement-heavy candidates.** 51 shortlisted products are HIGH preliminary
   risk; a truthful affiliate page for several of them may simply not be writable.
3. **Investigate the funnel-flagged payouts.** Any product not marked `NORMAL` needs its
   advertised net earnings understood before it is used in a revenue projection.
4. **Do not treat this ranking as final.** It measures economics only. A high Phase 2 score
   with an impossible SERP is worth nothing, and a mid-scoring product with a weak SERP may
   well outrank it after Phase 5.

