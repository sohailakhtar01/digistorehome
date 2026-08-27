#!/usr/bin/env python3
"""Parse the Digistore24 affiliate-marketplace scrape into a normalised CSV.

FIELD MAPPING was confirmed against the reference screenshot (image.png):
  tag icon    -> price          money icon -> commission
  person icon -> vendor         cart icon  -> cart conversion %
  circle-x    -> cancellation % calendar   -> online since

EXTRACTION IS POSITIONAL, not pattern-based. Every record is anchored by the
`name` / `name | type` line pair, after which the card always emits:

    body[0] = price        body[1] = commission     body[2] = vendor
    then 0-2 starred percentages, then the "online since" date

Verified on all 1381 records with zero exceptions. An earlier pattern-based
draft mis-assigned ~80 records whose price line is free text (e.g.
"$47 per month", "Around $87.00", "$ 77,21") -- it silently pulled the net
earnings value into `price` and the price text into `vendor`. Position is
reliable where regex is not.

TWO SOURCE QUIRKS the parser normalises:
  * commission may be a FLAT DOLLAR amount ("$30.00") rather than a percentage
  * some prices use European decimal commas ("$ 77,21" = 77.21) while others
    use commas as thousands separators ("$1,234.56" = 1234.56)

SINGLE-PERCENTAGE AMBIGUITY: where only one starred percentage is present the
lost SVG label makes position uninformative. Resolved by quantisation, a rule
measured on the 132 unambiguous two-percentage records:
    cart conversion -> whole number 132/132 (100.0%)
    cancellation    -> whole number   1/132 (  0.8%)
Affected rows are flagged PCT_INFERRED so the assumption stays auditable.
"""
import csv
import re
import datetime

SRC = 'data/digistore24.txt'
OUT = 'data/digistore24-normalized.csv'
TODAY = datetime.date(2026, 8, 24)   # session date; product age is relative to this


def norm(s):
    return re.sub(r'\s+', ' ', s).strip()


PCT = re.compile(r'^(\d+(?:\.\d+)?)%\*$')      # starred -> conversion / cancellation
COMM = re.compile(r'^(\d+(?:\.\d+)?)%$')       # unstarred -> commission
DATE = re.compile(r'^(\d{1,2})/(\d{1,2})/(\d{2})$')
MONEYNUM = re.compile(r'\$\s*([\d.,]+)')
PROMO = {'Promote now', 'Request promotion', 'Copy promo link'}
CHROME_MARK = 'Entries per page'

RECURRING = re.compile(r'per month|/month|monthly|per year|/year|per week|subscription|recurring', re.I)
APPROX = re.compile(r'around|average|approx|starting|from\s+\$', re.I)

NICHE = [
    ('weight-loss', r'weight loss|slimming|keto|fat burn|belly|diet|mounja|glp|semaglut|lean|slim'),
    ('health-supplement', r'supplement|prostate|blood sugar|nerve|joint|tinnitus|hearing|vision|teeth|dental|gum|liver|kidney|gut|digest|immune|testoster|menopause|pelvic|hormone|detox|collagen|parasite'),
    ('fitness', r'fitness|workout|muscle|abs|yoga|pilates|martial art|calisthen|training'),
    ('survival-preparedness', r'survival|prepper|blackout|off.?grid|emp|water freedom|generator|bunker|drought|food shortage|self.?suffic|homestead'),
    ('gardening', r'garden|greenhouse|compost|seed|plant|backyard'),
    ('make-money-online', r'affiliate|passive income|make money|online business|dropship|ecommerce|side hustle|freelanc|print on demand|amazon fba|digital product'),
    ('forex-crypto-trading', r'forex|crypto|bitcoin|trading|trader|stock|invest|wealth|options'),
    ('ai-software', r'\bai\b|artificial intelligen|chatgpt|automation|software|saas|prompt'),
    ('spirituality-manifest', r'manifest|law of attraction|spiritual|angel|numerolog|astrolog|tarot|chakra|abundance|meditat|prayer|biblical|christian'),
    ('dating-relationships', r'dating|relationship|ex back|marriage|attract (women|men)|romance|seduc|divorce'),
    ('pets', r'\bdog\b|\bcat\b|puppy|pet\b|canine|feline|horse|chicken|aquarium'),
    ('home-diy', r'woodwork|shed|diy|solar|battery|car repair|tiny house|furniture|craft|sewing|quilt'),
    ('beauty-skincare', r'skin|hair|beauty|anti.?aging|wrinkle|nail|acne|makeup'),
    ('education-courses', r'course|learn|language|study|exam|school|tutor|degree|certificat'),
    ('mental-wellbeing', r'anxiety|depress|stress|sleep|insomnia|mental|confidence|self.?esteem|habit|productiv|memory|brain'),
]


def niche_of(text):
    t = text.lower()
    for name, pat in NICHE:
        if re.search(pat, t):
            return name
    return 'other'


def parse_money(s):
    """Extract a USD amount from free text, handling both comma conventions."""
    m = MONEYNUM.search(s)
    if not m:
        return None
    t = m.group(1).strip('.,')
    if not t:
        return None
    if re.search(r',\d{2}$', t) and '.' not in t:
        t = t.replace('.', '').replace(',', '.')     # European decimal comma
    else:
        t = t.replace(',', '')                       # thousands separator
    try:
        return float(t)
    except ValueError:
        return None


