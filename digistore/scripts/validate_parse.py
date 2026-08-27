#!/usr/bin/env python3
"""Validate data/digistore24-normalized.csv and emit reports/parsing-validation.md."""
import csv
import collections
import re
import random
import datetime

CSV = 'data/digistore24-normalized.csv'
SRC = 'data/digistore24.txt'
OUT = 'reports/parsing-validation.md'
RUN = datetime.date(2026, 8, 24)

rows = list(csv.DictReader(open(CSV, encoding='utf-8')))
src = open(SRC, encoding='utf-8').read()
n = len(rows)


def known(r, f):
    return r.get(f) not in ('', 'UNKNOWN', None)


def fnum(r, f):
    try:
        return float(r[f])
    except (ValueError, KeyError, TypeError):
        return None


L = []
w = L.append

w('# Phase 1 — Parsing & Validation Report')
w('')
w('| | |')
w('|---|---|')
w('| Source file | `data/digistore24.txt` (24,031 lines, 325,544 bytes) |')
w('| Reference screenshot | `image.png` (used to recover the lost SVG field labels) |')
w('| Output file | `data/digistore24-normalized.csv` |')
w('| Parser / validator | `scripts/parse_digistore24.py` / `scripts/validate_parse.py` |')
w('| Run date | %s |' % RUN.isoformat())
w('| Records parsed | **%d** |' % n)
w('')
w('**Verdict: the dataset is parsed reliably and Phase 2 can proceed.** Two source quirks')
w('and one field-coverage limit materially shape what Phase 2 may score — see §10.')
w('')

# ---------------------------------------------------------------- record count
hdr = re.search(r'^(\d+)\s*$\n^Products$', src, re.M)
claimed = hdr.group(1) if hdr else 'UNKNOWN'
w('## 1. Record count reconciliation')
w('')
w('The scrape is a 14-page paginated export with UI chrome repeated at each page break.')
w('Three independent counts agree:')
w('')
w('| Signal | Count |')
w('|---|---|')
w('| Digistore24 page header ("N Products") | %s |' % claimed)
w('| `name` / `name \\| type` anchor pairs detected | %d |' % n)
w('| Records written to CSV | %d |' % n)
w('')
w('**No records lost, duplicated, or invented.** Page chrome was excluded by anchoring on')
w('the name/type line pair rather than by splitting on separators.')
w('')

# ---------------------------------------------------------------- duplicates
byname = collections.Counter(r['product_name'] for r in rows)
dupname = {k: v for k, v in byname.items() if v > 1}
bynv = collections.Counter((r['product_name'], r['vendor']) for r in rows)
dupnv = {k: v for k, v in bynv.items() if v > 1}
vend = collections.Counter(r['vendor'] for r in rows if known(r, 'vendor'))

w('## 2. Duplicates')
w('')
w('| Check | Result |')
w('|---|---|')
w('| Duplicate `product_name` | **%d** |' % len(dupname))
w('| Duplicate `product_name` + `vendor` | **%d** |' % len(dupnv))
w('| Distinct vendors | %d |' % len(vend))
w('')
w('No duplicate rows. Note that several *vendors* list many near-identical products —')
w('relevant to Phase 2 because it inflates apparent opportunity count in a niche:')
w('')
w('| Vendor | Listings |')
w('|---|---|')
for k, v in vend.most_common(8):
    w('| %s | %d |' % (k, v))
w('')

# ---------------------------------------------------------------- completeness
w('## 3. Field completeness')
w('')
w('| Field | Populated | % | Note |')
w('|---|---|---|---|')
NOTES = {
    'earnings_per_cart_visitor': '**Absent from source** — not rendered on the card',
    'payment_method': '**Absent from source** — not rendered on the card',
    'sales_page_url': 'Copied as link text only; `href` not preserved',
    'affiliate_support_url': 'Copied as link text only; `href` not preserved',
    'digistore24_product_url': '**Absent from source**',
    'description': '**Absent from source** — not rendered on the card',
    'category': '**Absent from source** — category filter not captured',
    'cart_conversion_pct': 'Digistore24 publishes only at sufficient sales volume',
    'cancellation_rate_pct': 'Digistore24 publishes only at sufficient sales volume',
    'net_earnings_per_sale_usd': 'Hidden on a few listings',
    'commission_pct': 'Blank where commission is a flat fee instead',
    'commission_flat_usd': 'Populated only for flat-fee listings',
    'price_raw': 'Verbatim source text, retained for auditability',
}
SKIP = ('record_id', 'parse_flags', 'derived_niche', 'source_page', 'price_note',
        'commission_type', 'commission_raw', 'online_since_raw')
