import { Geist, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/lib/site";

// Weights are pinned to what the design actually uses. Left unpinned, the full
// variable axis ships and the font files roughly double in size.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
  preload: true,
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  // Only the card type is set sitewide. Title/description/image are left to
  // each page so Twitter shows the page's own headline, not the site tagline.
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  category: "Home & Garden",
  keywords: [
    "medicinal garden kit review",
    "medicinal herbs to grow",
    "how to grow lavender from seed",
    "how to grow echinacea from seed",
    "cold stratification",
    "homesteading product reviews",
  ],
  creator: SITE.author,
  publisher: SITE.author,
  formatDetection: { telephone: false, address: false, email: false },
  verification: {
    other: {
      // Bing Webmaster Tools — site added 2026-08-25, verifies on first crawl.
      // DNS alternative: CNAME 5cf673aa20e51422b5c7ae2548d5e48f.thehomesteadshelf.com
      "msvalidate.01": "6074F46E128049BC22F477C50802605D",
    },
  },
};

// themeColor / colorScheme live in `viewport`, not `metadata` (deprecated in 14).
// The site is light-only, so there is a single theme colour.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#1f4a34",
};

export default function RootLayout({ children }) {
  // One @graph keeps the entities linked by @id rather than repeating them,
  // which is what search engines actually want to see.
  const graphLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        email: SITE.email,
        foundingDate: SITE.founded,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE.url}/#logo`,
          url: `${SITE.url}/icon-512.png`,
          width: 512,
          height: 512,
          caption: SITE.name,
        },
        image: { "@id": `${SITE.url}/#logo` },
        knowsAbout: [
          "Medicinal herb gardening",
          "Growing herbs from seed",
          "Cold stratification",
          "Homesteading",
          "Preparedness products",
        ],
        publishingPrinciples: `${SITE.url}/about`,
        ethicsPolicy: `${SITE.url}/disclosure`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        alternateName: SITE.shortName,
        url: SITE.url,
        description: SITE.description,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE.name} — latest reviews and guides`}
          href="/feed.xml"
        />
        <JsonLd data={graphLd} />
        <a
          href="#main"
          data-plain
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
