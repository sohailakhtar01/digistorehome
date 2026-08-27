# Phase 1 — Parsing & Validation Report

| | |
|---|---|
| Source file | `data/digistore24.txt` (24,031 lines, 325,544 bytes) |
| Reference screenshot | `image.png` (used to recover the lost SVG field labels) |
| Output file | `data/digistore24-normalized.csv` |
| Parser / validator | `scripts/parse_digistore24.py` / `scripts/validate_parse.py` |
| Run date | 2026-08-24 |
| Records parsed | **1381** |

**Verdict: the dataset is parsed reliably and Phase 2 can proceed.** Two source quirks
and one field-coverage limit materially shape what Phase 2 may score — see §10.

## 1. Record count reconciliation

The scrape is a 14-page paginated export with UI chrome repeated at each page break.
Three independent counts agree:

| Signal | Count |
|---|---|
| Digistore24 page header ("N Products") | 1381 |
| `name` / `name \| type` anchor pairs detected | 1381 |
| Records written to CSV | 1381 |

**No records lost, duplicated, or invented.** Page chrome was excluded by anchoring on
the name/type line pair rather than by splitting on separators.

## 2. Duplicates

| Check | Result |
|---|---|
| Duplicate `product_name` | **0** |
| Duplicate `product_name` + `vendor` | **0** |
| Distinct vendors | 485 |

No duplicate rows. Note that several *vendors* list many near-identical products —
relevant to Phase 2 because it inflates apparent opportunity count in a niche:

| Vendor | Listings |
|---|---|
| Fitlifesolutions | 241 |
| GhulamBooks | 126 |
| oraclefx | 35 |
| moneywithangie | 30 |
| HeikoBoos | 27 |
| ZeroToCommission | 18 |
| darrelltee | 17 |
| joebgesbuchverleger39ac | 17 |

## 3. Field completeness

| Field | Populated | % | Note |
|---|---|---|---|
| `product_name` | 1381 / 1381 | 100.0% |  |
| `product_type` | 1381 / 1381 | 100.0% |  |
| `price_usd` | 1373 / 1381 | 99.4% |  |
| `price_raw` | 1381 / 1381 | 100.0% | Verbatim source text, retained for auditability |
| `commission_pct` | 1368 / 1381 | 99.1% | Blank where commission is a flat fee instead |
| `commission_flat_usd` | 13 / 1381 | 0.9% | Populated only for flat-fee listings |
| `net_earnings_per_sale_usd` | 1375 / 1381 | 99.6% | Hidden on a few listings |
| `earnings_per_cart_visitor` | 0 / 1381 | 0.0% | **Absent from source** — not rendered on the card |
| `cart_conversion_pct` | 136 / 1381 | 9.8% | Digistore24 publishes only at sufficient sales volume |
| `cancellation_rate_pct` | 134 / 1381 | 9.7% | Digistore24 publishes only at sufficient sales volume |
| `vendor` | 1381 / 1381 | 100.0% |  |
| `online_since_iso` | 1381 / 1381 | 100.0% |  |
| `product_age_days` | 1381 / 1381 | 100.0% |  |
| `payment_method` | 0 / 1381 | 0.0% | **Absent from source** — not rendered on the card |
| `promotion_status` | 1380 / 1381 | 99.9% |  |
| `has_sales_page_link` | 1381 / 1381 | 100.0% |  |
| `has_affiliate_support_link` | 1381 / 1381 | 100.0% |  |
| `sales_page_url` | 0 / 1381 | 0.0% | Copied as link text only; `href` not preserved |
| `affiliate_support_url` | 0 / 1381 | 0.0% | Copied as link text only; `href` not preserved |
| `digistore24_product_url` | 0 / 1381 | 0.0% | **Absent from source** |
| `description` | 0 / 1381 | 0.0% | **Absent from source** — not rendered on the card |
| `category` | 0 / 1381 | 0.0% | **Absent from source** — category filter not captured |

> Fields marked **absent from source** are `UNKNOWN` on every row. The brief requested
> them, but the Digistore24 marketplace card does not render them, so nothing was
> inferred. The consequential one is **earnings per cart visitor**, which Phase 2 was
> to score on — it does not exist in this export and will not be fabricated.

## 4. Parser defects found and corrected

The first parser draft located fields by regex. Validation caught it mis-assigning
records, so the extractor was rewritten to be **positional**. Recorded here because the
failure mode was silent — the bad rows looked plausible.

| Defect | Impact | Detected by | Fix |
|---|---|---|---|
| Price line is sometimes free text (`$47 per month`, `Around $87.00`) | Regex skipped it, so `price` captured the **net earnings** value and `vendor` captured the price text | Cross-check B (suspect vendor scan) flagged 80 rows | Positional extraction |
| Commission may be a **flat dollar amount** (`$30.00`), not a percentage | 13 rows had no commission | `NO_COMMISSION` flag | `commission_type` = percent / flat |
| European decimal commas (`$ 77,21` = 77.21) vs thousands separators (`$1,234.56`) | Wrong magnitude | Manual review of price_raw | Convention-aware money parser |

