#!/usr/bin/env python3
"""Generate reports/phase2-economic-analysis.md from the Phase 2 scoring run."""
import csv
import collections
import importlib.util
import datetime

spec = importlib.util.spec_from_file_location('p2', 'scripts/phase2_economic_filter.py')
p2 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(p2)

recs, picked, beg, queue, sig_count = p2.main()
ALL = list(csv.DictReader(open('data/digistore24-normalized.csv', encoding='utf-8')))
RUN = datetime.date(2026, 8, 24)
n = len(recs)
K = lambda r, f: r.get(f) not in ('', 'UNKNOWN', None)

L = []
w = L.append
esc = lambda s: str(s).replace('|', '\\|')

w('# Phase 2 — Economic Opportunity Filtering')
w('')
w('| | |')
w('|---|---|')
w('| Input | `data/digistore24-normalized.csv` (Phase 1 output, 1381 records) |')
w('| Scorer | `scripts/phase2_economic_filter.py` |')
w('| Run date | %s |' % RUN.isoformat())
w('| Products scored | **%d** |' % n)
w('| Shortlisted | **%d** |' % len(picked))
w('| Beginner-friendly subset | **%d** |' % len(beg))
w('| Phase 3 Bing research queue | **%d** |' % len(queue))
w('')
w('> **No Bing data, search volume, domain, or ranking information was used or consulted in')
w('> this phase.** Every number below derives from the Digistore24 marketplace export alone.')
w('> Nothing here is a claim that any product will generate sales.')
w('')

# ---------------------------------------------------------------- 1 executive summary
rich = [r for r in picked if r['_lvl'] == 'EVIDENCE_RICH']
allrich = [r for r in recs if r['_lvl'] == 'EVIDENCE_RICH']
hi = [r for r in picked if r['_risk'] == 'HIGH']
supp = [r for r in picked if r['derived_niche'] == 'health-supplement']
w('## 1. Executive summary')
w('')
w('**%d products were scored; %d were shortlisted as economically attractive candidates.**'
  % (n, len(picked)))
w('')
w('What actually characterises the strongest candidates:')
w('')
w('1. **Published performance data is the single dominant discriminator.** Only %d of %d'
  % (len(allrich), n))
w('   products (%.1f%%) publish both cart conversion and cancellation, yet **%d of the %d**'
  % (100.0 * len(allrich) / n, len(rich), len(picked)))
w('   shortlisted candidates come from that group. Digistore24 only reveals these figures once')
w('   a listing has real sales history, so their presence is itself evidence of monetisation —')
w('   the closest thing to proof this dataset contains.')
w('2. **High commission percentage is nearly worthless as a signal.** The two largest vendors')
w('   in the marketplace — Fitlifesolutions (241 listings) and GhulamBooks (126) — advertise')
w('   80%% commission, and **239 of Fitlifesolutions\' 241 listings are byte-identical on price,')
w('   commission and payout ($37.00 / 80%% / $29.60), with zero affiliate-support pages and one')
w('   listing carrying performance data between them.** These are auto-generated catalogue')
w('   filler. A naive commission-weighted ranking would have returned almost nothing else.')
w('3. **Payout alone does not rank.** The median net earnings is $25.97 but the top-scoring')
w('   candidate pays $76.36 — it wins on an 16%% cart conversion and 5.41%% cancellation, not on')
w('   the size of the cheque.')
w('4. **The proven-conversion pool is heavily concentrated in supplements.** %d of the %d'
  % (len(supp), len(picked)))
w('   shortlisted candidates are health supplements, and %d of %d carry a HIGH preliminary risk'
  % (len(hi), len(picked)))
w('   flag. This is a genuine property of the marketplace, not an artefact of scoring — and it')
w('   is the main tension in the whole dataset (see §8).')
w('')
w('Principal limitation: **90%% of the catalogue has no published performance data at all**, so')
w('for most products the economic read rests on price and commission alone. Those products were')
w('not eliminated — they are marked `EVIDENCE_LIMITED` and can still earn their place in a later')
w('phase if the search opportunity turns out to be exceptional.')
w('')

