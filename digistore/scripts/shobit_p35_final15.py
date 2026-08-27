# -*- coding: utf-8 -*-
"""
SHOBIT ENGINE - PHASE 3.5: FINAL CANDIDATE FILTER
=================================================
60 Bing-demand candidates -> 15 finalists -> 10 for real Bing SERP validation.

Score /100:
    25 Bing-native demand         (autosuggest tier)
    20 commercial-intent strength (high-intent modifiers Bing volunteers)
    20 affiliate economics        (Phase 2)
    15 market awareness
    10 product quality / practicality
    10 risk / compliance

No domain checks. No Google volume. No keyword expansion.

RISK TABLE
----------
Every entry below is backed by research recorded in shobit-phase35-report.md.
Products with no entry are NOT assumed clean - they inherit UNVERIFIED_VSL,
which is a hold, not a pass. 4 of 4 anonymous VSL offers actually investigated
turned out to carry fabricated authorities or illegal disease claims, so the
prior for that class is bad until checked.
"""

import csv
import io
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = os.path.join(BASE, 'reports')
DATE = '2026-08-24'

# tier -> (quality_pts /10, risk_pts /10, label, note)
RISK = {
 # ---- hard rejects -------------------------------------------------------
 'TonicGreens': ('FATAL', 0, 0,
   'Illegal disease claim: a "kill switch" that eliminates herpes, fronted by '
   'unverifiable "Dr. Ben Rivers", with staged news footage.'),
 'Ultimate OFF-GRID Generator': ('FATAL', 0, 0,
   'Free-energy / 80%-bill-reduction claims that contradict basic physics; '
   'hidden domain ownership and reported safety hazards.'),
 'The Ultimate Energizer': ('FATAL', 0, 0,
   'Same free-energy genre and claim structure as Ultimate OFF-GRID Generator '
   '("Tesla\'s patented device", huge bill reductions). Not defensible.'),
 'Tesla MedBed X': ('FATAL', 0, 0,
   'FDA issued a warning letter to Tesla BioHealing Inc. (Aug 2023) over the '
   '"Tesla MedBed Generator" for claims covering cancer, stroke paralysis, '
   'Alzheimer\'s, dementia and epilepsy. Medbeds are a conspiracy-driven '
   'pseudoscience category with no approved device anywhere.'),
 'TeslaCare': ('FATAL', 0, 0,
   'Same medbed/"life force energy" product family as Tesla MedBed X, plus '
   'unauthorised use of the Tesla name.'),
 'Tesla Grounding': ('FATAL', 0, 0,
   'Same product family and naming problem as TeslaCare.'),
 'The Lotto Master Key': ('FATAL', 0, 0,
   'Sells a lottery-prediction system. Lottery draws are random; any claim to '
   'predict them is deceptive by construction.'),
 # ---- severe -------------------------------------------------------------
 'Pineal Guardian': ('SEVERE', 1, 1,
   '"Pineal activation" premise unsupported; every favourable verdict found is '
   'affiliate-authored; spam review PDFs hosted on hacked douglascounty-ne.gov '
   'and santiamhospital.org.'),
 'iGenics': ('SEVERE', 2, 1,
   'Ingredients real (AREDS-2), but VSL authority "Dr. Charles Williams" has '
   'no verifiable licence and claims 15, 22 and 30 years inside one script.'),
 'Idrotherapy': ('SEVERE', 1, 1,
   'Trustpilot 2.2/5 (109 reviews) and ProductReview 1.4/5 (49). An accurate '
   'review would tell readers not to buy.'),
 'Clearing Academy': ('SEVERE', 1, 1,
   'BBB complaints report unauthorised recurring $33 charges and undelivered '
   'products; content alleged to be repackaged seminar recordings; '
   '"belief clearing" energy-healing premise.'),
 'Dubai Wealth Secret': ('SEVERE', 2, 1,
   'Get-rich-quick framing with 12.66% cancellation. Income claims are the '
   'most heavily policed category in affiliate marketing.'),
 # ---- acceptable ---------------------------------------------------------
 'Advanced Amino Formula': ('ACCEPTABLE', 9, 8,
   'Advanced Bionutritionals: established US company, real named formulator '
   'Dr Frank Shallenberger (Univ. of Maryland MD, 41 yrs), transparent '
   'labelling, cGMP, correct FDA disclaimers, ~4.1/5 across platforms. '
   'CAVEAT: unverified Trustpilot allegation of a past California licence '
   'revocation - must be checked with the medical board.'),
 'Advanced Mitochondrial Formula': ('ACCEPTABLE', 9, 8,
   'Same vendor and disclosure posture. Ingredients CoQ10 / Acetyl-L-Carnitine '
   '/ Alpha-Lipoic Acid are genuinely studied for mitochondrial support. Same '
   'unverified licence caveat.'),
 'Lost Frontier Handbook': ('ACCEPTABLE', 9, 9,
   'Author Suzanne Sherman is a REAL, verifiable person - preparedness '
   'educator, hosts the Red Hot Chilly Prepper Podcast and The Wasatch Report, '
   'featured on Survivopedia and Ask a Prepper, appeared at PrepperCon. 60-day '
   'guarantee. 1.50% cancellation is among the best in the dataset.'),
 'The Lost SuperFoods': ('ACCEPTABLE', 8, 7,
   'Real 270-page book, 1.70% cancellation, 19% cart conversion. Open '
   'question: credited author "Claude Davis" could not be independently '
   'verified or refuted - so write about contents, never about the author.'),
 'Home Doctor': ('ACCEPTABLE', 8, 7,
   'Real 304-page book, 2.81% cancellation. Same unresolved "Claude Davis" '
   'authorship question; Scribd hosts a copy, so some searchers want it free.'),
 'Anti-Looter Kit': ('ACCEPTABLE', 8, 7,
   'Physical, CE-certified product with a verifiable ex-CIA creator and a '
   '60-day guarantee. 18% cart conversion at 3.55% cancellation. Fear-based '
   'marketing needs restraint but the product itself is real.'),
 # ---- moderate -----------------------------------------------------------
 'Advanced Memory Formula': ('MODERATE', 6, 5,
   'Same legitimate vendor, but Harvard Health and Cleveland Clinic both rank '
   'page one debunking brain-health supplements as a category, and the name '
   'collides with Amazon/Walmart retail listings.'),
 'CircO2': ('MODERATE', 7, 6,
   'Advanced Bionutritionals vendor (verified legitimate); this specific SKU '
   'was not individually researched.'),
 'Advanced Collagen Plus': ('MODERATE', 7, 6,
   'Advanced Bionutritionals vendor (verified legitimate); this specific SKU '
   'was not individually researched.'),
 'Pep Tonic': ('MODERATE', 7, 6,
   'Advanced Bionutritionals vendor (verified legitimate); this specific SKU '
   'was not individually researched.'),
 'Medicinal Garden Kit': ('MODERATE', 6, 5,
   'Real seeds plus a growing guide, but McGill University publicly debunks it '
   'and the vendor claims the seeds are "FDA approved", which the FDA does not '
   'do. Honest review is writable but must contradict the vendor.'),
 'CaviArgan': ('MODERATE', 6, 5,
   'Real cream, but stocked on Amazon/Walmart (channel conflict) and the same '
   'vendor\'s sibling brand Idrotherapy rates 2.2/5 on Trustpilot.'),
 'Tube Magic': ('MODERATE', 6, 6,
   'Real software, 30-day money-back guarantee, but Trustpilot 2.6 "Poor", no '
   'free trial ("disabled due to spam"), and 1% cart conversion. The $265 net '
   'is subscription lifetime value, not a per-sale payout (~$23 front end).'),
 'David’s Shield': ('MODERATE', 6, 5,
   'Real preparedness guide with 20% cart conversion, but Amazon sells it and '
   'brand-name demand is contaminated by an unrelated foundation and author.'),

 'Joseph’s Well': ('MODERATE', 4, 3,
   'Best economics in the queue, but ranking pages state irreconcilable output '
   'claims for the same device (10 gal/day vs 50 gal/day) and a DIY '
   'condensation rig producing either is physically doubtful.'),
 'Healthy Heart Solution Kit': ('MODERATE', 5, 4,
   'Barton Publishing is established (since 2003, 365-day guarantee), but a '
   'BBB complaint describes a $2,625 purchase with worsening cholesterol, '
   'SmartCustomer rates it 2.1/5, and cardiovascular claims are YMYL.'),
 'Remixable': ('MODERATE', 6, 4,
   'Real software but 22.85% cancellation - roughly one buyer in four refunds.'),


}
UNVERIFIED = ('UNVERIFIED_VSL', 3, 3,
   'Anonymous direct-response VSL supplement, not individually researched. '
   'Of 4 products in this exact class that WERE checked, 4 carried fabricated '
   'spokespeople or illegal disease claims. Held back pending verification - '
   'this is a hold, not a pass.')