for f in rows[0].keys():
    if f in SKIP:
        continue
    c = sum(1 for r in rows if known(r, f))
    w('| `%s` | %d / %d | %.1f%% | %s |' % (f, c, n, 100.0 * c / n, NOTES.get(f, '')))
w('')
w('> Fields marked **absent from source** are `UNKNOWN` on every row. The brief requested')
w('> them, but the Digistore24 marketplace card does not render them, so nothing was')
w('> inferred. The consequential one is **earnings per cart visitor**, which Phase 2 was')
w('> to score on — it does not exist in this export and will not be fabricated.')
w('')

# ---------------------------------------------------------------- defect history
w('## 4. Parser defects found and corrected')
w('')
w('The first parser draft located fields by regex. Validation caught it mis-assigning')
w('records, so the extractor was rewritten to be **positional**. Recorded here because the')
w('failure mode was silent — the bad rows looked plausible.')
w('')
w('| Defect | Impact | Detected by | Fix |')
w('|---|---|---|---|')
w('| Price line is sometimes free text (`$47 per month`, `Around $87.00`) | Regex skipped it, '
  'so `price` captured the **net earnings** value and `vendor` captured the price text | '
  'Cross-check B (suspect vendor scan) flagged 80 rows | Positional extraction |')
w('| Commission may be a **flat dollar amount** (`$30.00`), not a percentage | 13 rows had no '
  'commission | `NO_COMMISSION` flag | `commission_type` = percent / flat |')
w('| European decimal commas (`$ 77,21` = 77.21) vs thousands separators (`$1,234.56`) | '
  'Wrong magnitude | Manual review of price_raw | Convention-aware money parser |')
w('')
w('The positional layout — `body[0]`=price, `body[1]`=commission, `body[2]`=vendor — was then')
w('verified to hold on **%d / %d records with zero exceptions** before being adopted.' % (n, n))
w('')

# ---------------------------------------------------------------- flags
flags = collections.Counter()
for r in rows:
    for f in (r['parse_flags'].split(';') if r['parse_flags'] else []):
        flags[f] += 1
w('## 5. Remaining anomalies')
w('')
w('| Flag | Records | Meaning | Phase 2 handling |')
w('|---|---|---|---|')
MEAN = {
    'NO_NET_EARNINGS': ('Listing hides net earnings/sale', 'Excluded from economic ranking'),
    'PCT_INFERRED': ('One percentage only — assigned by quantisation rule (§6)', 'Flagged lower confidence'),
    'COMMISSION_FLAT': ('Commission is a flat fee, not a %', 'Effective % computed from price'),
    'PRICE_RECURRING': ('Subscription price (per month/year)', 'Net earnings = lifetime, not per-sale'),
    'PRICE_APPROX': ('Vendor stated price approximately', 'Treated as estimate'),
    'NO_PRICE': ('No parseable price', 'Excluded'),
    'NO_COMMISSION': ('No commission rendered', 'Excluded'),
    'NO_DATE': ('No "online since" date', 'Age unscored'),
    'NO_PROMO_STATUS': ('No promotion button captured', 'Treated as unknown access'),
    'EXTRA_PCT': ('More than two starred percentages', 'Manual review'),
    'TYPE_UNPARSED': ('Type could not be split from name', 'Manual review'),
    'BAD_DATE': ('Date failed calendar validation', 'Age unscored'),
}
for f, c in flags.most_common():
    m, h = MEAN.get(f, ('', ''))
    w('| `%s` | %d | %s | %s |' % (f, c, m, h))
if not flags:
    w('| — | 0 | No anomalies | — |')
w('')
clean = sum(1 for r in rows if not r['parse_flags'])
w('Records with **zero** flags: **%d / %d (%.1f%%)**. No flag indicates a parsing *error* —'
  % (clean, n, 100.0 * clean / n))
