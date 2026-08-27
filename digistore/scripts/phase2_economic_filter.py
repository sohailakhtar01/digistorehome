#!/usr/bin/env python3
"""PHASE 2 - Economic opportunity filtering.

Reduces the 1381 normalised Digistore24 records to ~100 economically attractive
candidates worth deeper product / Bing research.

NO Bing data, NO search volume, NO domain checks are used or implied here.
`earnings_per_cart_visitor` is deliberately NOT used - Phase 1 confirmed it is
absent from the source export.

All scoring thresholds are calibrated against the observed distribution of this
dataset (percentiles printed by the calibration step), not against outside
assumptions. Observed source fields and derived scores are kept in separate
columns so the two are never confused.
"""
import csv
import math
import re
import collections
import datetime

SRC = 'data/digistore24-normalized.csv'
OUT_SHORT = 'reports/economic-shortlist.csv'
OUT_BEGIN = 'reports/beginner-friendly-shortlist.csv'
OUT_QUEUE = 'reports/phase3-bing-research-queue.csv'
OUT_MD = 'reports/phase2-economic-analysis.md'
RUN = datetime.date(2026, 8, 24)

TARGET_SHORTLIST = 100
VENDOR_CAP = 10          # max candidates from any one vendor
TEMPLATE_CAP = 2         # max candidates from one identical-listing cluster

# ---------------------------------------------------------------- observed distribution
# (measured on this dataset; see reports/phase2-economic-analysis.md section 2)
CONV_P90, CONV_P75, CONV_P50, CONV_P25 = 16.0, 11.0, 7.0, 4.0
CANC_P10, CANC_P25, CANC_P50, CANC_P75, CANC_P90 = 3.55, 6.66, 9.97, 15.11, 22.93


def known(r, f):
    return r.get(f) not in ('', 'UNKNOWN', None)


def num(r, f):
    try:
        return float(r[f])
    except (TypeError, ValueError, KeyError):
        return None


# ---------------------------------------------------------------- risk pre-screen
HIGH_RISK = [
    (r'lotter|lotto|slot machine|casino|jackpot', 'gambling / lottery claims'),
    (r'male enhance|erectile|libido|aphrodisiac|testosterone boost|perform like a stud|vigor|potency|prostat', 'sexual-health / male-enhancement claims'),
    (r'blood sugar|diabet|glucose|gluco|tinnitus|hearing|vision loss|neuropath|nerve (pain|fresh|soothe)|parasite|kidney|liver detox', 'implied treatment of a medical condition'),
    (r'\bcure\b|reverse (diabetes|disease|aging)|miracle|breakthrough formula|clinically proven', 'miracle / cure language'),
    (r'forex|crypto|bitcoin|scalper|trading (signal|strategy)|day trad|metatrader', 'financial-trading promises'),
    (r'millionaire|billionaire|get rich|money wave|wealth signal|passive income system|\$\d+[kK] |per sale.*\$\d{3}', 'income / get-rich promises'),
    (r'medbed|med bed|tesla (med|ground)|pineal|subliminal|brainwave|frequency|manifest.*(money|wealth)|quantum (brain|wealth)', 'pseudoscientific mechanism claims'),
    (r'fat burn|slimming|keto pill|metabolism reset|glp-?1|weight loss (pill|supplement)|belly fat', 'aggressive weight-loss claims'),
]
MED_RISK = [
    (r'supplement|vitamin|collagen|gut health|hormone|menopause|immune|probiotic|gummies', 'supplement category - claims need substantiation'),
    (r'weight loss|keto|diet|fasting|slim|carnivore|paleo', 'diet / weight-management claims'),
    (r'affiliate|dropship|side hustle|online business|ecommerce|print on demand|make money|earn \d+%', 'make-money-online positioning'),
    (r'manifest|law of attraction|spiritual|numerolog|astrolog|tarot|chakra|ancestor', 'spiritual / manifestation claims'),
    (r'anxiety|depress|adhd|mental health|insomnia|trauma|burnout', 'mental-health subject matter'),
    (r'survival|prepper|blackout|emp|collapse|off.?grid', 'fear-based survival marketing'),
]
LOW_RISK_NICHE = {'education-courses', 'pets', 'gardening', 'home-diy', 'ai-software', 'other'}
SUPPLEMENT_TYPES = ('Supplements - health', 'Supplements - for slimming')


