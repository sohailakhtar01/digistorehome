# -*- coding: utf-8 -*-
"""
SHOBIT ENGINE - PHASE 5 (SERP validation) + PHASE 6 (EMD hypothesis test)
=========================================================================

SERP SOURCE AND ITS LIMITS - READ THIS BEFORE TRUSTING ANY NUMBER HERE
----------------------------------------------------------------------
Bing's own SERP is UNREACHABLE from this environment. Verified 2026-08-24 across
DataForSEO bing live/regular, live/advanced, async task_post/task_get, direct
curl to bing.com/search, and WebFetch. Every route returns a SERP for an
unrelated query (single-token `homesteading` returned Montana history from 1933;
`medicinal garden kit review` returned MySQL Workbench docs).

This file therefore uses **DuckDuckGo Lite** (POST, which survives the URL
corruption that breaks the other routes). DuckDuckGo's web results are sourced
from **Bing's index**, which makes it the closest available proxy - materially
closer than Google. It is NOT identical to Bing: DuckDuckGo applies its own
ranking, filtering and spam handling.

    Every SERP in this file is therefore labelled BING_INDEX_PROXY (DDG-Lite),
    never "Bing". Treat position numbers as indicative, not exact.

VALIDATION
----------
Every capture is checked for the brand token. Unvalidated SERPs are recorded as
NO_VALID_BING_SERP and are NEVER read as low competition.
"""

import csv
import io
import os
import re
import random
import subprocess
import sys
import time
import urllib.parse

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORTS = os.path.join(BASE, 'reports')
CAPTURE_DATE = '2026-08-24'
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/126.0 Safari/537.36')

AUTHORITY = set("""healthline.com webmd.com mayoclinic.org clevelandclinic.org
health.harvard.edu nih.gov ncbi.nlm.nih.gov fda.gov ftc.gov consumerreports.org
forbes.com nytimes.com washingtonpost.com wikipedia.org britannica.com
medicalnewstoday.com drugs.com verywellhealth.com verywellmind.com
examine.com bbc.com cnn.com theguardian.com""".split())
MARKETPLACE = set("""amazon.com walmart.com ebay.com etsy.com target.com
walgreens.com cvs.com goodreads.com barnesandnoble.com booksamillion.com
chewy.com""".split())
UGC = set("""reddit.com quora.com youtube.com facebook.com instagram.com
tiktok.com x.com twitter.com pinterest.com linkedin.com medium.com
substack.com sites.google.com github.com researchgate.net vocal.media
bulbapp.com scribd.com firstory.me scribehow.com""".split())
REVIEWAGG = set("""trustpilot.com sitejabber.com productreview.com.au
bbb.org""".split())


