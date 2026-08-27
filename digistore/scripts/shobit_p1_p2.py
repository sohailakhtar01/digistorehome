# -*- coding: utf-8 -*-
"""
SHOBIT ENGINE - PHASE 1 (product universe) + PHASE 2 (economic pre-filter)
=========================================================================
Reads data/digistore24-normalized.csv (1,381 rows, NEVER modified) and emits:

    reports/shobit-product-universe.csv     all 1,381, with a searchable brand
    reports/shobit-economic-shortlist.csv   ~150 economically interesting offers

The critical engineering step here is BRAND EXTRACTION. Digistore24 listing
titles are marketing copy, not product names:

    "80 % Commission on US Immigration Survival PRO Bundle"
    "Unlock Earnings! Promote PinealXT!"
    "David's Shield - New High-Conv VSL (2X CVR!) | $5M+ In Sales"

A product-name search strategy is worthless without the actual product name, so
each title is reduced to the string a real buyer would type into Bing.

Ranking is deliberately NOT payout-ordered. Payout is one of six components and
is saturating, so a $3,400 listing cannot buy its way to the top on payout alone.
"""

import csv
import io
import math
import os
import re
import unicodedata

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, 'data', 'digistore24-normalized.csv')
REPORTS = os.path.join(BASE, 'reports')

TARGET_SHORTLIST = 150
VENDOR_CAP = 8

# ---------------------------------------------------------------------------
# BRAND EXTRACTION
# ---------------------------------------------------------------------------
SEP = re.compile(r'\s*(?:[–—\|�]|(?<=\s)-(?=\s)|\*|•)\s*')

LEAD_JUNK = [
    re.compile(r'^\s*(?:earn|get|make)\s+(?:up\s+to\s+)?\d+\s*%\s*commission(?:s)?'
               r'\s*(?:promoting|on|for|with)?\s*[:\-]?\s*', re.I),
    re.compile(r'^\s*\d+\s*%\s*commission(?:s)?\s*(?:promoting|on|for)?\s*[:\-]?\s*', re.I),
    re.compile(r'^\s*(?:earn|make)\s+(?:big\s+)?(?:money|cash)\s+(?:promoting|with)\s+', re.I),
    re.compile(r'^\s*(?:unlock\s+earnings!?\s*)?promote\s+', re.I),
    re.compile(r'^\s*(?:brand\s+)?new[:!]\s*', re.I),
    re.compile(r'^\s*(?:hot|top|best|the\s+official)\s*[:!]\s*', re.I),
    re.compile(r'^\s*help\s+others\s+\w+\s+their\s+', re.I),
    re.compile(r'^\s*get\s+paid\s+to\s+', re.I),
]

TRAIL_JUNK = [
    re.compile(r'\s*[\-–—]?\s*brand\s+new!?\s*$', re.I),
    re.compile(r'\s*\bnow!\s*$', re.I),
    re.compile(r'\s*\blatest\s+\d{4}(?:/\d)?!?\s*$', re.I),
    re.compile(r'\s*\(\s*(?:for|by|with)\s+[^)]{0,40}\)\s*$', re.I),
    re.compile(r'\s*\d+\s*%\s*comm(?:s|ission)?s?\s*$', re.I),
]

# Marketing words that, if a fragment is mostly these, mean it is not a brand.
NOISE_TOKENS = set("""commission commissions comms offer offers new brand hot top
best proven blockbuster vendor diamond converting conv cvr vsl upsell recurring
paid rebills each month bundle edition founder official promo promote earnings
unlock sales high low free bonus exclusive limited latest guaranteed""".split())


def strip_symbols(s):
    out = []
    for ch in s:
        cat = unicodedata.category(ch)
        # drop emoji / pictographs / private use, keep letters, digits, marks, punct
        if cat in ('So', 'Sk', 'Cs', 'Co', 'Cn'):
            continue
        out.append(ch)
    s = ''.join(out)
    return s.replace('™', '').replace('®', '').replace('�', "'")