# ---------------------------------------------------------------- 2 inventory
w('## 2. Dataset inventory (observed, before any scoring)')
w('')
c = collections.Counter(r['promotion_status'] for r in ALL)
w('| Measure | Count | % of catalogue |')
w('|---|---|---|')


def line(lbl, v):
    w('| %s | %d | %.1f%% |' % (lbl, v, 100.0 * v / n))


w('| Total records | %d | 100%% |' % n)
w('| Distinct vendors | %d | — |' % len({r['vendor'] for r in ALL if K(r, 'vendor')}))
line('With net earnings/sale', sum(K(r, 'net_earnings_per_sale_usd') for r in ALL))
line('With commission data (any type)', sum(r['commission_type'] in ('percent', 'flat') for r in ALL))
line('&nbsp;&nbsp;— percentage commission', sum(r['commission_type'] == 'percent' for r in ALL))
line('&nbsp;&nbsp;— flat-fee commission', sum(r['commission_type'] == 'flat' for r in ALL))
line('With cart conversion', sum(K(r, 'cart_conversion_pct') for r in ALL))
line('With cancellation rate', sum(K(r, 'cancellation_rate_pct') for r in ALL))
line('With **both** conversion + cancellation', sum(K(r, 'cart_conversion_pct') and K(r, 'cancellation_rate_pct') for r in ALL))
line('With promotion status', sum(K(r, 'promotion_status') for r in ALL))
line('**Requiring vendor approval** (`Request promotion`)', c['Request promotion'])
line('**Immediately promotable** (`Promote now` + `Copy promo link`)', c['Promote now'] + c['Copy promo link'])
w('| Earnings per cart visitor | **0** | **absent from source — excluded from scoring** |')
w('')
w('### Observed distributions used to calibrate the score')
w('')
w('Thresholds were set from this dataset\'s own percentiles rather than from outside assumptions:')
w('')
w('| Metric | p10 | p25 | p50 | p75 | p90 |')
w('|---|---|---|---|---|---|')


def pct(vals, p):
    vals = sorted(vals)
    return vals[min(len(vals) - 1, int(len(vals) * p))]


nets = [r['_net'] for r in recs if r['_net'] is not None]
conv = [r['_conv'] for r in recs if r['_conv'] is not None]
canc = [r['_canc'] for r in recs if r['_canc'] is not None]
rat = [r['_ratio'] for r in recs if r['_ratio'] is not None]
w('| Net earnings/sale | $%.2f | $%.2f | $%.2f | $%.2f | $%.2f |'
  % tuple(pct(nets, p) for p in (.10, .25, .50, .75, .90)))
w('| Cart conversion %% (n=%d) | %.0f%% | %.0f%% | %.0f%% | %.0f%% | %.0f%% |'
  % ((len(conv),) + tuple(pct(conv, p) for p in (.10, .25, .50, .75, .90))))
w('| Cancellation %% (n=%d) | %.2f%% | %.2f%% | %.2f%% | %.2f%% | %.2f%% |'
  % ((len(canc),) + tuple(pct(canc, p) for p in (.10, .25, .50, .75, .90))))
w('| Net ÷ front-end price | %.2fx | %.2fx | %.2fx | %.2fx | %.2fx |'
  % tuple(pct(rat, p) for p in (.10, .25, .50, .75, .90)))
w('')
w('The last row matters: **the median product returns only 0.60x its front-end price as net')
w('earnings**, so a ratio above 1.0 is genuinely unusual and above 2.5 is extreme. Only %d'
  % sum(1 for x in rat if x > 1.5))
w('products in the entire catalogue exceed 1.5x.')
w('')

