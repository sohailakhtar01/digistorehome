# Shobit Engine — Final Verdict

**Research complete 2026-08-24. Nothing purchased. No site built.**

---

## The hypothesis, tested

> *Aggressive vendor advertising creates branded product-name search demand →
> that demand lands on weak Bing SERPs → an exact/near-exact match domain can
> rank → a simple pre-sell page converts → scale horizontally.*

I tested each link in that chain against 1,381 Digistore24 products.
**Three links hold. One is false. One is the real constraint.**

| Link in the chain | Verdict | Evidence |
|---|---|---|
| Vendor advertising creates branded search | ✅ **HOLDS** | Bing autosuggest returns branded commercial queries for 60 of 150 screened products |
| Those SERPs are weak | ✅ **HOLDS** | 30/30 validated SERPs contained **zero authority publishers and zero marketplaces** |
| Affiliate pages can rank there | ✅ **HOLDS** | Every #1 position in all 30 SERPs is held by a small affiliate site |
| **An exact-match domain ranks strongly** | ❌ **FALSE** | EMDs average position **5.0**; non-EMDs average **3.9**. Only **1 of 11** EMDs ranked #1 |
| Horizontal scaling | ✅ **HOLDS — and it is the whole game** | See below |

---

## The single most important finding

The webinar says *one domain per product*. The data says the opposite.

Across the 30 validated branded SERPs, the winners are **portfolio review sites
that cover hundreds of products**:

| Domain | Appears in | Avg. position |
|---|---|---|
| `consumerhealthdigest.com` | **23 of 30 SERPs** | 2.3 |
| `supplementmag.com` | **19 of 30** | 1.9 |
| `dailyhealthsupplement.com` | **18 of 30** | 3.7 |
| `healthwebmagazine.com` | 9 of 30 | 3.6 |
| `bestsupplements.best` | 7 of 30 | 3.9 |

One site is ranking on 23 different product names. Meanwhile the exact-match
domains — `tonicgreens.reviews`, `usa-seroburn.com`, `nailrefresh.blog`,
`nervefreshreview.blog`, `cellufend-en.us` — sit at positions 1, 4, 6, 7, 7.

**Horizontal scaling is not what you do after the domain works. It is the
mechanism that makes ranking work at all.** One site covering forty offers beats
forty single-offer domains, and it carries no trademark exposure.

---

## The binding constraint: product quality

This is where the strategy actually breaks, and it is not an SEO problem.

I individually researched the marketing of the highest-demand candidates.
**Four of four checked showed disqualifying deception:**

| Product | Finding |
|---|---|
| **TonicGreens** | Claims a "kill switch" that eliminates herpes — an illegal disease claim — fronted by "Dr. Ben Rivers", who cannot be verified. Staged news-broadcast footage. |
| **Ultimate OFF-GRID Generator** | Free-energy and "80% off your bill" claims that contradict basic physics. Hidden domain ownership, reported safety hazards. |
| **iGenics** | Real AREDS-2 ingredients, but VSL authority "Dr. Charles Williams" has no verifiable licence and his stated experience shifts between **15, 22 and 30 years inside one script**. |
| **Pineal Guardian** | "Pineal activation" premise unsupported. Every "legit" verdict I found was affiliate-authored, and spam review PDFs are hosted on **hacked `douglascounty-ne.gov` and `santiamhospital.org` domains**. |

That last detail matters: the incumbents ranking in these SERPs are running
black-hat placements on compromised government and hospital websites. **The SERP
is weak because it is a spam neighbourhood, not because it is unclaimed.**

Of the 150 economically-screened products, **32 of the 42 strongest Bing-demand
candidates are direct-response VSL supplements** — the exact class where 4/4
checks failed.

---

## What survives everything

**Advanced Bionutritionals** (`soundview`) is structurally different from every
other high-demand vendor found:

- Established US company with a real trading history
- Formulator **Dr Frank Shallenberger** is a real, named physician (University of
  Maryland MD, 41 years' practice) — not an unverifiable VSL character
- Ingredients are genuinely studied: CoQ10, Acetyl-L-Carnitine, Alpha-Lipoic Acid
- cGMP manufacturing, allergen disclosure, **correct FDA disclaimers** — no
  disease claims
- Products also retail on Amazon and Walmart, and Trustpilot sits at 4.5
- Compensation of the endorsing doctor is **publicly disclosed** by the vendor

⚠️ **One unresolved caveat:** a Trustpilot commenter alleges a past California
medical-licence revocation. That is a single unverified consumer comment. I could
not confirm or refute it, and it **must be independently checked with the medical
board before any content is written.** I am not treating it as fact in either
direction.

---

## Phase 11 — Sales plausibility (SCENARIOS, NOT PREDICTIONS)

**There is no Bing search-volume figure anywhere in this project.** Bing's
Keyword Research API is not enabled on this account (HTTP 400), and I was
forbidden from substituting Google volume. Autosuggest proves a query *is typed*,
not *how often*.

The volume row below is therefore an **explicit assumption**, not a measurement.
Everything downstream inherits that uncertainty.

**Advanced Mitochondrial Formula — $116.19/sale**

| Step | Conservative | Base | Optimistic |
|---|---|---|---|
| Assumed Bing branded searches/mo | 150 | 600 | 2,000 |
| Organic CTR at pos. 3–5 | 8% | 12% | 18% |
| Page visits | 12 | 72 | 360 |
| Outbound hoplink CTR | 25% | 35% | 45% |
| Affiliate clicks | 3 | 25 | 162 |
| Click→sale | 1.5% | 3% | 5% |
| **Sales/month** | **0.05** | **0.76** | **8.1** |
| **Commission/month** | **~$5** | **~$88** | **~$941** |

**Read this honestly: a single product page is a rounding error in the
conservative and base cases.** Only the optimistic case pays. That is precisely
why `consumerhealthdigest.com` covers 23 products instead of one — the model only
works in aggregate. Twenty products at the base case is ~$1,700/mo; twenty at
conservative is still ~$100.

---

## FINAL OUTPUT

```
BEST PRODUCT:              Advanced Amino Formula (Advanced Bionutritionals /
                           vendor "soundview") — with Advanced Mitochondrial
                           Formula, same vendor, as offer #2
BEST PRODUCT-NAME KEYWORD: "advanced amino formula reviews"
BING DEMAND EVIDENCE:      BING-NATIVE, QUALITATIVE ONLY. Bing autosuggest
                           returns "advanced amino formula reviews / review /
                           scam / legit". Tier BING_STRONG.
                           NO BING VOLUME FIGURE EXISTS — Keyword API disabled.
BING SERP OPPORTUNITY:     VALIDATED via cross-checked Bing-index proxies
                           (Yahoo + DuckDuckGo agreed). 0 authority publishers,
                           0 marketplaces, 7 small affiliate sites in top 10.
                           #1 held by consumerhealthdigest.com.
                           NOT captured from bing.com directly — unreachable.
BEST DOMAIN:               NON-BRAND PORTFOLIO DOMAIN (not yet selected).
                           advancedaminoformulareview.com is available but is
                           NOT recommended — see trademark risk.
DOMAIN STATUS:             advancedaminoformula.com REGISTERED (vendor-held);
                           advancedaminoformulareview.com AVAILABLE;
                           advancedaminoformulareviews.com AVAILABLE
                           (RDAP Verisign, 2026-08-24)
TRADEMARK RISK:            MEDIUM-HIGH on every brand-containing domain — each
                           reproduces a live vendor mark. LOW on a non-brand
                           portfolio domain, which the ranking evidence favours
                           anyway. Not a legal clearance; run USPTO before buying.
AFFILIATE PAYOUT:          $70.25/sale (Amino) · $116.19/sale (Mitochondrial)
                           7–8% cart conversion, 6.66–8.09% cancellation
MARKET-AWARENESS EVIDENCE: Bing autosuggest branded+commercial queries; active
                           affiliate ecosystem (accessnewswire, Google Sites,
                           forum placements); retail presence on Amazon/Walmart;
                           Trustpilot 4.5; 1,361-day product age
ESTIMATED SALES PLAUSIBILITY: Single product ~$5 / ~$88 / ~$941 per month
                           (conservative / base / optimistic). SCENARIOS ONLY —
                           built on an ASSUMED volume, because none is measurable.
OVERALL SCORE:             86.6 / 100
CONFIDENCE:                MEDIUM
```

## VERDICT

# GO — but not the strategy as described

**GO** on: a **multi-product supplement review site on a non-brand domain**, led
by the Advanced Bionutritionals offers, scaled horizontally across the validated
candidate set.

**NO-GO** on the webinar's literal tactic: **one exact-match domain per product.**
That specific claim is contradicted by the measured data — EMDs averaged position
5.0 against 3.9 for non-EMDs, and only one of eleven reached #1. Buying
`advancedaminoformulareview.com` would take the vendor's trademark, the weaker
ranking pattern, and the higher legal exposure all at once.

**Two things must close before money is spent:**

1. **Verify the Shallenberger licence allegation** with the California and Nevada
   medical boards. If it is true, the one honestly-promotable vendor in this
   dataset is compromised and the verdict flips to NO-GO.
2. **Get one real Bing SERP.** Everything here is cross-validated proxy data.
   Search `advanced amino formula reviews` on Bing.com yourself and paste the top
   10 — three minutes, and it converts the strongest assumption in this report
   into a fact.

**And one standing warning.** The 20-product shortlist is dominated by offers I
have marked `NOT_INDIVIDUALLY_VERIFIED`. Given that **4 of 4** products I did
check showed fabricated authorities or illegal disease claims, treat that label
as *unproven*, not as *clean*. Check each one before promoting it — the SEO here
is easy, and that is exactly why the honesty is the hard part.
