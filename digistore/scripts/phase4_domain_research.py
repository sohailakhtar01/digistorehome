# -*- coding: utf-8 -*-
"""
PHASE 4 - DOMAIN RESEARCH FOR THE TOP 5
=======================================
Authorised only now: Phase 3.5 selected the TOP 5, which was the gate condition
stated in the project rules ("Do not perform domain availability checks until the
TOP 5 are selected").

METHOD
------
Availability is checked against RDAP, the IANA-mandated successor to WHOIS, served
by the authoritative registry for each TLD:

    .com / .net  ->  https://rdap.verisign.com/{tld}/v1/domain/{name}
    .org         ->  https://rdap.publicinterestregistry.org/rdap/domain/{name}

    HTTP 200 = REGISTERED   (registry returns the domain object)
    HTTP 404 = AVAILABLE    (registry has no such object)
    anything else = UNKNOWN (never guessed)

This is registry truth, not a reseller's search box, so there is no upsell bias and
no risk of a lookup being front-run. It is still a point-in-time reading: a domain
reported available on this date can be taken by someone else at any moment.

DOMAIN STRATEGY
---------------
Deliberately NOT exact-match-domain-first. Phase 3 measured five EMDs in live
SERPs and not one ranked #1 (medicinalgardenkit.net #9, encyclopediaofpowerfoods.com
#9, tubemagic-review.com #8, medicinalgardenkit.org paid-ads-only). Candidates are
therefore built around the PROBLEM-LED clusters that carry the measured demand.

No candidate reproduces a vendor's brand in a way that would pass itself off as the
official site. Brand-review domains are included only where the construction is
plainly a third-party review, and are flagged for trademark review before purchase.
"""

import json
import os
import subprocess
import sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORTS = os.path.join(BASE, 'reports')
CAPTURE_DATE = '2026-08-24'

RDAP = {
    'com': 'https://rdap.verisign.com/com/v1/domain/%s',
    'net': 'https://rdap.verisign.com/net/v1/domain/%s',
    'org': 'https://rdap.publicinterestregistry.org/rdap/domain/%s',
}


