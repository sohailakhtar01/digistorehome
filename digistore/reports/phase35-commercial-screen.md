# Phase 3.5 - Fast Commercial Opportunity Screen

All 30 products from `reports/phase3-bing-research-queue.csv`, screened on measured
demand, SERP structure, commercial intent, product fit and affiliate economics.

**Capture date: 2026-08-24**

| Evidence | Source |
|---|---|
| Search volume | Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24 |
| SERP structure | Google organic via DataForSEO, US, en, depth 10, 2026-08-24 |
| Economics | Digistore24 marketplace export, Phase 1 parse + Phase 2 filter |

---

## Data-integrity disclosure: Bing could not be measured

Every Bing SERP request made on 2026-08-24 returned results for the **first token**
of the query only. This was reproduced on three independent paths:

| Path | Query sent | SERP returned |
|---|---|---|
| DataForSEO `bing/organic/live/regular` | `self sufficient backyard review` | results for **self** (self.inc, SELF Magazine) |
| DataForSEO `bing/organic/live/advanced` | `self sufficient backyard review` | results for **self** (identical) |
| DataForSEO `bing/organic/live/regular` | `ron melchiore self sufficient backyard` | results for **ron** (Ron Weasley, Ronin crypto) |
| DataForSEO `bing/organic/live/regular` | `caviargan` | Microsoft support pages |
| Direct fetch of `bing.com/search` | `"the self-sufficient backyard" book review` | results for **the** (grammar articles) |

Controls confirm the failure is Bing-specific: the same DataForSEO account returned
correct, fully-matched SERPs for every Google query in this report.

**Consequence, stated plainly:** a truncated SERP shows none of the real competitors,
so it reads as an empty, uncontested page - the most attractive and most false
possible result. No Bing response is used as evidence of weak competition anywhere
in this report. The 25-point SERP axis is scored from the **Google proxy**, and every
product carries the -5 `invalid SERP data` penalty as a result.

This also means **the seven "validated" Bing SERPs from Phase 3 are no longer safe to
rely on** and are not counted here.

---

## Scoring

`30 demand + 25 SERP weakness + 20 commercial intent + 15 product fit + 10 economics`, then penalties:

| Penalty | Value |
|---|---|
| Vendor dominates branded SERP | -10 |
| Extremely low search demand | -15 |
| Ambiguous product name | -8 |
| High-risk claims | -10 |
| Invalid SERP data (Bing - applied to all 30) | -5 |
| Poor product/query fit | -8 |

---

## Full ranking (all 30)