# ---------------------------------------------------------------- 3 methodology
w('## 3. Score methodology (100 points)')
w('')
w('Every component is computed from observed fields only. Observed values and derived scores are')
w('kept in separate columns of the output CSV so the two can never be confused.')
w('')
w('| Component | Points | What it measures | Why it exists |')
w('|---|---|---|---|')
w('| **A. Monetisation** | 30 | Payout (20, log-saturating) + price-band fit (10) | Payout is scored on a *saturating* curve, not linearly. A $1,000 payout is not automatically better than a $60 one — beyond roughly $150/sale, payout stops being the binding constraint and market difficulty takes over, which is a Phase 5 question. The price-band term rewards the $37–$150 range that cold search traffic actually converts, and penalises both sub-$10 offers (not worth a site) and $600+ high-ticket (poor cold conversion). |')
w('| **B. Conversion evidence** | 25 | Cart conversion (15) + cancellation (10) | Rewards demonstrated funnel performance. Unmeasured products receive a **neutral 11/25**, not zero — missing data is not evidence of failure. |')
w('| **C. Promotion accessibility** | 15 | `Copy promo link` 15 · `Promote now` 14 · `Request promotion` 7 | Vendor approval is a real execution risk for a new affiliate, not a footnote. Penalised, never disqualifying. |')
w('| **D. Maturity / stability** | 10 | Age band, peaking at 1–3 years | Neither "older is better" nor "newer is worse". Under 90 days is unproven; over 6 years risks a stale offer. |')
w('| **E. Economic confidence** | 10 | Field coverage + internal consistency | How much of the economic picture is actually observed. A consistency point is awarded when net earnings reconcile plausibly (0.30–1.60x) against price × commission. |')
w('| **F. Investigation value** | 10 | Combination bonuses | Flags products whose *combination* of traits earns a closer look in Phase 3/4 — strong payout with low cancellation, high conversion, an identifiable niche, vendor affiliate support. **Capped at 2 for auto-generated catalogue listings.** |')
w('')
w('### Guards built into the model')
w('')
w('**Identical-listing detection.** Listings sharing vendor + price + commission + payout are')
w('counted; a cluster of 5 or more marks the listing as auto-generated catalogue filler. This')
w('caps its investigation score and limits it to %d entries in the shortlist. Without this guard'
  % p2.TEMPLATE_CAP)
w('the 80%-commission template farms would have dominated the ranking.')
w('')
w('**Diversification.** Maximum %d candidates per vendor. Applied *after* raw scoring, so it'
  % p2.VENDOR_CAP)
w('never promotes a weak product — it only prevents one vendor monopolising the list.')
w('')
w('**Funnel-economics flag.** `net_to_price_ratio` classifies each product:')
w('')
w('| Flag | Rule | Meaning |')
w('|---|---|---|')
w('| `NORMAL` | ≤ 1.0x | Payout consistent with a front-end sale |')
w('| `STRONG` | 1.0–1.5x | Some upsell contribution |')
w('| `VERY_STRONG` | 1.5–2.5x | Payout materially depends on the back end |')
w('| `EXTREME_NEEDS_REVIEW` | > 2.5x, or a recurring price | Headline payout is a funnel-wide average, **not** what one front-end sale pays |')
w('')
w('A high ratio is treated as **a reason to investigate, never as evidence of a superior offer.**')
w('The catalogue\'s worst offender advertises "$23.40 front-end → $561.55 net" (24x) and its own')
w('title reads *"Earn up to $480 per sale"* — a deep upsell funnel, where the advertised figure')
w('is an average across buyers who took back-end offers, not a per-sale commission.')
w('')
w('### Preliminary risk screen')
w('')
w('Classified from marketplace-visible wording only (name, type, derived niche). **No sales page')
w('was opened — that is Phase 3.** Nothing is rejected on this basis; it only informs the')
w('beginner-friendly subset and the research queue.')
w('')
w('| Flag | Trigger |')
w('|---|---|')
w('| `HIGH` | Implied treatment of a medical condition, ingestible supplements, miracle/cure language, sexual-health claims, financial-trading promises, income/get-rich promises, pseudoscientific mechanisms, aggressive weight-loss claims, gambling |')
w('| `MEDIUM` | General supplement/diet category, make-money positioning, spiritual/manifestation, mental-health subject matter, fear-based survival marketing, or unclassified |')
w('| `LOW` | Practical or informational positioning — courses, tools, hobbies, pets, gardening, home DIY |')
w('')