The positional layout — `body[0]`=price, `body[1]`=commission, `body[2]`=vendor — was then
verified to hold on **1381 / 1381 records with zero exceptions** before being adopted.

## 5. Remaining anomalies

| Flag | Records | Meaning | Phase 2 handling |
|---|---|---|---|
| `COMMISSION_FLAT` | 13 | Commission is a flat fee, not a % | Effective % computed from price |
| `PRICE_APPROX` | 12 | Vendor stated price approximately | Treated as estimate |
| `NO_PRICE` | 8 | No parseable price | Excluded |
| `PCT_INFERRED` | 6 | One percentage only — assigned by quantisation rule (§6) | Flagged lower confidence |
| `NO_NET_EARNINGS` | 6 | Listing hides net earnings/sale | Excluded from economic ranking |
| `PRICE_RECURRING` | 2 | Subscription price (per month/year) | Net earnings = lifetime, not per-sale |
| `NO_PROMO_STATUS` | 1 | No promotion button captured | Treated as unknown access |

Records with **zero** flags: **1333 / 1381 (96.5%)**. No flag indicates a parsing *error* —
each marks a genuine source-data condition that Phase 2 must handle deliberately.

## 6. The single-percentage ambiguity, and how it was resolved

The copy lost the SVG icons labelling each metric. Where a listing shows **two** starred
percentages the order is unambiguous, confirmed against `image.png`:

```
  [tag]    $84.78        [money]  75.00%     -> price, commission
  [person] megadrought   [cart]   16.00%*    -> vendor, CART CONVERSION
  [x]      5.41%*        [date]   8/19/25    -> CANCELLATION, online since
```

Where only **one** percentage appears, position cannot identify it. Instead of guessing,
the assignment uses a rule *measured* on the unambiguous records:

| Metric | Whole-number values | Observed range |
|---|---|---|
| Cart conversion (1st) | **132 / 132 (100.0%)** | 1.00% – 45.00% |
| Cancellation (2nd) | **1 / 132 (0.8%)** | 1.28% – 60.65% |

Digistore24 rounds cart conversion to whole percents but reports cancellation to two
decimals. Separation is near-total, so a lone percentage is assigned by whether it is a
whole number. This affects **6 rows**, all flagged `PCT_INFERRED`:

| Product | Value | Assigned to | Basis |
|---|---|---|---|
| The Official Smoothie Diet™ 21-Day Weight Loss | 16.00% | cart conversion | whole number |
| Tesla MedBed X | 10.80% | cancellation | has decimals |
| The 5-Minute Garden: Earn 75% Commissions on a | 6.00% | cart conversion | whole number |
| Unlock the Forbidden Keto Secrets to Accelerat | 1.00% | cart conversion | whole number |
| Navigating Paleo Diet | 7.84% | cancellation | has decimals |
| MADEIRA BY BUS - Interactive Travel Guide For  | 2.00% | cart conversion | whole number |

> These 6 rows are **medium** confidence. Every other percentage is positionally certain.

## 7. Independent cross-checks

**Check A — does `net_earnings` reconcile with `price x commission`?** 
A mis-assigned price or commission column would scatter this ratio randomly. Restricted
to the clean case (percentage commission, exact non-recurring price):

| Band | Count | % | Interpretation |
|---|---|---|---|
| `net` == `price x comm` to the cent | **1029** | 76.9% | Exact arithmetic match — strongest possible confirmation |
| within +/-10% | 24 | 1.8% | Platform fee rounding |
| ratio 0.50–3.00 | 243 | 18.2% | Refund drag, or funnel upsells lifting net above front-end |
| outside 0.50–3.00 | 42 | 3.1% | Investigated below |

**1029 of 1338 rows (76.9%) reconcile exactly to the cent.** That is decisive: it can only
happen if price, commission and net earnings were each read from the correct column.

Digistore24 reports *funnel* earnings, so ratios above 1.0 are expected wherever a
product has upsells or order bumps. The largest outliers:

| Product | Price | Comm | Net | Ratio | Status |
|---|---|---|---|---|---|
| AI × Keto Diet That Converts — E | $23.40 | 80.00% | $561.55 | 30.0 | Verified verbatim in source. Product name itself reads "Earn up to $480 per sale" — confirms deep upsell funnel |
| KetoDNA - The Keto Diet Offer Yo | $11.69 | 85.00% | $178.00 | 17.9 | Not individually verified; consistent with funnel pricing |
| Life is Good - Online Course | $7.00 | 33.00% | $38.61 | 16.7 | Verified verbatim in source (line 7331) |
| ⚡️The Ultimate Keto Meal Plan⚡️  | $33.93 | 85.00% | $127.29 | 4.4 | Not individually verified; consistent with funnel pricing |
| The Power of the Ancestors - Onl | $297.00 | 33.00% | $385.40 | 3.9 | Verified verbatim in source (line 5424); same vendor `phoenix555` as above |
| Digital Detox for Kids - eBook | $16.37 | 50.00% | $30.78 | 3.8 | Not individually verified; consistent with funnel pricing |

The top three were checked line-by-line against the raw source and match exactly, so
these are genuine source values rather than parser errors. The remaining 39 outliers were
not individually inspected — they are consistent with the same funnel pattern, but that is
an inference, not a verification.

> Phase 2 must therefore **not** treat a very high net-earnings-to-price ratio as proof of
> a strong offer. It usually signals a deep upsell funnel, where the headline figure is an
> average across buyers who took backend offers. Flagged as a suspicious pattern in Phase 2.

**Check B — is any vendor value a mis-captured label, price or number?** 
**0 / 1381** suspect values (was 80 before the positional rewrite).

**Check C — are "online since" dates calendar-valid and in the past?** 
Range **2014-01-08 to 2026-08-23**. Dates after the run date: **0**.

**Check D — are commission percentages in range?** 
Range **5% – 100%**. Out of bounds: **0**.

**Check E — round-trip.** 60 randomly sampled product names re-located verbatim in the raw
source: **60 / 60**.

**Check F — price round-trip.** Simple `$NN.NN` prices whose parsed value re-serialises to
the original string: **1355**.

## 8. What the dataset actually contains

| Metric | Value |
|---|---|
| Products | 1381 |
| Distinct vendors | 485 |
| Price — median / 90th pct / max | $37.00 / $191.86 / $3131.60 |
| Net earnings/sale — median / 90th pct / max | $25.97 / $111.30 / $3405.52 |
| Products with **both** conversion + cancellation | **132 (9.6%)** |
| Products with **no** performance stats at all | 1243 (90.0%) |

### Promotion access

| Status | Count | Meaning |
|---|---|---|
| Promote now | 1229 | Open — can start immediately |
| Request promotion | 131 | Requires vendor approval (execution risk) |
| Copy promo link | 20 | Already approved on this account |
| UNKNOWN | 1 |  |

### Commission structure

| Type | Count |
|---|---|
| percent | 1368 |
| flat | 13 |

### Price type

| Note | Count |
|---|---|
| exact | 1367 |
| approximate | 12 |
| recurring | 2 |

### Product type

| Type | Count |
|---|---|
| E-books | 701 |
| Downloads | 203 |
| Member area and video courses | 197 |
| Supplements - health | 141 |
| Software | 57 |
| Deliverable | 29 |
| Book (printed) | 17 |
| Supplements - for slimming | 16 |
| Remote service provided electronically | 8 |
| Online coaching | 5 |
| Audio book (download) | 4 |
| Webinar | 1 |
| Seminar for business customers | 1 |
| In-person service | 1 |

### Derived niche (parser-assigned keyword label — *not* a source field)

| Niche | Count | With perf. stats |
|---|---|---|
| other | 490 | 24 |
| health-supplement | 204 | 64 |
| education-courses | 173 | 17 |
| ai-software | 138 | 7 |
| make-money-online | 94 | 4 |
| weight-loss | 63 | 6 |
| survival-preparedness | 47 | 4 |
| mental-wellbeing | 46 | 1 |
| forex-crypto-trading | 40 | 2 |
| fitness | 27 | 0 |
| spirituality-manifest | 18 | 2 |
| pets | 11 | 0 |
| beauty-skincare | 8 | 0 |
| dating-relationships | 8 | 0 |
| home-diy | 7 | 1 |
| gardening | 7 | 0 |

> `derived_niche` is **derived, not observed**. It is used only to spread Phase 2
> candidates across niches and is never cited as evidence.

## 9. Sample records

### 9.1 Fully populated — highest net earnings with both performance stats

