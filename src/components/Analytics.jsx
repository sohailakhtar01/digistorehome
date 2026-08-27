import Script from "next/script";
import AffiliateClicks from "./AffiliateClicks";

/**
 * Microsoft Clarity, plus outbound affiliate click events.
 *
 * Chosen over a page-view counter because the question that matters here is
 * not how many people arrived, it is where they stopped. Heatmaps say whether
 * anyone scrolls as far as the kit callout; recordings say what they did
 * instead. Neither is answerable from a page-view chart, and without them
 * every conversion decision is taste rather than evidence.
 *
 * Free and unmetered, which matters on a site whose entire budget is about
 * $43 a month.
 *
 * The project id is committed rather than kept in an environment variable
 * because it is not a secret: Clarity ships it in the page source of every
 * site that runs it, and it grants nothing but the ability to send data to
 * this project. Keeping it here means the tracker cannot silently stop working
 * because a dashboard variable was dropped, which is the failure mode that
 * matters — a tracker you believe is running but is not is worse than none.
 *
 * CLARITY_PROJECT_ID still overrides it, so a staging deploy can point
 * somewhere else, and setting it to an empty string disables Clarity entirely.
 */
const DEFAULT_CLARITY_ID = "y8w8dh0an9"; // project: thehomesteadshelf

export const CLARITY_ID =
  process.env.CLARITY_PROJECT_ID ?? DEFAULT_CLARITY_ID;

/**
 * GA4 measurement id. Public like the Clarity one, and committed for the same
 * reason: a tracker that silently stops because a dashboard variable was
 * dropped is worse than one that was never installed.
 *
 * Setting GA_MEASUREMENT_ID to an empty string disables GA4 without touching
 * Clarity.
 */
const DEFAULT_GA_ID = "G-ZT4V262VHZ"; // property: The Homestead Shelf

export const GA_ID = process.env.GA_MEASUREMENT_ID ?? DEFAULT_GA_ID;

export default function Analytics() {
  if (!CLARITY_ID && !GA_ID) return null;

  return (
    <>
      {CLARITY_ID ? (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(CLARITY_ID)});`}
        </Script>
      ) : null}

      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag("js",new Date());gtag("config",${JSON.stringify(GA_ID)});`}
          </Script>
        </>
      ) : null}

      <AffiliateClicks />
    </>
  );
}