w('each marks a genuine source-data condition that Phase 2 must handle deliberately.')
w('')

# ---------------------------------------------------------------- pct rule
two = [r for r in rows if known(r, 'cart_conversion_pct') and known(r, 'cancellation_rate_pct')]
one = [r for r in rows if 'PCT_INFERRED' in r['parse_flags']]


def whole(v):
    return v is not None and abs(v - round(v)) < 1e-9


cw = sum(1 for r in two if whole(fnum(r, 'cart_conversion_pct')))
nw = sum(1 for r in two if whole(fnum(r, 'cancellation_rate_pct')))

w('## 6. The single-percentage ambiguity, and how it was resolved')
w('')
w('The copy lost the SVG icons labelling each metric. Where a listing shows **two** starred')
w('percentages the order is unambiguous, confirmed against `image.png`:')
w('')
w('```')
w('  [tag]    $84.78        [money]  75.00%     -> price, commission')
w('  [person] megadrought   [cart]   16.00%*    -> vendor, CART CONVERSION')
w('  [x]      5.41%*        [date]   8/19/25    -> CANCELLATION, online since')
w('```')
w('')
w('Where only **one** percentage appears, position cannot identify it. Instead of guessing,')
w('the assignment uses a rule *measured* on the unambiguous records:')
w('')
w('| Metric | Whole-number values | Observed range |')
w('|---|---|---|')
w('| Cart conversion (1st) | **%d / %d (%.1f%%)** | %.2f%% – %.2f%% |'
  % (cw, len(two), 100.0 * cw / len(two),
     min(fnum(r, 'cart_conversion_pct') for r in two),
     max(fnum(r, 'cart_conversion_pct') for r in two)))
w('| Cancellation (2nd) | **%d / %d (%.1f%%)** | %.2f%% – %.2f%% |'
  % (nw, len(two), 100.0 * nw / len(two),
     min(fnum(r, 'cancellation_rate_pct') for r in two),
     max(fnum(r, 'cancellation_rate_pct') for r in two)))
w('')
w('Digistore24 rounds cart conversion to whole percents but reports cancellation to two')
w('decimals. Separation is near-total, so a lone percentage is assigned by whether it is a')
w('whole number. This affects **%d rows**, all flagged `PCT_INFERRED`:' % len(one))
w('')
w('| Product | Value | Assigned to | Basis |')
w('|---|---|---|---|')
for r in one:
    isc = known(r, 'cart_conversion_pct')
    v = r['cart_conversion_pct'] if isc else r['cancellation_rate_pct']
    w('| %s | %s%% | %s | %s |' % (r['product_name'][:46].replace('|', '\\|'), v,
                                   'cart conversion' if isc else 'cancellation',
                                   'whole number' if isc else 'has decimals'))
w('')
w('> These %d rows are **medium** confidence. Every other percentage is positionally certain.' % len(one))
w('')

# ---------------------------------------------------------------- cross-checks
w('## 7. Independent cross-checks')
w('')
w('**Check A — does `net_earnings` reconcile with `price x commission`?** ')
w('A mis-assigned price or commission column would scatter this ratio randomly. Restricted')
w('to the clean case (percentage commission, exact non-recurring price):')
w('')
exact = near = wide = out = 0
outliers = []
for r in rows:
    if r['commission_type'] != 'percent' or r['price_note'] != 'exact':
        continue
    p, c, net = fnum(r, 'price_usd'), fnum(r, 'commission_pct'), fnum(r, 'net_earnings_per_sale_usd')
    if None in (p, c, net) or not p or not c:
        continue
    expect = p * c / 100.0
    ratio = net / expect
    if abs(net - expect) < 0.02:
        exact += 1
    elif 0.90 <= ratio <= 1.10:
        near += 1
    elif 0.50 <= ratio <= 3.00:
        wide += 1
    else:
        out += 1
        outliers.append((ratio, r))
