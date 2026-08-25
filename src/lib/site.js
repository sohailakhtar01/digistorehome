// Central site configuration. Change values here, never inline in pages.

export const SITE = {
  name: "The Homestead Shelf",
  shortName: "Homestead Shelf",
  url: "https://thehomesteadshelf.com",
  tagline: "Honest reviews for people who grow, store and prepare",
  description:
    "Independent, research-based reviews of homesteading, gardening and preparedness products. We tell you what you actually get before you spend money.",
  locale: "en_US",
  author: "The Homestead Shelf",
  email: "hello@thehomesteadshelf.com",
  founded: "2026",
};

export const NAV = [
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export const FOOTER_NAV = [
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const absoluteUrl = (path = "/") =>
  new URL(path, SITE.url).toString().replace(/\/$/, path === "/" ? "/" : "");
