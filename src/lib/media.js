// Image and video assets, with licensing recorded alongside each file.
//
// SOURCING RULES:
//  - Product photography comes from the vendor's own sales page. Using product
//    imagery in a review is standard affiliate practice and the programme
//    supplies creatives for it.
//  - Plant photography is sourced from Wikimedia Commons under CC / CC0 /
//    public-domain terms and is credited on the page. We do NOT re-host the
//    vendor's licensed stock flower photography.
//  - Nothing here is presented as our own photography, because none of it is.

export const PRODUCT_IMAGES = {
  hero: {
    src: "/img/product/kit-hero.webp",
    width: 891,
    height: 620,
    alt: "The Medicinal Garden Kit pouch marked 4,818 non-GMO seeds, held beside the printed Herbal Medicinal Guide: From Seeds to Remedies.",
    credit: "Product photography: Medicinal Garden Kit",
  },
  gardenLayout: {
    src: "/img/product/garden-layout.webp",
    width: 800,
    height: 400,
    alt: "Planting layout diagram showing where each of the ten herbs sits in a backyard bed: chicory, chamomile, calendula, California poppy, yarrow, feverfew, echinacea, marshmallow, lavender and evening primrose.",
    credit: "Layout diagram: Medicinal Garden Kit",
  },
  nicoleBotswana: {
    src: "/img/product/nicole-botswana.webp",
    width: 600,
    height: 370,
    alt: "Nicole Apelian seated with San Bushmen community members during field research in Botswana.",
    credit: "Photo: Nicole Apelian",
  },
  calendulaOil: {
    src: "/img/product/calendula-oil.webp",
    width: 1000,
    height: 846,
    alt: "A mason jar of calendula flowers infusing in oil, held up in a flowering garden.",
    credit: "Photo: Medicinal Garden Kit",
  },
};

// Wikimedia Commons plant photography. `credit` renders under each image.
export const HERB_IMAGES = {
  calendula: {
    src: "/img/herbs/calendula.webp",
    alt: "Calendula officinalis in flower, showing bright orange daisy-like blooms.",
    license: "CC BY-SA 4.0",
    author: "Betty Cai",
  },
  chicory: {
    src: "/img/herbs/chicory.webp",
    alt: "A sky-blue chicory flower, Cichorium intybus, growing wild.",
    license: "CC BY-SA 4.0",
    author: "Agnes Monkelbaan",
  },
  chamomile: {
    src: "/img/herbs/chamomile.webp",
    alt: "German chamomile, Matricaria chamomilla, with small white and yellow daisy flowers.",
    license: "CC BY-SA 3.0",
    author: "Alvesgaspar",
  },
  feverfew: {
    src: "/img/herbs/feverfew.webp",
    alt: "Feverfew, Tanacetum parthenium, covered in small white daisy-like flowers.",
    license: "CC BY 2.5",
    author: "Wikimedia Commons contributor",
  },
  yarrow: {
    src: "/img/herbs/yarrow.webp",
    alt: "Yarrow, Achillea millefolium, showing flat white flower clusters and feathery foliage.",
    license: "CC BY-SA 4.0",
    author: "Agnieszka Kwiecień (Nova)",
  },
  "california-poppy": {
    src: "/img/herbs/california-poppy.webp",
    alt: "California poppy, Eschscholzia californica, with vivid orange cup-shaped flowers.",
    license: "CC0",
    author: "Kaldari",
  },
  "evening-primrose": {
    src: "/img/herbs/evening-primrose.webp",
    alt: "Evening primrose, Oenothera biennis, with yellow four-petalled flowers.",
    license: "CC BY-SA 4.0",
    author: "Christian Ferrer",
  },
  marshmallow: {
    src: "/img/herbs/marshmallow.webp",
    alt: "Marshmallow, Althaea officinalis, with pale pink flowers and soft downy leaves.",
    license: "CC0",
    author: "Cbaile19",
  },
  echinacea: {
    src: "/img/herbs/echinacea.webp",
    alt: "Purple coneflower, Echinacea purpurea, with pink petals and orange central cones.",
    license: "CC BY-SA 4.0",
    author: "Eric Hunt",
  },
  lavender: {
    src: "/img/herbs/lavender.webp",
    alt: "English lavender, Lavandula angustifolia, in flower with a bee on one stem.",
    license: "CC BY-SA 4.0",
    author: "Didier Descouens",
  },
};

export const getHerbImage = (slug) => HERB_IMAGES[slug];

// Embedded video. All IDs verified live via the YouTube oEmbed API on
// 2026-08-25. Thumbnails are stored locally so no external request is made
// until a visitor actually clicks play.
export const VIDEOS = {
  echinaceaStratification: {
    id: "6UZ1EhMa5Eo",
    title: "Cold Stratified vs Non Stratified Coneflower Seeds: RESULTS VIDEO!",
    channel: "Bright Lane Gardens",
    thumb: "/img/video/6UZ1EhMa5Eo.webp",
    width: 800,
    height: 450,
    why: "A side-by-side germination test of stratified against unstratified coneflower seed — the clearest demonstration of why this step matters.",
  },
  echinaceaFromSeed: {
    id: "qCY7Fo9zDiQ",
    title: "Echinacea: How to start Echinacea or Coneflower from Seed",
    channel: "Jewell's Gardens",
    thumb: "/img/video/qCY7Fo9zDiQ.webp",
    width: 480,
    height: 270,
    why: "A full walkthrough from sowing to transplant.",
  },
  lavenderFromSeed: {
    id: "mzgcv3SIvcE",
    title: "Tips & Tricks To Growing Lavender From Seed | How To Propagate Lavender",
    channel: "Budget Gardening with Vita Loca",
    thumb: "/img/video/mzgcv3SIvcE.webp",
    width: 800,
    height: 450,
    why: "Practical technique for the hardest seed in the kit.",
  },
};
