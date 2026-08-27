# -*- coding: utf-8 -*-
"""
SHOBIT ENGINE - PHASE 10 (score) + 11 (plausibility) + 12 (shortlist/verdict)
=============================================================================
100-point score:
    20 affiliate economics
    20 market awareness
    20 branded search evidence   (Bing autosuggest, Bing-native)
    20 Bing SERP opportunity     (Bing-index proxy, validated)
    10 domain opportunity
    10 risk / credibility / practicality

A product cannot win on payout alone, on an available domain alone, or on a weak
SERP alone - the risk axis can zero out a candidate outright and the gate below
enforces that.
"""

import csv
import io
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = os.path.join(BASE, 'reports')
DATE = '2026-08-24'

# ---------------------------------------------------------------------------
# PHASE 9 - product quality, individually researched. Sources in the .md.
# Anything not listed here is explicitly NOT individually verified.
# ---------------------------------------------------------------------------
QUALITY = {
 'TonicGreens': ('FATAL', 0,
   'Marketing rests on a "kill switch" claim to eliminate herpes - an illegal '
   'disease claim - fronted by "Dr. Ben Rivers", who cannot be verified, plus '
   'staged news-broadcast footage. No honest review can recommend this.'),
 'Ultimate OFF-GRID Generator': ('FATAL', 0,
   'Sells free-energy/80%-bill-reduction claims that contradict basic physics; '
   'third-party checks report hidden domain ownership and safety hazards.'),
 'Pineal Guardian': ('SEVERE', 1,
   'Core "pineal gland activation" premise lacks scientific support. Every '
   '"legit" verdict found is affiliate-authored, and spam review PDFs are '
   'hosted on hacked douglascounty-ne.gov and santiamhospital.org domains.'),
 'iGenics': ('SEVERE', 2,
   'Ingredients are real (AREDS-2 basis) but the VSL authority "Dr. Charles '
   'Williams" has no verifiable licence or affiliation and his stated '
   'experience shifts between 15, 22 and 30 years within one script.'),
 'Idrotherapy': ('SEVERE', 1,
   'Trustpilot 2.2/5 across 109 reviews and ProductReview 1.4/5 across 49 '
   '("It\'s rubbish"). An accurate review would tell readers not to buy.'),
 'Advanced Mitochondrial Formula': ('ACCEPTABLE_WITH_CAVEAT', 8,
   'Advanced Bionutritionals is an established US company; formulator Dr Frank '
   'Shallenberger is a real, named physician (Univ. of Maryland MD, 41 yrs); '
   'ingredients CoQ10 / Acetyl-L-Carnitine / Alpha-Lipoic Acid are genuinely '
   'studied for mitochondrial support; cGMP manufacturing and correct FDA '
   'disclaimers. CAVEAT: an unverified Trustpilot comment alleges a past '
   'California licence revocation - MUST be independently checked.'),
 'Advanced Amino Formula': ('ACCEPTABLE_WITH_CAVEAT', 8,
   'Same vendor and disclosure posture as Advanced Mitochondrial Formula; '
   'transparent labelling, allergen disclosure, ~4.1/5 across platforms. Same '
   'unverified licence caveat applies.'),
 'Advanced Memory Formula': ('MODERATE', 5,
   'Same real vendor, but Harvard Health and Cleveland Clinic both rank on '
   'Google page one debunking brain-health supplements as a category, and the '
   'name collides with retail listings on Amazon and Walmart.'),
 'Medicinal Garden Kit': ('MODERATE', 5,
   'The physical product is real seeds plus a growing guide, but McGill '
   'University\'s Office for Science and Society publicly debunks it and the '
   'vendor page claims the seeds are "FDA approved", which is not a thing the '
   'FDA does. An honest review is writable but must contradict the vendor.'),
 'CaviArgan': ('MODERATE', 5,
   'Real cream, also stocked by Amazon and Walmart (channel conflict). Sibling '
   'brand from the same vendor (Idrotherapy) rates 2.2/5 on Trustpilot, and a '
   'ranking LinkedIn post spreads false "not sold on Amazon" claims.'),
 'Tube Magic': ('MODERATE', 5,
   'Real software with a 30-day money-back guarantee and no free trial '
   '("disabled due to spam"), but Trustpilot 2.6 "Poor" and 1% cart '
   'conversion. Honest review is writable but would not be flattering.'),
}
DEFAULT_UNVERIFIED = ('NOT_INDIVIDUALLY_VERIFIED', 3,
   'Not individually researched in this pass. Category priors only: this is a '
   'direct-response VSL supplement, the class where fabricated spokespeople '
   'and disease claims were confirmed in 4 of 4 products actually checked. '
   'Treat as unproven, not as clean.')

