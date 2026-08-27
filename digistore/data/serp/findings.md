# Phase 3 - validated Bing SERP captures (US / en / desktop, 2026-08-24)
# Source: DataForSEO /v3/serp/bing/organic/live/regular

## API FAULT LOG (must be disclosed in the report)
The endpoint intermittently returns a SERP for only the FIRST MEANINGFUL TOKEN
of the query. Confirmed instances:
  "medicinal garden kit review" -> AAPC medical-coding pages ("medicinal"->medical)
  "the lost superfoods review"  -> Lost (TV series)          ("lost")
  "anti-looter kit review"      -> Rihanna's album "Anti"    ("anti")
  "joseph's well review"        -> Joseph (Genesis)          ("joseph")
  "david's shield review"       -> David (Wikipedia/Netflix) ("david")
  "home doctor book review"     -> Home Depot / Zillow       ("home")
Control queries returned correct SERPs ("best running shoes", "prodentim review"),
so the endpoint works; the fault is transient. Mitigation: strip punctuation and
retry; validate every SERP for brand tokens before use.
A truncated SERP shows no competitors and would be catastrophically misread as
"weak SERP / easy to rank". No such SERP is used as evidence in this report.

## VALIDATED CAPTURES

### anti looter kit review  [VALID]
1  askaprepper.com        Anti-Looter Kit Review (Feb 2026)
2  thecountyreview.com    Anti Looter Kit Review [2026] (Jul 2026)
3  thebuyersreviews.com   "scam alert: Is it legit?" (Dec 2025)
4  behealthynh.com        "is 2026 CIA Must Have or Scam?" (1 day old)
5  santeckpro.com         "7 Reasons This CIA-Inspired Kit..." (May 2025)
6  biopreneur.com.ng      "Legit or Scam?" (2 days old)  <- .ng domain on US SERP
7  thesolutionai.com      "Does This Emergency Defense System..."
8  scamadviser.com        antilooterkit.com check
9  crestpick.com          Anti-Looter Kit Review 2026
10 linkedin.com/pulse     user-posted article
related: cia anti looter kit reviews | cia anti looter kit | anti looter kit for sale
ASSESSMENT: zero major brands, zero authority publishers. Entirely small affiliate
review sites, several days-old churn. Product = Jason Hanson $149 CIA-themed kit.

### medicinal garden kit review  [VALID]
1  therealrealreviews.com  "by Nicole Apelian: Is It Worth It?" (Mar 2026)
2  healthreviewnetwork.com "What You Need to Know Before You..." (Nov 2025)
3  foodnourish.net         "Should You Buy It?" (Mar 2023 - STALE)
4  therealrealreviews.com  (2nd listing, Jan 2026)
9  medicinalgardenkit.net  EMD - "Review 2026: Nicole Apelian Verdict"
10 shelfinsider.com        registered-dietitian review (Jun 2026)
paid: medicinalgardenkit.org (EMD, sponsored)
related: medicinal garden kit official website | medicinal garden kit scam |
         nicole apelian garden kit reviews | medicinal garden kit nicole apelian
ASSESSMENT: all small affiliate sites. Note EMD medicinalgardenkit.net ranks #9,
NOT #1 - direct evidence that an exact-match domain does not confer top position.

### josephs well water review  [WEAK/AMBIGUOUS]
Returns Joseph's Classic Market, Joseph's Pizza, josephstores.com - local
businesses. No trace of the Digistore product. Brand has effectively no Bing
footprint under this name; the product name is too generic to own.

### encyclopedia of power foods review  [VALID]
1  healthreviewnetwork.com  (Dec 2025)
2  covingtonreporter.com    (Jul 2024 - STALE, local-news site running affiliate content)
3  todayupgrades.com        (2026)
4  biopreneur.com.ng        (Jul 2026)  <- .ng domain on US SERP
9  encyclopediaofpowerfoods.com  EMD, page 2
10 diogom.substack.com      Substack post
paid: amazon.com, womenshealthmag.com, ebay.com
related: encyclopedia of power foods pdf | power foods encyclopedia pdf | power foods pdf
ASSESSMENT: weak affiliate SERP, one stale 2024 entry. WARNING: related searches are
dominated by "pdf" = piracy intent, which dilutes commercial value of the cluster.

### tube magic review youtube tool  [VALID]
1  medium.com/@JaceWilders  (Aug 2025)
2  insightstacker.com
3  busymomsidehustle.com
4  aitool-review.com
5  sanishtech.com           (Feb 2026)
6  solvemyproblemlab.com
7  sterahub.substack.com    (Jul 2026)
8  tubemagic-review.com     EMD-style review domain
paid: tubemagic.com (official)
related: tube magic ai free trial | tube magic ai free | tube magic ai
ASSESSMENT: no authority sites; Medium/Substack placeholders rank. BUT related
searches are "free trial"/"free" = users hunting free access, weaker buyer intent.
Product is $47/month recurring; Phase 2 flagged its $265.11 net as lifetime value.

