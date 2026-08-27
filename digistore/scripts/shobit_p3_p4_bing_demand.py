# -*- coding: utf-8 -*-
"""
SHOBIT ENGINE - PHASE 3 (market awareness) + PHASE 4 (branded search discovery)
==============================================================================
BING-NATIVE. No Google volume is used anywhere in this file.

METHOD
------
Bing's OpenSearch autosuggest endpoint:

    https://api.bing.com/osjson.aspx?query=<brand>

returns ["<query>", ["suggestion", ...]] drawn from Bing's own query logs.
A suggestion only appears if real Bing users actually type it. That makes this a
legitimate, Bing-native signal for two questions at once:

    (a) MARKET AWARENESS  - does Bing know this product name at all?
    (b) COMMERCIAL INTENT - does Bing volunteer "reviews", "buy", "price",
                            "official", "scam", "discount" after the brand?

WHAT THIS IS NOT
----------------
Autosuggest is NOT search volume. It gives presence and intent SHAPE, not
magnitude. Bing's Keyword Research API (the only Bing-native volume source) is
not enabled on this account - it returns HTTP 400 "Object reference not set to
an instance of an object". Where a brand returns no branded suggestion we record
BING_DEMAND_INSUFFICIENT, never "zero".

This was verified working on 2026-08-24 with multi-word queries surviving intact
(unlike Bing's SERP endpoints, which are corrupted in this environment - see
data/serp/phase35-bing-fault.md).
"""

import csv
import io
import json
import os
import re
import subprocess
import sys
import urllib.parse

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORTS = os.path.join(BASE, 'reports')
CAPTURE_DATE = '2026-08-24'
SRC = os.path.join(REPORTS, 'shobit-economic-shortlist.csv')

ENDPOINT = 'https://api.bing.com/osjson.aspx?query=%s&mkt=en-US'

# Modifiers that indicate a buyer, not a browser.
COMMERCIAL = ['review', 'reviews', 'buy', 'price', 'cost', 'official',
              'scam', 'legit', 'worth it', 'discount', 'coupon', 'amazon',
              'where to buy', 'order', 'complaints', 'side effects',
              'ingredients', 'does it work', 'pdf', 'free']
# Of those, the ones that specifically signal purchase evaluation.
HIGH_INTENT = ['review', 'reviews', 'buy', 'price', 'cost', 'official',
               'scam', 'legit', 'worth it', 'discount', 'where to buy',
               'order', 'complaints']