def brandify(title):
    """Reduce a marketing title to the string a buyer would actually search."""
    s = strip_symbols(title or '')
    s = re.sub(r'\s+', ' ', s).strip()

    # Split on marketing separators, keep the most brand-like fragment.
    parts = [p.strip() for p in SEP.split(s) if p and p.strip()]
    if not parts:
        return 'UNKNOWN', 'LOW'

    def score_fragment(p):
        toks = re.findall(r"[A-Za-z0-9'&\.]+", p.lower())
        if not toks:
            return -99
        noise = sum(1 for t in toks if t in NOISE_TOKENS)
        digits = sum(1 for t in toks if re.fullmatch(r'[\d\.,%$]+', t))
        sc = 0.0
        sc -= 3.0 * noise
        sc -= 1.5 * digits
        sc -= 0.30 * max(0, len(toks) - 6)      # prefer short, name-like
        if 1 <= len(toks) <= 5:
            sc += 2.0
        # capitalisation pattern typical of a product name
        caps = sum(1 for w in re.findall(r"[A-Za-z][A-Za-z']+", p)
                   if w[:1].isupper())
        sc += 0.6 * min(caps, 4)
        return sc

    best = max(parts, key=score_fragment)

    for rx in LEAD_JUNK:
        best = rx.sub('', best)
    for rx in TRAIL_JUNK:
        best = rx.sub('', best)
    best = best.strip(' -:!*.,')
    best = re.sub(r'\s+', ' ', best).strip()

    if not best:
        return 'UNKNOWN', 'LOW'

    toks = re.findall(r"[A-Za-z0-9']+", best)
    noise = sum(1 for t in toks if t.lower() in NOISE_TOKENS)
    if len(toks) == 0:
        return 'UNKNOWN', 'LOW'
    if len(toks) > 7 or noise >= 2:
        conf = 'LOW'
    elif len(toks) > 5 or noise == 1:
        conf = 'MEDIUM'
    else:
        conf = 'HIGH'
    return best, conf


# ---------------------------------------------------------------------------
# RISK FLAGS
# ---------------------------------------------------------------------------
RISK_RX = [
    ('SUPPLEMENT', re.compile(r'\b(supplement|capsule|gummies|drops|formula|'
                              r'probiotic|vitamin|extract|tonic|serum|pills?)\b', re.I)),
    ('MEDICAL', re.compile(r'\b(cure|heal|healing|remedy|remedies|blood sugar|'
                           r'diabet|prostate|tinnitus|arthritis|nerve|reflux|'
                           r'detox|weight loss|fat burn|slim|metabolism|'
                           r'testosterone|menopause|erectile|vision|hearing|'
                           r'memory|brain|joint|liver|kidney|teeth|dental|'
                           r'parasite|fungus|toenail)\b', re.I)),
    ('FINANCIAL', re.compile(r'\b(forex|crypto|bitcoin|trading|invest|stock|'
                             r'wealth|cashflow|passive income|profit|roi|'
                             r'binary|options)\b', re.I)),
    ('MAKE_MONEY', re.compile(r'\b(make money|earn|income|\$\d|side hustle|'
                              r'work from home|get paid|affiliate marketing|'
                              r'financial freedom|rich)\b', re.I)),
    ('MIRACLE_CLAIM', re.compile(r'\b(miracle|secret|breakthrough|ancient|'
                                 r'forbidden|lost|hidden|manifest|law of '
                                 r'attraction|vibration|chakra|pineal|'
                                 r'third eye|abundance|divine|angel)\b', re.I)),
    ('SURVIVAL_FEAR', re.compile(r'\b(survival|survive|blackout|emp|collapse|'
                                 r'crisis|looter|doomsday|prepper|apocalyp|'
                                 r'grid down|megadrought|shtf)\b', re.I)),
]


def risk_flags(name, niche, ptype):
    hay = '%s %s %s' % (name, niche, ptype)
    return [tag for tag, rx in RISK_RX if rx.search(hay)]


def f(v):
    try:
        if v in (None, '', 'UNKNOWN'):
            return None
        return float(v)
    except (TypeError, ValueError):
        return None


_raw = list(csv.DictReader(io.open(SRC, encoding='utf-8', errors='replace',
                                   newline='')))