def main():
    lines = open(SRC, encoding='utf-8').read().split('\n')
    anchors = [i for i in range(len(lines) - 1)
               if lines[i].strip() and norm(lines[i + 1]).startswith(norm(lines[i]) + ' | ')]

    page_at, page = {}, 1
    for i, l in enumerate(lines):
        if CHROME_MARK in l:
            page += 1
        page_at[i] = page

    rows = []
    for k, i in enumerate(anchors):
        end = anchors[k + 1] if k + 1 < len(anchors) else len(lines)
        seg = [norm(l) for l in lines[i:end] if l.strip()]
        flags = []

        name = seg[0]
        ptype = seg[1][len(name) + 3:] if seg[1].startswith(name + ' | ') else 'UNKNOWN'
        if ptype == 'UNKNOWN':
            flags.append('TYPE_UNPARSED')
        body = seg[2:]

        # ---- positional: price, commission, vendor -------------------------
        price_raw = body[0] if len(body) > 0 else 'UNKNOWN'
        comm_raw = body[1] if len(body) > 1 else 'UNKNOWN'
        vendor = body[2] if len(body) > 2 else 'UNKNOWN'

        pv = parse_money(price_raw)
        price = '%.2f' % pv if pv is not None else 'UNKNOWN'
        if pv is None:
            flags.append('NO_PRICE')
        if RECURRING.search(price_raw):
            price_note = 'recurring'
            flags.append('PRICE_RECURRING')
        elif APPROX.search(price_raw):
            price_note = 'approximate'
            flags.append('PRICE_APPROX')
        else:
            price_note = 'exact'

        cm = COMM.match(comm_raw)
        if cm:
            comm_type, comm_pct, comm_flat = 'percent', cm.group(1), 'UNKNOWN'
        elif '$' in comm_raw:
            fv = parse_money(comm_raw)
            comm_type, comm_pct = 'flat', 'UNKNOWN'
            comm_flat = '%.2f' % fv if fv is not None else 'UNKNOWN'
            flags.append('COMMISSION_FLAT')
        else:
            comm_type, comm_pct, comm_flat = 'UNKNOWN', 'UNKNOWN', 'UNKNOWN'
            flags.append('NO_COMMISSION')

        # ---- date ----------------------------------------------------------
        di = next((j for j, l in enumerate(body) if DATE.match(l)), None)
        raw_date = age = iso = 'UNKNOWN'
        if di is not None:
            raw_date = body[di]
            mo, dy, yr = map(int, DATE.match(raw_date).groups())
            try:
                d = datetime.date(2000 + yr, mo, dy)
                iso, age = d.isoformat(), (TODAY - d).days
            except ValueError:
                flags.append('BAD_DATE')
        else:
            flags.append('NO_DATE')

        # ---- starred percentages, between vendor and date ------------------
        cart = canc = 'UNKNOWN'
        pcts = []
        for l in body[3:di] if di is not None else []:
            m = PCT.match(l)
            if m:
                pcts.append(float(m.group(1)))
        if len(pcts) >= 2:
            cart, canc = '%.2f' % pcts[0], '%.2f' % pcts[1]
            if len(pcts) > 2:
                flags.append('EXTRA_PCT')
        elif len(pcts) == 1:
            v = pcts[0]
            if abs(v - round(v)) < 1e-9:
                cart = '%.2f' % v
            else:
                canc = '%.2f' % v
            flags.append('PCT_INFERRED')

        # ---- net earnings: anchored to its own label, not to position ------
        net = 'UNKNOWN'
        for j, l in enumerate(body):
            if l == 'Net earnings/sale*':
                for jj in range(j - 1, -1, -1):
                    v = parse_money(body[jj]) if body[jj].startswith('$') else None
                    if v is not None:
                        net = '%.2f' % v
                        break
                break
        if net == 'UNKNOWN':
            flags.append('NO_NET_EARNINGS')

        promo = next((l for l in reversed(body) if l in PROMO), 'UNKNOWN')
        if promo == 'UNKNOWN':
            flags.append('NO_PROMO_STATUS')

        rows.append({
            'record_id': k + 1,
            'product_name': name,
            'product_type': ptype,
            'price_usd': price,
            'price_raw': price_raw,
            'price_note': price_note,
            'commission_type': comm_type,
            'commission_pct': comm_pct,
            'commission_flat_usd': comm_flat,
            'commission_raw': comm_raw,
            'net_earnings_per_sale_usd': net,
            'earnings_per_cart_visitor': 'UNKNOWN',   # not rendered on the marketplace card
            'cart_conversion_pct': cart,
            'cancellation_rate_pct': canc,
            'vendor': vendor,
            'online_since_raw': raw_date,
            'online_since_iso': iso,
            'product_age_days': age,
            'payment_method': 'UNKNOWN',              # not rendered on the marketplace card
            'promotion_status': promo,
            'has_sales_page_link': 'YES' if 'Sales page' in body else 'NO',
            'has_affiliate_support_link': 'YES' if 'Affiliate support page' in body else 'NO',
            'sales_page_url': 'UNKNOWN',              # copied as link text, href not preserved
            'affiliate_support_url': 'UNKNOWN',
            'digistore24_product_url': 'UNKNOWN',
            'description': 'UNKNOWN',                 # not rendered on the marketplace card
            'category': 'UNKNOWN',                    # source category filter not captured
            'derived_niche': niche_of(name + ' ' + ptype),
            'source_page': page_at.get(i, 'UNKNOWN'),
            'parse_flags': ';'.join(flags) if flags else '',
        })

    with open(OUT, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    print('wrote %s: %d records' % (OUT, len(rows)))


if __name__ == '__main__':
    main()