def f(v, d=None):
    try:
        return float(v)
    except (TypeError, ValueError):
        return d


uni = {r['record_id']: r for r in csv.DictReader(
    io.open(os.path.join(R, 'shobit-product-universe.csv'),
            encoding='utf-8', newline=''))}
aw = list(csv.DictReader(io.open(os.path.join(R, 'market-awareness-evidence.csv'),
                                 encoding='utf-8', newline='')))

MODS = ['review', 'reviews', 'price', 'buy', 'official', 'discount', 'scam',
        'complaints', 'alternatives', 'legit', 'worth it', 'order',
        'where to buy', 'cost']

rows = []
for a in aw:
    tier = a['bing_demand_tier']
    if tier not in ('BING_STRONG', 'BING_MODERATE'):
        continue
    u = uni[a['record_id']]
    brand = a['brand_name']
    q_tier, q_pts, r_pts, note = RISK.get(brand, UNVERIFIED)

    # 25 - Bing-native demand
    p_dem = {'BING_STRONG': 21.0, 'BING_MODERATE': 13.0}[tier]
    p_dem += min(4.0, int(a['branded_suggestions']) * 0.5)

    # 20 - commercial intent strength
    hi = [] if a['high_intent_modifiers'] == 'NONE' else \
        a['high_intent_modifiers'].split('|')
    allm = [] if a['commercial_modifiers'] == 'NONE' else \
        a['commercial_modifiers'].split('|')
    p_int = min(20.0, 4.0 + 2.6 * len(hi) + 0.7 * len(allm))

    # 20 - affiliate economics
    p_eco = round(20.0 * min(1.0, f(a['econ_score'], 0) / 100.0), 1)

    # 15 - market awareness
    p_awr = {'BING_STRONG': 11.0, 'BING_MODERATE': 7.0}[tier]
    age = f(u['product_age_days'], 0)
    if age and age >= 365:
        p_awr += 2.0
    elif age and age >= 120:
        p_awr += 1.0
    if len(allm) >= 4:
        p_awr += 2.0
    p_awr = min(15.0, p_awr)

    total = p_dem + p_int + p_eco + p_awr + q_pts + r_pts

    ptype = u['product_type']
    practical = not ('upplement' in ptype)

    rows.append(dict(
        brand=brand, vendor=a['vendor'], product_name=a['product_name'],
        product_type=ptype, niche=a['derived_niche'],
        net=a['net_earnings_per_sale_usd'],
        conv=a['cart_conversion_pct'], canc=a['cancellation_rate_pct'],
        promo=u['promotion_status'], tier=tier,
        hi='|'.join(hi) or 'NONE', allm='|'.join(allm) or 'NONE',
        nbranded=a['branded_suggestions'], evidence=a['evidence'],
        age=u['product_age_days'],
        q_tier=q_tier, q_pts=q_pts, r_pts=r_pts, note=note,
        p_dem=round(p_dem, 1), p_int=round(p_int, 1), p_eco=p_eco,
        p_awr=round(p_awr, 1), total=round(total, 1), practical=practical,
        mods_present='|'.join(m for m in MODS if m in allm) or 'NONE'))