def norm(s):
    s = (s or '').lower()
    s = s.replace('’', "'").replace('‘', "'")
    s = re.sub(r"[^a-z0-9' ]+", ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def suggest(query):
    """Return (list_of_suggestions, error_or_None)."""
    url = ENDPOINT % urllib.parse.quote(query)
    p = subprocess.run(['curl', '-s', '--max-time', '20', url],
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    body = p.stdout.decode('utf-8', 'replace').strip()
    if not body:
        return [], 'empty response'
    if body.startswith('<'):
        return [], 'non-JSON response'
    try:
        data = json.loads(body)
    except Exception as exc:                                   # noqa: BLE001
        return [], 'unparseable: %s' % exc
    if not isinstance(data, list) or len(data) < 2:
        return [], 'unexpected shape'
    sug = data[1] if isinstance(data[1], list) else []
    return [s for s in sug if isinstance(s, str)], None


def classify(brand, sugs):
    nb = norm(brand)
    # Require the full brand phrase to appear, so generic names don't inflate.
    branded = [s for s in sugs if nb and nb in norm(s)]
    mods = set()
    for s in branded:
        tail = norm(s).replace(nb, ' ')
        for m in COMMERCIAL:
            if re.search(r'\b%s\b' % re.escape(m), tail):
                mods.add(m)
    hi = [m for m in mods if m in HIGH_INTENT]

    if not branded:
        tier = 'BING_DEMAND_INSUFFICIENT'
    elif len(branded) >= 4 and len(hi) >= 2:
        tier = 'BING_STRONG'
    elif len(branded) >= 2 and len(hi) >= 1:
        tier = 'BING_MODERATE'
    elif branded:
        tier = 'BING_WEAK'
    else:
        tier = 'BING_DEMAND_INSUFFICIENT'
    return branded, sorted(mods), sorted(hi), tier


def tier_points(tier, n_branded, n_hi):
    """0-20 for the 'branded search evidence' axis of the Shobit score."""
    if tier == 'BING_STRONG':
        return min(20, 12 + n_hi * 2 + min(n_branded, 6) // 2)
    if tier == 'BING_MODERATE':
        return min(13, 8 + n_hi + n_branded // 3)
    if tier == 'BING_WEAK':
        return 4
    return 0


rows = list(csv.DictReader(io.open(SRC, encoding='utf-8', newline='')))
print('screening %d shortlisted products against Bing autosuggest...\n'
      % len(rows), file=sys.stderr)

out = []
for i, r in enumerate(rows, 1):
    brand = r['brand_name']
    sugs, err = suggest(brand)
    if err:
        branded, mods, hi, tier = [], [], [], 'LOOKUP_FAILED'
    else:
        branded, mods, hi, tier = classify(brand, sugs)
    pts = tier_points(tier, len(branded), len(hi))
    out.append(dict(
        record_id=r['record_id'], brand_name=brand,
        product_name=r['product_name'], vendor=r['vendor'],
        derived_niche=r['derived_niche'], risk_flags=r['risk_flags'],
        net_earnings_per_sale_usd=r['net_earnings_per_sale_usd'],
        cart_conversion_pct=r['cart_conversion_pct'],
        cancellation_rate_pct=r['cancellation_rate_pct'],
        econ_score=r['econ_score'],
        signal='Bing autosuggest (api.bing.com/osjson.aspx)',
        source='Bing (native)', date=CAPTURE_DATE,
        suggestions_total=len(sugs),
        branded_suggestions=len(branded),
        commercial_modifiers='|'.join(mods) or 'NONE',
        high_intent_modifiers='|'.join(hi) or 'NONE',
        bing_demand_tier=tier,
        branded_search_points=pts,
        evidence=' ; '.join(branded[:8]) if branded else (
            err or 'no branded suggestion returned'),
        confidence=('HIGH' if tier in ('BING_STRONG', 'BING_MODERATE')
                    else 'MEDIUM' if tier == 'BING_WEAK'
                    else 'HIGH' if tier == 'BING_DEMAND_INSUFFICIENT'
                    else 'LOW')))
    if i % 25 == 0:
        print('  ...%d/%d' % (i, len(rows)), file=sys.stderr)

COLS = ['record_id', 'brand_name', 'product_name', 'vendor', 'derived_niche',
        'risk_flags', 'net_earnings_per_sale_usd', 'cart_conversion_pct',
        'cancellation_rate_pct', 'econ_score', 'signal', 'source', 'date',
        'suggestions_total', 'branded_suggestions', 'commercial_modifiers',
        'high_intent_modifiers', 'bing_demand_tier', 'branded_search_points',
        'evidence', 'confidence']

path = os.path.join(REPORTS, 'market-awareness-evidence.csv')
with io.open(path, 'w', encoding='utf-8', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=COLS)
    w.writeheader()
    for o in sorted(out, key=lambda x: (-x['branded_search_points'],
                                        -float(x['econ_score']))):
        w.writerow(o)

tiers = {}
for o in out:
    tiers[o['bing_demand_tier']] = tiers.get(o['bing_demand_tier'], 0) + 1
print('\nwrote %s' % path)
print('tiers: %s' % sorted(tiers.items(), key=lambda x: -x[1]))
print()
survivors = [o for o in out if o['bing_demand_tier'] in
             ('BING_STRONG', 'BING_MODERATE')]
survivors.sort(key=lambda x: (-x['branded_search_points'],
                              -float(x['econ_score'])))
print('=== %d products with Bing-native branded demand evidence ===' % len(survivors))
print('%-34s %-16s %6s %5s %-16s %s' % ('brand', 'vendor', 'net', 'pts',
                                        'tier', 'high-intent modifiers'))
for o in survivors:
    print('%-34s %-16s %6s %5d %-16s %s' % (
        o['brand_name'][:34], o['vendor'][:16],
        o['net_earnings_per_sale_usd'], o['branded_search_points'],
        o['bing_demand_tier'].replace('BING_', ''),
        o['high_intent_modifiers'][:44]))