def risk_of(r):
    """Preliminary risk screen from marketplace-visible wording only (no sales page)."""
    t = (r['product_name'] + ' ' + r['product_type'] + ' ' + r['derived_niche']).lower()
    for pat, why in HIGH_RISK:
        if re.search(pat, t):
            return 'HIGH', why
    if r['product_type'] in SUPPLEMENT_TYPES:
        return 'HIGH', 'ingestible supplement - health claims require substantiation'
    for pat, why in MED_RISK:
        if re.search(pat, t):
            return 'MEDIUM', why
    if r['derived_niche'] in LOW_RISK_NICHE:
        return 'LOW', 'practical / informational positioning'
    return 'MEDIUM', 'unclassified positioning - review in Phase 3'


# ---------------------------------------------------------------- component scores
def score_monetisation(net, price):
    """30 pts. Saturating on payout + a price-band term.

    Deliberately NOT linear in payout: a very large payout on a hard-to-convert
    high-ticket offer is not automatically better than a moderate payout on an
    accessible one. Market difficulty is a Phase 5 question, so this only
    rewards payout up to the point where it stops being the binding constraint.
    """
    if net is None:
        pay = 6.0
    else:
        pay = 20.0 * min(1.0, math.log10(1 + max(net, 0)) / math.log10(1 + 150))
    if price is None or price <= 0:
        band = 3.0
    elif price < 10:
        band = 2.0
    elif price < 20:
        band = 5.0
    elif price < 37:
        band = 8.0
    elif price <= 150:
        band = 10.0
    elif price <= 300:
        band = 8.0
    elif price <= 600:
        band = 5.0
    else:
        band = 3.0
    return round(pay + band, 2)


def score_conversion(conv, canc):
    """25 pts. Rewards demonstrated funnel performance; neutral when unmeasured."""
    if conv is None and canc is None:
        return 11.0, 'EVIDENCE_LIMITED'          # neutral, not punitive
    if conv is not None:
        c = (15 if conv >= CONV_P90 else 13 if conv >= CONV_P75 else
             10 if conv >= CONV_P50 else 7 if conv >= CONV_P25 else
             4 if conv >= 2 else 2)
    else:
        c = 15 * 0.55
    if canc is not None:
        k = (10 if canc <= CANC_P10 else 8.5 if canc <= CANC_P25 else
             7 if canc <= CANC_P50 else 4.5 if canc <= CANC_P75 else
             2 if canc <= CANC_P90 else 0)
    else:
        k = 10 * 0.55
    lvl = 'EVIDENCE_RICH' if (conv is not None and canc is not None) else 'EVIDENCE_PARTIAL'
    return round(c + k, 2), lvl


def score_promotion(status):
    """15 pts. Approval requirements are real execution risk, not a footnote."""
    return {'Copy promo link': 15.0, 'Promote now': 14.0,
            'Request promotion': 7.0}.get(status, 5.0)


def score_maturity(age):
    """10 pts. Neither 'older is better' nor 'newer is worse' - a stability band."""
    if age is None:
        return 4.0
    if age < 30:
        return 3.0
    if age < 90:
        return 5.0
    if age < 365:
        return 9.0
    if age < 1095:
        return 10.0
    if age < 2190:
        return 8.0
    return 6.0


def score_confidence(r, price, comm, net, conv, canc, ratio):
    """10 pts. How much of the economic picture is actually observed."""
    s = 0.0
    s += 2 if price is not None else 0
    s += 2 if (comm is not None or r['commission_type'] == 'flat') else 0
    s += 2 if net is not None else 0
    s += 1.5 if conv is not None else 0
    s += 1.5 if canc is not None else 0
    if ratio is not None and 0.30 <= ratio <= 1.60:
        s += 1                                   # internally consistent economics
    return round(min(s, 10.0), 2)