rejected = [r for r in rows if r['q_tier'] in ('FATAL', 'SEVERE')]
held = [r for r in rows if r['q_tier'] == 'UNVERIFIED_VSL']
eligible = [r for r in rows if r['q_tier'] in
            ('ACCEPTABLE', 'MODERATE')]
eligible.sort(key=lambda x: -x['total'])
final15 = eligible[:15]
for i, r in enumerate(final15, 1):
    r['rank'] = i
final10 = final15[:10]

# ---------------------------------------------------------------- final 15
with io.open(os.path.join(R, 'shobit-final-15.csv'), 'w',
             encoding='utf-8', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(['rank', 'product', 'vendor', 'net_earnings_per_sale',
                'cart_conversion', 'cancellation', 'promotion_status',
                'bing_demand_tier', 'bing_high_intent_modifiers',
                'market_awareness', 'risk_level', 'product_quality',
                'overall_pre_serp_score', 'why_candidate', 'main_risk',
                'confidence'])
    for r in final15:
        aw_txt = ('Bing autosuggest returns %s branded queries incl. [%s]; '
                  'product live %s days; promotable "%s"'
                  % (r['nbranded'], r['mods_present'], r['age'], r['promo']))
        why = ('%s demand on Bing with %d high-intent modifier(s); %s; '
               '$%s/sale at %s%% cart conversion and %s%% cancellation'
               % (r['tier'].replace('BING_', ''), len(r['hi'].split('|'))
                  if r['hi'] != 'NONE' else 0,
                  'practical/non-supplement product' if r['practical']
                  else 'health product from a vendor with verified standing',
                  r['net'], r['conv'], r['canc']))
        conf = ('HIGH' if r['q_tier'] == 'ACCEPTABLE' and
                r['tier'] == 'BING_STRONG' else
                'MEDIUM' if r['q_tier'] in ('ACCEPTABLE', 'MODERATE') else 'LOW')
        w.writerow([r['rank'], r['brand'], r['vendor'], r['net'], r['conv'],
                    r['canc'], r['promo'], r['tier'], r['hi'], aw_txt,
                    r['q_tier'], r['q_tier'], r['total'], why, r['note'], conf])

# ---------------------------------------------------------------- SERP queue
ANGLE = {
 'Advanced Amino Formula': 'Honest ingredient-and-evidence review; the vendor is real and discloses doctor compensation, so a factual page can outrank the affiliate spam without overclaiming.',
 'Advanced Mitochondrial Formula': 'CoQ10/ALCAR/ALA are genuinely studied - a sourced "what the research actually shows" page is defensible and differentiates from the spam incumbents.',
 'Advanced Memory Formula': 'Comparison page against the category-level criticism, positioning it honestly against Harvard/Cleveland Clinic scepticism.',
 'The Lost SuperFoods': 'Contents-and-recipes review plus an honest note on where else it can be bought.',
 'Lost Frontier Handbook': 'Author-credibility angle: Suzanne Sherman is verifiable, which almost no competitor in this niche can claim.',
 'Home Doctor': 'What is actually inside the book, and who it does and does not suit.',
 'Medicinal Garden Kit': '"What you actually receive" review - real seeds, honest treatment of the unsupported medicinal claims.',
 'Anti-Looter Kit': 'Physical-product review: CE certification, verifiable creator, what is in the box.',
 'Tube Magic': 'Feature-and-pricing review that is candid about the subscription and the 2.6 Trustpilot score.',
 'CaviArgan': 'Ingredient review with an honest price comparison against Amazon/Walmart listings.',
 'CircO2': 'Nitric-oxide category explainer from a vendor with verified standing.',
 'Advanced Collagen Plus': 'Collagen category explainer; vendor has verified standing.',
 'Pep Tonic': 'Energy-support explainer from a vendor with verified standing.',
 'David’s Shield': 'Preparedness-guide review, explicit about what is and is not covered.',
 'Healthy Heart Solution Kit': 'Established-publisher review, explicit about the YMYL limits.',
 'Remixable': 'Software review candid about the 22.85% refund rate.',
 'Joseph’s Well': 'Only viable as a debunk-and-compare page given the contradictory output claims.',
}
with io.open(os.path.join(R, 'shobit-serp-queue.csv'), 'w',
             encoding='utf-8', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(['product', 'vendor', 'primary_product_name_query',
                'best_commercial_query_from_bing_autosuggest',
                'bing_demand_tier', 'why_serp_validation_matters',
                'expected_affiliate_angle', 'main_concern'])
    for r in final10:
        best = 'reviews' if 'reviews' in r['allm'] else (
            'review' if 'review' in r['allm'] else
            (r['hi'].split('|')[0] if r['hi'] != 'NONE' else 'review'))
        w.writerow([
            r['brand'], r['vendor'], r['brand'].lower(),
            '%s %s' % (r['brand'].lower(), best), r['tier'],
            'Bing volunteers commercial modifiers for this brand, and economics '
            'and product quality both clear the bar - what is unknown is '
            'whether the live Bing SERP is occupied by portfolio review sites '
            'that already rank on dozens of brands.',
            ANGLE.get(r['brand'], 'Straight factual product review.'),
            r['note'][:190]])

print('60 STRONG+MODERATE -> rejected %d (FATAL/SEVERE), held %d (UNVERIFIED_VSL), '
      'eligible %d -> final 15 -> final 10'
      % (len(rejected), len(held), len(eligible)))
print()
print('%-4s %-32s %-16s %-9s %6s %5s %5s %5s %5s %6s  %s'
      % ('#', 'brand', 'vendor', 'tier', 'dem', 'int', 'eco', 'awr', 'q+r',
         'TOTAL', 'quality'))
for r in final15:
    print('%-4d %-32s %-16s %-9s %6.1f %5.1f %5.1f %5.1f %5d %6.1f  %s'
          % (r['rank'], r['brand'][:32], r['vendor'][:16],
             r['tier'].replace('BING_', ''), r['p_dem'], r['p_int'],
             r['p_eco'], r['p_awr'], r['q_pts'] + r['r_pts'], r['total'],
             r['q_tier']))
print()
print('REJECTED (FATAL/SEVERE):')
for r in sorted(rejected, key=lambda x: x['q_tier']):
    print('  %-10s %-30s %s' % (r['q_tier'], r['brand'][:30], r['note'][:88]))