# Defensive: on 2026-08-24 a block of prompt text was accidentally pasted into
# the tail of this derived CSV. Real records always carry a numeric record_id
# and a product_name, so filter on that rather than editing the user's file.
rows = [r for r in _raw
        if (r.get('record_id') or '').strip().isdigit()
        and (r.get('product_name') or '').strip()]
_dropped = len(_raw) - len(rows)
if _dropped:
    print('NOTE: ignored %d non-record lines in the source CSV '
          '(pasted text, not product data)' % _dropped)
assert len(rows) == 1381, 'expected 1381 product rows, got %d' % len(rows)

universe = []
for r in rows:
    brand, bconf = brandify(r['product_name'])
    net = f(r['net_earnings_per_sale_usd'])
    price = f(r['price_usd'])
    conv = f(r['cart_conversion_pct'])
    canc = f(r['cancellation_rate_pct'])
    age = f(r['product_age_days'])
    cpct = f(r['commission_pct'])
    flags = risk_flags(r['product_name'], r['derived_niche'], r['product_type'])
    promotable = (r['promotion_status'] or '').strip().lower() in (
        'promote now', 'copy promo link')
    universe.append(dict(
        record_id=r['record_id'], product_name=r['product_name'],
        brand_name=brand, brand_confidence=bconf,
        product_type=r['product_type'], vendor=r['vendor'],
        price_usd=price, commission_type=r['commission_type'],
        commission_pct=cpct, commission_flat_usd=f(r['commission_flat_usd']),
        net_earnings_per_sale_usd=net, cart_conversion_pct=conv,
        cancellation_rate_pct=canc, promotion_status=r['promotion_status'],
        promotable_now='YES' if promotable else 'NO',
        product_age_days=age, online_since_iso=r['online_since_iso'],
        derived_niche=r['derived_niche'], risk_flags='|'.join(flags) or 'NONE',
        source_page=r['source_page'], parse_flags=r['parse_flags']))

# ---------------------------------------------------------------------------
# PHASE 1 OUTPUT
# ---------------------------------------------------------------------------
COLS = ['record_id', 'product_name', 'brand_name', 'brand_confidence',
        'product_type', 'vendor', 'price_usd', 'commission_type',
        'commission_pct', 'commission_flat_usd', 'net_earnings_per_sale_usd',
        'cart_conversion_pct', 'cancellation_rate_pct', 'promotion_status',
        'promotable_now', 'product_age_days', 'online_since_iso',
        'derived_niche', 'risk_flags', 'source_page', 'parse_flags']

p1 = os.path.join(REPORTS, 'shobit-product-universe.csv')
with io.open(p1, 'w', encoding='utf-8', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=COLS)
    w.writeheader()
    for u in universe:
        w.writerow({k: ('UNKNOWN' if u[k] is None else u[k]) for k in COLS})

# ---------------------------------------------------------------------------
# PHASE 2 - ECONOMIC PRE-FILTER (six components, payout saturating)
# ---------------------------------------------------------------------------
def econ_score(u):
    net = u['net_earnings_per_sale_usd']
    conv = u['cart_conversion_pct']
    canc = u['cancellation_rate_pct']
    price = u['price_usd']
    cpct = u['commission_pct']
    age = u['product_age_days']
    parts = {}

    # 1. payout, saturating - $150 is ~full marks, $3,400 is not 20x better
    parts['payout'] = 25.0 * min(1.0, math.log10(1 + max(net or 0, 0)) /
                                 math.log10(1 + 150)) if net else 0.0
    # 2. commission strength
    if cpct is not None:
        parts['commission'] = 12.0 * min(1.0, cpct / 75.0)
    elif u['commission_flat_usd'] and price:
        parts['commission'] = 12.0 * min(1.0, (u['commission_flat_usd'] / price) / 0.75)
    else:
        parts['commission'] = 6.0
    # 3. observed conversion
    if conv is None:
        parts['conversion'] = 8.0                      # neutral, not punitive
    else:
        parts['conversion'] = 20.0 * min(1.0, conv / 18.0)
    # 4. cancellation (inverted)
    if canc is None:
        parts['retention'] = 8.0
    elif canc <= 3:
        parts['retention'] = 20.0
    elif canc >= 30:
        parts['retention'] = 0.0
    else:
        parts['retention'] = 20.0 * (1 - (canc - 3) / 27.0)
    # 5. immediately promotable
    parts['promotable'] = 10.0 if u['promotable_now'] == 'YES' else 0.0
    # 6. price high enough that one sale justifies SEO effort
    if net is None:
        parts['effort_worth'] = 4.0
    elif net >= 40:
        parts['effort_worth'] = 13.0
    elif net >= 20:
        parts['effort_worth'] = 9.0
    elif net >= 10:
        parts['effort_worth'] = 4.0
    else:
        parts['effort_worth'] = 0.0
    # small stability bonus
    parts['stability'] = 0.0
    if age is not None:
        if age >= 365:
            parts['stability'] = 3.0
        elif age >= 120:
            parts['stability'] = 1.5
    return sum(parts.values()), parts


