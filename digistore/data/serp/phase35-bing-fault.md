# Bing SERP capture fault — Phase 3.5

**Date observed:** 2026-08-24
**Status:** UNRESOLVED — Bing SERP data is unavailable in this environment.

## Symptom

Every Bing SERP request returns results for the **first token of the query only**.
The remainder of the query is discarded before it reaches the index.

## Reproduction log

| # | Path | Query sent | SERP actually returned | Verdict |
|---|---|---|---|---|
| 1 | DataForSEO `/v3/serp/bing/organic/live/regular` | `self sufficient backyard review` | self.inc, SELF Magazine, Wikipedia "Self", Britannica "Self" | results for **self** |
| 2 | DataForSEO `/v3/serp/bing/organic/live/advanced` | `self sufficient backyard review` | identical to #1 | results for **self** |
| 3 | DataForSEO `/v3/serp/bing/organic/live/regular` | `"self sufficient backyard" review` (quoted) | identical to #1 | results for **self** |
| 4 | DataForSEO `/v3/serp/bing/organic/live/regular` | `the self sufficient backyard book` | identical to #1 | results for **self** (leading `the` dropped) |
| 5 | DataForSEO `/v3/serp/bing/organic/live/regular` | `ron melchiore self sufficient backyard` | Ron Weasley (Wikipedia), Ronin crypto price, RON military portal | results for **ron** |
| 6 | DataForSEO `/v3/serp/bing/organic/live/regular` | `medicinal garden kit review` | Merriam-Webster, Cambridge Dictionary, Dictionary.com | results for **medicinal** |
| 7 | DataForSEO `/v3/serp/bing/organic/live/regular` | `caviargan` (single token) | Microsoft support / Hotmail / Windows 11 pages | **unrelated even for a single token** |
| 8 | DataForSEO `/v3/serp/bing/organic/live/regular` | `davids shield` | YouTube Creator Awards, YouTube TV Help | unrelated |
| 9 | Direct fetch `bing.com/search?q=self+sufficient+backyard+review` | as sent | results for **self** | results for **self** |
| 10 | Direct fetch `bing.com/search?q=self%20sufficient%20backyard%20review` | as sent | results for **self** | `%20` encoding does not help |
| 11 | Direct fetch `bing.com/search?q=%22the+self-sufficient+backyard%22+book+review` | as sent | Wikipedia "the", British Council grammar, Cambridge "the" | results for **the** |

Test 7 is the important one: a **single-token** query also failed, so this is not
purely whitespace truncation — the Bing pathway is unreliable in more than one way.

## Controls — the failure is Bing-specific

| Path | Query | Result |
|---|---|---|
| DataForSEO `/v3/serp/google/organic/live/regular` | `self sufficient backyard review` | Correct: Reddit, Amazon, Mother Earth News, Goodreads |
| DataForSEO `/v3/serp/google/organic/live/regular` | `josephs well megadrought` | Correct: the product, its press releases and its official site |
| DataForSEO `/v3/serp/google/organic/live/regular` | `advanced memory formula review` | Correct: Amazon, Harvard Health, Cleveland Clinic |
| Native web search | `"The Self-Sufficient Backyard" book review Melchiore` | Correct: LinkedIn, Medium, Ask a Prepper, Goodreads |
| DataForSEO Google Ads volume endpoint | 150 keywords | Correct, fully matched |

The same DataForSEO credentials return correct multi-word Google SERPs, so this is
not an auth, quota, or encoding problem on our side.

## Also unavailable

Bing Webmaster Tools keyword APIs (`get_keyword_data`, `get_keyword_stats`,
`get_related_keywords`) return HTTP 400 "Object reference not set to an instance of
an object" — the Keyword Research API is not enabled on this account. Recorded in
Phase 3 and re-confirmed unchanged.

**Net effect: there is no Bing-native demand data and no Bing-native SERP data
anywhere in this project.**

## How this is handled in the analysis

1. No Bing response is treated as evidence of weak competition. A truncated SERP
   omits every real competitor, so it reads as an empty page — the most attractive
   and most false possible reading.
2. The 25-point "SERP weakness" axis is scored from the **Google proxy** and is
   labelled as such in every output column and table.
3. All 30 products carry the `-5` *invalid SERP data* penalty.
4. **The seven Bing SERPs recorded as "validated" in Phase 3 are withdrawn.** They
   were captured on this same date through the same faulty pathway. Where the first
   token was itself the distinctive brand word, a truncated SERP would have looked
   plausible and passed the brand-token check — so those captures cannot be
   distinguished from genuine ones after the fact.

## What would resolve this

- A second SERP provider (Serper, SerpApi, ScrapingBee, Oxylabs, Bright Data).
- Bing Web Search API via Azure Cognitive Services.
- Enabling the Bing Webmaster Keyword Research API on the connected account.
- A manual spot-check: run three of the branded queries in a browser on Bing and
  paste the top 10 back. Three queries would be enough to sanity-check whether the
  Google proxy is directionally right for this niche set.