def _run(args):
    """Run curl without raising on a non-zero exit (404 bodies are empty and
    the local proxy resets the connection, which curl reports as exit 56)."""
    p = subprocess.run(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return p.stdout.decode('utf-8', 'replace')


def rdap_lookup(name, tld):
    """Return (status, detail). status in REGISTERED / AVAILABLE / UNKNOWN."""
    fqdn = '%s.%s' % (name, tld)
    url = RDAP[tld] % fqdn
    # Status first, with the body discarded - this is the reliable read.
    code = _run(['curl', '-s', '-o', os.devnull, '-w', '%{http_code}',
                 '--max-time', '20', url]).strip()
    if code == '404':
        return 'AVAILABLE', ''
    if code != '200':
        return 'UNKNOWN', 'HTTP %s' % (code or 'no response')
    # Registered: fetch the body separately for registration/expiry dates.
    body = _run(['curl', '-s', '--max-time', '20', url])
    created = expires = ''
    try:
        data = json.loads(body.strip())
        for ev in data.get('events', []):
            if ev.get('eventAction') == 'registration':
                created = (ev.get('eventDate') or '')[:10]
            if ev.get('eventAction') == 'expiration':
                expires = (ev.get('eventDate') or '')[:10]
    except Exception:                              # noqa: BLE001
        pass
    det = []
    if created:
        det.append('registered %s' % created)
    if expires:
        det.append('expires %s' % expires)
    return 'REGISTERED', '; '.join(det)


# ---------------------------------------------------------------------------
# CANDIDATES, grouped by the top-5 product they would monetise.
# `kw` records the MEASURED keyword cluster the name targets (volumes are
# Google Ads US 12-mo avg, captured 2026-08-24).
# ---------------------------------------------------------------------------
GROUPS = [
 dict(rank=1, product='The Self-Sufficient Backyard',
      cluster='self sufficient backyard 1,900 + the self sufficient backyard '
              '1,600 + homesteading book 1,000 + self sufficient backyard book '
              '390 + best homesteading books 390 + self sufficiency book 320',
      names=['backyardselfsufficiency', 'selfsufficiencybooks',
             'homesteadingbookreview', 'thehomesteadshelf',
             'homesteadbookguide', 'backyardhomesteadguide',
             'offgridreadinglist', 'selfsufficiencyguide',
             'thehomesteadlibrary', 'homesteadreadinglist']),
 dict(rank=2, product='The Lost SuperFoods',
      cluster='long term food storage 1,300 ($3.04 CPC) + survival medicine '
              'adjacency + the lost superfoods 210 + survival food recipes 70',
      names=['longtermfoodstorageguide', 'thefoodstorageguide',
             'survivalfoodhandbook', 'foodstoragehandbook',
             'shelfstablepantry', 'thestockpileguide',
             'preppedpantryguide', 'survivalfoodstockpile']),
 dict(rank=3, product='Tube Magic',
      cluster='tube magic 1,600 + youtube automation tools 170 ($10.16 CPC) + '
              'best ai tools for youtube 30 ($6.45 CPC)',
      names=['youtubeautomationtools', 'aitoolsforyoutube',
             'creatortoolreview', 'youtubeaistack', 'tubetoolreview',
             'youtubetoolreport']),
 dict(rank=4, product="David's Shield",
      cluster='davids shield 1,900 (intent contaminated) + emp survival book '
              '50 + how to prepare for emp 50',
      names=['empprepguide', 'empreadinessguide', 'griddownguide',
             'empsurvivalguide', 'faradayprepguide', 'gridfailureguide']),
 dict(rank=5, product='Home Doctor',
      cluster='home remedies book 1,300 + survival medicine book 390 + home '
              'doctor book 90',
      names=['homeremediesguide', 'thehomeremedybook', 'householdremedyguide',
             'familymedicinecabinet', 'survivalmedicineguide',
             'homeremedyhandbook']),
 dict(rank=0, product='CROSS-CUTTING (herbal remedies hub, serves #1 and #5)',
      cluster='herbal remedies book 5,400 ($1.16 CPC) - the single largest '
              'measured term in the entire study',
      names=['herbalremediesguide', 'theherbalremedybook',
             'herbalremedylibrary', 'growyourownremedies',
             'homeherbalguide']),
]

results = []
total = sum(len(g['names']) for g in GROUPS)
done = 0
for g in GROUPS:
    for n in g['names']:
        done += 1
        status, detail = rdap_lookup(n, 'com')
        row = dict(group=g['product'], rank=g['rank'], cluster=g['cluster'],
                   name=n, tld='com', status=status, detail=detail,
                   alts=[])
        # Only spend lookups on alternate TLDs when .com is gone.
        if status == 'REGISTERED':
            for tld in ('net', 'org'):
                s2, d2 = rdap_lookup(n, tld)
                row['alts'].append((tld, s2, d2))
        results.append(row)
        sys.stderr.write('[%d/%d] %s.com -> %s\n' % (done, total, n, status))

# ---------------------------------------------------------------------------
# OUTPUT
# ---------------------------------------------------------------------------
import csv, io                                     # noqa: E402

csv_path = os.path.join(REPORTS, 'phase4-domain-availability.csv')
with io.open(csv_path, 'w', encoding='utf-8', newline='') as fh:
    w = csv.writer(fh)
    w.writerow(['top5_rank', 'product', 'keyword_cluster_measured', 'domain',
                'status', 'registry_detail', 'alt_tld_results',
                'checked_via', 'checked_date'])
    for r in results:
        alt = '; '.join('%s.%s=%s%s' % (r['name'], t, s,
                                        (' (%s)' % d) if d else '')
                        for t, s, d in r['alts']) or ''
        w.writerow([r['rank'] or '', r['group'], r['cluster'],
                    '%s.%s' % (r['name'], r['tld']), r['status'], r['detail'],
                    alt, 'RDAP registry lookup', CAPTURE_DATE])

avail = [r for r in results if r['status'] == 'AVAILABLE']
taken = [r for r in results if r['status'] == 'REGISTERED']
unk = [r for r in results if r['status'] == 'UNKNOWN']

md = os.path.join(REPORTS, 'phase4-domain-research.md')
with io.open(md, 'w', encoding='utf-8') as fh:
    def w_(s=''):
        fh.write(s + '\n')
    w_('# Phase 4 - Domain research for the Top 5')
    w_()
    w_('**Checked %s via RDAP registry lookup** (Verisign for .com/.net, Public '
       'Interest Registry for .org).' % CAPTURE_DATE)
    w_('`HTTP 404 = available`, `HTTP 200 = registered`. Registry truth, not a '
       'reseller search box.')
    w_()
    w_('> A domain shown as available here can be registered by anyone at any '
       'moment. This is a')
    w_('> point-in-time reading, not a reservation. **Nothing has been '
       'purchased.**')
    w_()
    w_('**%d candidates checked - %d available, %d registered, %d unknown.**'
       % (len(results), len(avail), len(taken), len(unk)))
    w_()
    w_('## Why these names and not exact-match domains')
    w_()
    w_('Phase 3 measured five exact-match domains in live SERPs. **Not one '
       'ranked #1:**')
    w_('`medicinalgardenkit.net` #9, `encyclopediaofpowerfoods.com` #9, '
       '`tubemagic-review.com` #8,')
    w_('`medicinalgardenkit.org` paid ads only, and `anti-looter-kit.com` '
       'already registered.')
    w_('Every candidate below is therefore built on the **problem-led keyword '
       'cluster that carries')
    w_('the measured demand**, not on a vendor brand string.')
    w_()
    w_('---')
    w_()
    for g in GROUPS:
        rows = [r for r in results if r['group'] == g['product']]
        w_('## %s%s' % (('%d. ' % g['rank']) if g['rank'] else '', g['product']))
        w_()
        w_('**Measured cluster:** %s' % g['cluster'])
        w_()
        w_('| Domain | Status | Registry detail | .net / .org |')
        w_('|---|---|---|---|')
        for r in rows:
            alt = '; '.join('`.%s` %s' % (t, s) for t, s, _ in r['alts']) or '—'
            mark = '**AVAILABLE**' if r['status'] == 'AVAILABLE' else r['status']
            w_('| `%s.com` | %s | %s | %s |' % (r['name'], mark,
                                                r['detail'] or '—', alt))
        w_()
    w_('---')
    w_()
    w_('## All available names, consolidated')
    w_()
    if avail:
        for r in sorted(avail, key=lambda x: (x['rank'] or 99, x['name'])):
            w_('- `%s.com` — %s' % (r['name'], r['group']))
    else:
        w_('_None available._')
    w_()
    w_('## Before buying anything')
    w_()
    w_('1. **Trademark check.** RDAP says nothing about trademarks. Any name '
       'near a live brand')
    w_('   needs a USPTO TESS search first.')
    w_('2. **History check.** An available name may have been registered and '
       'dropped before,')
    w_('   possibly carrying spam history. Check the Wayback Machine before '
       'committing.')
    w_('3. **The Bing gap is still open.** No Bing SERP has been validated for '
       'any of these')
    w_('   clusters — see `data/serp/phase35-bing-fault.md`. Buying a domain '
       'does not depend on')
    w_('   it, but choosing which cluster to build does.')

print('wrote %s' % csv_path)
print('wrote %s' % md)
print('%d checked | %d AVAILABLE | %d REGISTERED | %d UNKNOWN'
      % (len(results), len(avail), len(taken), len(unk)))
print()
for r in results:
    if r['status'] == 'AVAILABLE':
        print('AVAILABLE  %s.com   [%s]' % (r['name'], r['group'][:40]))