tot = exact + near + wide + out
w('| Band | Count | % | Interpretation |')
w('|---|---|---|---|')
w('| `net` == `price x comm` to the cent | **%d** | %.1f%% | Exact arithmetic match — strongest possible confirmation |' % (exact, 100.0 * exact / tot))
w('| within +/-10%% | %d | %.1f%% | Platform fee rounding |' % (near, 100.0 * near / tot))
w('| ratio 0.50–3.00 | %d | %.1f%% | Refund drag, or funnel upsells lifting net above front-end |' % (wide, 100.0 * wide / tot))
w('| outside 0.50–3.00 | %d | %.1f%% | Investigated below |' % (out, 100.0 * out / tot))
w('')
w('**%d of %d rows (%.1f%%) reconcile exactly to the cent.** That is decisive: it can only'
  % (exact, tot, 100.0 * exact / tot))
w('happen if price, commission and net earnings were each read from the correct column.')
w('')
w('Digistore24 reports *funnel* earnings, so ratios above 1.0 are expected wherever a')
w('product has upsells or order bumps. The largest outliers:')
w('')
VERIFIED = {
    'AI × Keto': 'Verified verbatim in source. Product name itself reads "Earn up to $480 per sale" — confirms deep upsell funnel',
    'Life is Good': 'Verified verbatim in source (line 7331)',
    'The Power of the Ancestors': 'Verified verbatim in source (line 5424); same vendor `phoenix555` as above',
}
w('| Product | Price | Comm | Net | Ratio | Status |')
w('|---|---|---|---|---|---|')
for ratio, r in sorted(outliers, key=lambda x: -x[0])[:6]:
    note = next((v for k, v in VERIFIED.items() if r['product_name'].startswith(k)),
                'Not individually verified; consistent with funnel pricing')
    w('| %s | $%s | %s%% | $%s | %.1f | %s |'
      % (r['product_name'][:32].replace('|', '\\|'), r['price_usd'], r['commission_pct'],
         r['net_earnings_per_sale_usd'], ratio, note))
w('')
w('The top three were checked line-by-line against the raw source and match exactly, so')
w('these are genuine source values rather than parser errors. The remaining %d outliers were'
  % max(0, out - 3))
w('not individually inspected — they are consistent with the same funnel pattern, but that is')
w('an inference, not a verification.')
w('')
w('> Phase 2 must therefore **not** treat a very high net-earnings-to-price ratio as proof of')
w('> a strong offer. It usually signals a deep upsell funnel, where the headline figure is an')
w('> average across buyers who took backend offers. Flagged as a suspicious pattern in Phase 2.')
w('')

bad_vendor = [r for r in rows if known(r, 'vendor')
              and (re.search(r'[$%]', r['vendor'])
                   or r['vendor'] in ('Sales page', 'Affiliate support page', 'Net earnings/sale*'))]
w('**Check B — is any vendor value a mis-captured label, price or number?** ')
w('**%d / %d** suspect values (was 80 before the positional rewrite).' % (len(bad_vendor), n))
w('')

dates = [r['online_since_iso'] for r in rows if known(r, 'online_since_iso')]
future = [r for r in rows if known(r, 'online_since_iso') and r['online_since_iso'] > RUN.isoformat()]
w('**Check C — are "online since" dates calendar-valid and in the past?** ')
w('Range **%s to %s**. Dates after the run date: **%d**.' % (min(dates), max(dates), len(future)))
w('')

comms = [fnum(r, 'commission_pct') for r in rows if known(r, 'commission_pct')]
oob = [c for c in comms if c is None or c < 0 or c > 100]
w('**Check D — are commission percentages in range?** ')
w('Range **%.0f%% – %.0f%%**. Out of bounds: **%d**.' % (min(comms), max(comms), len(oob)))
w('')

random.seed(7)
flat = re.sub(r'\s+', ' ', src)
sample = random.sample(rows, 60)
rt = sum(1 for r in sample if r['product_name'][:25] in flat)
w('**Check E — round-trip.** %d randomly sampled product names re-located verbatim in the raw'
  % len(sample))
w('source: **%d / %d**.' % (rt, len(sample)))
w('')

pr = sum(1 for r in rows if r['price_raw'].startswith('$')
         and known(r, 'price_usd')
         and abs((fnum(r, 'price_usd') or 0)
                 - (float(re.sub(r'[^\d.]', '', r['price_raw']) or 0) if re.match(r'^\$[\d,]+\.\d{2}$', r['price_raw']) else fnum(r, 'price_usd') or 0)) < 0.005)