# ---------------------------------------------------------------- 4 top 25
w('## 4. Top 25 economically attractive candidates')
w('')
w('> These are **economically attractive candidates**, not winners. No search-demand or')
w('> competition evidence exists yet; several may not survive Phase 3 product review or Phase 5')
w('> SERP analysis.')
w('')
for i, r in enumerate(picked[:25], 1):
    w('### %d. %s' % (i, esc(r['product_name'])))
    w('')
    w('| | | | |')
    w('|---|---|---|---|')
    w('| **Vendor** | %s | **Price** | $%s |' % (esc(r['vendor']), r['price_usd']))
    comm = ('%s%%' % r['commission_pct']) if r['commission_pct'] != 'UNKNOWN' else ('$%s flat' % r['commission_flat_usd'])
    w('| **Commission** | %s | **Net earnings/sale** | **$%s** |' % (comm, r['net_earnings_per_sale_usd']))
    w('| **Cart conversion** | %s | **Cancellation** | %s |'
      % (('%s%%' % r['cart_conversion_pct']) if r['_conv'] is not None else '_not published_',
         ('%s%%' % r['cancellation_rate_pct']) if r['_canc'] is not None else '_not published_'))
    w('| **Promotion** | %s | **Age** | %s days |' % (r['promotion_status'], r['product_age_days']))
    w('| **Phase 2 score** | **%.2f / 100** | **Evidence** | %s |' % (r['_total'], r['_lvl']))
    w('| **Preliminary risk** | %s | **Funnel** | %s |' % (r['_risk'], r['_ff']))
    w('')
    w('- **Why attractive:** %s' % esc(r['_why']))
    w('- **Main concern:** %s' % esc(r['_con']))
    w('')

# ---------------------------------------------------------------- 5 vendor
w('## 5. Vendor concentration')
w('')
vs = collections.Counter(r['vendor'] for r in picked)
va = collections.Counter(r['vendor'] for r in recs)
w('The vendor cap of %d is binding for one vendor only, so concentration is not distorting the' % p2.VENDOR_CAP)
w('shortlist:')
w('')
w('| Vendor | In shortlist | Total listings in catalogue | Note |')
w('|---|---|---|---|')
for v, k in vs.most_common(10):
    note = 'at vendor cap' if k >= p2.VENDOR_CAP else ''
    w('| %s | %d | %d | %s |' % (esc(v), k, va[v], note))
w('')
w('Contrast with the catalogue as a whole, where concentration is extreme:')
w('')
w('| Vendor | Listings | Identical-listing block | With performance data | In shortlist |')
w('|---|---|---|---|---|')
for v, k in va.most_common(6):
    sub = [r for r in recs if r['vendor'] == v]
    big = max(collections.Counter(
        (x['price_usd'], x['commission_pct'], x['net_earnings_per_sale_usd']) for x in sub).values())
    st = sum(1 for x in sub if x['_conv'] is not None)
    w('| %s | %d | %d identical | %d | **%d** |' % (esc(v), k, big, st, vs.get(v, 0)))
w('')
w('**Fitlifesolutions and GhulamBooks together account for %d listings — %.1f%% of the entire'
  % (va['Fitlifesolutions'] + va['GhulamBooks'],
     100.0 * (va['Fitlifesolutions'] + va['GhulamBooks']) / n))
w('catalogue — and contribute %d candidates to the shortlist.**'
  % (vs.get('Fitlifesolutions', 0) + vs.get('GhulamBooks', 0)))
w('')

# ---------------------------------------------------------------- 6 niche
w('## 6. Niche distribution')
w('')
ns = collections.Counter(r['derived_niche'] for r in picked)
na = collections.Counter(r['derived_niche'] for r in recs)
nr = collections.Counter(r['derived_niche'] for r in allrich)
w('| Niche | In shortlist | In catalogue | With performance data (catalogue) |')
w('|---|---|---|---|')
for k, v in ns.most_common():
    w('| %s | %d | %d | %d |' % (k, v, na[k], nr.get(k, 0)))
w('')
w('The health-supplement share of the shortlist (%d/%d) tracks where measured performance data'
  % (len(supp), len(picked)))