def score_investigation(r, net, conv, canc, template):
    """10 pts. Does this combination earn a closer look in Phase 3/4?"""
    s = 0.0
    if conv is not None and canc is not None:
        s += 3
    if conv is not None and canc is not None and conv >= CONV_P75 and canc <= CANC_P50:
        s += 3
    if net is not None and net >= 50 and (canc is None or canc <= 12):
        s += 2
    if r['derived_niche'] != 'other':
        s += 1
    if r['has_affiliate_support_link'] == 'YES':
        s += 1
    if template:
        s = min(s, 2.0)                          # mass-produced listing, low research value
    return round(min(s, 10.0), 2)


def funnel_flag(ratio, price_note):
    if ratio is None:
        return 'UNKNOWN'
    if price_note == 'recurring':
        return 'EXTREME_NEEDS_REVIEW'
    if ratio > 2.5:
        return 'EXTREME_NEEDS_REVIEW'
    if ratio > 1.5:
        return 'VERY_STRONG'
    if ratio > 1.0:
        return 'STRONG'
    return 'NORMAL'


def band(score):
    if score >= 72:
        return 'HIGH'
    if score >= 60:
        return 'MEDIUM'
    return 'LOW'


def main():
    rows = list(csv.DictReader(open(SRC, encoding='utf-8')))

    # identical-listing clusters: same vendor + same price/commission/net.
    # 239 of Fitlifesolutions' 241 listings share one signature - auto-generated
    # catalogue filler that would otherwise dominate a commission-weighted rank.
    sig_count = collections.Counter(
        (r['vendor'], r['price_usd'], r['commission_pct'], r['net_earnings_per_sale_usd'])
        for r in rows)

    recs = []
    for r in rows:
        price = num(r, 'price_usd')
        comm = num(r, 'commission_pct')
        flat = num(r, 'commission_flat_usd')
        net = num(r, 'net_earnings_per_sale_usd')
        conv = num(r, 'cart_conversion_pct')
        canc = num(r, 'cancellation_rate_pct')
        age = num(r, 'product_age_days')

        eff_pct = comm if comm is not None else (
            round(flat / price * 100, 2) if (flat is not None and price) else None)
        fe_comm = round(price * comm / 100, 2) if (price is not None and comm is not None) else (
            flat if flat is not None else None)
        ratio = round(net / price, 3) if (net is not None and price) else None

        sig = (r['vendor'], r['price_usd'], r['commission_pct'], r['net_earnings_per_sale_usd'])
        clus = sig_count[sig]
        template = clus >= 5

        present = sum(x is not None for x in (price, eff_pct, net, conv, canc))
        completeness = '%d/5 (%d%%)' % (present, round(present / 5 * 100))

        m = score_monetisation(net, price)
        c, lvl = score_conversion(conv, canc)
        p = score_promotion(r['promotion_status'])
        mat = score_maturity(age)
        conf = score_confidence(r, price, comm, net, conv, canc, ratio)
        inv = score_investigation(r, net, conv, canc, template)
        total = round(m + c + p + mat + conf + inv, 2)

        risk, risk_why = risk_of(r)
        ff = funnel_flag(ratio, r['price_note'])

        # ---- why / concern, written from the observed values only
        why = []
        if net is not None:
            why.append('$%.2f net/sale' % net)
        if conv is not None:
            why.append('%.0f%% cart conversion' % conv)
        if canc is not None and canc <= CANC_P25:
            why.append('low %.2f%% cancellation' % canc)
        if r['promotion_status'] in ('Promote now', 'Copy promo link'):
            why.append('open promotion')
        if lvl == 'EVIDENCE_RICH':
            why.append('published performance data')
        if age is not None and 365 <= age < 2190:
            why.append('%.1fy track record' % (age / 365))
        why_s = '; '.join(why) if why else 'economics only, no performance evidence'

        con = []
        if template:
            con.append('1 of %d identical listings from this vendor (auto-generated catalogue)' % clus)
        if lvl == 'EVIDENCE_LIMITED':
            con.append('no published conversion/cancellation data')
        if canc is not None and canc > CANC_P75:
            con.append('high %.2f%% cancellation' % canc)
        if conv is not None and conv < CONV_P25:
            con.append('weak %.0f%% cart conversion' % conv)
        if ff in ('VERY_STRONG', 'EXTREME_NEEDS_REVIEW'):
            con.append('net/price %.2fx - payout likely funnel-wide, not front-end' % (ratio or 0))
        if r['promotion_status'] == 'Request promotion':
            con.append('vendor approval required')
        if risk == 'HIGH':
            con.append('HIGH preliminary risk: ' + risk_why)
        if price is not None and price > 600:
            con.append('high ticket - cold search traffic converts poorly')
        if age is not None and age < 90:
            con.append('only %d days old, unproven' % age)
        con_s = '; '.join(con) if con else 'none material at this stage'

        recs.append(dict(
            r, _price=price, _comm=comm, _net=net, _conv=conv, _canc=canc, _age=age,
            _eff=eff_pct, _fe=fe_comm, _ratio=ratio, _clus=clus, _template=template,
            _m=m, _c=c, _p=p, _mat=mat, _conf=conf, _inv=inv, _total=total,
            _lvl=lvl, _risk=risk, _riskwhy=risk_why, _ff=ff, _band=band(total),
            _complete=completeness, _why=why_s, _con=con_s))

    recs.sort(key=lambda x: -x['_total'])

    # ---------------------------------------------------------------- diversified selection
    picked, vcount, ccount = [], collections.Counter(), collections.Counter()
    for r in recs:
        if len(picked) >= TARGET_SHORTLIST:
            break
        v = r['vendor']
        sig = (v, r['price_usd'], r['commission_pct'], r['net_earnings_per_sale_usd'])
        if vcount[v] >= VENDOR_CAP:
            continue
        if r['_template'] and ccount[sig] >= TEMPLATE_CAP:
            continue
        picked.append(r)
        vcount[v] += 1
        ccount[sig] += 1

    COLS = ['rank', 'product_name', 'product_type', 'vendor', 'price_usd', 'commission_pct',
            'commission_flat_usd', 'net_earnings_per_sale_usd', 'cart_conversion_pct',
            'cancellation_rate_pct', 'promotion_status', 'product_age_days', 'derived_niche',
            'preliminary_risk_flag', 'funnel_economics_flag', 'performance_data_completeness',
            'monetization_score', 'conversion_score', 'promotion_score', 'maturity_score',
            'confidence_score', 'investigation_score', 'phase2_score', 'evidence_level',
            'why_candidate', 'main_concern',
            'effective_commission_pct', 'est_front_end_commission_usd', 'net_to_price_ratio',
            'economic_attractiveness_band', 'identical_listing_cluster_size']

    def row_out(i, r):
        return {
            'rank': i, 'product_name': r['product_name'], 'product_type': r['product_type'],
            'vendor': r['vendor'], 'price_usd': r['price_usd'],
            'commission_pct': r['commission_pct'], 'commission_flat_usd': r['commission_flat_usd'],
            'net_earnings_per_sale_usd': r['net_earnings_per_sale_usd'],
            'cart_conversion_pct': r['cart_conversion_pct'],
            'cancellation_rate_pct': r['cancellation_rate_pct'],
            'promotion_status': r['promotion_status'], 'product_age_days': r['product_age_days'],
            'derived_niche': r['derived_niche'], 'preliminary_risk_flag': r['_risk'],
            'funnel_economics_flag': r['_ff'], 'performance_data_completeness': r['_complete'],
            'monetization_score': r['_m'], 'conversion_score': r['_c'], 'promotion_score': r['_p'],
            'maturity_score': r['_mat'], 'confidence_score': r['_conf'],
            'investigation_score': r['_inv'], 'phase2_score': r['_total'],
            'evidence_level': r['_lvl'], 'why_candidate': r['_why'], 'main_concern': r['_con'],
            'effective_commission_pct': r['_eff'] if r['_eff'] is not None else 'UNKNOWN',
            'est_front_end_commission_usd': r['_fe'] if r['_fe'] is not None else 'UNKNOWN',
            'net_to_price_ratio': r['_ratio'] if r['_ratio'] is not None else 'UNKNOWN',
            'economic_attractiveness_band': r['_band'],
            'identical_listing_cluster_size': r['_clus'],
        }

    with open(OUT_SHORT, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=COLS)
        w.writeheader()
        for i, r in enumerate(picked, 1):
            w.writerow(row_out(i, r))

    # ---------------------------------------------------------------- beginner-friendly ~25
    def beginner_ok(r):
        if r['_risk'] == 'HIGH':
            return False
        if r['promotion_status'] == 'Request promotion':
            return False
        if r['_template']:
            return False
        if r['_net'] is None or r['_net'] < 15:
            return False
        if r['_ff'] == 'EXTREME_NEEDS_REVIEW':
            return False
        return True

    beg = [r for r in picked if beginner_ok(r)]
    beg.sort(key=lambda x: -(x['_total'] + (4 if x['_risk'] == 'LOW' else 0)
                             + (3 if x['_lvl'] == 'EVIDENCE_RICH' else 0)))
    bvc, bseen = collections.Counter(), set()
    beg_sel = []
    for r in beg:
        if len(beg_sel) >= 25:
            break
        if bvc[r['vendor']] >= 3:
            continue
        # same vendor re-listing one offer twice (identical payout + identical
        # measured performance) is one opportunity, not two
        dup = (r['vendor'], r['net_earnings_per_sale_usd'],
               r['cart_conversion_pct'], r['cancellation_rate_pct'])
        if dup in bseen:
            continue
        bseen.add(dup)
        beg_sel.append(r)
        bvc[r['vendor']] += 1

    BCOLS = ['rank', 'product_name', 'vendor', 'product_type', 'derived_niche', 'price_usd',
             'net_earnings_per_sale_usd', 'cart_conversion_pct', 'cancellation_rate_pct',
             'promotion_status', 'phase2_score', 'evidence_level', 'preliminary_risk_flag',
             'funnel_economics_flag', 'why_beginner_friendly', 'main_concern']
    with open(OUT_BEGIN, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=BCOLS)
        w.writeheader()
        for i, r in enumerate(beg_sel, 1):
            reasons = ['open promotion (no approval gate)']
            if r['_risk'] == 'LOW':
                reasons.append('low preliminary compliance risk')
            else:
                reasons.append('medium risk, but claims are checkable')
            if r['_lvl'] == 'EVIDENCE_RICH':
                reasons.append('has published conversion + cancellation data')
            if r['_ff'] == 'NORMAL':
                reasons.append('payout matches front-end price (no funnel dependence)')
            if r['_net'] is not None:
                reasons.append('$%.2f net/sale is meaningful without high-ticket pricing' % r['_net'])
            w.writerow({
                'rank': i, 'product_name': r['product_name'], 'vendor': r['vendor'],
                'product_type': r['product_type'], 'derived_niche': r['derived_niche'],
                'price_usd': r['price_usd'],
                'net_earnings_per_sale_usd': r['net_earnings_per_sale_usd'],
                'cart_conversion_pct': r['cart_conversion_pct'],
                'cancellation_rate_pct': r['cancellation_rate_pct'],
                'promotion_status': r['promotion_status'], 'phase2_score': r['_total'],
                'evidence_level': r['_lvl'], 'preliminary_risk_flag': r['_risk'],
                'funnel_economics_flag': r['_ff'],
                'why_beginner_friendly': '; '.join(reasons), 'main_concern': r['_con']})

    # ---------------------------------------------------------------- Phase 3 queue ~30
    def queue_key(r):
        s = r['_total']
        s += 6 if r['_risk'] == 'LOW' else (2 if r['_risk'] == 'MEDIUM' else -6)
        s += 4 if r['_lvl'] == 'EVIDENCE_RICH' else 0
        s += 3 if r['promotion_status'] in ('Promote now', 'Copy promo link') else 0
        s -= 8 if r['_template'] else 0
        return -s

    qpool = sorted(picked, key=queue_key)
    qvc, qnc, qseen, queue = collections.Counter(), collections.Counter(), set(), []
    for r in qpool:
        if len(queue) >= 30:
            break
        if qvc[r['vendor']] >= 2:
            continue
        if qnc[r['derived_niche']] >= 7:
            continue
        dup = (r['vendor'], r['net_earnings_per_sale_usd'],
               r['cart_conversion_pct'], r['cancellation_rate_pct'])
        if dup in qseen:
            continue
        qseen.add(dup)
        queue.append(r)
        qvc[r['vendor']] += 1
        qnc[r['derived_niche']] += 1

    ANGLE = {
        'health-supplement': 'branded review + "is it legit / scam" + ingredient and alternatives queries',
        'weight-loss': 'branded review + comparison vs mainstream programmes + results queries',
        'survival-preparedness': 'branded review + problem-led ("how to ...") + book/guide comparisons',
        'education-courses': 'course review + "worth it" + vs named competitor courses',
        'make-money-online': 'branded review + "legit or scam" + realistic-earnings queries',
        'forex-crypto-trading': 'branded review + strategy comparison (high compliance care)',
        'ai-software': 'tool review + alternatives + "vs <competitor>" + pricing queries',
        'pets': 'problem-led training queries + product review + method comparisons',
        'gardening': 'problem-led how-to + kit review + seasonal buying guides',
        'home-diy': 'project how-to + plan/kit review + tool comparisons',
        'mental-wellbeing': 'problem-led queries + programme review (careful, sensitive topic)',
        'spirituality-manifest': 'branded review + "does it work" queries (claims hard to verify)',
        'beauty-skincare': 'branded review + ingredient queries + alternatives',
        'fitness': 'programme review + "does it work" + comparison to free alternatives',
        'other': 'branded review + problem-led queries + alternatives',
    }
    QCOLS = ['queue_rank', 'product_name', 'vendor', 'phase2_score', 'price_usd',
             'net_earnings_per_sale_usd', 'cart_conversion_pct', 'cancellation_rate_pct',
             'promotion_status', 'product_economics', 'why_deserves_bing_research',
             'preliminary_risk', 'expected_research_angle', 'confidence', 'derived_niche']
    with open(OUT_QUEUE, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=QCOLS)
        w.writeheader()
        for i, r in enumerate(queue, 1):
            econ = '$%s price / %s%% comm / $%s net' % (
                r['price_usd'],
                r['commission_pct'] if r['commission_pct'] != 'UNKNOWN' else '%s flat' % r['commission_flat_usd'],
                r['net_earnings_per_sale_usd'])
            why = []
            if r['_lvl'] == 'EVIDENCE_RICH':
                why.append('proven conversion (%s%% cart, %s%% cancel)'
                           % (r['cart_conversion_pct'], r['cancellation_rate_pct']))
            else:
                why.append('economics strong but unproven - SERP must justify it')
            if r['_net'] is not None and r['_net'] >= 40:
                why.append('$%.0f/sale supports a content site at modest traffic' % r['_net'])
            if r['_risk'] == 'LOW':
                why.append('low compliance risk, truthful content is straightforward')
            if r['promotion_status'] != 'Request promotion':
                why.append('no approval gate')
            # confidence in the Phase 2 *economic* read, not in any SEO outcome
            if (r['_lvl'] == 'EVIDENCE_RICH' and r['_conf'] >= 9
                    and r['_ff'] == 'NORMAL' and (r['_age'] or 0) >= 365):
                conf = 'HIGH'      # measured performance, consistent economics, real history
            elif r['_lvl'] == 'EVIDENCE_RICH' and r['_conf'] >= 8:
                conf = 'MEDIUM'    # measured, but young or funnel-dependent payout
            elif r['_conf'] >= 8:
                conf = 'LOW'       # economics clear, performance entirely unmeasured
            else:
                conf = 'LOW'
            w.writerow({
                'queue_rank': i, 'product_name': r['product_name'], 'vendor': r['vendor'],
                'phase2_score': r['_total'], 'price_usd': r['price_usd'],
                'net_earnings_per_sale_usd': r['net_earnings_per_sale_usd'],
                'cart_conversion_pct': r['cart_conversion_pct'],
                'cancellation_rate_pct': r['cancellation_rate_pct'],
                'promotion_status': r['promotion_status'], 'product_economics': econ,
                'why_deserves_bing_research': '; '.join(why), 'preliminary_risk': r['_risk'],
                'expected_research_angle': ANGLE.get(r['derived_niche'], ANGLE['other']),
                'confidence': conf, 'derived_niche': r['derived_niche']})

    return recs, picked, beg_sel, queue, sig_count


if __name__ == '__main__':
    recs, picked, beg, queue, _ = main()
    print('scored     : %d' % len(recs))
    print('shortlist  : %d -> %s' % (len(picked), OUT_SHORT))
    print('beginner   : %d -> %s' % (len(beg), OUT_BEGIN))
    print('bing queue : %d -> %s' % (len(queue), OUT_QUEUE))