| # | Product | Best keyword | Measured demand | Score | Risk | Confidence |
|---|---|---|---|---|---|---|
| 1 | NEW: The Self-Sufficient Backyard | `self sufficient backyard` | 4090/mo | **80** | LOW | HIGH |
| 2 | The Lost SuperFoods | `long term food storage` | 230/mo | **73** | LOW | HIGH |
| 3 | Tube Magic - AI Tools For Growing on YouTube | `tube magic` | 1600/mo | **71** | MEDIUM | HIGH |
| 4 | David’s Shield – New High-Conv VSL (2X CVR!) | $5M+  | `davids shield` | 1900/mo | **63** | MEDIUM | MEDIUM |
| 5 | Home Doctor – BRAND NEW! | `home remedies book` | 100/mo | **62** | LOW | MEDIUM |
| 6 | CaviArgan | `caviargan review` | 140/mo | **57** | MEDIUM | MEDIUM |
| 7 | Joseph’s Well – Blockbuster Offer From Top Diamond V | `how to make water from air` | 260/mo | **51** | HIGH | MEDIUM |
| 8 | Medicinal Garden Kit – BRAND NEW! | `medicinal garden kit review` | 150/mo | **48** | HIGH | HIGH |
| 9 | Idrotherapy *GET PAID ON REBILLS EACH MONTH* | `idrotherapy review` | 260/mo | **46** | HIGH | HIGH |
| 10 | Advanced Memory Formula | `advanced memory formula review` | 820/mo | **39** | HIGH | HIGH |
| 11 | Anti-Looter Kit - BRAND NEW! | `anti looter kit` | 20/mo | **38** | MEDIUM | HIGH |
| 12 | Get Paid To Do Simple Writing Jobs Online | `paid online writing jobs review` | 400/mo | **36** | HIGH | HIGH |
| 13 | Cashflow Secrets | `money ripples` | 100/mo | **36** | HIGH | LOW |
| 14 | Shifting Vibrations - Proven Digital Manifestation O | `shifting vibrations` | 50/mo | **24** | HIGH | LOW |
| 15 | Online Kirtan and Harmonium Course | `harmonium course` | 10/mo | **22** | LOW | MEDIUM |
| 16 | Clearing Academy | `clearing academy` | 40/mo | **21** | MEDIUM | LOW |
| 17 | Remixable - Founder Edition | `remixable` | 30/mo | **21** | HIGH | LOW |
| 18 | The Number 1 Serger and Overlocker Online Sewing Cou | `overlocker course` | 10/mo | **21** | MEDIUM | MEDIUM |
| 19 | The Encyclopedia of Power Foods- Latest 2025/6! | `encyclopedia of power foods` | UNKNOWN | **17** | MEDIUM | HIGH |
| 20 | Tufting Mastery Class | How To Make Rugs | `tufting mastery class` | UNKNOWN | **14** | MEDIUM | HIGH |
| 21 | Fearless Phone Fanatic (For Cold Calling) | `fearless phone fanatic` | UNKNOWN | **14** | MEDIUM | HIGH |
| 22 | The 5 Foot Farm: 80% Commissions and Recurring Upsel | `5 foot farm` | UNKNOWN | **12** | MEDIUM | HIGH |
| 23 | Midas Manifestation System | `midas manifestation` | 40/mo | **11** | HIGH | LOW |
| 24 | AI Profit Sniper | `ai profit sniper` | UNKNOWN | **9** | HIGH | HIGH |
| 25 | TPP System | `tpp system` | 20/mo | **5** | HIGH | LOW |
| 26 | Unlock Earnings! Promote PinealXT! | `pinealxt` | UNKNOWN | **2** | HIGH | HIGH |
| 27 | Promote Pineal Guardian Now! | `pineal guardian` | UNKNOWN | **2** | HIGH | HIGH |
| 28 | Promote HydroLean XT Gold Now! | `hydrolean xt` | UNKNOWN | **2** | HIGH | HIGH |
| 29 | 81 % Commission on US Immigration Survival PRO Bundl | `us immigration survival pro` | UNKNOWN | **0** | HIGH | HIGH |
| 30 | Help Others Overcome Their Acid Refluy | 45% Commiss | `reflux summit` | UNKNOWN | **0** | HIGH | HIGH |

---

## Top 10 - detail

### 1. NEW: The Self-Sufficient Backyard

**Score 80/100** (base 85, penalties -5) - vendor `sbackyard` - risk LOW - confidence HIGH