w('actually exists — %d of the %d products with published stats in the whole catalogue are'
  % (nr.get('health-supplement', 0), len(allrich)))
w('supplements. Several niches (fitness, pets, beauty, dating, gardening) have **almost no**')
w('proven sellers at all, so any candidate from them is necessarily evidence-limited.')
w('')

# ---------------------------------------------------------------- 7 risk
w('## 7. Risk distribution')
w('')
rs = collections.Counter(r['_risk'] for r in picked)
ra = collections.Counter(r['_risk'] for r in recs)
w('| Preliminary risk | Shortlist | %% of shortlist | Whole catalogue |')
w('|---|---|---|---|')
for k in ('LOW', 'MEDIUM', 'HIGH'):
    w('| %s | %d | %.0f%% | %d |' % (k, rs.get(k, 0), 100.0 * rs.get(k, 0) / len(picked), ra.get(k, 0)))
w('| UNKNOWN / unscreened | 0 | 0%% | 0 |')
w('')
w('Every product received a screen, so there is no UNKNOWN bucket. **%d of %d shortlisted'
  % (rs.get('HIGH', 0), len(picked)))
w('candidates carry a HIGH flag** — overwhelmingly because they are ingestible supplements or')
w('imply treatment of a medical condition. That is the central tension of this dataset: *the')
w('products with the best proven economics are also the hardest to promote truthfully.* The')
w('beginner-friendly subset in §9 exists specifically to resolve it.')
w('')

# ---------------------------------------------------------------- 8 limitations
w('## 8. Data limitations')
w('')
w('Stated explicitly rather than silently filled:')
w('')
w('| Limitation | Effect on Phase 2 |')
w('|---|---|')
w('| **%.0f%% of products (%d/%d) publish no performance statistics** | Their conversion score is a '
  'neutral 11/25 assumption, not a measurement. Their ranking rests on price, commission, age and '
  'accessibility alone. |'
  % (100.0 * (n - len(allrich)) / n, n - len(allrich), n))
w('| **Earnings per cart visitor is entirely absent** | The brief listed it as a scoring input. It '
  'does not exist in this export and was **excluded**, not estimated. |')
w('| **Product descriptions are absent** | The risk screen relies on product name, type and derived '
  'niche only. A product with innocuous wording could still carry aggressive claims on its sales '
  'page — Phase 3 must verify. |')
w('| **Sales-page URLs are absent** | Links were copied as text without `href`. Phase 3 must resolve '
  'each product to its live page by search. |')
w('| **Marketplace category was not captured** | `derived_niche` is a parser-assigned keyword label, '
  'not a source field. Used only for spreading candidates across niches; never cited as evidence. |')
w('| **Net earnings is a funnel figure** | It reflects upsells, order bumps and refunds. It is not a '
  'guaranteed per-sale commission — see the `funnel_economics_flag` column. |')
w('| **Cancellation is a lagging figure** | A young product may simply not have accumulated refunds '
  'yet, which can flatter its cancellation rate. |')
w('')

# ---------------------------------------------------------------- 9 beginner
w('## 9. Beginner-friendly subset (%d products)' % len(beg))
w('')
w('Selected from the %d candidates by filtering out HIGH preliminary risk, approval-gated' % len(picked))
w('promotion, auto-generated listings, payouts under $15, and funnel-dependent payouts; then')
w('re-ranked with a bonus for low risk and measured performance. Output:')
w('`reports/beginner-friendly-shortlist.csv`.')
w('')
w('| # | Product | Vendor | Net/sale | Conv | Cancel | Risk | Niche |')
w('|---|---|---|---|---|---|---|---|')
for i, r in enumerate(beg, 1):
    w('| %d | %s | %s | $%s | %s%% | %s%% | %s | %s |'
      % (i, esc(r['product_name'][:46]), esc(r['vendor'][:16]), r['net_earnings_per_sale_usd'],
         r['cart_conversion_pct'], r['cancellation_rate_pct'], r['_risk'], r['derived_niche']))