def norm(s):
    s = (s or '').lower().replace('’', "'").replace('‘', "'")
    s = re.sub(r"[^a-z0-9 ]+", ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def slug(s):
    return re.sub(r'[^a-z0-9]', '', norm(s))


def reg_domain(host):
    parts = host.lower().split('.')
    if len(parts) >= 3 and parts[-2] in ('co', 'com', 'org', 'net', 'gov', 'ac'):
        return '.'.join(parts[-3:])
    return '.'.join(parts[-2:]) if len(parts) >= 2 else host


YAHOO = 'https://search.yahoo.com/search?p=%s&ei=UTF-8'
DDG_EPS = ['https://lite.duckduckgo.com/lite/', 'https://html.duckduckgo.com/html/']


def _yahoo(query):
    """Yahoo web results are Bing-syndicated. Links are wrapped in
    r.search.yahoo.com redirects with the real URL in the /RU=<enc>/ segment."""
    p = subprocess.run(
        ['curl', '-s', '--max-time', '35', '-A', UA,
         '-H', 'Accept-Language: en-US,en;q=0.9',
         YAHOO % urllib.parse.quote(query)],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    h = p.stdout.decode('utf-8', 'replace')
    if not h or 'captcha' in h.lower():
        return []
    out, seen = [], set()
    for enc in re.findall(r'/RU=([^/]+)/', h):
        try:
            u = urllib.parse.unquote(enc)
        except Exception:
            continue
        if not u.startswith('http'):
            continue
        host = re.sub(r'^https?://', '', u).split('/')[0].lower()
        if 'yahoo.' in host or 'yimg' in host:
            continue
        if u in seen:
            continue
        seen.add(u)
        out.append((u, ''))
    # titles: Yahoo puts them in <h3 class="title"><a ...>TEXT</a>
    titles = [re.sub(r'<[^>]+>', '', t).strip()
              for t in re.findall(r'<h3[^>]*class="[^"]*title[^"]*"[^>]*>(.*?)</h3>', h, re.S)]
    merged = []
    for i, (u, _) in enumerate(out):
        merged.append((u, titles[i] if i < len(titles) else ''))
    return merged


def _ddg(query, ep):
    p = subprocess.run(
        ['curl', '-s', '--max-time', '35', '-A', UA,
         '-H', 'Accept-Language: en-US,en;q=0.9',
         '--data-urlencode', 'q=%s' % query, ep],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    h = p.stdout.decode('utf-8', 'replace')
    if (not h) or 'captcha' in h.lower() or 'anomaly' in h.lower():
        return []
    out = []
    for u, t in re.findall(r'<a\s[^>]*href="(https?://[^"]+)"[^>]*>(.*?)</a>', h, re.S):
        if 'duckduckgo.com' in u:
            continue
        t = re.sub(r'<[^>]+>', '', t)
        t = (t.replace('&#x27;', "'").replace('&amp;', '&')
              .replace('&quot;', '"').replace('&#39;', "'")).strip()
        out.append((u, t))
    return out


def ddg(query, tries=3):
    """Bing-index proxy. Yahoo (Bing-syndicated) is primary; DuckDuckGo Lite
    (also Bing-sourced) is the cross-check / fallback.

    An empty response from a throttled endpoint is indistinguishable from a
    genuinely empty SERP, so we retry and back off rather than ever reading a
    throttled response as 'no competition'.
    """
    for attempt in range(tries):
        r = _yahoo(query)
        if r:
            return r, None
        time.sleep(6 + 6 * attempt + random.uniform(0, 4))
        r = _ddg(query, DDG_EPS[attempt % len(DDG_EPS)])
        if r:
            return r, None
        time.sleep(10 + 10 * attempt + random.uniform(0, 5))
    return [], 'no results after %d attempts' % tries


def classify(url, title, bslug, btokens):
    host = re.sub(r'^https?://', '', url).split('/')[0].split(':')[0]
    host = host.lower()
    rd = reg_domain(host)
    sld = rd.split('.')[0]
    sub = host[:-len(rd)].rstrip('.') if host.endswith(rd) else ''
    hostslug = re.sub(r'[^a-z0-9]', '', host)

    kinds = []
    if rd in AUTHORITY:
        kinds.append('AUTHORITY')
    if rd in MARKETPLACE:
        kinds.append('MARKETPLACE')
    if rd in UGC:
        kinds.append('UGC/PLATFORM')
    if rd in REVIEWAGG:
        kinds.append('REVIEW_AGGREGATOR')

    emd = ''
    if bslug and bslug in re.sub(r'[^a-z0-9]', '', sld):
        emd = 'EMD_ROOT'
    elif bslug and sub and bslug in re.sub(r'[^a-z0-9]', '', sub):
        emd = 'EMD_SUBDOMAIN'
    elif bslug and bslug in hostslug:
        emd = 'EMD_PARTIAL'
    if emd:
        kinds.append(emd)

    if not kinds:
        kinds.append('SMALL_SITE')

    # brand relevance of this individual result
    nt = norm(title)
    hit = sum(1 for t in btokens if t in nt) / max(1, len(btokens))
    return rd, host, '|'.join(kinds), emd, hit


def analyse(brand, results):
    bslug = slug(brand)
    btokens = [t for t in norm(brand).split() if len(t) > 2]
    rows, kinds_count, emds = [], {}, []
    relevant = 0
    for i, (u, t) in enumerate(results[:10], 1):
        rd, host, kinds, emd, hit = classify(u, t, bslug, btokens)
        if hit >= 0.5:
            relevant += 1
        for k in kinds.split('|'):
            kinds_count[k] = kinds_count.get(k, 0) + 1
        if emd:
            emds.append((i, host, emd))
        rows.append(dict(pos=i, url=u, title=t, domain=rd, host=host,
                         kinds=kinds, emd=emd, brand_hit=round(hit, 2)))
    n = max(1, len(rows))
    valid = relevant >= max(2, n // 3)
    return rows, kinds_count, emds, valid, relevant


def serp_points(kinds_count, n):
    """0-20: could a focused affiliate review page realistically compete?"""
    if n == 0:
        return 0
    auth = kinds_count.get('AUTHORITY', 0)
    mkt = kinds_count.get('MARKETPLACE', 0)
    small = kinds_count.get('SMALL_SITE', 0)
    ugc = kinds_count.get('UGC/PLATFORM', 0)
    pts = 6.0
    pts += 1.6 * min(small, 7)          # small sites rank => we can rank
    pts += 0.5 * min(ugc, 3)            # platform pages = soft targets
    pts -= 3.2 * auth                   # authority publishers = hard stop
    pts -= 1.1 * mkt                    # marketplace = channel conflict
    return max(0.0, min(20.0, pts))


# ---------------------------------------------------------------------------
src = os.path.join(REPORTS, 'market-awareness-evidence.csv')
cands = [r for r in csv.DictReader(io.open(src, encoding='utf-8', newline=''))
         if r['bing_demand_tier'] in ('BING_STRONG', 'BING_MODERATE')]
cands.sort(key=lambda x: (-int(x['branded_search_points']),
                          -float(x['econ_score'])))
LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else 45
cands = cands[:LIMIT]

print('Phase 5/6: capturing %d SERPs via BING_INDEX_PROXY (DDG-Lite)\n'
      % len(cands), file=sys.stderr)

serp_rows, emd_rows, summary = [], [], []
for i, c in enumerate(cands, 1):
    brand = c['brand_name']
    q = '%s review' % brand
    if i > 1:
        time.sleep(4 + random.uniform(0, 4))
    results, err = ddg(q)
    rows, kinds_count, emds, valid, relevant = analyse(brand, results)

    if not results:
        status = 'NO_VALID_BING_SERP'
    elif not valid:
        status = 'NO_VALID_BING_SERP'
    else:
        status = 'VALIDATED'

    pts = serp_points(kinds_count, len(rows)) if status == 'VALIDATED' else 0.0

    for r in rows:
        serp_rows.append(dict(
            brand_name=brand, vendor=c['vendor'], query=q,
            serp_source='BING_INDEX_PROXY (Yahoo/DDG, Bing-sourced)',
            captured=CAPTURE_DATE, validation=status, **r))
    for pos, host, kind in emds:
        emd_rows.append(dict(
            brand_name=brand, vendor=c['vendor'], query=q,
            emd_type=kind, emd_host=host, position=pos,
            serp_source='BING_INDEX_PROXY (Yahoo/DDG, Bing-sourced)',
            captured=CAPTURE_DATE, validation=status))

    summary.append(dict(
        brand_name=brand, vendor=c['vendor'],
        net=c['net_earnings_per_sale_usd'],
        risk_flags=c['risk_flags'],
        bing_demand_tier=c['bing_demand_tier'],
        branded_search_points=int(c['branded_search_points']),
        econ_score=float(c['econ_score']),
        validation=status, results_seen=len(rows), relevant=relevant,
        authority=kinds_count.get('AUTHORITY', 0),
        marketplace=kinds_count.get('MARKETPLACE', 0),
        small_site=kinds_count.get('SMALL_SITE', 0),
        ugc=kinds_count.get('UGC/PLATFORM', 0),
        emd_root=sum(1 for _, _, k in emds if k == 'EMD_ROOT'),
        emd_sub=sum(1 for _, _, k in emds if k == 'EMD_SUBDOMAIN'),
        emd_partial=sum(1 for _, _, k in emds if k == 'EMD_PARTIAL'),
        serp_points=round(pts, 1)))
    print('  [%2d/%2d] %-32s %-18s auth=%d mkt=%d small=%d emd=%d  %s'
          % (i, len(cands), brand[:32], status, kinds_count.get('AUTHORITY', 0),
             kinds_count.get('MARKETPLACE', 0), kinds_count.get('SMALL_SITE', 0),
             len(emds), round(pts, 1)), file=sys.stderr)

with io.open(os.path.join(REPORTS, 'shobit-bing-serp-raw.csv'), 'w',
             encoding='utf-8', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=['brand_name', 'vendor', 'query',
                                       'serp_source', 'captured', 'validation',
                                       'pos', 'url', 'title', 'domain', 'host',
                                       'kinds', 'emd', 'brand_hit'])
    w.writeheader()
    w.writerows(serp_rows)

with io.open(os.path.join(REPORTS, 'emd-bing-evidence.csv'), 'w',
             encoding='utf-8', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=['brand_name', 'vendor', 'query',
                                       'emd_type', 'emd_host', 'position',
                                       'serp_source', 'captured', 'validation'])
    w.writeheader()
    w.writerows(emd_rows)

with io.open(os.path.join(REPORTS, 'shobit-serp-summary.csv'), 'w',
             encoding='utf-8', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=list(summary[0].keys()))
    w.writeheader()
    w.writerows(sorted(summary, key=lambda x: -x['serp_points']))

print('\nwrote shobit-bing-serp-raw.csv, emd-bing-evidence.csv, '
      'shobit-serp-summary.csv')
v = sum(1 for s in summary if s['validation'] == 'VALIDATED')
print('validated %d / %d SERPs' % (v, len(summary)))
print('EMD observations: %d (root=%d sub=%d partial=%d)' % (
    len(emd_rows),
    sum(1 for e in emd_rows if e['emd_type'] == 'EMD_ROOT'),
    sum(1 for e in emd_rows if e['emd_type'] == 'EMD_SUBDOMAIN'),
    sum(1 for e in emd_rows if e['emd_type'] == 'EMD_PARTIAL')))
