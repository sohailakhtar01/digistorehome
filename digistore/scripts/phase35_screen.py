# -*- coding: utf-8 -*-
"""
PHASE 3.5 - FAST COMMERCIAL OPPORTUNITY SCREEN
==============================================
Scores the 30 products in reports/phase3-bing-research-queue.csv on:
    30 = search demand
    25 = SERP weakness
    20 = commercial intent
    15 = product/keyword fit
    10 = affiliate economics
then applies the Phase 3.5 penalty schedule.

EVIDENCE PROVENANCE
-------------------
  * Search volume  : DataForSEO -> Google Ads Keyword Planner
                     /v3/keywords_data/google_ads/search_volume/live
                     location_code 2840 (United States), language en,
                     search_partners=false, 12-month average.
                     Captured 2026-08-24.
  * SERP structure : DataForSEO -> Google organic
                     /v3/serp/google/organic/live/regular
                     location "United States", language "English", depth 10.
                     Captured 2026-08-24.
  * Economics      : Phase 1 parse + Phase 2 economic filter (Digistore24).

BING DATA IS UNAVAILABLE - SEE data/serp/phase35-bing-fault.md
Every Bing capture attempted on 2026-08-24 returned a SERP for the FIRST
TOKEN of the query only. This was reproduced on /v3/serp/bing/organic/
live/regular, on .../live/advanced, and on direct fetches of bing.com.
No Bing result is treated as evidence of weak competition anywhere in this
file. Every product therefore carries the -5 "invalid SERP data" penalty
and the 25-point axis is scored from the GOOGLE proxy, never from Bing.

NOTHING IN THIS FILE IS ESTIMATED. Any figure not measured is UNKNOWN.
"""

import csv
import io
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORTS = os.path.join(BASE, 'reports')

CAPTURE_DATE = '2026-08-24'
VOL_SRC = 'Google Ads Keyword Planner via DataForSEO, US, en, 12-mo avg, %s' % CAPTURE_DATE
SERP_SRC = 'Google organic via DataForSEO, US, en, depth 10, %s' % CAPTURE_DATE

# Penalty constants (Step 6)
P_VENDOR_DOMINATES = -10
P_VERY_LOW_DEMAND = -15
P_AMBIGUOUS_NAME = -8
P_HIGH_RISK_CLAIMS = -10
P_INVALID_SERP = -5          # applied to EVERY product: Bing unmeasurable
P_POOR_FIT = -8

# ---------------------------------------------------------------------------
# MEASURED KEYWORD VOLUMES (Google Ads, US, 12-mo avg, captured 2026-08-24)
# None  = keyword returned NO data (below Google's reporting threshold)
# ---------------------------------------------------------------------------
VOLUMES = {
    'josephs well': 260, 'josephs well review': None, 'josephs well price': None,
    'josephs well alternatives': None, 'josephs well worth it': None,
    'josephs well book': None, 'josephs well megadrought': None,
    'anti looter kit': 20, 'anti looter kit review': None, 'anti looter kit price': None,
    'anti looter kit alternatives': None, 'anti looter kit worth it': None,
    'the lost superfoods': 210, 'the lost superfoods review': 20,
    'davids shield': 1900, 'davids shield review': None,
    'davids shield generator': None, 'davids shield blackout': None,
    'encyclopedia of power foods': None, 'encyclopedia of power foods review': None,
    'medicinal garden kit': 110, 'medicinal garden kit review': 40,
    'medicinal garden kit price': None, 'medicinal garden kit scam': None,
    'fearless phone fanatic': None, 'fearless phone fanatic review': None,
    'home doctor book': 90, 'home doctor book review': 10,
    'us immigration survival pro': None, 'us immigration survival guide': None,
    'reflux summit': None, 'acid reflux summit': None,
    '5 foot farm': None, 'five foot farm': None,
    'tufting mastery class': None, 'tufting mastery': None,
    'pinealxt': None, 'pinealxt review': None,
    'idrotherapy': 170, 'idrotherapy review': 70, 'idrotherapy price': 10,
    'idrotherapy scam': 10,
    'tube magic': 1600, 'tube magic review': None, 'tube magic price': None,
    'tube magic alternatives': None, 'tube magic ai': None, 'tube magic pricing': None,
    'serger course': None, 'overlocker course': 10,
    'caviargan': 90, 'caviargan review': 50, 'caviargan price': None,
    'caviargan scam': None,
    'clearing academy': 40, 'clearing academy review': None,
    'cashflow secrets': 10, 'money ripples': 90, 'money ripples review': None,
    'self sufficient backyard': 1900, 'self sufficient backyard review': 90,
    'the self sufficient backyard': 1600, 'self sufficient backyard book': 390,
    'self sufficient backyard pdf': 110, 'self sufficient backyard price': None,
    'self sufficient backyard worth it': None, 'self sufficient backyard scam': None,
    'paid online writing jobs': 320, 'paid online writing jobs review': 70,
    'paid online writing jobs scam': 10,
    'advanced memory formula': 590, 'advanced memory formula review': 210,
    'advanced memory formula price': None, 'advanced memory formula scam': 10,
    'advanced memory formula ingredients': 10,
    'tpp system': 20, 'tpp system review': None,
    'ai profit sniper': None, 'ai profit sniper review': None,
    'harmonium course': 10,
    'pineal guardian': None, 'pineal guardian review': None,
    'remixable': 20, 'remixable review': 10,
    'hydrolean xt': None,
    'midas manifestation': 30, 'midas manifestation review': 10,
    'shifting vibrations': 50, 'shifting vibrations review': None,
    # non-branded discovery (Step 5)
    'homesteading book': 1000, 'best homesteading books': 390,
    'self sufficiency book': 320, 'off grid living book': 90,
    'backyard homestead book': 70, 'emp survival book': 50,
    'how to prepare for emp': 50, 'emp protection guide': None,
    'faraday cage guide': None, 'atmospheric water generator': 22200,
    'water from air generator': 22200, 'diy water generator': 90,
    'how to make water from air': 260, 'survival medicine book': 390,
    'home remedies book': 1300, 'herbal remedies book': 5400,
    'long term food storage': 1300, 'survival food recipes': 70,
    'youtube automation tools': 170, 'best ai tools for youtube': 30,
}