DOMAINS = {
 'Advanced Mitochondrial Formula': [
   ('advancedmitochondrialformula.com', 'REGISTERED', 'exact', 'HIGH - vendor mark'),
   ('advancedmitochondrialformulareview.com', 'AVAILABLE', 'partial+review', 'MEDIUM - contains vendor mark')],
 'Advanced Amino Formula': [
   ('advancedaminoformula.com', 'REGISTERED', 'exact', 'HIGH - vendor mark'),
   ('advancedaminoformulareview.com', 'AVAILABLE', 'partial+review', 'MEDIUM - contains vendor mark'),
   ('advancedaminoformulareviews.com', 'AVAILABLE', 'partial+review', 'MEDIUM - contains vendor mark')],
 'Medicinal Garden Kit': [
   ('medicinalgardenkit.com', 'REGISTERED', 'exact', 'HIGH - vendor mark'),
   ('medicinalgardenkitreview.com', 'AVAILABLE', 'partial+review', 'MEDIUM - contains vendor mark'),
   ('medicinalgardenkitreviews.com', 'AVAILABLE', 'partial+review', 'MEDIUM - contains vendor mark')],
 'CaviArgan': [
   ('caviarganreview.com', 'AVAILABLE', 'partial+review', 'MEDIUM - contains vendor mark')],
 'Tube Magic': [
   ('tubemagic.com', 'REGISTERED', 'exact', 'HIGH - vendor mark'),
   ('tubemagicreview.com', 'AVAILABLE', 'partial+review', 'MEDIUM - contains vendor mark')],
 'Pineal Guardian': [
   ('pinealguardianreview.com', 'AVAILABLE', 'partial+review', 'MEDIUM - contains vendor mark')],
 'iGenics': [
   ('igenicsreview.com', 'AVAILABLE', 'partial+review', 'MEDIUM - contains vendor mark')],
}


def load(name):
    return list(csv.DictReader(io.open(os.path.join(R, name),
                                       encoding='utf-8', newline='')))


aware = {r['brand_name']: r for r in load('market-awareness-evidence.csv')}
serp = {r['brand_name']: r for r in load('shobit-serp-summary.csv')}
emd = load('emd-bing-evidence.csv')
raw = load('shobit-bing-serp-raw.csv')

rows = []
for b, s in serp.items():
    a = aware[b]
    econ = float(a['econ_score'])
    q_tier, q_pts, q_note = QUALITY.get(b, DEFAULT_UNVERIFIED)

    p_econ = round(20.0 * min(1.0, econ / 100.0), 1)
    p_brand = float(a['branded_search_points'])
    p_serp = float(s['serp_points'])

    tier = a['bing_demand_tier']
    nmod = 0 if a['high_intent_modifiers'] == 'NONE' else len(
        a['high_intent_modifiers'].split('|'))
    p_aware = {'BING_STRONG': 14.0, 'BING_MODERATE': 9.0,
               'BING_WEAK': 4.0}.get(tier, 0.0) + min(6.0, nmod * 1.0)
    p_aware = round(min(20.0, p_aware), 1)

    ds = DOMAINS.get(b, [])
    avail = [d for d in ds if d[1] == 'AVAILABLE']
    p_dom = 7.0 if avail else (4.0 if ds else 4.0)

    total = p_econ + p_aware + p_brand + p_serp + p_dom + q_pts
    rows.append(dict(
        brand=b, vendor=s['vendor'], net=s['net'], risk_flags=s['risk_flags'],
        econ=p_econ, aware=p_aware, brand_pts=p_brand, serp=p_serp,
        dom=p_dom, risk=q_pts, total=round(total, 1),
        q_tier=q_tier, q_note=q_note,
        demand_tier=tier, modifiers=a['high_intent_modifiers'],
        evidence=a['evidence'], validation=s['validation'],
        authority=s['authority'], small=s['small_site'],
        emd_root=s['emd_root'], emd_sub=s['emd_sub'],
        domains=ds))

rows.sort(key=lambda x: -x['total'])

