// Affiliate link configuration.
//
// We use the Digistore24 server-side redirect rather than the `#aff=` fragment
// link. A URL fragment is never sent to the server, so fragment attribution
// depends entirely on the vendor's client-side JavaScript reading
// location.hash. The /redir/ form is Digistore24's own documented format, is
// server-side, and additionally carries a campaign token so we can see which
// placement actually earns.
//
// Verified 2026-08-25:
//   https://www.digistore24.com/redir/379812/sohailakhtar01/<campaign>
//   -> 2 hops -> https://medicinalseedkit.com/kit/?aff=sohailakhtar01
//
// To switch back to the plain promo link, change buildLink() only.

export const AFFILIATE_ID = "sohailakhtar01";

const ds24 = (productId, campaign) =>
  `https://www.digistore24.com/redir/${productId}/${AFFILIATE_ID}/${campaign}`;

export const OFFERS = {
  "medicinal-garden-kit": {
    slug: "medicinal-garden-kit",
    name: "Medicinal Garden Kit",
    creator: "Nicole Apelian",
    productId: "379812",
    salesPage: "https://medicinalseedkit.com/kit/",
    price: 59,
    shipping: 4.99,
    guaranteeDays: 365,
    seedPackets: 10,
    seedCount: 4818,
    buildLink: (campaign = "default") => ds24("379812", campaign),
  },
};

export const getOffer = (slug) => OFFERS[slug];

// Every outbound affiliate link must carry these attributes.
export const AFFILIATE_LINK_PROPS = {
  target: "_blank",
  rel: "sponsored nofollow noopener",
};