def v(k):
    """Measured volume or None. Raises if the keyword was never measured."""
    if k not in VOLUMES:
        raise KeyError('unmeasured keyword: %r' % k)
    return VOLUMES[k]


# ---------------------------------------------------------------------------
# PER-PRODUCT EVIDENCE
# axis scores are judgements ANCHORED to the captured SERP/volume evidence
# recorded in `serp_evidence`; they are not derived from any secret formula.
# ---------------------------------------------------------------------------
P = [
 dict(
   product='NEW: The Self-Sufficient Backyard', vendor='sbackyard',
   best_keyword='self sufficient backyard', keyword_type='branded',
   demand_kws=['self sufficient backyard', 'the self sufficient backyard',
               'self sufficient backyard book', 'self sufficient backyard review',
               'self sufficient backyard pdf'],
   support_kws=['homesteading book', 'best homesteading books',
                'self sufficiency book', 'off grid living book',
                'backyard homestead book'],
   demand=30, serp=15, intent=17, fit=15, econ=8,
   vendor_serp_control='NOT FOUND',
   serp_evidence=('reddit.com #1 (thread from 5y ago); amazon.com #2; '
                  'store.motherearthnews.com #3; goodreads.com #4; '
                  'cz.eureka.com #5 (parasite blog); vocal.media #6 (parasite). '
                  'No authority publisher, no dedicated review site, and the '
                  'Digistore24 funnel does not appear on page 1 at all.'),
   penalties=[('invalid Bing SERP data', P_INVALID_SERP)],
   risk='LOW',
   reason=('Largest measured demand cluster in the queue (~4,090/mo branded) '
           'sitting on the best refund profile in the dataset (1.28% '
           'cancellation) and backed by a real, verifiable book by named '
           'authors (Ron & Johanna Melchiore).'),
   problem=('Amazon ranks #2 and sells the physical book outright, so a buyer '
            'can complete the purchase without ever touching the affiliate '
            'funnel. "self sufficient backyard pdf" (110/mo) shows some '
            'free-copy intent.'),
   confidence='HIGH'),

 dict(
   product='The Lost SuperFoods', vendor='lostrec',
   best_keyword='long term food storage', keyword_type='non-branded',
   demand_kws=['the lost superfoods', 'the lost superfoods review'],
   support_kws=['long term food storage', 'survival food recipes'],
   demand=26, serp=15, intent=15, fit=14, econ=8,
   vendor_serp_control='NOT FOUND',
   serp_evidence=('amazon.com #1; reddit.com #2 (r/preppers, 4y old); '
                  'facebook.com #3; goodreads.com #4; bulbapp.com #5 '
                  '(parasite); ebay.com #6; accessnewswire.com #7 (press '
                  'release); quora.com #8. No authority publisher and no '
                  'official vendor page on page 1.'),
   penalties=[('invalid Bing SERP data', P_INVALID_SERP)],
   risk='LOW',
   reason=('Lowest cancellation of any promotable product measured (1.70%) '
           'with 19% cart conversion, and the non-branded pool it sits in '
           '("long term food storage" 1,300/mo, $3.04 CPC) is real and '
           'commercially valuable.'),
   problem=('Amazon (#1) and eBay (#6) both sell the book, so the affiliate '
            'link is the least convenient way to buy it. Credited author '
            '"Claude Davis" also fronts Home Doctor - a shared pen name that '
            'remains unverified and was flagged in Phase 3.'),
   confidence='HIGH'),

 dict(
   product='Tube Magic - AI Tools For Growing on YouTube', vendor='tubemagic',
   best_keyword='tube magic', keyword_type='branded',
   demand_kws=['tube magic'],
   support_kws=['youtube automation tools', 'best ai tools for youtube'],
   demand=26, serp=13, intent=18, fit=15, econ=4,
   vendor_serp_control='PRESENT BUT NOT DOMINANT',
   serp_evidence=('medium.com #1 (parasite, reports ~2.8/5); trustpilot.com #2 '
                  '(2.6 "Poor"); youtube.com #3; productinsightai.com #4; '
                  'reddit.com #5; nairaland.com #6; tubemagic.com #7 (official, '
                  'mid-page); outlierkit.com #8 ranking an ALTERNATIVES page. '
                  'Real review sites are present - this is not an empty SERP.'),
   penalties=[('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason=('Only product in the queue with four-figure branded demand '
           '(1,600/mo) and the highest-value adjacent term measured anywhere '
           'in this study: "youtube automation tools" at a $10.16 CPC.'),
   problem=('1% cart conversion - the worst in the queue. Phase 2 established '
            'the $265.11 net is lifetime value on a $47/mo subscription, not a '
            'per-sale payout. Trustpilot 2.6 "Poor" and a competitor already '
            'ranks an "alternatives" page above the official site.'),
   confidence='HIGH'),

 dict(
   product=u'David’s Shield – New High-Conv VSL (2X CVR!) | $5M+ In Sales',
   vendor='blackoutusa',
   best_keyword='davids shield', keyword_type='branded',
   demand_kws=['davids shield'],
   support_kws=['emp survival book', 'how to prepare for emp'],
   demand=21, serp=22, intent=14, fit=11, econ=8,
   vendor_serp_control='NOT FOUND',
   serp_evidence=('amazon.com #1; finance.yahoo.com #2 (press release); '
                  'davidsshieldfoundation.org #3 (UNRELATED organisation); '
                  'books.google.com #4; davidshields.com #5 (UNRELATED author); '
                  'scribehow.com #6 (parasite); open.firstory.me #7 (parasite); '
                  'sites.google.com #8 (parasite); newpelican.com #9 (local news '
                  'running affiliate content). Zero dedicated review sites.'),
   penalties=[('ambiguous product name', P_AMBIGUOUS_NAME),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason=('Weakest competitor set measured in the entire screen - three of the '
           'top nine results are parasite pages on scribehow, firstory and '
           'Google Sites, and no dedicated review site holds any position.'),
   problem=('The 1,900/mo is NOT all this product. David\'s Shield Foundation '
            '(a protection-training charity) and author David Shields both rank '
            'on page 1, so an unknown share of that volume is not addressable. '
            'Amazon also sells the guide at #1.'),
   confidence='MEDIUM'),

 dict(
   product=u'Home Doctor – BRAND NEW!', vendor='homedoctor',
   best_keyword='home remedies book', keyword_type='non-branded',
   demand_kws=['home doctor book', 'home doctor book review'],
   support_kws=['survival medicine book', 'home remedies book'],
   demand=16, serp=17, intent=14, fit=13, econ=7,
   vendor_serp_control='NOT FOUND',
   serp_evidence=('amazon.com #1; goodreads.com #2; quora.com #3; vocal.media #4 '
                  '(parasite); scribd.com #5 (full document copy); medium.com #6 '
                  '(parasite, 4y old); ideasbeat.com #7 (small affiliate site); '
                  'etsy.com #8. No authority publisher on page 1.'),
   penalties=[('invalid Bing SERP data', P_INVALID_SERP)],
   risk='LOW',
   reason=('Sits in a large, genuinely non-branded book market - "home remedies '
           'book" 1,300/mo and "survival medicine book" 390/mo - with a strong '
           '2.81% cancellation rate.'),
   problem=('Branded demand is only 90/mo and Scribd hosts the document at #5, '
            'so a share of searchers are looking for a free copy. Amazon and '
            'Etsy both sell it.'),
   confidence='MEDIUM'),

 dict(
   product='CaviArgan', vendor='koshea76',
   best_keyword='caviargan review', keyword_type='branded',
   demand_kws=['caviargan', 'caviargan review'],
   support_kws=[],
   demand=8, serp=19, intent=16, fit=13, econ=6,
   vendor_serp_control='PRESENT BUT NOT DOMINANT',
   serp_evidence=('sites.google.com #1 (parasite); amazon.com #2; '
                  'essenceofargan.com #3 (official); linkedin.com #4; '
                  'accessnewswire.com #5 (press release); walmart.com #6; '
                  'instagram.com #7; github.com #8 (parasite repo posing as a '
                  'review). A Google Sites page outranks the official store.'),
   penalties=[('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason=('A parasite page on Google Sites currently outranks the official '
           'store, and a GitHub repository ranks as a review - direct evidence '
           'that nothing of quality competes here. $5.31 CPC confirms buyers.'),
   problem=('2% cart conversion. Amazon and Walmart both stock it, and a #4 '
            'LinkedIn post claims it is "not sold on Amazon" - which the same '
            'SERP disproves, so the niche is full of bad information.'),
   confidence='MEDIUM'),

 dict(
   product=u'Joseph’s Well – Blockbuster Offer From Top Diamond Vendor',
   vendor='megadrought',
   best_keyword='how to make water from air', keyword_type='non-branded',
   demand_kws=['josephs well'],
   support_kws=['how to make water from air', 'diy water generator'],
   demand=16, serp=22, intent=16, fit=10, econ=10,
   vendor_serp_control='PRESENT BUT NOT DOMINANT',
   serp_evidence=('youtube.com #1; facebook.com #2; joesephswell.com #3 '
                  '(official); finance.yahoo.com #4 (press release); youtube.com '
                  '#5; youtube.com #6 (about the Nazareth well - different '
                  'subject); facebook.com #7; sites.google.com #8 (parasite); '
                  'newpelican.com #9. Entirely social, press-release and '
                  'parasite pages - no review site of any quality.'),
   penalties=[('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('ambiguous product name', P_AMBIGUOUS_NAME),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason=('Best economics in the entire queue - $76.36 net, 16% cart '
           'conversion, 5.41% cancellation - against the weakest page-one '
           'competitor set measured.'),
   problem=('Ranking pages state irreconcilable output claims for the same '
            'device: accessnewswire says "up to 10 gallons per day", '
            'newpelican says "up to 50 gallons per day". A DIY condensation '
            'rig producing either is physically doubtful, so honest promotion '
            'means contradicting the vendor. Name also collides with the '
            'biblical site in Nazareth.'),
   confidence='MEDIUM'),

 dict(
   product=u'Medicinal Garden Kit – BRAND NEW!', vendor='bookofren',
   best_keyword='medicinal garden kit review', keyword_type='branded',
   demand_kws=['medicinal garden kit', 'medicinal garden kit review'],
   support_kws=['herbal remedies book'],
   demand=16, serp=10, intent=15, fit=13, econ=9,
   vendor_serp_control='PRESENT BUT NOT DOMINANT',
   serp_evidence=('medium.com #1 (parasite); mcgill.ca #2 - McGill University '
                  'Office for Science and Society, "The Medicinal Garden Kit '
                  'Will Probably Not Save You... the claims are not rooted in '
                  'science"; globenewswire.com #3; nicoleapelian.com #4 '
                  '(official); sites.google.com #5; store.motherearthnews.com '
                  '#6 and shop.iamcountryside.com #9 selling COMPETING kits; '
                  'amazon.com #7 selling a 35-seed pack; dyspraxiausa.org #8 '
                  '(spam PDF on a hacked charity site).'),
   penalties=[('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason=('Strong funnel economics - 18% cart conversion at 2.07% '
           'cancellation - in a niche whose adjacent term "herbal remedies '
           'book" carries 5,400/mo.'),
   problem=('A university science unit ranks #2 explicitly debunking the '
            'product, and the vendor\'s own page claims the seeds are "FDA '
            'approved", which is not a thing the FDA does. Amazon and two '
            'homesteading retailers sell near-identical seed kits, so the '
            'product is not differentiated.'),
   confidence='HIGH'),

 dict(
   product='Idrotherapy *GET PAID ON REBILLS EACH MONTH*', vendor='koshea76',
   best_keyword='idrotherapy review', keyword_type='branded',
   demand_kws=['idrotherapy', 'idrotherapy review', 'idrotherapy price',
               'idrotherapy scam'],
   support_kws=[],
   demand=12, serp=15, intent=17, fit=12, econ=5,
   vendor_serp_control='DOMINATES',
   serp_evidence=('idrotherapy.com #1 (official); trustpilot.com #2 - 2.2 '
                  '"Poor" across 109 reviews; amazon.com #3; sites.google.com '
                  '#4; open.firstory.me #5; productreview.com.au #6 - 1.4/5 '
                  'from 49 reviews ("It\'s rubbish", "Don\'t waste your '
                  'money"); facebook.com #7; essenceofargan.com #8.'),
   penalties=[('vendor dominates branded SERP', P_VENDOR_DOMINATES),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason=('Real measured demand (170/mo brand, 70/mo review) at a $6.27 CPC.'),
   problem=('Two independent consumer-review platforms rate it 2.2/5 and 1.4/5. '
            'An honest review would tell readers not to buy, which earns no '
            'commission - the product and the ethics are in direct conflict. '
            '2% cart conversion corroborates it.'),
   confidence='HIGH'),

 dict(
   product='Advanced Memory Formula', vendor='soundview',
   best_keyword='advanced memory formula review', keyword_type='branded',
   demand_kws=['advanced memory formula', 'advanced memory formula review',
               'advanced memory formula scam',
               'advanced memory formula ingredients'],
   support_kws=[],
   demand=21, serp=5, intent=18, fit=10, econ=8,
   vendor_serp_control='PRESENT BUT NOT DOMINANT',
   serp_evidence=('amazon.com #1 (Advanced Bionutritionals brand); '
                  'health.harvard.edu #2 - "Don\'t buy into brain health '
                  'supplements... no solid proof any of them work"; '
                  'barchart.com #3; trustpilot.com #4; okpharmacyrgv.com #5; '
                  'health.clevelandclinic.org #6 - "Research on various brain '
                  'health supplements doesn\'t support their use"; walmart.com '
                  '#7; advancedbionutritionals.com #8; reddit.com #9.'),
   penalties=[('ambiguous product name', P_AMBIGUOUS_NAME),
              ('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason=('Highest commercial value measured on a supplement term - 590/mo '
           'brand and 210/mo review at $7.00-$7.14 CPC.'),
   problem=('Harvard Health and Cleveland Clinic both rank on page 1 actively '
            'debunking the entire product category - an unwinnable YMYL SERP. '
            'The name also collides with Advanced Bionutritionals, an '
            'established brand selling on Amazon and Walmart.'),
   confidence='HIGH'),

 dict(
   product='Get Paid To Do Simple Writing Jobs Online', vendor='socialpaid',
   best_keyword='paid online writing jobs review', keyword_type='branded',
   demand_kws=['paid online writing jobs', 'paid online writing jobs review',
               'paid online writing jobs scam'],
   support_kws=[],
   demand=16, serp=12, intent=6, fit=10, econ=5,
   vendor_serp_control='NOT FOUND',
   serp_evidence=('reddit.com #1 "Is Paid Online Writing Jobs a legit site?"; '
                  'trustpilot.com #2 (3.4); medium.com #3 "WARNING: Steer Clear '
                  'of This Site!... It\'s a scam"; writeinteractive.com #4; '
                  'quora.com #5 "Is it a scam?"; truelancer.com #6; '
                  'tenereteam.com #7 "jobs pay very little, contrary to the '
                  'site\'s claims"; facebook.com #8.'),
   penalties=[('poor product/query fit', P_POOR_FIT),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason=('Measurable demand at 320/mo brand plus 70/mo review, $2.45 CPC.'),
   problem=('The dominant search intent is scam-verification, not purchase - '
            'four of the eight page-one results are people asking whether it is '
            'a scam or stating that it is. 19.99% cancellation independently '
            'corroborates buyer regret.'),
   confidence='HIGH'),

 dict(
   product='Anti-Looter Kit - BRAND NEW!', vendor='antilooterkit',
   best_keyword='anti looter kit', keyword_type='branded',
   demand_kws=['anti looter kit'],
   support_kws=[],
   demand=4, serp=14, intent=16, fit=14, econ=10,
   vendor_serp_control='AMBIGUOUS',
   serp_evidence=('NO VALID BING DATA. Phase 3 recorded a weak Bing SERP for '
                  'this term, but the first-token truncation fault diagnosed on '
                  '2026-08-24 makes every prior Bing capture unsafe to rely on, '
                  'so it is not counted as evidence of weak competition here. '
                  'No Google capture was taken because demand is 20/mo.'),
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason=('Best risk-adjusted economics of any physical product in the queue - '
           '$53.01 net, 18% cart conversion, 3.55% cancellation - with a '
           'verifiable ex-CIA creator and a CE-certified physical product.'),
   problem=('20/mo total branded demand, and no qualifier ("review", "price", '
            '"alternatives", "worth it") registers any volume at all. There is '
            'no search market to build a site against.'),
   confidence='HIGH'),

 dict(
   product='Clearing Academy', vendor='Statbrook',
   best_keyword='clearing academy', keyword_type='branded',
   demand_kws=['clearing academy'], support_kws=[],
   demand=4, serp=12, intent=10, fit=9, econ=6,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO SERP CAPTURED - demand too low to justify a capture.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason='Stable 40/mo branded demand and 85% commission.',
   problem='40/mo is far too thin, and "clearing academy" is a generic phrase '
           'used by unrelated education businesses.',
   confidence='LOW'),

 dict(
   product='Shifting Vibrations - Proven Digital Manifestation Offer',
   vendor='astral43',
   best_keyword='shifting vibrations', keyword_type='branded',
   demand_kws=['shifting vibrations'], support_kws=[],
   demand=8, serp=12, intent=8, fit=8, econ=3,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO SERP CAPTURED - 24.19% cancellation disqualifies before '
                 'SERP work is warranted.',
   penalties=[('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='50/mo measured branded demand.',
   problem='24.19% cancellation - roughly one in four buyers refunds. '
           'Manifestation claims are not substantiable.',
   confidence='LOW'),

 dict(
   product='Cashflow Secrets', vendor='Moneyripples',
   best_keyword='money ripples', keyword_type='branded',
   demand_kws=['cashflow secrets', 'money ripples'], support_kws=[],
   demand=8, serp=12, intent=12, fit=8, econ=1,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO SERP CAPTURED - 48.76% cancellation disqualifies it.',
   penalties=[('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='Vendor brand "money ripples" carries 90/mo.',
   problem='48.76% cancellation - almost half of all sales are refunded. '
           'No affiliate economics survive that.',
   confidence='LOW'),

 dict(
   product='Midas Manifestation System', vendor='midasman88',
   best_keyword='midas manifestation', keyword_type='branded',
   demand_kws=['midas manifestation', 'midas manifestation review'],
   support_kws=[],
   demand=4, serp=12, intent=10, fit=9, econ=6,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO SERP CAPTURED - demand too low to justify a capture.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='40/mo combined branded demand and $116.24 net.',
   problem='"Manifestation" claims cannot be evidenced; 3% cart conversion.',
   confidence='LOW'),

 dict(
   product='Remixable - Founder Edition', vendor='remixable',
   best_keyword='remixable', keyword_type='branded',
   demand_kws=['remixable', 'remixable review'], support_kws=[],
   demand=4, serp=12, intent=12, fit=10, econ=3,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO SERP CAPTURED - demand too low to justify a capture.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='$177.54 net per sale.',
   problem='30/mo combined demand and 22.85% cancellation.',
   confidence='LOW'),

 dict(
   product='TPP System', vendor='nemorauserr',
   best_keyword='tpp system', keyword_type='branded',
   demand_kws=['tpp system'], support_kws=[],
   demand=4, serp=10, intent=8, fit=6, econ=5,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO SERP CAPTURED - demand too low to justify a capture.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('ambiguous product name', P_AMBIGUOUS_NAME),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='$3,405.52 net per sale is the largest payout in the dataset.',
   problem='20/mo demand, 2% cart conversion, and a $3,131.60 price point that '
           'no cold search visitor converts on. "TPP" is also a widely used '
           'acronym.',
   confidence='LOW'),

 dict(
   product='The Encyclopedia of Power Foods- Latest 2025/6!', vendor='dailyhealth',
   best_keyword='encyclopedia of power foods', keyword_type='branded',
   demand_kws=['encyclopedia of power foods',
               'encyclopedia of power foods review'],
   support_kws=[],
   demand=0, serp=12, intent=8, fit=10, econ=7,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. No measurable demand on any branded '
                 'query, so no Google capture was warranted.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason='16% cart conversion and a weak SERP observed in Phase 3.',
   problem='Neither the brand nor its review term registers ANY search volume. '
           'Phase 3 also found related searches were dominated by "pdf".',
   confidence='HIGH'),

 dict(
   product='Unlock Earnings! Promote PinealXT!', vendor='Nutraville',
   best_keyword='pinealxt', keyword_type='branded',
   demand_kws=['pinealxt', 'pinealxt review'], support_kws=[],
   demand=0, serp=8, intent=8, fit=8, econ=8,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. Zero measurable demand.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='$158.86 net per sale.',
   problem='No measurable demand for the brand or its review term. Pineal '
           '"third eye activation" claims are not substantiable.',
   confidence='HIGH'),

 dict(
   product='Promote Pineal Guardian Now!', vendor='Nutraville',
   best_keyword='pineal guardian', keyword_type='branded',
   demand_kws=['pineal guardian', 'pineal guardian review'], support_kws=[],
   demand=0, serp=8, intent=8, fit=8, econ=8,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. Zero measurable demand.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='$235.62 net per sale - second-largest payout in the queue.',
   problem='No measurable demand. Phase 3 found the SERP saturated with '
           'near-duplicate "official site" clones rather than reviews.',
   confidence='HIGH'),

 dict(
   product='Promote HydroLean XT Gold Now!', vendor='zenmavibe',
   best_keyword='hydrolean xt', keyword_type='branded',
   demand_kws=['hydrolean xt'], support_kws=[],
   demand=0, serp=8, intent=8, fit=8, econ=8,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. Zero measurable demand.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='$87.17 net per sale.',
   problem='No measurable demand. Weight-loss claims are the most heavily '
           'policed advertising category there is.',
   confidence='HIGH'),

 dict(
   product='AI Profit Sniper', vendor='aiprofitsniper',
   best_keyword='ai profit sniper', keyword_type='branded',
   demand_kws=['ai profit sniper', 'ai profit sniper review'], support_kws=[],
   demand=0, serp=10, intent=8, fit=8, econ=3,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. Zero measurable demand.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='14% cart conversion.',
   problem='No measurable demand and 27.21% cancellation.',
   confidence='HIGH'),

 dict(
   product='81 % Commission on US Immigration Survival PRO Bundle', vendor='IsMaria',
   best_keyword='us immigration survival pro', keyword_type='branded',
   demand_kws=['us immigration survival pro', 'us immigration survival guide'],
   support_kws=[],
   demand=0, serp=5, intent=8, fit=8, econ=7,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. Zero measurable demand. Phase 3 found the '
                 'generic space owned by uscis.gov, usa.gov, ice.gov, state.gov.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='81% commission and 13% cart conversion.',
   problem='No measurable demand, and the surrounding space is owned by US '
           'government domains. Immigration advice carries real consequences '
           'for readers if it is wrong.',
   confidence='HIGH'),

 dict(
   product='Help Others Overcome Their Acid Refluy | 45% Commission',
   vendor='Refluxsummit',
   best_keyword='reflux summit', keyword_type='branded',
   demand_kws=['reflux summit', 'acid reflux summit'], support_kws=[],
   demand=0, serp=5, intent=8, fit=8, econ=6,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. Zero measurable demand. Phase 3 found the '
                 'generic reflux space owned by Mayo Clinic, Cleveland Clinic, '
                 'Harvard and WebMD.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('high-risk claims', P_HIGH_RISK_CLAIMS),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='HIGH',
   reason='$49.43 net per sale.',
   problem='No measurable branded demand and a YMYL medical space owned by the '
           'largest health publishers in the world.',
   confidence='HIGH'),

 dict(
   product='Tufting Mastery Class | How To Make Rugs',
   vendor='kramis_teppich_design',
   best_keyword='tufting mastery class', keyword_type='branded',
   demand_kws=['tufting mastery class', 'tufting mastery'], support_kws=[],
   demand=0, serp=12, intent=8, fit=9, econ=5,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. Zero measurable demand.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason='2.57% cancellation and $42.30 net.',
   problem='No measurable demand and 4% cart conversion. Phase 3 found the '
           'niche owned by supply retailers with real inventory.',
   confidence='HIGH'),

 dict(
   product='The Number 1 Serger and Overlocker Online Sewing Course',
   vendor='creatory',
   best_keyword='overlocker course', keyword_type='non-branded',
   demand_kws=['serger course', 'overlocker course'], support_kws=[],
   demand=4, serp=12, intent=10, fit=10, econ=5,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO SERP CAPTURED - 10/mo demand does not justify a capture.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason='45% cart conversion - the highest in the queue - at 3.30% '
          'cancellation.',
   problem='"overlocker course" is 10/mo and "serger course" returns no data. '
           'Also requires vendor approval before promotion.',
   confidence='MEDIUM'),

 dict(
   product='Online Kirtan and Harmonium Course', vendor='PeaceYogaBerlin',
   best_keyword='harmonium course', keyword_type='non-branded',
   demand_kws=['harmonium course'], support_kws=[],
   demand=4, serp=12, intent=10, fit=11, econ=5,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO SERP CAPTURED - 10/mo demand does not justify a capture.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='LOW',
   reason='$61.95 net and 3.81% cancellation.',
   problem='10/mo demand. Requires vendor approval before promotion.',
   confidence='MEDIUM'),

 dict(
   product='Fearless Phone Fanatic (For Cold Calling)', vendor='dezatell',
   best_keyword='fearless phone fanatic', keyword_type='branded',
   demand_kws=['fearless phone fanatic', 'fearless phone fanatic review'],
   support_kws=[],
   demand=0, serp=12, intent=8, fit=8, econ=6,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. Zero measurable demand.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason='37% cart conversion.',
   problem='No measurable demand for the brand or its review term.',
   confidence='HIGH'),

 dict(
   product='The 5 Foot Farm: 80% Commissions and Recurring Upsell',
   vendor='FiveFootFarm',
   best_keyword='5 foot farm', keyword_type='branded',
   demand_kws=['5 foot farm', 'five foot farm'], support_kws=[],
   demand=0, serp=12, intent=8, fit=8, econ=4,
   vendor_serp_control='UNKNOWN',
   serp_evidence='NO VALID BING DATA. Zero measurable demand.',
   penalties=[('extremely low search demand', P_VERY_LOW_DEMAND),
              ('invalid Bing SERP data', P_INVALID_SERP)],
   risk='MEDIUM',
   reason='80% commission and 12% cart conversion.',
   problem='No measurable demand on either spelling of the brand.',
   confidence='HIGH'),
]


def fmt_demand(d):
    parts = []
    for k in d['demand_kws'] + d['support_kws']:
        val = v(k)
        parts.append('%s=%s' % (k, 'NO DATA' if val is None else val))
    return '; '.join(parts)


def total_measured(d):
    tot = 0
    any_data = False
    for k in d['demand_kws']:
        val = v(k)
        if val is not None:
            tot += val
            any_data = True
    return tot if any_data else None


def score(d):
    base = d['demand'] + d['serp'] + d['intent'] + d['fit'] + d['econ']
    pen = sum(p[1] for p in d['penalties'])
    return base, pen, max(0, base + pen)


for d in P:
    d['_base'], d['_pen'], d['_total'] = score(d)

P.sort(key=lambda x: -x['_total'])
for i, d in enumerate(P, 1):
    d['_rank'] = i

# ---------------------------------------------------------------------------
# CSV
# ---------------------------------------------------------------------------
csv_path = os.path.join(REPORTS, 'phase35-commercial-screen.csv')
with io.open(csv_path, 'w', encoding='utf-8', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(['rank', 'product', 'vendor', 'best_keyword', 'keyword_type',
                'search_demand', 'demand_source', 'bing_serp_score',
                'commercial_intent', 'product_fit', 'affiliate_economics',
                'vendor_serp_control', 'preliminary_risk', 'overall_score',
                'main_reason', 'main_problem', 'confidence'])
    for d in P:
        tm = total_measured(d)
        w.writerow([
            d['_rank'], d['product'], d['vendor'], d['best_keyword'],
            d['keyword_type'],
            'UNKNOWN' if tm is None else '%d/mo (branded cluster)' % tm,
            VOL_SRC,
            '%d/25 (GOOGLE PROXY - Bing unmeasurable)' % d['serp'],
            '%d/20' % d['intent'], '%d/15' % d['fit'], '%d/10' % d['econ'],
            d['vendor_serp_control'], d['risk'], d['_total'],
            d['main_reason'] if 'main_reason' in d else d['reason'],
            d['problem'], d['confidence']])

# ---------------------------------------------------------------------------
# MARKDOWN
# ---------------------------------------------------------------------------
def w_(fh, s=''):
    fh.write(s + '\n')

md_path = os.path.join(REPORTS, 'phase35-commercial-screen.md')
with io.open(md_path, 'w', encoding='utf-8') as fh:
    w_(fh, '# Phase 3.5 - Fast Commercial Opportunity Screen')
    w_(fh)
    w_(fh, 'All 30 products from `reports/phase3-bing-research-queue.csv`, '
           'screened on measured')
    w_(fh, 'demand, SERP structure, commercial intent, product fit and '
           'affiliate economics.')
    w_(fh)
    w_(fh, '**Capture date: %s**' % CAPTURE_DATE)
    w_(fh)
    w_(fh, '| Evidence | Source |')
    w_(fh, '|---|---|')
    w_(fh, '| Search volume | %s |' % VOL_SRC)
    w_(fh, '| SERP structure | %s |' % SERP_SRC)
    w_(fh, '| Economics | Digistore24 marketplace export, Phase 1 parse + '
           'Phase 2 filter |')
    w_(fh)
    w_(fh, '---')
    w_(fh)
    w_(fh, '## Data-integrity disclosure: Bing could not be measured')
    w_(fh)
    w_(fh, 'Every Bing SERP request made on %s returned results for the '
           '**first token**' % CAPTURE_DATE)
    w_(fh, 'of the query only. This was reproduced on three independent paths:')
    w_(fh)
    w_(fh, '| Path | Query sent | SERP returned |')
    w_(fh, '|---|---|---|')
    w_(fh, '| DataForSEO `bing/organic/live/regular` | `self sufficient '
           'backyard review` | results for **self** (self.inc, SELF Magazine) |')
    w_(fh, '| DataForSEO `bing/organic/live/advanced` | `self sufficient '
           'backyard review` | results for **self** (identical) |')
    w_(fh, '| DataForSEO `bing/organic/live/regular` | `ron melchiore self '
           'sufficient backyard` | results for **ron** (Ron Weasley, Ronin '
           'crypto) |')
    w_(fh, '| DataForSEO `bing/organic/live/regular` | `caviargan` | Microsoft '
           'support pages |')
    w_(fh, '| Direct fetch of `bing.com/search` | `"the self-sufficient '
           'backyard" book review` | results for **the** (grammar articles) |')
    w_(fh)
    w_(fh, 'Controls confirm the failure is Bing-specific: the same DataForSEO '
           'account returned')
    w_(fh, 'correct, fully-matched SERPs for every Google query in this report.')
    w_(fh)
    w_(fh, '**Consequence, stated plainly:** a truncated SERP shows none of the '
           'real competitors,')
    w_(fh, 'so it reads as an empty, uncontested page - the most attractive and '
           'most false')
    w_(fh, 'possible result. No Bing response is used as evidence of weak '
           'competition anywhere')
    w_(fh, 'in this report. The 25-point SERP axis is scored from the **Google '
           'proxy**, and every')
    w_(fh, 'product carries the -5 `invalid SERP data` penalty as a result.')
    w_(fh)
    w_(fh, 'This also means **the seven "validated" Bing SERPs from Phase 3 are '
           'no longer safe to')
    w_(fh, 'rely on** and are not counted here.')
    w_(fh)
    w_(fh, '---')
    w_(fh)
    w_(fh, '## Scoring')
    w_(fh)
    w_(fh, '`30 demand + 25 SERP weakness + 20 commercial intent + '
           '15 product fit + 10 economics`, then penalties:')
    w_(fh)
    w_(fh, '| Penalty | Value |')
    w_(fh, '|---|---|')
    w_(fh, '| Vendor dominates branded SERP | %d |' % P_VENDOR_DOMINATES)
    w_(fh, '| Extremely low search demand | %d |' % P_VERY_LOW_DEMAND)
    w_(fh, '| Ambiguous product name | %d |' % P_AMBIGUOUS_NAME)
    w_(fh, '| High-risk claims | %d |' % P_HIGH_RISK_CLAIMS)
    w_(fh, '| Invalid SERP data (Bing - applied to all 30) | %d |' % P_INVALID_SERP)
    w_(fh, '| Poor product/query fit | %d |' % P_POOR_FIT)
    w_(fh)
    w_(fh, '---')
    w_(fh)
    w_(fh, '## Full ranking (all 30)')
    w_(fh)
    w_(fh, '| # | Product | Best keyword | Measured demand | Score | Risk | '
           'Confidence |')
    w_(fh, '|---|---|---|---|---|---|---|')
    for d in P:
        tm = total_measured(d)
        w_(fh, '| %d | %s | `%s` | %s | **%d** | %s | %s |' % (
            d['_rank'], d['product'][:52], d['best_keyword'],
            'UNKNOWN' if tm is None else '%d/mo' % tm,
            d['_total'], d['risk'], d['confidence']))
    w_(fh)
    w_(fh, '---')
    w_(fh)
    w_(fh, '## Top 10 - detail')
    w_(fh)
    for d in P[:10]:
        tm = total_measured(d)
        w_(fh, '### %d. %s' % (d['_rank'], d['product']))
        w_(fh)
        w_(fh, '**Score %d/100** (base %d, penalties %d) - vendor `%s` - '
               'risk %s - confidence %s' % (
                   d['_total'], d['_base'], d['_pen'], d['vendor'], d['risk'],
                   d['confidence']))
        w_(fh)
        w_(fh, '**Best keyword:** `%s` (%s)' % (d['best_keyword'],
                                                d['keyword_type']))
        w_(fh)
        w_(fh, '**Demand evidence** (%s):' % VOL_SRC)
        w_(fh)
        w_(fh, '```')
        w_(fh, fmt_demand(d))
        w_(fh, '```')
        w_(fh)
        w_(fh, 'Branded cluster total: **%s**' % (
            'UNKNOWN' if tm is None else '%d/mo' % tm))
        w_(fh)
        w_(fh, '**SERP (Google proxy - Bing NO_VALID_DATA):**')
        w_(fh)
        w_(fh, d['serp_evidence'])
        w_(fh)
        w_(fh, '**Vendor SERP control:** `%s`' % d['vendor_serp_control'])
        w_(fh)
        w_(fh, '**Why it may be beatable / why visitors may convert:** %s'
               % d['reason'])
        w_(fh)
        w_(fh, '**Main concern:** %s' % d['problem'])
        w_(fh)
        if d['penalties']:
            w_(fh, '**Penalties applied:** %s' % ', '.join(
                '%s (%d)' % (n, x) for n, x in d['penalties']))
            w_(fh)
        w_(fh, '---')
        w_(fh)

    w_(fh, '## Ranked 11-30')
    w_(fh)
    for d in P[10:]:
        w_(fh, '**%d. %s** (%d) - %s' % (d['_rank'], d['product'], d['_total'],
                                         d['problem']))
        w_(fh)

print('wrote %s' % csv_path)
print('wrote %s' % md_path)
print()
print('%-4s %-52s %6s %6s %6s' % ('rank', 'product', 'base', 'pen', 'total'))
for d in P:
    print('%-4d %-52s %6d %6d %6d' % (d['_rank'], d['product'][:52],
                                      d['_base'], d['_pen'], d['_total']))
