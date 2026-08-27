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
 * Renders nothing until CLARITY_PROJECT_ID is set, so no half-configured
 * tracker ships. The project id is not a secret — it is visible in the page
 * source of every site running Clarity — but it is read server-side here so it
 * does not also end up in the client bundle.
 *
 * Note this is a build-time check, so setting the variable in Vercel needs a
 * redeploy before anything is recorded.
 */
export const CLARITY_ID = process.env.CLARITY_PROJECT_ID ?? "";

export default function Analytics() {
  if (!CLARITY_ID) return null;

  return (
    <>
      <Script id="clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(CLARITY_ID)});`}
      </Script>
      <AffiliateClicks />
    </>
  );
}