for u in universe:
    u['_score'], u['_parts'] = econ_score(u)

# Hard gates: must be promotable, must pay enough to matter, must not be a
# refund machine, and must have a usable brand string to search on.
elig = [u for u in universe
        if u['promotable_now'] == 'YES'
        and (u['net_earnings_per_sale_usd'] or 0) >= 15
        and (u['cancellation_rate_pct'] is None or u['cancellation_rate_pct'] < 30)
        and u['brand_name'] != 'UNKNOWN'
        and u['brand_confidence'] in ('HIGH', 'MEDIUM')]

elig.sort(key=lambda x: -x['_score'])

short, per_vendor = [], {}
for u in elig:
    v = u['vendor']
    if per_vendor.get(v, 0) >= VENDOR_CAP:
        continue
    per_vendor[v] = per_vendor.get(v, 0) + 1
    short.append(u)
    if len(short) >= TARGET_SHORTLIST:
        break

SCOLS = COLS + ['econ_score', 'sc_payout', 'sc_commission', 'sc_conversion',
                'sc_retention', 'sc_promotable', 'sc_effort_worth',
                'sc_stability']
p2 = os.path.join(REPORTS, 'shobit-economic-shortlist.csv')
with io.open(p2, 'w', encoding='utf-8', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=SCOLS)
    w.writeheader()
    for u in short:
        row = {k: ('UNKNOWN' if u[k] is None else u[k]) for k in COLS}
        row['econ_score'] = round(u['_score'], 2)
        for k, v in u['_parts'].items():
            row['sc_' + k] = round(v, 2)
        w.writerow(row)

print('PHASE 1: %d products -> %s' % (len(universe), p1))
print('PHASE 2: %d eligible -> %d shortlisted -> %s'
      % (len(elig), len(short), p2))
print()
bc = {}
for u in universe:
    bc[u['brand_confidence']] = bc.get(u['brand_confidence'], 0) + 1
print('brand-extraction confidence across all 1,381: %s' % bc)
print()
print('--- brand extraction spot-check ---')
for u in universe:
    if u['record_id'] in ('1', '2', '3', '4', '5', '6', '9', '13', '15', '26'):
        print('  %-58s -> %-34s [%s]' % (u['product_name'][:58],
                                         u['brand_name'][:34],
                                         u['brand_confidence']))
print()
print('--- top 20 by economic score ---')
print('%-38s %-20s %7s %7s %6s %6s' % ('brand', 'vendor', 'net', 'conv', 'canc', 'score'))
for u in short[:20]:
    print('%-38s %-20s %7s %7s %6s %6.1f' % (
        u['brand_name'][:38], u['vendor'][:20],
        u['net_earnings_per_sale_usd'], u['cart_conversion_pct'],
        u['cancellation_rate_pct'], u['_score']))
print()
rf = {}
for u in short:
    for t in u['risk_flags'].split('|'):
        rf[t] = rf.get(t, 0) + 1
print('risk flags across the 150: %s' % sorted(rf.items(), key=lambda x: -x[1]))