| Product | Type | Price | Comm | Net/sale | Cart conv | Cancel | Vendor | Since |
|---|---|---|---|---|---|---|---|---|
| TPP System | Member area and  | $3131.60 | 80.00% | $3405.52 | 2.00% | 4.33% | nemorauserr | 2025-12-22 |
| Millionaire Partner System | Member area and  | $1131.11 | 40.00% | $827.48 | 3.00% | 15.64% | impassive | 2024-09-09 |
| 7-Figure ELITE Partnership | Member area and  | $1077.70 | 50.00% | $439.11 | 5.00% | 12.05% | Perpincome | 2023-03-29 |
| Passive Income System 2.0 | Member area and  | $988.23 | 50.00% | $382.12 | 2.00% | 19.20% | impassive | 2020-12-08 |
| Traffic Genius \| 50% Commissions \| | Software | $1497.00 | 50.00% | $278.93 | 1.00% | 21.41% | viddeosai | 2025-06-05 |
| Tube Magic - AI Tools For Growing  | Software | $47.00 | 50.00% | $265.11 | 1.00% | 8.94% | tubemagic | 2024-02-23 |
| Promote Pineal Guardian Now! | Supplements - he | $252.93 | 70.00% | $235.62 | 9.00% | 9.48% | Nutraville | 2025-03-25 |
| Synaptigen | Supplements - he | $257.40 | 65.00% | $199.68 | 5.00% | 13.00% | Synaptigen | 2025-06-27 |
| 301K Challenge | Member area and  | $197.00 | 40.00% | $184.83 | 2.00% | 16.72% | igorkheifets | 2022-06-29 |
| Remixable - Founder Edition | Software | $512.01 | 50.00% | $177.54 | 10.00% | 22.85% | remixable | 2022-11-01 |

### 9.2 Records exercising each source quirk (parser regression set)

| Product | `price_raw` | Parsed price | Commission | Vendor | Net/sale | Quirk |
|---|---|---|---|---|---|---|
| Tube Magic | `$47 per month` | $47.00 | 50.00% | tubemagic | $265.11 | recurring price |
| Fearless Phone | `$63.77` | $63.77 | $30.00 flat | dezatell | $21.73 | flat-fee commission |
| Heal Your Parent | `$ 77,21` | $77.21 | 30.00% | DrGhazalehBail | $23.16 | European decimal comma |
| apexxer | `60% Lifetime Commission on` | $113.48 | 60.00% | apexxer | $68.09 | price inside prose |
| Kidney Solution | `Around $87.00` | $87.00 | 75.00% | Kidneycoach | $49.38 | approximate price |
| KetoDNA | `$11.69` | $11.69 | 85.00% | HoK-Group | $178.00 | funnel net >> front-end |

### 9.3 Sparse — no performance stats published (the 90% case)

| Product | Price | Comm | Net/sale | Vendor | Since |
|---|---|---|---|---|---|
| Integrative Digestive Formula | $46.74 | 60.00% | $28.04 | soundview | 2025-03-03 |
| Tesla MedBed X | $2440.26 | 60.00% | $928.67 | TeslaMedbedX | 2025-11-18 |
| Advanced Prostate Formula | $58.44 | 60.00% | $35.06 | soundview | 2025-04-10 |
| Make My Plan – The Ultimate AI Goal Plan | $51.48 | 75.00% | $38.61 | praneet_brar | 2025-05-21 |
| The Healed Soul "MANIFEST YOUR DESTINY"  | $38.99 | 70.00% | $27.29 | TheHealedSoul | 2024-02-21 |
| The No-Regret Decision System™ | $12.12 | 60.00% | $11.25 | fkcproject | 2026-03-07 |

## 10. Confidence, and what it constrains in Phase 2

| Field group | Confidence | Basis |
|---|---|---|
| Name, type, price, commission, vendor, date | **High** | Positional layout verified on 1381/1381 records with zero exceptions; 1029 rows reconcile to the cent (§7A) |
| Net earnings/sale | **High** | Anchored to its literal `Net earnings/sale*` label, not position |
| Cart conversion / cancellation (both present) | **High** | Order confirmed by `image.png` |
| Cart conversion / cancellation (one present) | **Medium** | 6 rows via quantisation rule; flagged |
| Earnings/cart visitor, payment method, description, category, URLs | **Not available** | Absent from source; `UNKNOWN` throughout, never inferred |

### Constraints carried into Phase 2

1. **Earnings per cart visitor cannot be scored.** The brief lists it as a Phase 2 input,
   but it is absent from this export. It will stay `UNKNOWN` and be excluded from the
   scoring model rather than estimated.
2. **Only 132 products (9.6%) publish cart conversion and cancellation.** Digistore24
   reveals these only once a listing has real sales history, so their mere presence is
   evidence of actual monetisation. Phase 2 should reward it directly — and must not rank
   a statless product above a proven one on commission percentage alone.
3. **A high net-to-price ratio is a warning, not a win** (§7A). It typically means a deep
   upsell funnel, so the advertised net earnings is not what a single front-end sale pays.
4. **No sales-page URLs.** Phase 3 must resolve each shortlisted product to its live sales
   page by search, since `href` values were not preserved in the copy.
5. **131 products (9.5%) need vendor approval** before promotion — a real execution risk
   that belongs in the score, not a footnote.
6. **2 listings are subscription-priced**, where net earnings represents lifetime value
   rather than a single-sale payout. Not comparable to one-off products without adjustment.

