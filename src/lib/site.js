// Central site configuration. Change values here, never inline in pages.

export const SITE = {
  name: "The Homestead Shelf",
  shortName: "Homestead Shelf",
  // Canonical host is www. Vercel serves www and 308-redirects the apex to it,
  // so canonical tags, the sitemap and every JSON-LD @id have to say www —
  // otherwise every page redirects to a host that then claims a different
  // canonical, which is a conflicting signal on every URL.
  url: "https://www.thehomesteadshelf.com",
  tagline: "Honest reviews for people who grow, store and prepare",
  description:
    "Independent, research-based reviews of homesteading, gardening and preparedness products. We tell you what you actually get before you spend money.",
  locale: "en_US",
  author: "The Homestead Shelf",
  email: "hello@thehomesteadshelf.com",
  founded: "2026",
};

// The person behind the site. Named on /about and in Person schema, because a
// review site with no identifiable human behind it is the easiest thing in the
// world to discount. Nothing is claimed here that cannot be stood behind.
export const EDITOR = {
  name: "Sohail Akhtar",
  role: "Founder and editor",
  email: SITE.email,
  url: `${SITE.url}/about`,
};

export const NAV = [
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

// Grouped so the footer reads as two short columns rather than one long list
// of seven unrelated links.
export const FOOTER_GROUPS = [
  {
    heading: "Read",
    links: [
      { href: "/reviews", label: "Reviews" },
      { href: "/guides", label: "Growing guides" },
      { href: "/feed.xml", label: "RSS feed", external: true },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/about", label: "How we work" },
      { href: "/contact", label: "Contact" },
      { href: "/disclosure", label: "Disclosure" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];


export const absoluteUrl = (path = "/") =>
  new URL(path, SITE.url).toString().replace(/\/$/, path === "/" ? "/" : "");
