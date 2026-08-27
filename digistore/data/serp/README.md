# Raw Bing SERP captures - Phase 3

Source : DataForSEO `/v3/serp/bing/organic/live/*`
Engine : Bing organic
Geo    : location_code 2840 (United States), language_code "en", desktop
Dates  : captured 2026-08-24

VALIDATION PROTOCOL
Every capture is checked for brand-token relevance before use. The API was
observed returning transient junk (a query for "medicinal garden kit review"
returned spine-surgery CPT coding pages on one call and a perfect SERP on
retry). Any SERP whose results do not contain the brand tokens is retried once;
if it fails again it is recorded as NO_VALID_DATA and is NEVER interpreted as
"weak competition". Treating an unvalidated empty SERP as an easy ranking
opportunity would be the single most dangerous error available in this phase.
