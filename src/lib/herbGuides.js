// Long-form content for the herb guides we have actually written.
// Only slugs present here should appear in PUBLISHED_HERB_GUIDES.
//
// Target queries (US monthly volume, DataForSEO, checked 2026-08-25/26).
// Every one of these was SERP-checked before writing: the growing-advice terms
// return independent blogs, while the bare "<species> seeds" head terms return
// seed retailers and a shopping carousel. We target the former only. See
// research/keyword-map-master.md.
//   lavender         — "how to grow lavender from seed" 1,900 (LOW)
//   echinacea        — "how to grow echinacea from seed" 880 +
//                      "when to plant echinacea seeds" 590 (LOW/MEDIUM)
//   calendula        — "growing calendula from seeds" 480 (RD 4) +
//                      "when to sow calendula seeds" 390 (RD 4)
//   yarrow           — "planting yarrow seeds" 390 (RD 8) +
//                      "how to plant yarrow seeds" 260 (RD 2)
//   california-poppy — "when to plant california poppy seeds" 480 (RD 4) +
//                      "how to grow california poppy from seeds" 320 (RD 9)

export const HERB_GUIDES = {
  echinacea: {
    title: "How to Grow Echinacea From Seed (Without the Patchy Germination)",
    description:
      "Echinacea germinates erratically when sown straight into warm soil. Four weeks of cold, moist stratification fixes most of it. When to plant, how to stratify, and what to expect in year one.",
    standfirst:
      "Purple coneflower is a genuinely rewarding perennial that most people get wrong at the very first step. The fix costs nothing and takes four weeks of doing nothing.",
    sections: [
      {
        h2: "Why your echinacea seeds did not come up",
        body: [
          "Echinacea purpurea is native to the prairies and woodland edges of central and eastern North America. Its seeds evolved to drop in autumn, sit through a cold wet winter, and germinate when spring warmth arrives. That cold period is not incidental — it is a chemical signal the seed uses to know that winter has actually passed and it is safe to sprout.",
          "When you sow echinacea straight into warm soil in spring, you skip that signal entirely. Some seeds germinate anyway, because natural variation always hedges its bets. Many do not. The result is the patchy, disappointing tray that leads people to blame the seed supplier when the cause is a missing winter.",
        ],
      },
      {
        h2: "Cold, moist stratification, step by step",
        body: [
          "This is the single highest-value thing you can do for echinacea, and it requires a refrigerator and about four weeks of patience.",
        ],
        list: [
          "Dampen a paper towel or a small handful of sand until it is barely moist — squeeze it and no water should run out. Too wet causes rot, which is the one way to make things worse.",
          "Fold the seeds into the towel, or mix them through the sand, and seal the lot in a labelled zip bag or small container.",
          "Put it in the main body of the refrigerator, not the freezer. You want roughly 1–5°C (34–40°F).",
          "Leave it for four weeks. Check once a week for mould, and discard any seed that has gone soft.",
          "Sow as normal at the end of the period. Some seeds may already have tiny root tips showing — handle those gently and plant them immediately.",
        ],
      },
      {
        h2: "When to plant echinacea seeds",
        body: [
          "Timing is the other half of the problem, and it works backwards from your last frost date. Because stratification takes four weeks and the seedlings need another six to eight weeks before they are ready to go outside, you need to start the process roughly ten to twelve weeks before you intend to transplant.",
          "In practice that means putting seed in the refrigerator in mid to late winter — January or February for most of the United States — sowing indoors in early spring, and transplanting after the last frost has passed.",
        ],
        list: [
          "Ten to twelve weeks before last frost: seed goes into the refrigerator to stratify.",
          "Six to eight weeks before last frost: sow the stratified seed indoors, 3–6 mm deep, at 18–21°C (65–70°F).",
          "After the last frost: harden seedlings off over a week and transplant, spacing 45–60 cm (18–24 in) apart.",
          "Alternative, no refrigerator needed: sow directly outdoors in late autumn and let the winter do the stratification for you. This is the least work and often gives the best results.",
        ],
      },
      {
        h2: "Sowing and early care",
        body: [
          "Sow at about 3–6 mm (1/8 to 1/4 inch) deep, lightly covered. Echinacea benefits from some light, so do not bury it deeply. Keep the medium consistently moist but never waterlogged, and aim for around 18–21°C (65–70°F) for germination.",
          "Expect emergence anywhere from 10 to 30 days, and expect it to be uneven even after stratification. Seedlings are slow at first. This is normal for a perennial that is putting its early energy into roots rather than leaves.",
        ],
      },
      {
        h2: "The year-one expectation nobody sets",
        body: [
          "Echinacea is a true perennial, and in its first year it will usually build a root system and a modest clump of foliage without flowering at all. Gardeners who expect coneflowers in the first summer routinely conclude something has failed.",
          "Nothing has failed. Year two is when it flowers, and from then on it is a long-lived, drought-tolerant, pollinator-heavy fixture that largely looks after itself. Leave the seed heads standing over winter and it will self-seed.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "Echinacea has extensive documented use among Plains Indigenous peoples of North America, and it remains one of the most widely recognised plants in Western herbal tradition. That history is genuinely interesting and worth knowing.",
          "It is also not the same thing as clinical evidence. This guide is about growing the plant successfully, and nothing here should be read as a claim that echinacea treats, prevents or cures anything.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do echinacea seeds really need cold stratification?",
        answer:
          "They germinate without it, but erratically and at a much lower rate. Four weeks of cold, moist storage in the refrigerator before sowing markedly improves both how many seeds come up and how evenly they do so. Sowing outdoors in late autumn achieves the same thing using the actual winter.",
      },
      {
        question: "How long do echinacea seeds take to germinate?",
        answer:
          "Usually 10 to 30 days. Stratified seed tends toward the shorter end and comes up more evenly; unstratified seed can straggle on for weeks with large gaps in the tray.",
      },
      {
        question: "When should I plant echinacea seeds?",
        answer:
          "Start stratification 10–12 weeks before your last frost date, sow indoors 6–8 weeks before last frost, and transplant once frost has passed. Alternatively sow directly outdoors in late autumn and let winter provide the cold period.",
      },
      {
        question: "Will echinacea flower in the first year from seed?",
        answer:
          "Usually not. Echinacea typically spends year one building roots and foliage, then flowers in year two. This is normal perennial behaviour and not a sign that anything went wrong.",
      },
      {
        question: "How deep should echinacea seeds be planted?",
        answer:
          "About 3–6 mm (1/8 to 1/4 inch), lightly covered. The seed benefits from some light, so avoid burying it deeply.",
      },
    ],
  },

  lavender: {
    title: "How to Grow Lavender From Seed (And Why Professionals Usually Do Not)",
    description:
      "Lavender is genuinely difficult from seed — slow, erratic and low-percentage even for experienced growers. How to stratify it, sow it, grow it in containers, and when to buy a plant instead.",
    standfirst:
      "If one packet in a herb kit disappoints you, it will probably be the lavender. That is the species behaving normally, and it is worth understanding why before you blame yourself.",
    sections: [
      {
        h2: "Start with the honest part",
        body: [
          "Commercial nurseries propagate lavender from cuttings, not seed, and they do it for a reason. Seed-grown lavender is slow to germinate, uneven in its results, and variable in the plants it produces — seedlings from the same packet will not be identical to each other in habit, colour or scent.",
          "None of that means you cannot grow it from seed. It does mean you should go in expecting a lower success rate than almost anything else you sow, and you should not read a patchy tray as evidence that the seed was bad.",
        ],
      },
      {
        h2: "Cold stratification helps here too",
        body: [
          "Lavandula angustifolia responds well to a period of cold, moist conditions before sowing, for much the same reason echinacea does. Three to six weeks in a sealed bag with barely damp sand in the refrigerator will improve both your germination percentage and how evenly the seedlings come up.",
          "As with echinacea, barely damp is the operative phrase. Wet seed in a sealed bag rots.",
        ],
      },
      {
        h2: "Light, warmth and patience",
        body: [
          "Lavender needs light to germinate, so surface sow it. Press the seed gently onto the surface of a free-draining medium and do not cover it — this is the second most common mistake after skipping stratification.",
          "Give it warmth, around 21°C (70°F), and keep the surface from drying out without soaking it. A heat mat helps considerably here, because the seed wants warm soil and most windowsills in late winter do not provide it. Then wait. Germination commonly takes two to four weeks and can stretch considerably longer. Do not give up on a tray at three weeks; lavender frequently rewards people who forgot about it.",
        ],
      },
      {
        h2: "When to start lavender seed",
        body: [
          "Work backwards from your last frost date. Lavender needs a long lead time — longer than almost anything else in a herb collection — because germination is slow and the seedlings grow slowly after that.",
        ],
        list: [
          "Twelve to fourteen weeks before last frost: seed into the refrigerator for its cold period.",
          "Eight to ten weeks before last frost: surface sow into free-draining seed compost, with warmth and light.",
          "After the last frost: harden off over seven to ten days, then plant out 30–45 cm (12–18 in) apart in full sun.",
        ],
      },
      {
        h2: "Growing lavender from seed in containers",
        body: [
          "Containers are often the better choice for seed-grown lavender, particularly if your garden soil is heavy. A pot lets you control drainage completely, which is the single factor that kills more lavender than anything else.",
          "Use a terracotta pot if you can — it breathes and dries faster than plastic, which suits the plant. Choose something at least 30 cm (12 in) across for a mature plant, make sure the drainage hole is genuinely open, and mix your compost roughly two parts peat-free compost to one part horticultural grit or perlite. Skip the saucer, or empty it after watering; lavender standing in water will not survive long.",
          "Container plants dry out faster in summer, so they do need watering — but water deeply and infrequently rather than little and often, and let the top few centimetres dry between waterings.",
        ],
      },
      {
        h2: "Drainage is the thing that kills established plants",
        body: [
          "Once you have seedlings, the single biggest risk shifts from germination to drainage. Lavender is a Mediterranean plant adapted to poor, gritty, sharply drained soil and full sun. It tolerates drought well and wet roots very badly.",
          "Heavy clay, rich compost and generous watering — all the instincts that serve most seedlings well — are what kill lavender. Add grit, raise the bed, and water less than feels right.",
        ],
      },
      {
        h2: "When to just buy a plant",
        body: [
          "It is worth saying plainly: if what you want is lavender in your garden this year, buying an established plant is the faster and more reliable route, and there is nothing wrong with taking it.",
          "Growing it from seed is worth doing if you enjoy the process, want several plants cheaply, or simply want to see it through. Meaningful flowering from seed usually arrives in year two or three. Set that expectation up front and the whole exercise becomes satisfying rather than frustrating.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "Dried lavender has centuries of documented traditional use in sachets, infusions and aromatic preparations across Mediterranean and European practice.",
          "That is history, not evidence of medical effect. This guide covers growing the plant, and nothing here is a claim that lavender treats or prevents any condition.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do lavender seeds need cold stratification?",
        answer:
          "It is not strictly required, but it makes a real difference. Three to six weeks of cold, moist storage in the refrigerator before sowing improves both the germination rate and how evenly the seedlings emerge. Given how erratic lavender is from seed, it is worth doing.",
      },
      {
        question: "How long do lavender seeds take to germinate?",
        answer:
          "Commonly two to four weeks, and sometimes considerably longer. Uneven germination is normal for this species even when conditions are right, so do not discard a tray too early.",
      },
      {
        question: "Should lavender seeds be covered with soil?",
        answer:
          "No. Lavender needs light to germinate. Press the seed gently onto the surface of the compost and leave it uncovered — burying it is one of the most common reasons seed fails.",
      },
      {
        question: "Can you grow lavender from seed in pots?",
        answer:
          "Yes, and containers are often easier than open ground because you control the drainage. Use a pot at least 30 cm across with an open drainage hole, mix in roughly one-third grit or perlite, and avoid leaving the pot standing in water.",
      },
      {
        question: "How long until lavender grown from seed flowers?",
        answer:
          "Usually year two, sometimes year three. A meaningful harvest in the first season is unrealistic from seed, which is part of why nurseries propagate from cuttings instead.",
      },
      {
        question: "Why is lavender so hard to grow from seed?",
        answer:
          "Several things stack up: the seed benefits from a cold period, it needs light rather than covering, germination is slow and uneven by nature, and seedlings are variable because lavender does not come true from seed. None of that indicates poor-quality seed.",
      },
    ],
  },
  calendula: {
    title: "How to Grow Calendula From Seed (The Easiest Plant in the Kit)",
    description:
      "Calendula germinates in a week or two, tolerates poor soil and flowers within two months. When to sow, how deep, why it needs darkness to germinate, and how to keep it flowering until frost.",
    standfirst:
      "If you have never grown anything from seed before, start here. Calendula is quick, forgiving, and the one plant in this collection that is genuinely difficult to fail with.",
    sections: [
      {
        h2: "When to sow calendula seeds",
        body: [
          "Calendula is an annual, which means it germinates, flowers, sets seed and dies within a single season. That simplicity is what makes it easy: there is no dormancy to break, no cold period to arrange, and no year-two wait.",
          "You have two workable windows. Sow indoors four to six weeks before your last frost date for the earliest possible flowers, or sow directly outdoors once the soil has warmed and frost has passed. Direct sowing is less work and calendula transplants well enough that you are not gaining much by starting early.",
          "In milder regions an autumn sowing overwinters as a small rosette and flowers noticeably earlier the following spring. It is worth trying if your winters are gentle.",
        ],
        list: [
          "Four to six weeks before last frost: sow indoors in trays if you want early flowers.",
          "After the last frost, once soil has warmed: sow directly where the plants are to grow.",
          "Late summer or early autumn, mild regions only: sow for an early display the following year.",
        ],
      },
      {
        h2: "How to sow: the one detail that matters",
        body: [
          "Calendula seed needs darkness to germinate. This is the opposite of several other species in the kit, and it is the single most common reason a tray of calendula disappoints.",
          "Sow at about 6 mm (1/4 inch) and cover the seed properly. Surface-sown calendula, or seed pressed in and left exposed to light, germinates poorly and unevenly. If you are sowing several species at once, this is the one to keep separate in your head.",
          "The seed itself is unmistakable: curved, ridged, greyish-brown and shaped like a small crescent or a curled caterpillar. Nothing else in the kit looks like it, which makes it hard to mix up.",
        ],
        list: [
          "Sow 6 mm (1/4 in) deep and cover completely. Darkness is required.",
          "Space about 20–30 cm (8–12 in) apart, or thin to that once seedlings are up.",
          "Keep the soil moist but not saturated until germination.",
          "Expect seedlings in 7–14 days at ordinary room or spring soil temperatures.",
        ],
      },
      {
        h2: "Soil, sun and the mistake of being too generous",
        body: [
          "Calendula grows in ordinary ground and does not want to be fussed over. Full sun gives the best flowering, though it tolerates part shade better than most annuals, and it copes with soil that other plants would sulk in.",
          "Rich soil and heavy feeding produce lush foliage and fewer flowers. If you have been improving a bed for years, calendula will do fine in the poorest corner of it. This is a plant that rewards benign neglect.",
          "It also prefers cooler weather. In hot summers plants often slow down or look tired through the worst of it, then pick up again as temperatures drop in late summer.",
        ],
      },
      {
        h2: "Keeping it flowering until frost",
        body: [
          "Calendula flowers roughly six to eight weeks from sowing, and then it will keep going for months — but only if you keep picking.",
          "The plant's purpose is to set seed. Once it succeeds, flowering slows dramatically. Deadheading, or simply harvesting the flowers, interrupts that and pushes the plant to produce more. A calendula that is picked over every few days will out-flower an unpicked one several times over.",
          "Toward the end of the season, let some heads mature and dry on the plant. Calendula self-seeds freely, and one packet realistically gives you calendula in that bed for years without buying more.",
        ],
      },
      {
        h2: "Common problems",
        body: [
          "Calendula is robust, but three things come up often enough to be worth naming.",
          "Powdery mildew shows up as a grey-white film on leaves, usually in humid conditions or where plants are crowded. Space plants properly, water at the base rather than over the foliage, and remove the worst affected leaves.",
          "Aphids like calendula, which is partly why some gardeners plant it deliberately near vegetables as a decoy. A jet of water or an insecticidal soap handles them, and ladybirds usually arrive on their own.",
          "Leggy, floppy plants generally mean too little light or too much feeding. Neither is fatal, and both are easy to correct next time.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "Calendula petals have a long history in European folk practice of being dried and infused into oils and salves, and the plant appears in herbals going back centuries. The flowers are also edible and have been used to colour food.",
          "That history is genuinely interesting. It is not clinical evidence, and nothing on this page should be read as a claim that calendula treats, prevents or cures anything.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long do calendula seeds take to germinate?",
        answer:
          "Usually 7 to 14 days at ordinary spring soil or room temperature. Germination is generally even and reliable, provided the seed has been covered — calendula needs darkness to germinate, so exposed seed comes up patchily.",
      },
      {
        question: "When should I plant calendula seeds?",
        answer:
          "Either indoors four to six weeks before your last frost, or directly outdoors once frost has passed and the soil has warmed. In mild-winter regions an autumn sowing overwinters as a small rosette and flowers earlier the following spring.",
      },
      {
        question: "How deep should calendula seeds be planted?",
        answer:
          "About 6 mm (1/4 inch), covered completely. This is important: calendula is one of the species that requires darkness for germination, so surface sowing gives poor results.",
      },
      {
        question: "Does calendula come back every year?",
        answer:
          "The individual plant does not — it is a true annual and dies after setting seed. But it self-seeds so freely that a patch usually reappears in the same place year after year without any help. Leave a few seed heads to mature if you want that.",
      },
      {
        question: "Will calendula flower in the first year?",
        answer:
          "Yes, and quickly. Expect flowers roughly six to eight weeks from sowing, continuing until frost if you keep deadheading or harvesting.",
      },
      {
        question: "Is calendula the same thing as marigold?",
        answer:
          "It is confusing, and the answer is no. Calendula officinalis is often called pot marigold, but the bedding marigolds sold in garden centres are Tagetes, a different genus entirely. Seed sold as 'marigold' is usually Tagetes, so check the botanical name.",
      },
    ],
  },
  yarrow: {
    title: "How to Grow Yarrow From Seed (And Why Year One Looks Like Failure)",
    description:
      "Yarrow needs light to germinate, is slow in its first season, and usually does not flower until year two. How to sow it, what to expect, and why patience is normal rather than a sign of bad seed.",
    standfirst:
      "Yarrow is genuinely easy to grow and genuinely frustrating to grow from seed, because everything it does in the first year looks like nothing happening.",
    sections: [
      {
        h2: "When to plant yarrow seeds",
        body: [
          "Yarrow is a hardy perennial that does not require a cold period to germinate, which puts it among the easier perennials in this collection. The complication is timing against its slow first year.",
          "Sow indoors six to eight weeks before your last frost so seedlings have as long a first season as possible to build roots, or sow directly outdoors in spring once the soil has warmed. An early-autumn direct sowing also works in most temperate regions and lets the plants establish before winter.",
          "Whichever you choose, the plant is investing in roots rather than flowers this year. Giving it a longer season is the main thing you can do to help.",
        ],
        list: [
          "Six to eight weeks before last frost: sow indoors in trays for the longest first season.",
          "Spring, after soil warms: direct sow where plants are to grow.",
          "Early autumn: direct sow so seedlings establish before winter, in regions with mild enough conditions.",
        ],
      },
      {
        h2: "Surface sow — yarrow needs light",
        body: [
          "Yarrow seed is tiny and requires light to germinate. Do not bury it. Press it onto the surface of moist compost so it makes good contact, and leave it uncovered, or dust it with the barest scatter of fine vermiculite if you are worried about it drying out.",
          "Because the seed is so small and sits on the surface, moisture control is the whole game. A tray dries out from the top down, and surface-sown seed is the first thing to suffer. Covering the tray with a clear lid or a sheet of glass until germination keeps humidity steady without burying anything.",
          "Expect seedlings in roughly 10 to 14 days. They emerge very small and stay small for a while, which is normal.",
        ],
        list: [
          "Press seed onto the surface of moist compost. Do not cover with soil.",
          "Keep humidity up with a clear lid rather than by watering heavily from above.",
          "Water from below where you can, so the seed is not washed about.",
          "Thin or transplant to about 30–45 cm (12–18 in) apart once seedlings can be handled.",
        ],
      },
      {
        h2: "What the first year actually looks like",
        body: [
          "This is the part that catches people out, and it is worth saying plainly: yarrow grown from seed usually does not flower in its first summer. It produces a low rosette of feathery, finely divided leaves and appears to stall.",
          "Nothing has gone wrong. The plant is building a root system, and the flat white flower clusters most people are waiting for typically arrive in year two. Gardeners who expect a display in the first season routinely conclude the seed was bad and throw the plant away a few months before it would have delivered.",
          "From year two onward yarrow is exceptionally hardy, drought-tolerant, and long-lived. It spreads by rhizome and will steadily widen its clump.",
        ],
      },
      {
        h2: "Soil, sun and how little it needs",
        body: [
          "Yarrow wants full sun and sharp drainage. Beyond that it is close to indifferent — it grows on roadsides and in thin, poor ground, and that is where it looks best.",
          "Rich, damp soil produces tall, soft growth that flops over in the first heavy rain. If your ground is fertile, expect to stake it or accept the sprawl. Poor soil produces shorter, stiffer, better-looking plants.",
          "Once established it needs essentially no watering in most temperate climates. Overwatering is a far more common cause of trouble than drought.",
        ],
      },
      {
        h2: "Keeping it in bounds",
        body: [
          "Yarrow spreads by underground rhizome as well as by seed, and in a bed it likes, it will keep going. This is a feature if you want ground cover and a nuisance if you wanted a tidy clump.",
          "Dividing the clump every two or three years in spring or autumn keeps it vigorous and gives you free plants. If you want to limit spread, deadhead before seed sets and lift any runners that stray.",
          "It is also one of the better plants here for pollinators — the flat flower heads are easy landing platforms for hoverflies and small beneficial insects.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "Yarrow appears in wound-care folklore across a remarkable number of cultures, and its botanical name, Achillea millefolium, references Achilles. It is one of the most widely recorded plants in European and North American folk practice.",
          "That is history, not evidence. Nothing on this page should be read as a claim that yarrow treats, prevents or cures anything, and yarrow can cause skin reactions in some people.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I plant yarrow seeds?",
        answer:
          "Surface sow. Yarrow seed needs light to germinate, so press it onto moist compost and leave it uncovered rather than burying it. Keep humidity steady with a clear cover until seedlings appear, usually in 10 to 14 days.",
      },
      {
        question: "When should I plant yarrow seeds?",
        answer:
          "Indoors six to eight weeks before your last frost, or directly outdoors in spring once the soil has warmed. Early autumn sowing also works in temperate regions and gives plants time to establish before winter.",
      },
      {
        question: "Do yarrow seeds need cold stratification?",
        answer:
          "No. Unlike echinacea, lavender and marshmallow, yarrow germinates without a cold period. It is one of the more straightforward perennials to start from seed — the difficulty is patience, not technique.",
      },
      {
        question: "What do yarrow seeds look like?",
        answer:
          "Very small, flat, pale tan to greyish, and roughly oval with a slight taper. They are light enough to blow away in a draught, which is worth knowing before you open the packet outdoors on a breezy day.",
      },
      {
        question: "Will yarrow flower in the first year from seed?",
        answer:
          "Usually not. Expect a low rosette of feathery foliage in year one and flowers in year two. This is normal perennial behaviour and not a sign the seed has failed.",
      },
      {
        question: "Does yarrow spread aggressively?",
        answer:
          "It spreads by rhizome and by self-seeding, and in conditions it likes it will keep expanding. That makes it excellent ground cover and a poor choice for a bed you want to stay tidy. Dividing every two or three years keeps it manageable and vigorous.",
      },
    ],
  },
  "california-poppy": {
    title: "How to Grow California Poppy From Seed (Direct Sow or Do Not Bother)",
    description:
      "California poppy forms a taproot and resents being moved, so it must be direct sown. When to sow, how shallow, why poor soil works better than good soil, and the transplanting mistake that ruins most attempts.",
    standfirst:
      "This is the one plant in the kit where the usual advice — start it indoors, transplant it out — is actively wrong. Get that single decision right and the rest is easy.",
    sections: [
      {
        h2: "Why you must direct sow California poppy",
        body: [
          "California poppy forms a long taproot almost immediately after germination, and that taproot does not tolerate disturbance. Lifting a seedling out of a module and putting it in the ground breaks or bends it, and the plant either dies or sulks permanently.",
          "This is the single most common reason people report failure with this species. The seed was fine, the germination was fine, and the plant was destroyed at transplanting.",
          "Sow it where you want it to flower. If you must start it in containers, use deep biodegradable pots that go into the ground intact, and accept that results will still be less reliable than direct sowing.",
        ],
      },
      {
        h2: "When to sow California poppy seeds",
        body: [
          "California poppy prefers cool soil for germination, which points toward earlier sowing than most annuals. In most of the United States that means early spring, as soon as the ground can be worked, or autumn.",
          "Autumn sowing is how the plant behaves in the wild — seed drops, sits through winter, and germinates with the first warmth. In regions with mild winters this produces earlier and often better displays than a spring sowing. In cold-winter regions, sow in early spring instead.",
          "Expect germination in roughly 14 to 21 days, and flowers around eight to ten weeks after that.",
        ],
        list: [
          "Early spring, as soon as soil is workable: the standard sowing for most regions.",
          "Autumn, mild-winter regions: scatter seed and leave it. Closest to how the plant grows naturally.",
          "Avoid sowing in the heat of summer — germination is poor in warm soil.",
        ],
      },
      {
        h2: "How to sow: barely cover it",
        body: [
          "Sow at about 3 mm (1/8 inch) — barely covered. The seed is small and round, roughly the size of a poppy seed you would put on bread, and burying it deeply is the second most common way to fail with it.",
          "Scatter the seed thinly over prepared ground, rake very lightly so it makes contact with soil, and water gently with a fine rose so you do not wash it away. Do not firm it down hard.",
          "Thin seedlings to roughly 15–20 cm (6–8 in) apart. Thinning feels wasteful and is worth doing anyway — crowded plants flower less and flop more.",
        ],
        list: [
          "Rake the bed to a rough tilth. It does not need to be fine or fertile.",
          "Scatter seed thinly and rake in to about 3 mm, no deeper.",
          "Water with a fine spray, not a stream.",
          "Thin to 15–20 cm apart once seedlings are large enough to handle.",
        ],
      },
      {
        h2: "Poor soil, full sun, and not much water",
        body: [
          "California poppy is native to dry, open ground and it behaves accordingly. Full sun is essential — in shade it stays leggy and refuses to open its flowers properly. The flowers themselves close at night and on overcast days, which is normal and not a problem.",
          "Poor, sandy, well-drained soil produces the best plants. Rich soil produces a lot of blue-grey foliage and disappointing flowering, and wet soil rots the taproot outright. If you have been improving a bed, this plant belongs somewhere else.",
          "Water it in to get it germinated, then largely leave it alone. Established plants are drought-tolerant, and overwatering is the most likely way to lose them.",
        ],
      },
      {
        h2: "Self-seeding and what happens next year",
        body: [
          "Left alone, California poppy sets seed prolifically and comes back. In mild climates it can behave as a short-lived perennial; in colder regions it dies with the frost and returns from self-sown seed.",
          "The seed pods are long and narrow and split explosively when ripe, flinging seed some distance from the parent. That is excellent if you want a naturalised drift and inconvenient if you wanted it in one tidy patch.",
          "If you want to collect seed, watch the pods and pick them when they turn from green to tan but before they split, then finish drying them in a paper bag so the seed is caught when they do.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "California poppy has a history of use in Californian folk practice, historically associated with rest and calm. It is the state flower of California and is widely grown ornamentally.",
          "That history is not clinical evidence, and nothing here should be read as a claim that the plant treats, prevents or cures anything. It is worth noting that this species is a relative of the opium poppy but is not the same plant and does not contain the same compounds.",
        ],
      },
    ],
    faqs: [
      {
        question: "When should I plant California poppy seeds?",
        answer:
          "Early spring, as soon as the soil can be worked, because the seed germinates best in cool soil. In mild-winter regions an autumn sowing works even better and mirrors how the plant reseeds itself in the wild. Avoid sowing into warm summer soil.",
      },
      {
        question: "Can I start California poppy indoors and transplant it?",
        answer:
          "It is strongly discouraged. The plant forms a taproot early and resents disturbance, so transplanted seedlings frequently die or never establish properly. Direct sow where the plants are to flower. If you have no choice, use deep biodegradable pots planted out intact.",
      },
      {
        question: "How deep should California poppy seeds be planted?",
        answer:
          "About 3 mm (1/8 inch) — barely covered. Rake lightly so the seed contacts soil rather than burying it. Sowing too deep is one of the two main causes of failure, alongside transplanting.",
      },
      {
        question: "How long do California poppy seeds take to germinate?",
        answer:
          "Roughly 14 to 21 days in cool soil, with flowers following about eight to ten weeks later. Germination is noticeably poorer in warm soil, which is why timing matters more with this species than with most annuals.",
      },
      {
        question: "Do California poppies come back every year?",
        answer:
          "In mild climates they can persist as short-lived perennials. Elsewhere they die with frost but self-seed so readily that the patch usually returns. The pods split explosively and scatter seed, so expect them to move around the bed.",
      },
      {
        question: "Why are my California poppies all leaves and no flowers?",
        answer:
          "Almost always too much of a good thing: rich soil, heavy feeding, or too much water. This plant flowers best in poor, dry, well-drained ground in full sun. Shade also causes leggy growth and flowers that never open properly.",
      },
    ],
  },
};

export const getHerbGuide = (slug) => HERB_GUIDES[slug];