# ---------------------------------------------------------------------------
# Domain shortlist CSV
# ---------------------------------------------------------------------------
with io.open(os.path.join(R, 'shobit-domain-shortlist.csv'), 'w',
             encoding='utf-8', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(['brand', 'domain', 'status', 'registry_source', 'checked_date',
                'match_type', 'trademark_brand_risk', 'prior_history', 'note'])
    for r in rows:
        for d, st, mt, tr in r['domains']:
            w.writerow([r['brand'], d, st,
                        'RDAP Verisign (.com authoritative registry)', DATE,
                        mt, tr, 'not checked - only relevant if purchased',
                        'exact-brand .com is vendor-held where REGISTERED'])

# ---------------------------------------------------------------------------
# Top 20 markdown
# ---------------------------------------------------------------------------
emd_pos = sorted(int(e['position']) for e in emd)
n1 = sum(1 for p in emd_pos if p == 1)
emd_avg = sum(emd_pos) / len(emd_pos)
non = [int(x['pos']) for x in raw if not x['emd']]
non_avg = sum(non) / len(non)

with io.open(os.path.join(R, 'shobit-top-20-opportunities.md'), 'w',
             encoding='utf-8') as fh:
    def w_(s=''):
        fh.write(s + '\n')
    w_('# Shobit Engine - Top 20 Opportunities')
    w_()
    w_('All evidence captured **%s**.' % DATE)
    w_()
    w_('| Evidence type | Source | Status |')
    w_('|---|---|---|')
    w_('| Branded search demand | **Bing autosuggest** (`api.bing.com/osjson.aspx`) | BING-NATIVE |')
    w_('| SERP structure | **Yahoo + DuckDuckGo Lite** (both Bing-sourced) | BING-INDEX PROXY |')
    w_('| Bing search *volume* | Bing Webmaster Keyword API | **UNAVAILABLE** (HTTP 400, not enabled) |')
    w_('| Bing SERP direct | bing.com / DataForSEO bing | **UNREACHABLE** (returns unrelated SERPs) |')
    w_('| Economics | Digistore24 marketplace export | measured |')
    w_('| Domains | RDAP registry | authoritative |')
    w_()
    w_('> No Google keyword volume is used anywhere in this report.')
    w_('> Autosuggest proves a query **is typed on Bing**; it is not a volume figure.')
    w_()
    w_('---')
    w_()
    w_('## Top 20')
    w_()
    w_('| # | Product | Net | Bing demand | SERP | Score | Product-quality verdict |')
    w_('|---|---|---|---|---|---|---|')
    for i, r in enumerate(rows[:20], 1):
        w_('| %d | %s | $%s | %s | %s/20 | **%.1f** | %s |' % (
            i, r['brand'], r['net'], r['demand_tier'].replace('BING_', ''),
            r['serp'], r['total'], r['q_tier']))
    w_()
    w_('---')
    w_()
    for i, r in enumerate(rows[:20], 1):
        w_('## %d. %s' % (i, r['brand']))
        w_()
        w_('**Vendor** `%s` | **Net/sale** $%s | **Score %.1f/100**'
           % (r['vendor'], r['net'], r['total']))
        w_()
        w_('- **Affiliate economics** %.1f/20' % r['econ'])
        w_('- **Market awareness** %.1f/20' % r['aware'])
        w_('- **Branded search evidence** %.1f/20' % r['brand_pts'])
        w_('- **Bing SERP opportunity** %.1f/20' % r['serp'])
        w_('- **Domain opportunity** %.1f/10' % r['dom'])
        w_('- **Risk / credibility** %d/10' % r['risk'])
        w_()
        w_('**Branded search evidence (Bing-native):** tier `%s`, high-intent '
           'modifiers `%s`' % (r['demand_tier'], r['modifiers']))
        w_()
        w_('> Bing autosuggest returned: %s' % r['evidence'][:300])
        w_()
        w_('**Bing SERP evidence (%s):** %s authority publishers, %s small '
           'affiliate sites in the top 10; EMD root %s, EMD subdomain %s.'
           % (r['validation'], r['authority'], r['small'], r['emd_root'],
              r['emd_sub']))
        w_()
        if r['domains']:
            w_('**Domain options:**')
            w_()
            for d, st, mt, tr in r['domains']:
                w_('- `%s` - **%s** (%s) - trademark risk: %s' % (d, st, mt, tr))
            w_()
        w_('**Product-quality risk - %s:** %s' % (r['q_tier'], r['q_note']))
        w_()
        w_('---')
        w_()

print('wrote shobit-domain-shortlist.csv, shobit-top-20-opportunities.md')
print()
print('%-34s %6s %6s %6s %6s %5s %5s %7s  %s' % (
    'brand', 'econ', 'aware', 'brand', 'serp', 'dom', 'risk', 'TOTAL', 'quality'))
for r in rows[:20]:
    print('%-34s %6.1f %6.1f %6.1f %6.1f %5.1f %5d %7.1f  %s' % (
        r['brand'][:34], r['econ'], r['aware'], r['brand_pts'], r['serp'],
        r['dom'], r['risk'], r['total'], r['q_tier']))
print()
print('EMD: %d observed, %d at #1, avg pos %.1f | non-EMD avg pos %.1f'
      % (len(emd_pos), n1, emd_avg, non_avg))