w('')
bl = collections.Counter(r['_risk'] for r in beg)
w('All %d are `EVIDENCE_RICH` (measured conversion **and** cancellation), %d are LOW preliminary'
  % (len(beg), bl.get('LOW', 0)))
w('risk and %d MEDIUM — **none are HIGH**. Every one is immediately promotable with no approval gate.'
  % bl.get('MEDIUM', 0))
w('')

# ---------------------------------------------------------------- 10 queue
w('## 10. Phase 3 Bing research queue (%d products)' % len(queue))
w('')
w('Prioritised on Phase 2 score, lower preliminary risk, promotion accessibility and measured')
w('performance, then spread across vendors (max 2) and niches (max 7). Near-duplicate listings')
w('from one vendor are collapsed to a single entry. Output:')
w('`reports/phase3-bing-research-queue.csv`.')
w('')
w('| # | Product | Score | Net/sale | Risk | Confidence | Research angle |')
w('|---|---|---|---|---|---|---|')
ANG = {'health-supplement': 'branded review + legit/scam + ingredients',
       'weight-loss': 'branded review + comparison + results',
       'survival-preparedness': 'branded review + problem-led how-to',
       'education-courses': 'course review + "worth it" + vs competitors',
       'make-money-online': 'branded review + legit/scam + earnings',
       'forex-crypto-trading': 'branded review + strategy comparison',
       'ai-software': 'tool review + alternatives + pricing',
       'pets': 'problem-led training + method comparison',
       'gardening': 'problem-led how-to + kit review',
       'home-diy': 'project how-to + plan review',
       'mental-wellbeing': 'problem-led + programme review',
       'spirituality-manifest': 'branded review + "does it work"',
       'beauty-skincare': 'branded review + ingredients',
       'fitness': 'programme review + vs free alternatives',
       'other': 'branded review + problem-led + alternatives'}
for i, r in enumerate(queue, 1):
    cf = ('HIGH' if (r['_lvl'] == 'EVIDENCE_RICH' and r['_conf'] >= 9 and r['_ff'] == 'NORMAL'
                     and (r['_age'] or 0) >= 365)
          else 'MEDIUM' if (r['_lvl'] == 'EVIDENCE_RICH' and r['_conf'] >= 8) else 'LOW')
    w('| %d | %s | %.1f | $%s | %s | %s | %s |'
      % (i, esc(r['product_name'][:44]), r['_total'], r['net_earnings_per_sale_usd'],
         r['_risk'], cf, ANG.get(r['derived_niche'], ANG['other'])))
w('')
qr = collections.Counter(r['_risk'] for r in queue)
w('Risk mix: **%d LOW, %d MEDIUM, %d HIGH** across %d niches. The four HIGH-risk entries are'
  % (qr.get('LOW', 0), qr.get('MEDIUM', 0), qr.get('HIGH', 0),
     len({r['derived_niche'] for r in queue})))
w('retained deliberately: their measured economics are strong enough that they deserve a SERP')
w('read, but they carry a standing condition that Phase 3 must clear them on claim substantiation')
w('before any content is planned.')
w('')

# ---------------------------------------------------------------- 11 next
w('## 11. What Phase 3 must resolve')
w('')
w('1. **Open the sales pages.** No descriptions or URLs exist in this export, so every claim')
w('   assessment so far is based on a product title. This is the largest remaining unknown.')
w('2. **Verify the supplement-heavy candidates.** %d shortlisted products are HIGH preliminary'
  % rs.get('HIGH', 0))
w('   risk; a truthful affiliate page for several of them may simply not be writable.')
w('3. **Investigate the funnel-flagged payouts.** Any product not marked `NORMAL` needs its')
w('   advertised net earnings understood before it is used in a revenue projection.')
w('4. **Do not treat this ranking as final.** It measures economics only. A high Phase 2 score')
w('   with an impossible SERP is worth nothing, and a mid-scoring product with a weak SERP may')
w('   well outrank it after Phase 5.')
w('')

open('reports/phase2-economic-analysis.md', 'w', encoding='utf-8').write('\n'.join(L) + '\n')
print('wrote reports/phase2-economic-analysis.md  (%d lines)' % len(L))