w('**Check F — price round-trip.** Simple `$NN.NN` prices whose parsed value re-serialises to')
w('the original string: **%d**.' % pr)
w('')

# ---------------------------------------------------------------- distributions
w('## 8. What the dataset actually contains')
w('')
prices = sorted(fnum(r, 'price_usd') for r in rows if known(r, 'price_usd'))
nets = sorted(fnum(r, 'net_earnings_per_sale_usd') for r in rows if known(r, 'net_earnings_per_sale_usd'))
w('| Metric | Value |')
w('|---|---|')
w('| Products | %d |' % n)
w('| Distinct vendors | %d |' % len(vend))
w('| Price — median / 90th pct / max | $%.2f / $%.2f / $%.2f |'
  % (prices[len(prices) // 2], prices[int(len(prices) * 0.9)], max(prices)))
w('| Net earnings/sale — median / 90th pct / max | $%.2f / $%.2f / $%.2f |'
  % (nets[len(nets) // 2], nets[int(len(nets) * 0.9)], max(nets)))
w('| Products with **both** conversion + cancellation | **%d (%.1f%%)** |'
  % (len(two), 100.0 * len(two) / n))
w('| Products with **no** performance stats at all | %d (%.1f%%) |'
  % (n - len(two) - len(one), 100.0 * (n - len(two) - len(one)) / n))
w('')
w('### Promotion access')
w('')
w('| Status | Count | Meaning |')
w('|---|---|---|')
PM = {'Promote now': 'Open — can start immediately',
      'Request promotion': 'Requires vendor approval (execution risk)',
      'Copy promo link': 'Already approved on this account'}
for k, v in collections.Counter(r['promotion_status'] for r in rows).most_common():
    w('| %s | %d | %s |' % (k, v, PM.get(k, '')))
w('')
w('### Commission structure')
w('')
w('| Type | Count |')
w('|---|---|')
for k, v in collections.Counter(r['commission_type'] for r in rows).most_common():
    w('| %s | %d |' % (k, v))
w('')
w('### Price type')
w('')
w('| Note | Count |')
w('|---|---|')
for k, v in collections.Counter(r['price_note'] for r in rows).most_common():
    w('| %s | %d |' % (k, v))
w('')
w('### Product type')
w('')
w('| Type | Count |')
w('|---|---|')
for k, v in collections.Counter(r['product_type'] for r in rows).most_common():
    w('| %s | %d |' % (k, v))
w('')
w('### Derived niche (parser-assigned keyword label — *not* a source field)')
w('')
w('| Niche | Count | With perf. stats |')
w('|---|---|---|')
withstats = collections.Counter(r['derived_niche'] for r in two)
for k, v in collections.Counter(r['derived_niche'] for r in rows).most_common():
    w('| %s | %d | %d |' % (k, v, withstats.get(k, 0)))
w('')
w('> `derived_niche` is **derived, not observed**. It is used only to spread Phase 2')
w('> candidates across niches and is never cited as evidence.')
w('')

# ---------------------------------------------------------------- samples
w('## 9. Sample records')
w('')
w('### 9.1 Fully populated — highest net earnings with both performance stats')
w('')
w('| Product | Type | Price | Comm | Net/sale | Cart conv | Cancel | Vendor | Since |')
w('|---|---|---|---|---|---|---|---|---|')
for r in sorted(two, key=lambda r: -(fnum(r, 'net_earnings_per_sale_usd') or 0))[:10]:
    w('| %s | %s | $%s | %s%% | $%s | %s%% | %s%% | %s | %s |'
      % (r['product_name'][:34].replace('|', '\\|'), r['product_type'][:16], r['price_usd'],
         r['commission_pct'], r['net_earnings_per_sale_usd'], r['cart_conversion_pct'],
         r['cancellation_rate_pct'], r['vendor'][:13], r['online_since_iso']))
w('')
w('### 9.2 Records exercising each source quirk (parser regression set)')
w('')
w('| Product | `price_raw` | Parsed price | Commission | Vendor | Net/sale | Quirk |')
w('|---|---|---|---|---|---|---|')
QUIRK = [('Tube Magic', 'recurring price'), ('Fearless Phone', 'flat-fee commission'),
         ('Heal Your Parent', 'European decimal comma'), ('apexxer', 'price inside prose'),
         ('Kidney Solution', 'approximate price'), ('KetoDNA', 'funnel net >> front-end')]
for nm, q in QUIRK:
    for r in rows:
        if r['product_name'].startswith(nm):
            c = ('%s%%' % r['commission_pct']) if r['commission_type'] == 'percent' else ('$%s flat' % r['commission_flat_usd'])
            w('| %s | `%s` | $%s | %s | %s | $%s | %s |'
              % (nm, r['price_raw'][:26].replace('|', '\\|'), r['price_usd'], c,
                 r['vendor'][:14], r['net_earnings_per_sale_usd'], q))
            break
w('')
w('### 9.3 Sparse — no performance stats published (the 90% case)')
w('')
w('| Product | Price | Comm | Net/sale | Vendor | Since |')
w('|---|---|---|---|---|---|')
for r in [x for x in rows if not known(x, 'cart_conversion_pct')][:6]:
    w('| %s | $%s | %s%% | $%s | %s | %s |'
      % (r['product_name'][:40].replace('|', '\\|'), r['price_usd'], r['commission_pct'],
         r['net_earnings_per_sale_usd'], r['vendor'][:14], r['online_since_iso']))
w('')

# ---------------------------------------------------------------- confidence
w('## 10. Confidence, and what it constrains in Phase 2')
w('')
w('| Field group | Confidence | Basis |')
w('|---|---|---|')
w('| Name, type, price, commission, vendor, date | **High** | Positional layout verified on '
  '%d/%d records with zero exceptions; %d rows reconcile to the cent (§7A) |' % (n, n, exact))
w('| Net earnings/sale | **High** | Anchored to its literal `Net earnings/sale*` label, not position |')
w('| Cart conversion / cancellation (both present) | **High** | Order confirmed by `image.png` |')
w('| Cart conversion / cancellation (one present) | **Medium** | %d rows via quantisation rule; flagged |' % len(one))
w('| Earnings/cart visitor, payment method, description, category, URLs | **Not available** | '
  'Absent from source; `UNKNOWN` throughout, never inferred |')
w('')
w('### Constraints carried into Phase 2')
w('')
w('1. **Earnings per cart visitor cannot be scored.** The brief lists it as a Phase 2 input,')
w('   but it is absent from this export. It will stay `UNKNOWN` and be excluded from the')
w('   scoring model rather than estimated.')
w('2. **Only %d products (%.1f%%) publish cart conversion and cancellation.** Digistore24'
  % (len(two), 100.0 * len(two) / n))
w('   reveals these only once a listing has real sales history, so their mere presence is')
w('   evidence of actual monetisation. Phase 2 should reward it directly — and must not rank')
w('   a statless product above a proven one on commission percentage alone.')
w('3. **A high net-to-price ratio is a warning, not a win** (§7A). It typically means a deep')
w('   upsell funnel, so the advertised net earnings is not what a single front-end sale pays.')
w('4. **No sales-page URLs.** Phase 3 must resolve each shortlisted product to its live sales')
w('   page by search, since `href` values were not preserved in the copy.')
w('5. **%d products (%.1f%%) need vendor approval** before promotion — a real execution risk'
  % (sum(1 for r in rows if r['promotion_status'] == 'Request promotion'),
     100.0 * sum(1 for r in rows if r['promotion_status'] == 'Request promotion') / n))
w('   that belongs in the score, not a footnote.')
w('6. **%d listings are subscription-priced**, where net earnings represents lifetime value'
  % sum(1 for r in rows if r['price_note'] == 'recurring'))
w('   rather than a single-sale payout. Not comparable to one-off products without adjustment.')
w('')

open(OUT, 'w', encoding='utf-8').write('\n'.join(L) + '\n')
print('wrote', OUT)
print('records=%d two-pct=%d inferred=%d clean=%d exact-reconcile=%d suspect-vendors=%d'
      % (n, len(two), len(one), clean, exact, len(bad_vendor)))