**Best keyword:** `self sufficient backyard` (branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
self sufficient backyard=1900; the self sufficient backyard=1600; self sufficient backyard book=390; self sufficient backyard review=90; self sufficient backyard pdf=110; homesteading book=1000; best homesteading books=390; self sufficiency book=320; off grid living book=90; backyard homestead book=70
```

Branded cluster total: **4090/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

reddit.com #1 (thread from 5y ago); amazon.com #2; store.motherearthnews.com #3; goodreads.com #4; cz.eureka.com #5 (parasite blog); vocal.media #6 (parasite). No authority publisher, no dedicated review site, and the Digistore24 funnel does not appear on page 1 at all.

**Vendor SERP control:** `NOT FOUND`

**Why it may be beatable / why visitors may convert:** Largest measured demand cluster in the queue (~4,090/mo branded) sitting on the best refund profile in the dataset (1.28% cancellation) and backed by a real, verifiable book by named authors (Ron & Johanna Melchiore).

**Main concern:** Amazon ranks #2 and sells the physical book outright, so a buyer can complete the purchase without ever touching the affiliate funnel. "self sufficient backyard pdf" (110/mo) shows some free-copy intent.

**Penalties applied:** invalid Bing SERP data (-5)

---

### 2. The Lost SuperFoods

**Score 73/100** (base 78, penalties -5) - vendor `lostrec` - risk LOW - confidence HIGH

**Best keyword:** `long term food storage` (non-branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
the lost superfoods=210; the lost superfoods review=20; long term food storage=1300; survival food recipes=70
```

Branded cluster total: **230/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

amazon.com #1; reddit.com #2 (r/preppers, 4y old); facebook.com #3; goodreads.com #4; bulbapp.com #5 (parasite); ebay.com #6; accessnewswire.com #7 (press release); quora.com #8. No authority publisher and no official vendor page on page 1.

**Vendor SERP control:** `NOT FOUND`

**Why it may be beatable / why visitors may convert:** Lowest cancellation of any promotable product measured (1.70%) with 19% cart conversion, and the non-branded pool it sits in ("long term food storage" 1,300/mo, $3.04 CPC) is real and commercially valuable.

**Main concern:** Amazon (#1) and eBay (#6) both sell the book, so the affiliate link is the least convenient way to buy it. Credited author "Claude Davis" also fronts Home Doctor - a shared pen name that remains unverified and was flagged in Phase 3.

**Penalties applied:** invalid Bing SERP data (-5)

---

### 3. Tube Magic - AI Tools For Growing on YouTube

**Score 71/100** (base 76, penalties -5) - vendor `tubemagic` - risk MEDIUM - confidence HIGH

**Best keyword:** `tube magic` (branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
tube magic=1600; youtube automation tools=170; best ai tools for youtube=30
```

Branded cluster total: **1600/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

medium.com #1 (parasite, reports ~2.8/5); trustpilot.com #2 (2.6 "Poor"); youtube.com #3; productinsightai.com #4; reddit.com #5; nairaland.com #6; tubemagic.com #7 (official, mid-page); outlierkit.com #8 ranking an ALTERNATIVES page. Real review sites are present - this is not an empty SERP.

**Vendor SERP control:** `PRESENT BUT NOT DOMINANT`

**Why it may be beatable / why visitors may convert:** Only product in the queue with four-figure branded demand (1,600/mo) and the highest-value adjacent term measured anywhere in this study: "youtube automation tools" at a $10.16 CPC.

**Main concern:** 1% cart conversion - the worst in the queue. Phase 2 established the $265.11 net is lifetime value on a $47/mo subscription, not a per-sale payout. Trustpilot 2.6 "Poor" and a competitor already ranks an "alternatives" page above the official site.

**Penalties applied:** invalid Bing SERP data (-5)

---

### 4. David’s Shield – New High-Conv VSL (2X CVR!) | $5M+ In Sales

**Score 63/100** (base 76, penalties -13) - vendor `blackoutusa` - risk MEDIUM - confidence MEDIUM

**Best keyword:** `davids shield` (branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
davids shield=1900; emp survival book=50; how to prepare for emp=50
```

Branded cluster total: **1900/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

amazon.com #1; finance.yahoo.com #2 (press release); davidsshieldfoundation.org #3 (UNRELATED organisation); books.google.com #4; davidshields.com #5 (UNRELATED author); scribehow.com #6 (parasite); open.firstory.me #7 (parasite); sites.google.com #8 (parasite); newpelican.com #9 (local news running affiliate content). Zero dedicated review sites.

**Vendor SERP control:** `NOT FOUND`

**Why it may be beatable / why visitors may convert:** Weakest competitor set measured in the entire screen - three of the top nine results are parasite pages on scribehow, firstory and Google Sites, and no dedicated review site holds any position.

**Main concern:** The 1,900/mo is NOT all this product. David's Shield Foundation (a protection-training charity) and author David Shields both rank on page 1, so an unknown share of that volume is not addressable. Amazon also sells the guide at #1.

**Penalties applied:** ambiguous product name (-8), invalid Bing SERP data (-5)

---

### 5. Home Doctor – BRAND NEW!

**Score 62/100** (base 67, penalties -5) - vendor `homedoctor` - risk LOW - confidence MEDIUM

**Best keyword:** `home remedies book` (non-branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
home doctor book=90; home doctor book review=10; survival medicine book=390; home remedies book=1300
```

Branded cluster total: **100/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

amazon.com #1; goodreads.com #2; quora.com #3; vocal.media #4 (parasite); scribd.com #5 (full document copy); medium.com #6 (parasite, 4y old); ideasbeat.com #7 (small affiliate site); etsy.com #8. No authority publisher on page 1.

**Vendor SERP control:** `NOT FOUND`

**Why it may be beatable / why visitors may convert:** Sits in a large, genuinely non-branded book market - "home remedies book" 1,300/mo and "survival medicine book" 390/mo - with a strong 2.81% cancellation rate.

**Main concern:** Branded demand is only 90/mo and Scribd hosts the document at #5, so a share of searchers are looking for a free copy. Amazon and Etsy both sell it.

**Penalties applied:** invalid Bing SERP data (-5)

---

### 6. CaviArgan

**Score 57/100** (base 62, penalties -5) - vendor `koshea76` - risk MEDIUM - confidence MEDIUM

**Best keyword:** `caviargan review` (branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
caviargan=90; caviargan review=50
```

Branded cluster total: **140/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

sites.google.com #1 (parasite); amazon.com #2; essenceofargan.com #3 (official); linkedin.com #4; accessnewswire.com #5 (press release); walmart.com #6; instagram.com #7; github.com #8 (parasite repo posing as a review). A Google Sites page outranks the official store.

**Vendor SERP control:** `PRESENT BUT NOT DOMINANT`

**Why it may be beatable / why visitors may convert:** A parasite page on Google Sites currently outranks the official store, and a GitHub repository ranks as a review - direct evidence that nothing of quality competes here. $5.31 CPC confirms buyers.

**Main concern:** 2% cart conversion. Amazon and Walmart both stock it, and a #4 LinkedIn post claims it is "not sold on Amazon" - which the same SERP disproves, so the niche is full of bad information.

**Penalties applied:** invalid Bing SERP data (-5)

---

### 7. Joseph’s Well – Blockbuster Offer From Top Diamond Vendor

**Score 51/100** (base 74, penalties -23) - vendor `megadrought` - risk HIGH - confidence MEDIUM

**Best keyword:** `how to make water from air` (non-branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
josephs well=260; how to make water from air=260; diy water generator=90
```

Branded cluster total: **260/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

youtube.com #1; facebook.com #2; joesephswell.com #3 (official); finance.yahoo.com #4 (press release); youtube.com #5; youtube.com #6 (about the Nazareth well - different subject); facebook.com #7; sites.google.com #8 (parasite); newpelican.com #9. Entirely social, press-release and parasite pages - no review site of any quality.

**Vendor SERP control:** `PRESENT BUT NOT DOMINANT`

**Why it may be beatable / why visitors may convert:** Best economics in the entire queue - $76.36 net, 16% cart conversion, 5.41% cancellation - against the weakest page-one competitor set measured.

**Main concern:** Ranking pages state irreconcilable output claims for the same device: accessnewswire says "up to 10 gallons per day", newpelican says "up to 50 gallons per day". A DIY condensation rig producing either is physically doubtful, so honest promotion means contradicting the vendor. Name also collides with the biblical site in Nazareth.

**Penalties applied:** high-risk claims (-10), ambiguous product name (-8), invalid Bing SERP data (-5)

---

### 8. Medicinal Garden Kit – BRAND NEW!

**Score 48/100** (base 63, penalties -15) - vendor `bookofren` - risk HIGH - confidence HIGH

**Best keyword:** `medicinal garden kit review` (branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
medicinal garden kit=110; medicinal garden kit review=40; herbal remedies book=5400
```

Branded cluster total: **150/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

medium.com #1 (parasite); mcgill.ca #2 - McGill University Office for Science and Society, "The Medicinal Garden Kit Will Probably Not Save You... the claims are not rooted in science"; globenewswire.com #3; nicoleapelian.com #4 (official); sites.google.com #5; store.motherearthnews.com #6 and shop.iamcountryside.com #9 selling COMPETING kits; amazon.com #7 selling a 35-seed pack; dyspraxiausa.org #8 (spam PDF on a hacked charity site).

**Vendor SERP control:** `PRESENT BUT NOT DOMINANT`

**Why it may be beatable / why visitors may convert:** Strong funnel economics - 18% cart conversion at 2.07% cancellation - in a niche whose adjacent term "herbal remedies book" carries 5,400/mo.

**Main concern:** A university science unit ranks #2 explicitly debunking the product, and the vendor's own page claims the seeds are "FDA approved", which is not a thing the FDA does. Amazon and two homesteading retailers sell near-identical seed kits, so the product is not differentiated.

**Penalties applied:** high-risk claims (-10), invalid Bing SERP data (-5)

---

### 9. Idrotherapy *GET PAID ON REBILLS EACH MONTH*

**Score 46/100** (base 61, penalties -15) - vendor `koshea76` - risk HIGH - confidence HIGH

**Best keyword:** `idrotherapy review` (branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
idrotherapy=170; idrotherapy review=70; idrotherapy price=10; idrotherapy scam=10
```

Branded cluster total: **260/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

idrotherapy.com #1 (official); trustpilot.com #2 - 2.2 "Poor" across 109 reviews; amazon.com #3; sites.google.com #4; open.firstory.me #5; productreview.com.au #6 - 1.4/5 from 49 reviews ("It's rubbish", "Don't waste your money"); facebook.com #7; essenceofargan.com #8.

**Vendor SERP control:** `DOMINATES`

**Why it may be beatable / why visitors may convert:** Real measured demand (170/mo brand, 70/mo review) at a $6.27 CPC.

**Main concern:** Two independent consumer-review platforms rate it 2.2/5 and 1.4/5. An honest review would tell readers not to buy, which earns no commission - the product and the ethics are in direct conflict. 2% cart conversion corroborates it.

**Penalties applied:** vendor dominates branded SERP (-10), invalid Bing SERP data (-5)

---

### 10. Advanced Memory Formula

**Score 39/100** (base 62, penalties -23) - vendor `soundview` - risk HIGH - confidence HIGH

**Best keyword:** `advanced memory formula review` (branded)

**Demand evidence** (Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, 2026-08-24):

```
advanced memory formula=590; advanced memory formula review=210; advanced memory formula scam=10; advanced memory formula ingredients=10
```

Branded cluster total: **820/mo**

**SERP (Google proxy - Bing NO_VALID_DATA):**

amazon.com #1 (Advanced Bionutritionals brand); health.harvard.edu #2 - "Don't buy into brain health supplements... no solid proof any of them work"; barchart.com #3; trustpilot.com #4; okpharmacyrgv.com #5; health.clevelandclinic.org #6 - "Research on various brain health supplements doesn't support their use"; walmart.com #7; advancedbionutritionals.com #8; reddit.com #9.

**Vendor SERP control:** `PRESENT BUT NOT DOMINANT`

**Why it may be beatable / why visitors may convert:** Highest commercial value measured on a supplement term - 590/mo brand and 210/mo review at $7.00-$7.14 CPC.

**Main concern:** Harvard Health and Cleveland Clinic both rank on page 1 actively debunking the entire product category - an unwinnable YMYL SERP. The name also collides with Advanced Bionutritionals, an established brand selling on Amazon and Walmart.

**Penalties applied:** ambiguous product name (-8), high-risk claims (-10), invalid Bing SERP data (-5)

---

## Ranked 11-30

**11. Anti-Looter Kit - BRAND NEW!** (38) - 20/mo total branded demand, and no qualifier ("review", "price", "alternatives", "worth it") registers any volume at all. There is no search market to build a site against.

**12. Get Paid To Do Simple Writing Jobs Online** (36) - The dominant search intent is scam-verification, not purchase - four of the eight page-one results are people asking whether it is a scam or stating that it is. 19.99% cancellation independently corroborates buyer regret.

**13. Cashflow Secrets** (36) - 48.76% cancellation - almost half of all sales are refunded. No affiliate economics survive that.

**14. Shifting Vibrations - Proven Digital Manifestation Offer** (24) - 24.19% cancellation - roughly one in four buyers refunds. Manifestation claims are not substantiable.

**15. Online Kirtan and Harmonium Course** (22) - 10/mo demand. Requires vendor approval before promotion.

**16. Clearing Academy** (21) - 40/mo is far too thin, and "clearing academy" is a generic phrase used by unrelated education businesses.

**17. Remixable - Founder Edition** (21) - 30/mo combined demand and 22.85% cancellation.

**18. The Number 1 Serger and Overlocker Online Sewing Course** (21) - "overlocker course" is 10/mo and "serger course" returns no data. Also requires vendor approval before promotion.

**19. The Encyclopedia of Power Foods- Latest 2025/6!** (17) - Neither the brand nor its review term registers ANY search volume. Phase 3 also found related searches were dominated by "pdf".

**20. Tufting Mastery Class | How To Make Rugs** (14) - No measurable demand and 4% cart conversion. Phase 3 found the niche owned by supply retailers with real inventory.

**21. Fearless Phone Fanatic (For Cold Calling)** (14) - No measurable demand for the brand or its review term.

**22. The 5 Foot Farm: 80% Commissions and Recurring Upsell** (12) - No measurable demand on either spelling of the brand.

**23. Midas Manifestation System** (11) - "Manifestation" claims cannot be evidenced; 3% cart conversion.

**24. AI Profit Sniper** (9) - No measurable demand and 27.21% cancellation.

**25. TPP System** (5) - 20/mo demand, 2% cart conversion, and a $3,131.60 price point that no cold search visitor converts on. "TPP" is also a widely used acronym.

**26. Unlock Earnings! Promote PinealXT!** (2) - No measurable demand for the brand or its review term. Pineal "third eye activation" claims are not substantiable.

**27. Promote Pineal Guardian Now!** (2) - No measurable demand. Phase 3 found the SERP saturated with near-duplicate "official site" clones rather than reviews.

**28. Promote HydroLean XT Gold Now!** (2) - No measurable demand. Weight-loss claims are the most heavily policed advertising category there is.

**29. 81 % Commission on US Immigration Survival PRO Bundle** (0) - No measurable demand, and the surrounding space is owned by US government domains. Immigration advice carries real consequences for readers if it is wrong.

**30. Help Others Overcome Their Acid Refluy | 45% Commission** (0) - No measurable branded demand and a YMYL medical space owned by the largest health publishers in the world.