### superfoods book review claude davis survival  [VALID]
1  biopreneur.com.ng        <- .ng domain ranked #1 on a US commercial query
2  bitudi.com               <- SAME TITLE as #1: scraped/duplicated content
3  bestsurvivalbooks.com    (Jul 2026)
4  askaprepper.com          (Aug 2020 - 6 years stale)
5  backyardfreedomlab.com   (Jul 2026) "a fictional frontman" - notes author is invented
6  goodreads.com
7  theinsidereview.com
8  crestpick.com
10 amazon.com (book listed for sale)
related: lost superfoods book review | claude davis book review
ASSESSMENT: weakest SERP observed. A scraped duplicate ranks #2 and a foreign
low-authority blog ranks #1. Amazon/Goodreads presence means the book is also sold
outside Digistore24, which competes with the affiliate funnel.

### pinealxt review supplement  [VALID]
1  third-eye.colibrim.ai    clone/"official" landing page
3  pinealxt.com             official
5  capsules.live            clone
6  amazon.com
7  consumerhealthdigest.com  only genuine editorial review
9  en-us-pinealxt.com       clone
10 pinealxt.deliverycaviar.com  clone
ASSESSMENT: NOT an affiliate-review SERP - it is saturated with near-duplicate
"official site" clones. Little room for an honest review page, and the surrounding
neighbourhood is low-trust. Phase 2 HIGH risk confirmed.

### tufting mastery class review rug making course  [VALID but NO BRAND PRESENCE]
Returns Wikipedia, tuftsupplies.com, clawlab.com, tufttheworld.com, tufting.co,
tuftingtutorials.com, YouTube, Instructables.
ASSESSMENT: the *product* has no Bing footprint at all. The niche is real and
informational, but owned by supply retailers with genuine commercial inventory.
No branded-review opportunity exists.

### FAILED AFTER REPEATED RETRIES (recorded as NO_VALID_DATA, not as "weak SERP")
home doctor book        - 4 attempts, all truncated to "home" (Home Depot/Zillow)
davids shield           - truncated to "david"
josephs well            - no brand footprint; name too generic to own
self sufficient backyard- truncated to "self"
idrotherapy             - returned unrelated Norwegian cholesterol pages
reflux online summit    - truncated to "reflux"; note the generic acid-reflux space
                          is owned by Mayo/Cleveland Clinic/Harvard/WebMD (YMYL)

### medicinal garden kit worth it complaints  [VALID - deep cluster query]
1  thewisdomshed.com        (Jul 2026)
2  supplementsdiary.com     (Jul 2026) "Scam Risks, Seeds, and Results"
3  therealrealreviews.com
4  healthwealthzone.com     (Jul 2026)
p2 github.com               <- a GitHub repo used as a review page (PARASITE SPAM)
p2 healthreviewnetwork.com / healthreviewdesk.com / topdigitalfinds.com / fitterlives.net
p2 researchgate.net         <- a "publication" used as affiliate spam (PARASITE SPAM)
paid: mygardyn.com, northspore.com, amazon.com, bestproductsreviews.com  (4 advertisers)
related: medicinal garden kit scam | nicole apelian garden kit reviews |
         medicinal garden kit reviews | the medicinal garden kit
ASSESSMENT: strongest opportunity signal seen. GitHub and ResearchGate pages
outranking real sites proves the SERP is gameable and lacks quality competition.
Four paid advertisers confirm genuine commercial demand behind the query.

### INDEPENDENT CROSS-CHECK (WebSearch - different index, NOT Bing)
Query: "anti-looter kit" review Jason Hanson legit or scam
Competitors found: newswire.com, accessnewswire.com (PRESS-RELEASE SPAM),
thebuyersreviews.com, behealthynh.com, askaprepper.com, biopreneur.com.ng,
crestpick.com, anti-looter-kit.com (EMD already registered)
Corroborates the Bing capture: the competitor set is press releases plus small
affiliate blogs, on two independent indexes.
PRODUCT FACTS (for Phase 3 risk): Jason Hanson is a verifiable former CIA officer
who has appeared on Fox News/NBC and authored published security books. The kit is
a PHYSICAL product (motion sensors, tripwire, door alarms, jammer, floodlight),
CE-certified, 60-day guarantee. Counterfeit sellers are noted as a known problem.

## EXACT-MATCH DOMAIN EVIDENCE (directly relevant to the stated EMD strategy)
medicinalgardenkit.net     ranks #9  (page 2)     - EMD, NOT #1
medicinalgardenkit.org     paid ad only            - EMD buying traffic, not ranking
encyclopediaofpowerfoods.com ranks #9 (page 2)     - EMD, NOT #1
tubemagic-review.com       ranks #8                - EMD-style, NOT #1
anti-looter-kit.com        exists (obvious EMD already taken)
CONCLUSION: in every observed case the exact-match domain ranks mid-page or buys
ads. Not one ranks #1. EMDs are common in these SERPs and are NOT winning them.
