# Phase 5 — Final pre-purchase validation, Top 3

**Date: 2026-08-24.** Volume: Google Ads Keyword Planner via DataForSEO (US, en,
12-mo avg). SERPs: Google organic via DataForSEO (US, en, depth 10). Availability:
RDAP registry lookup. Trademark: preliminary screen only — **not a legal clearance.**

---

## VERDICT

**I am not declaring an unconditional winner, because not all major checks passed.**

Two of the three opportunities are **eliminated on new evidence** gathered in this
phase. The third survives every check I was able to run, but **the Bing check —
the one your entire strategy rests on — cannot be run at all.**

| Check | #1 Self-Sufficient Backyard | #2 Lost SuperFoods | #3 Tube Magic |
|---|---|---|---|
| Exact US Bing SERP validated | ❌ **IMPOSSIBLE** | ❌ **IMPOSSIBLE** | ❌ **IMPOSSIBLE** |
| Search intent matches product | ✅ **PASS** | ❌ **FAIL** | ❌ **FAIL** |
| Ranking pages beatable | ✅ **PASS** | ❌ **FAIL** | ❌ **FAIL** |
| Trademark / name conflict | ⚠️ **CONDITIONAL** | ⚠️ conditional | ❌ **FAIL** |
| **Outcome** | **Sole survivor, conditional** | **ELIMINATED** | **ELIMINATED** |

---

## Check 1 — Bing SERP validation: IMPOSSIBLE, and now proven exhaustively

I attempted every available route. All four failed:

| Route | Query | Returned |
|---|---|---|
| `bing/organic/live/regular` | `long term food storage` | dictionary entries for **"long"** |
| `bing/organic/live/advanced` | `self sufficient backyard review` | self.inc, SELF Magazine — **"self"** |
| `bing/organic/task_post` → `task_get` (async) | `long term food storage` | dictionary entries for **"long"** |
| Direct fetch of `bing.com/search` | `"the self-sufficient backyard" book review` | grammar articles for **"the"** |

Then the decisive test. I sent a **single-word** query where truncation could not
apply:

> **`homesteading`** → returned **Montana state history from March 13, 1933.**

That is not truncation. The DataForSEO Bing backend is returning unrelated cached
SERPs. Meanwhile the same account returned correct, fully-matched Google SERPs on
every one of the ~12 Google queries in this phase.

**Conclusion: Bing SERP data is unobtainable in this environment. This is not a
retry-able transient.** No Bing result — including the seven from Phase 3 — is used
as evidence anywhere.

---

## Check 2 & 3 — Intent and ranking-page inspection

### ❌ #2 The Lost SuperFoods — ELIMINATED

Its primary commercial keyword is `long term food storage` (1,300/mo, $3.04 CPC).
**I had recommended a domain for this keyword without ever having looked at its
SERP.** I have now looked. Page one:

| Pos | Result | What it is |
|---|---|---|
| 1 | **mypatriotsupply.com** | major prepper retailer, 25-year buckets |
| 2 | reddit.com r/preppers | 90+ comments |
| 3 | **readywise.com** | funded freeze-dried food brand |
| 4 | **fcs.uga.edu** | University of Georgia Extension (.edu) |
| 5 | youtube.com | |
| 6 | **wisefoodstorage.com** | Wise Company |
| 7 | **beprepared.com** | Emergency Essentials |
| 8 | reddit.com | |
| 9 | practicalpreppers.com | |

**Fatal intent mismatch.** Four of nine results are well-funded retailers selling
$200–$2,000 food buckets. The $3.04 CPC is being paid **by those retailers, for
bucket sales** — not for a $56 recipe book. Someone searching this term wants to
*buy stored food*, not read about making pemmican. A .edu extension service also
holds page one.

The product is fine — 1.70% cancellation is still the best refund rate in the
dataset. **The keyword is wrong, and it was the only keyword giving this product
meaningful volume** (branded is 210/mo and declining).

### ❌ #3 Tube Magic — ELIMINATED

Primary keyword `youtube automation tools` (170/mo, **$10.16 CPC**). Page one:

`opus.pro` · `invideo.io` · `shotstack.io` · `vozo.ai` · `storyshort.ai` ·
Wikipedia · Reddit

**Every commercial result is a funded SaaS company ranking its own product page.**
Intent is "find me a tool to use", and these companies *are* the tools. An affiliate
review site is the wrong page type for this SERP. Tube Magic does not appear at all.

Combined with what Phase 3.5 already established — **1% cart conversion**,
Trustpilot **2.6 "Poor"**, real front-end commission ≈$23 not $265 — and the
trademark failure below, this is a clear no.

### ✅ #1 The Self-Sufficient Backyard — PASSES both

Primary non-branded keyword `homesteading book` (**1,000/mo**), supported by
`best homesteading books` (390/mo) and `self sufficiency book` (320/mo). Page one:

| Pos | Result | Assessment |
|---|---|---|
| 1 | reddit.com r/homestead | forum thread |
| 2 | forksinthedirt.com | **strong** — genuine personal voice, ~25 books, updated Dec 2025 |
| 3 | homestead.org | niche site |
| 4 | store.motherearthnews.com | retail — **and it stocks The Self-Sufficient Backyard** |
| 5 | homesteadingfamily.com | **weak** — 40+ titles, minimal commentary, "functions primarily as an affiliate funnel", does not even mention this book |
| 6 | amazon.com | |
| 7 | ourgabledhome.com | small blog, page dated 2021 |
| 8 | goodreads.com | list page |

I inspected the two most relevant competitors directly. `forksinthedirt.com` is
genuinely good and would be hard to displace. `homesteadingfamily.com` is thin —
volume without depth, no firsthand analysis — and is beatable by a site that
actually reviews the books properly.

**Intent matches exactly:** people searching `homesteading book` want book
recommendations, and the monetisation *is* a book recommendation. No mismatch
anywhere. Mother Earth News already stocking the title independently confirms the
product belongs in this intent.

**This is the only one of the three where demand, intent, product and page type all
line up.**

---

## Check 4 — Preliminary trademark / name-conflict screen

> Method note: USPTO's TSDR API requires a key (HTTP 401), the Trademark Search API
> path returned 404/405, and Justia blocked automated access (403). This screen is
> therefore based on public brand usage and published brand guidelines — **it is a
> preliminary screen, not a legal clearance. Run a USPTO search before purchase.**

### ❌ Tube Magic domains — HARD FAIL

YouTube's published Branding Guidelines **prohibit registering YouTube trademarks
as second-level domain names or incorporating them into your own product names.**

That disqualifies **`youtubetoolreport.com`, `youtubeautomationtools.com`, and
`youtubeaistack.com`** — all three of my earlier Phase 4 suggestions. This was my
error in Phase 4; I recommended `youtubetoolreport.com` without screening it against
Google's brand policy. Google enforces this through UDRP. Any of these could be
taken away after you had built on it.

### ⚠️ Self-Sufficient Backyard — the brand is actively defended

The screen turned up something material: a **crowded field of near-identical
"official website" domains** already exists —

`theselfsufficientbackyard.org` · `selfsufficientbackyards.com` ·
`theselfsufficientbackyardbook.com` · `selfsufficient-backyard.com` ·
`theselfsuffcientbackyard.com` **(a typo-squat)**

and `theselfsufficientbackyardbook.com` displays both **™ and ®**, asserting
registered rights.

**Consequence: my Phase 4 recommendation of `backyardselfsufficiency.com` is not
safe.** It is a word-order rearrangement of a brand asserting ®, which is exactly
the confusing-similarity test a UDRP panel applies. It is still available, and I am
now advising against it.

**The fix is straightforward** — target the non-branded cluster instead, with a name
that borrows nothing from the brand.

---

## Domain recommendation

All re-verified available by RDAP on 2026-08-24:

| Domain | Targets | Brand conflict | History |
|---|---|---|---|
| **`thehomesteadshelf.com`** ⭐ | `homesteading book` 1,000/mo | **none** | clean, never archived |
| `homesteadbookguide.com` | same cluster | none | clean, never archived |
| `homesteadingbookreview.com` | same cluster | none | clean, never archived |
| `offgridreadinglist.com` | adjacent | none | clean, never archived |
| ~~`backyardselfsufficiency.com`~~ | — | ⚠️ **confusingly similar to ®** | avoid |
| ~~`youtubetoolreport.com`~~ | — | ❌ **violates YouTube guidelines** | avoid |
| ~~`longtermfoodstorageguide.com`~~ | — | ok, but **wrong SERP** | avoid |

**`thehomesteadshelf.com`** is the pick: brandable, no trademark exposure, never
previously used, and it fits a book-recommendation site rather than boxing you into
one product or one keyword.

---

## The one gate still open

Everything above is measured on **Google**. Your stated strategy is **Bing-only**.
I cannot validate a single Bing SERP, and I will not certify a purchase decision for
a Bing strategy on Google data.

**Please run these three searches on Bing.com (US) and paste me the top 10:**

1. `homesteading book`
2. `best homesteading books`
3. `self sufficient backyard review`

That takes about three minutes and closes the last real gap. If Bing looks like
Google here — small blogs and marketplaces, no authority publishers — then #1 is a
genuine go, and `thehomesteadshelf.com` is the name.

**What I can say now, plainly:** #2 and #3 are dead, and I'm confident in that.
#1 is the only survivor and it looks good — but "looks good on the wrong search
engine" is not the standard you asked me to hold. One check away.
