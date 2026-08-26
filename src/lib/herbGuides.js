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
//   chamomile        — "planting chamomile seeds" 720 (RD 14) +
//                      "how to grow chamomile seeds" 480 (RD 19)
//   feverfew         — "feverfew where to plant" 3,600 (RD 7) +
//                      "feverfew plant identification" 210 (RD 15)
//   chicory          — "chicory plant seeds" 2,900 (RD 1)
//   marshmallow      — growing terms only. The "marshmallow root" head term
//                      (49,500, RD 50-90) is a supplement query, not a
//                      gardening one, and is deliberately not targeted.
//   evening-primrose — growing terms only, for the same reason: "evening
//                      primrose oil" (22,200) is a supplement query.

export const HERB_GUIDES = {
  echinacea: {
    title: "How to Grow Echinacea From Seed (Without the Patchy Germination)",
    seoTitle: "How to Grow Echinacea From Seed",
    description:
      "Echinacea germinates patchily in warm soil. Four weeks of cold stratification fixes it. When to sow, how deep, and why year one has no flowers.",
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
    title:
      "How to Grow and Germinate Lavender From Seed (And Why Professionals Usually Do Not)",
    seoTitle: "How to Grow Lavender From Seed",
    description:
      "Lavender is slow and low-percentage even for professionals. An eight-step germination method, and the six reasons a tray comes up empty.",
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
        h2: "How to germinate lavender seeds, step by step",
        howTo: {
          name: "How to germinate lavender seeds",
          description:
            "Stratifying, sowing and holding the conditions lavender needs during the four to six weeks it takes to germinate.",
          totalTime: "P70D",
          supply: [
            "Lavender seeds",
            "Free-draining seed compost",
            "Barely damp sand or paper towel",
            "Sealable bag or container",
          ],
          tool: ["Refrigerator", "Seed tray with clear lid", "Heat mat (optional)"],
        },
        body: [
          "This is the sequence that turns lavender from a frustrating seed into a manageable one. None of it is difficult on its own, but every step matters, and skipping one is usually why a tray produces nothing at all.",
        ],
        list: [
          "Cold stratify first. Mix the seed through barely damp sand, or fold it into a damp paper towel, seal it in a labelled bag and refrigerate at roughly 1–5°C (34–40°F) for three to six weeks. Squeezed hard, the medium should release no water — wet medium rots seed.",
          "Fill a tray with free-draining seed compost. Lavender resents sitting wet at every stage of its life and that starts here, so adding perlite or coarse sand to ordinary seed compost is worth the trouble.",
          "Surface sow. Press the seed onto the compost so it makes firm contact and leave it uncovered. Lavender needs light to germinate, so burying it works directly against you.",
          "Water from below. Stand the tray in shallow water until the surface darkens, then lift it out. Watering from above displaces surface-sown seed and compacts the compost.",
          "Cover the tray with a clear lid or propagator top to hold humidity, and put it somewhere bright but out of direct midday sun.",
          "Hold the temperature at roughly 18–21°C (65–70°F). A heat mat is the single most effective piece of equipment for this species. Below about 15°C germination becomes very slow and very patchy.",
          "Wait, and keep waiting. Two to four weeks is typical, six is common, and stragglers appear later still. Do not empty the tray at three weeks — that is the point at which most people discard seed that was going to work.",
          "Once seedlings appear, remove the cover gradually over several days and give them as much light as you can manage. Lavender seedlings go leggy quickly in poor light.",
        ],
      },
      {
        h2: "Why your lavender seeds did not germinate",
        body: [
          "Almost every failure with lavender seed comes down to one of six causes, and all six are fixable next time.",
          "If you are troubleshooting a tray that produced nothing, work down this list in order — the first two account for the large majority of cases on their own.",
        ],
        list: [
          "Not enough patience. By far the most common cause. Lavender is genuinely slow, and a tray emptied at three weeks was often a fortnight away from working.",
          "The seed was buried. Lavender needs light to germinate, so covered seed comes up poorly no matter what else you did correctly.",
          "Too cold. Below roughly 15°C germination turns slow and erratic. A windowsill in an unheated room in early spring is frequently colder than it feels.",
          "Too wet. Waterlogged compost rots seed before it can sprout, and it is what produces the fuzzy grey mould that appears across the surface. Free-draining compost and bottom watering both address it.",
          "No cold period. Lavender does germinate without stratification, but noticeably less reliably and less evenly. If everything else was right and the results were still thin, this is the likely gap.",
          "Old seed. Lavender viability falls away faster than most species. Seed more than a couple of years old, or stored somewhere warm, will underperform whatever you do with it.",
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
        question: "How do you germinate lavender seeds?",
        answer:
          "Cold stratify the seed for three to six weeks in the refrigerator, then surface sow onto free-draining compost without covering it, water from below, cover the tray to hold humidity, and hold it at 18–21°C (65–70°F). Germination usually takes two to six weeks and is often uneven.",
      },
      {
        question: "Why did my lavender seeds not germinate?",
        answer:
          "In order of likelihood: not waiting long enough, burying seed that needs light, temperatures below about 15°C, compost kept too wet, skipping the cold period, or seed that was simply too old. Lavender viability drops off faster than most species.",
      },
      {
        question: "Do lavender seeds need a heat mat?",
        answer:
          "Not strictly, but it is the most useful piece of equipment for this species. Lavender wants roughly 18–21°C to germinate reliably, and early-spring windowsills are often well below that. A heat mat turns patchy germination into even germination more consistently than anything else you can do.",
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
    seoTitle: "How to Grow Calendula From Seed",
    description:
      "The easiest seed in the collection. Sow it 6mm deep because it needs darkness to germinate, then expect flowers in six to eight weeks.",
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
    seoTitle: "How to Grow Yarrow From Seed",
    description:
      "Yarrow needs light to germinate, so surface sow it. Then expect foliage and no flowers in year one — that is normal, not a seed failure.",
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
    seoTitle: "How to Grow California Poppy From Seed",
    description:
      "California poppy forms a taproot and dies if transplanted, so direct sow only. When to sow into cool soil, and why poor ground beats rich.",
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
  chamomile: {
    title: "How to Grow German Chamomile From Seed (Do Not Bury It)",
    seoTitle: "How to Grow German Chamomile From Seed",
    description:
      "German chamomile needs light to germinate, so never bury it. Surface sow, keep the surface damp, and pick flowers from about eight weeks.",
    standfirst:
      "Chamomile is one of the fastest and most generous plants in this collection, and there is exactly one way to get it wrong: covering the seed.",
    sections: [
      {
        h2: "The one mistake that ruins chamomile",
        body: [
          "German chamomile seed requires light to germinate. Sow it at the depth the back of most seed packets suggests and it will barely come up at all.",
          "The seed is extremely fine — closer to dust than to anything you can pick up individually — and it needs to sit on the surface where light reaches it. Press it into contact with moist compost and leave it there uncovered.",
          "That creates the second problem, which is the only genuinely fussy thing about this plant: surface-sown seed dries out fast. A seedbed that dries between waterings kills germinating chamomile quickly, and it is the reason people who did everything else right still end up with an empty tray.",
        ],
        list: [
          "Sow on the surface. Do not cover with compost.",
          "Press gently so the seed makes contact, then water from below or with the finest possible spray.",
          "Cover the tray with a clear lid, glass or a propagator top until seedlings appear.",
          "Never let the surface dry out during the 7–14 day germination window.",
        ],
      },
      {
        h2: "When to sow chamomile",
        body: [
          "German chamomile is a true annual, so there is no cold period to arrange and no year-two wait. It flowers roughly eight to ten weeks from sowing.",
          "Sow indoors four to six weeks before your last frost if you want the earliest flowers, or direct sow outdoors once frost has passed. Outdoors, scatter the seed on a raked, moist surface and resist the urge to rake it in.",
          "Because it flowers so quickly, a second sowing three or four weeks after the first extends the picking season considerably.",
        ],
        list: [
          "Four to six weeks before last frost: sow indoors on the surface of moist compost.",
          "After last frost: direct sow onto a prepared, damp seedbed. Do not cover.",
          "Three to four weeks later: sow again for a longer flowering run.",
        ],
      },
      {
        h2: "German or Roman? They are different plants",
        body: [
          "This causes real confusion, and the two are not interchangeable. German chamomile, Matricaria recutita, is the annual in this kit — an upright, branching plant reaching perhaps 60 cm, with small white-and-yellow daisy flowers and a hollow, domed centre.",
          "Roman chamomile, Chamaemelum nobile, is a low-growing perennial used as ground cover and in chamomile lawns. It has a solid flower centre rather than a hollow one, and it spreads rather than standing upright.",
          "Growing advice written for one does not reliably apply to the other. If a guide tells you chamomile is perennial and mat-forming, it is describing Roman chamomile, not the plant in this packet.",
        ],
      },
      {
        h2: "Growing on and harvesting",
        body: [
          "Once germinated, chamomile is undemanding. Full sun to light shade, ordinary soil, moderate water. It does not want rich ground, and overfeeding produces soft growth and fewer flowers.",
          "Thin or space plants to roughly 15–20 cm apart. Crowded chamomile still flowers but is more prone to mildew and harder to pick from.",
          "Pick the flowers when the white petals are fully open and horizontal, before they begin to reflex backward and the centre darkens. Pick often — like calendula, the plant flowers harder the more you take. Dry the heads in a single layer somewhere airy and out of direct sun.",
        ],
      },
      {
        h2: "Self-seeding",
        body: [
          "Left to finish, chamomile sets seed prolifically and returns on its own the following year. In a bed it suits, one sowing is usually the only one you will ever make.",
          "That is convenient if you want a permanent chamomile patch and mildly inconvenient otherwise. Pulling volunteers is easy — the roots are shallow and the seedlings come up in obvious drifts.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "The dried flowers have been taken as a calming tea across European folk tradition for centuries, and chamomile is one of the most widely recognised plants in that tradition.",
          "That history is not clinical evidence. Nothing here should be read as a claim that chamomile treats, prevents or cures anything. Chamomile is in the daisy family, and people with allergies to that family sometimes react to it.",
        ],
      },
    ],
    faqs: [
      {
        question: "How deep should chamomile seeds be planted?",
        answer:
          "They should not be planted deep at all. German chamomile needs light to germinate, so press the seed onto the surface of moist compost and leave it uncovered. Burying it is the most common reason a sowing fails.",
      },
      {
        question: "How long do chamomile seeds take to germinate?",
        answer:
          "Usually 7 to 14 days, provided the surface never dries out. Because the seed sits exposed, moisture management matters more here than with almost anything else in the kit — a clear cover over the tray solves it.",
      },
      {
        question: "When should I plant chamomile seeds?",
        answer:
          "Indoors four to six weeks before your last frost, or direct sown outdoors once frost has passed. It flowers about eight to ten weeks from sowing, so a second sowing a month later extends the season.",
      },
      {
        question: "What is the difference between German and Roman chamomile?",
        answer:
          "German chamomile (Matricaria recutita) is an upright annual with a hollow flower centre — that is the species in this kit. Roman chamomile (Chamaemelum nobile) is a low, spreading perennial with a solid flower centre, used for chamomile lawns. Advice for one does not transfer to the other.",
      },
      {
        question: "When should I pick chamomile flowers?",
        answer:
          "When the white petals are fully open and horizontal, before they start to bend backward and the yellow centre darkens. Picking frequently pushes the plant to produce more flowers.",
      },
      {
        question: "Does chamomile come back every year?",
        answer:
          "German chamomile is an annual and the individual plant dies after setting seed, but it self-seeds so readily that the patch usually returns on its own. Leave a few flower heads to mature if you want that.",
      },
    ],
  },
  feverfew: {
    title: "How to Grow Feverfew From Seed (And How to Stop It Taking Over)",
    seoTitle: "How to Grow Feverfew From Seed",
    description:
      "Feverfew surface sows easily, flowers in year one if started early, and self-seeds hard enough to take over a bed. How to grow it and contain it.",
    standfirst:
      "Feverfew is easy to grow and easy to end up with far too much of. The skill with this plant is not germination — it is containment.",
    sections: [
      {
        h2: "Where to plant feverfew",
        body: [
          "Decide this before you sow, because it is the decision that matters most. Feverfew self-seeds enthusiastically, and wherever you put it is roughly where it will be for years. Choose a spot where volunteers are welcome rather than a carefully composed border.",
          "It wants full sun to light shade and well-drained soil, and it is genuinely unfussy beyond that. Poor, dry, stony ground suits it. Rich damp soil produces taller, softer plants that flop.",
          "A gravel path edge, a bank, or an informal corner suits it better than a bed you intend to keep controlled. Some gardeners grow it in containers purely to stop it spreading.",
        ],
      },
      {
        h2: "Sowing: surface sow, like chamomile",
        body: [
          "Feverfew seed needs light to germinate. Press it onto the surface of moist compost and leave it uncovered, exactly as you would with chamomile. Do not rake it in.",
          "Expect seedlings in roughly 10 to 14 days. Sown early enough — indoors six to eight weeks before your last frost — feverfew usually flowers in its first year, which is unusual for a perennial and one of the reasons people like it.",
          "Direct sowing outdoors in spring works too, though the plants will be later to flower.",
        ],
        list: [
          "Six to eight weeks before last frost: surface sow indoors for first-year flowers.",
          "Spring, after frost: direct sow onto a raked, damp surface. Do not cover.",
          "Thin or space to about 30 cm (12 in) apart.",
          "Seedlings appear in roughly 10–14 days.",
        ],
      },
      {
        h2: "How to identify feverfew",
        body: [
          "Feverfew is easy to confuse with chamomile at a glance, and both are in this kit, so it is worth being able to tell them apart.",
          "The leaves are the reliable difference. Feverfew has broader, flatter, yellowish-green leaves with rounded lobes — they look almost like small chrysanthemum leaves. German chamomile has very fine, thread-like, feathery foliage.",
          "The flowers help too. Feverfew produces clusters of small white daisies with a flat yellow centre and short, stubby petals, held in loose bunches. Chamomile flowers are carried more singly and have a distinctly domed, hollow centre. Feverfew also has a strong, bitter, slightly acrid smell when the leaves are crushed, which chamomile does not.",
        ],
      },
      {
        h2: "Keeping it in bounds",
        body: [
          "One feverfew plant produces a great deal of seed, and the following spring you will find seedlings some distance from where you sowed. This is the single thing gardeners complain about with this species.",
          "The fix is straightforward if you are disciplined: cut the flower heads off as they finish, before the seed ripens. That alone prevents most of the spread. Pulling unwanted seedlings is easy — they come up shallow-rooted and in obvious clusters.",
          "Feverfew is short-lived as a perennial, typically lasting two to three years before declining. Ironically, the self-seeding that makes it a nuisance is also what keeps a patch going, so most gardeners let a few heads set seed deliberately.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "Feverfew has a long documented history in European herbal tradition, where the leaves were used for headaches. It is one of the better-recorded plants in that tradition.",
          "That history is not the same thing as clinical evidence, and nothing on this page should be read as a claim that feverfew treats, prevents or cures anything. Feverfew is in the daisy family and can cause mouth irritation and allergic reactions; it is also not considered suitable during pregnancy. Speak to a qualified healthcare provider before using any plant preparation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where should I plant feverfew?",
        answer:
          "Somewhere you will not mind it spreading. Full sun to light shade in well-drained, even poor soil suits it best. It self-seeds hard, so an informal corner, bank or path edge works better than a carefully planned border. Containers are a reasonable option if you want it contained.",
      },
      {
        question: "How do I sow feverfew seeds?",
        answer:
          "Surface sow. Feverfew needs light to germinate, so press the seed onto moist compost and leave it uncovered. Seedlings usually appear in 10 to 14 days.",
      },
      {
        question: "Will feverfew flower in the first year?",
        answer:
          "Usually yes, if sown early enough — indoors six to eight weeks before your last frost. That makes it unusual among the perennials in this kit, most of which wait until year two.",
      },
      {
        question: "How do I tell feverfew from chamomile?",
        answer:
          "Look at the leaves. Feverfew has broad, flat, yellowish-green leaves with rounded lobes, like small chrysanthemum leaves. German chamomile has fine, thread-like, feathery foliage. Crushed feverfew leaves also have a strong bitter smell that chamomile lacks.",
      },
      {
        question: "Is feverfew invasive?",
        answer:
          "It is not usually classed as invasive, but it self-seeds aggressively and will colonise a bed if allowed to. Deadheading before seed ripens controls it, and unwanted seedlings pull out easily.",
      },
      {
        question: "How long does a feverfew plant live?",
        answer:
          "It is short-lived, typically two to three years. Most patches persist by self-seeding rather than by individual plants surviving, which is why gardeners often let a few heads set seed on purpose.",
      },
    ],
  },
  chicory: {
    title: "How to Grow Chicory From Seed (Check Your Region First)",
    seoTitle: "How to Grow Chicory From Seed",
    description:
      "Chicory has naturalised widely, so check your local weed list first. Then direct sow — the taproot will not survive being moved — and lift in autumn.",
    standfirst:
      "Chicory germinates in a week, tolerates drought, and comes back for years. Those same qualities are why it has naturalised across much of North America, so the first step here is not sowing.",
    sections: [
      {
        h2: "Check whether chicory is a problem where you live",
        body: [
          "Chicory is native to Europe and has naturalised widely elsewhere, including across much of the United States, where you will see its sky-blue flowers along roadsides all summer. In some regions it is listed as a noxious or invasive species.",
          "This is not a reason to avoid it everywhere. It is a reason to spend two minutes checking your state or county's noxious weed list, or your local extension service, before you plant it out. That check costs nothing and is the responsible thing to do with any vigorous naturalising species.",
          "If it is a problem locally, grow it in a container and deadhead before seed sets, or skip this packet. Neither ruins the kit.",
        ],
      },
      {
        h2: "Direct sow — chicory will not transplant",
        body: [
          "Chicory forms a deep taproot very early, and like California poppy it strongly resents being moved. Seedlings started in modules and transplanted out usually check badly or die outright.",
          "Sow it where it is going to stay. Prepare the ground to a reasonable depth if you want a good root, since a stony or compacted bed produces forked, stunted taproots.",
          "Sow at about 6 mm (1/4 inch) in spring once the soil has warmed, or in late summer for an autumn crop. Expect seedlings in 7 to 14 days — chicory germinates fast and reliably.",
        ],
        list: [
          "Prepare a bed with reasonable depth and no large stones.",
          "Sow 6 mm (1/4 in) deep, directly where plants are to grow.",
          "Thin to about 15–20 cm (6–8 in) apart for roots, wider for flowering plants.",
          "Seedlings appear in 7–14 days.",
        ],
      },
      {
        h2: "Growing on",
        body: [
          "Chicory needs very little once it is up. Full sun, ordinary soil, and no particular attention. It is genuinely drought tolerant after the first few weeks, and it survives cold that kills most of the other plants in this kit.",
          "In its first summer it produces a rosette of toothed leaves that look much like a dandelion's, which is a common source of confusion. The taproot develops beneath. In year two it sends up tall, wiry, sparsely leaved stems carrying the sky-blue flowers.",
          "Those flowers open in the morning and close by early afternoon, and each individual bloom lasts a single day. The plant keeps producing new ones over a long season.",
        ],
      },
      {
        h2: "Harvesting the root",
        body: [
          "The taproot is what most people grow chicory for. Lift it in autumn of the first year, once the plant has had a full season to build it — roots left to a second year get larger but also woodier and more fibrous.",
          "Dig rather than pull. The root goes down further than you expect and snaps easily, and a broken root left in the ground will regrow.",
          "Scrub, slice and dry the root thoroughly, then roast it if you intend to use it as a coffee substitute. Roasting is what produces the dark, bitter, faintly sweet character it is known for; unroasted dried root tastes quite different.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "The roasted root has been used historically as a coffee substitute and extender, particularly in Europe during wartime shortages and in the American South, where the practice persists in New Orleans coffee to this day. The young leaves have also been eaten as a bitter salad green.",
          "Those are culinary and historical uses. Nothing on this page should be read as a claim that chicory treats, prevents or cures anything.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I grow chicory from seed?",
        answer:
          "Direct sow at about 6 mm (1/4 inch) where the plants are to stay, in spring once the soil has warmed. Chicory forms a deep taproot early and does not transplant successfully, so starting it in modules is not recommended. Seedlings appear in 7 to 14 days.",
      },
      {
        question: "Is chicory invasive?",
        answer:
          "It has naturalised widely outside its native Europe and is listed as a noxious weed in some regions. Check your state or county list, or ask your local extension service, before planting it out. Where it is a concern, grow it in a container and deadhead before seed sets.",
      },
      {
        question: "When should I harvest chicory root?",
        answer:
          "Autumn of the first year, after a full growing season. Roots left into a second year grow larger but become woody and fibrous. Dig rather than pull — the taproot is deep and snaps easily, and a broken piece will regrow.",
      },
      {
        question: "Why is my chicory not flowering?",
        answer:
          "Most likely because it is a perennial in its first year. Chicory typically produces a leaf rosette and taproot in year one and flowers in year two. The first-year rosette looks very like a dandelion, which adds to the confusion.",
      },
      {
        question: "Why do the flowers close by lunchtime?",
        answer:
          "That is normal. Chicory flowers open in the morning and close in the early afternoon, and each individual flower lasts only one day. The plant produces new ones continuously over a long season.",
      },
      {
        question: "Do I have to roast chicory root?",
        answer:
          "If you want the coffee-substitute character, yes. Roasting develops the dark, bitter, slightly sweet flavour it is known for. Dried but unroasted root tastes quite different and is used differently.",
      },
    ],
  },
  marshmallow: {
    title: "How to Grow Marshmallow Root From Seed (Stratify It, and Keep It Wet)",
    seoTitle: "How to Grow Marshmallow From Seed",
    description:
      "Marshmallow germinates erratically without three to four weeks of cold stratification, and it wants genuinely damp ground. How to get both right.",
    standfirst:
      "Marshmallow is one of the three genuinely difficult species in this kit, and it fails in two predictable ways: sown without cold treatment, and planted somewhere too dry.",
    sections: [
      {
        h2: "Why marshmallow germinates so unevenly",
        howTo: {
          name: "How to cold stratify marshmallow seeds",
          description:
            "Three to four weeks of cold, moist storage, which is what turns marshmallow germination from erratic into dependable.",
          totalTime: "P28D",
          supply: [
            "Marshmallow (Althaea officinalis) seeds",
            "Barely damp sand or paper towel",
            "Sealable bag or container",
          ],
          tool: ["Refrigerator"],
        },
        body: [
          "Althaea officinalis is a temperate perennial with a hard seed coat and a dormancy mechanism that expects a winter. Sown straight into warm spring soil, germination is slow, patchy and often disappointing — 14 to 28 days at best, with large gaps.",
          "Three to four weeks of cold, moist stratification in the refrigerator markedly improves both the rate and the evenness. This is the same treatment echinacea and lavender need, and it is why three of the ten species in this kit share a single technique.",
          "Some growers also nick or lightly abrade the seed coat before stratifying, which can help water penetrate. It is fiddly with small seed and stratification alone is usually enough.",
        ],
        list: [
          "Dampen sand or a paper towel until barely moist — squeezed hard, no water should run out.",
          "Mix the seed through it and seal in a labelled bag or container.",
          "Refrigerate at roughly 1–5°C (34–40°F) for three to four weeks. Not the freezer.",
          "Check weekly for mould, then sow at about 6 mm (1/4 in) deep.",
        ],
      },
      {
        h2: "It is a wet-meadow plant, and that matters",
        body: [
          "This is the detail the sales copy tends to skip. Marshmallow grows naturally in damp meadows, ditches and salt marsh margins. It is not a plant for a dry sunny border, and treating it as one is the second reliable way to fail with it.",
          "Give it the dampest part of your garden, or somewhere you are willing to water consistently. It tolerates heavy soil that other herbs would resent, and it copes with some salt, which is a legacy of its coastal habitat.",
          "Full sun to part shade both work. Space plants generously — roughly 45–60 cm (18–24 in) — because an established plant becomes large, reaching well over a metre with soft, downy, grey-green leaves and pale pink flowers.",
        ],
      },
      {
        h2: "Timing and the first two years",
        body: [
          "Working backwards: stratification takes three to four weeks, and seedlings want six to eight weeks before going out. Start the cold treatment roughly ten to twelve weeks before your last frost.",
          "The simpler alternative, as with the other stratifying species, is to sow directly outdoors in late autumn and let winter do the work. Less control, less effort, frequently better results.",
          "Marshmallow is slow in year one and builds size and root mass rather than performing. The root is not worth lifting until year two at the earliest, and year three gives noticeably more.",
        ],
        list: [
          "Ten to twelve weeks before last frost: seed goes into the refrigerator.",
          "Six to eight weeks before last frost: sow the stratified seed, 6 mm deep.",
          "After frost: harden off and plant out 45–60 cm apart in damp ground.",
          "Alternative: sow outdoors in late autumn and skip the refrigerator entirely.",
        ],
      },
      {
        h2: "Harvesting the root",
        body: [
          "If you want root, lift in autumn of year two or later, once the top growth has died back and the plant has moved its resources downward. Younger roots are thin and give very little for the effort.",
          "Dig widely around the plant rather than pulling — the root system is substantial and brittle. Wash thoroughly, slice while fresh because it becomes very hard when dry, and dry the slices completely somewhere airy.",
          "You can lift part of a clump and leave the rest to keep growing, which is the sensible approach with a plant that took two years to get there.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "The mucilaginous root has been used traditionally as a soothing preparation, and the plant is the original source of the confection that still carries its name — modern marshmallows contain no Althaea at all.",
          "That history is not clinical evidence, and nothing on this page should be read as a claim that marshmallow treats, prevents or cures anything. Its mucilage content means it can affect how other medicines are absorbed; speak to a qualified healthcare provider before using any plant preparation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do marshmallow seeds need cold stratification?",
        answer:
          "In practice, yes. Sown straight into warm soil, germination is slow and patchy — often 14 to 28 days with large gaps. Three to four weeks of cold, moist storage in the refrigerator before sowing markedly improves both rate and evenness. Autumn outdoor sowing achieves the same thing using the real winter.",
      },
      {
        question: "How long do marshmallow seeds take to germinate?",
        answer:
          "Roughly 14 to 28 days, and notoriously uneven without stratification. Stratified seed tends toward the shorter end and comes up more consistently.",
      },
      {
        question: "Where should I plant marshmallow?",
        answer:
          "Somewhere damp. It is a wet-meadow and marsh-margin plant, and it struggles in dry beds. Give it the moistest part of the garden or be prepared to water consistently. It tolerates heavy soil and some salt, and grows in full sun or part shade.",
      },
      {
        question: "When can I harvest marshmallow root?",
        answer:
          "Autumn of year two at the earliest, after the top growth dies back. Year three gives noticeably more. First-year roots are too thin to be worth lifting. Slice the root while fresh — it becomes extremely hard once dry.",
      },
      {
        question: "How big does marshmallow get?",
        answer:
          "An established plant is large, commonly exceeding a metre in height with soft downy grey-green leaves and pale pink flowers. Space plants 45–60 cm (18–24 in) apart to allow for it.",
      },
      {
        question: "Is marshmallow root the same as marshmallow sweets?",
        answer:
          "Historically the confection was made using the plant's mucilaginous root, which is where the name comes from. Modern marshmallows contain no Althaea officinalis at all — they are sugar, gelatine and air.",
      },
    ],
  },
  "evening-primrose": {
    title: "How to Grow Evening Primrose From Seed (Year One Is Leaves Only)",
    seoTitle: "How to Grow Evening Primrose From Seed",
    description:
      "Evening primrose is a biennial: a leaf rosette in year one, flowers in year two. That is not failure. How to sow it and get blooms every year after.",
    standfirst:
      "This is the most commonly misdiagnosed failure in the whole kit. Evening primrose does exactly what it is supposed to do in year one, and what it is supposed to do looks like nothing.",
    sections: [
      {
        h2: "It is a biennial. That is the whole story.",
        body: [
          "Oenothera biennis takes two years to complete its life cycle, and the botanical name says so. In year one it germinates and forms a flat rosette of leaves close to the ground. That is all it does, all season, and it is entirely correct behaviour.",
          "In year two the plant sends up a tall flowering spike — often well over a metre — carrying yellow four-petalled flowers that open at dusk, sets seed, and dies.",
          "Gardeners who expect flowers in the first summer conclude the seed was bad or the plant failed, and pull it out a few months before it would have delivered. If you take one thing from this page, take that.",
        ],
      },
      {
        h2: "Sowing evening primrose",
        body: [
          "The seed is small and light aids germination, so sow shallowly — on the surface or barely covered to about 3 mm. Do not bury it.",
          "It germinates readily without any special treatment, usually in 14 to 21 days. A short cold, moist period improves consistency but is optional, unlike echinacea, lavender and marshmallow where it makes a real difference.",
          "Sow in spring for a rosette that overwinters and flowers the following summer, or in late summer or early autumn, which is closer to how the plant seeds itself naturally. Direct sowing is preferable — evening primrose forms a taproot and is happier not being moved.",
        ],
        list: [
          "Sow on the surface or barely covered, no deeper than 3 mm.",
          "Direct sow where plants are to grow — the taproot dislikes disturbance.",
          "Spring or late summer both work. Late summer mirrors natural self-seeding.",
          "Seedlings appear in roughly 14–21 days. Space 30–45 cm (12–18 in) apart.",
        ],
      },
      {
        h2: "Getting flowers every year",
        body: [
          "There is a simple trick to a biennial, and it is to sow in two consecutive years. Sow this year and next year, and from the second year onward you will always have one cohort flowering while another is building its rosette.",
          "After that the plant usually handles it itself. Evening primrose self-seeds freely, and an established patch generally sustains overlapping generations without further help.",
          "If you want to guarantee it, leave the seed pods on the plant to ripen and split rather than cutting the spent stems down tidily.",
        ],
      },
      {
        h2: "Where it grows and how big it gets",
        body: [
          "Evening primrose is undemanding to the point of being weedy. It wants full sun and well-drained soil, and it grows happily on poor, sandy, disturbed ground — which is where you will most often see it growing wild.",
          "Rich soil produces tall, soft plants that need staking. Poor soil produces sturdier ones. It is drought-tolerant once the taproot is down.",
          "Plan for the height. A flowering plant commonly reaches 1–1.5 m and looks gawky in a formal border. It is better suited to the back of an informal bed or a wild corner, where the dusk-opening flowers are worth watching for — they unfurl visibly over a few minutes on a summer evening, which is genuinely worth catching once.",
        ],
      },
      {
        h2: "Traditional use, stated carefully",
        body: [
          "The seed oil has a long history of traditional use, and the plant has an equally long record of use among Indigenous peoples of eastern North America, where it is native. The flowers open at dusk, which gives the plant its name.",
          "Extracting usable oil from the seed is an industrial process, not something achievable in a home kitchen, so a packet of seed is a gardening proposition rather than a route to a supplement. Nothing on this page should be read as a claim that evening primrose treats, prevents or cures anything, and it can interact with some medications. Speak to a qualified healthcare provider before using any plant preparation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is my evening primrose not flowering?",
        answer:
          "Almost certainly because it is in year one. Evening primrose is a biennial — it forms a flat leaf rosette in its first season and flowers in its second. This is normal and not a failure. Leave it in place over winter.",
      },
      {
        question: "How long do evening primrose seeds take to germinate?",
        answer:
          "Usually 14 to 21 days. It germinates readily without special treatment; a short cold, moist period improves consistency but is optional rather than necessary.",
      },
      {
        question: "How deep should evening primrose seeds be planted?",
        answer:
          "Very shallowly — on the surface or barely covered, no more than about 3 mm. Light aids germination, so burying the seed reduces your results.",
      },
      {
        question: "Do evening primrose seeds need cold stratification?",
        answer:
          "No, not in the way echinacea, lavender and marshmallow do. A cold period improves consistency slightly, but evening primrose germinates perfectly well without one.",
      },
      {
        question: "How do I get evening primrose to flower every year?",
        answer:
          "Sow in two consecutive years so you always have one cohort flowering while another builds its rosette. After that the plant self-seeds freely enough to sustain overlapping generations on its own, provided you let some seed pods ripen rather than cutting the stems down.",
      },
      {
        question: "How tall does evening primrose get?",
        answer:
          "The flowering spike commonly reaches 1 to 1.5 metres in year two. Rich soil makes it taller and softer and it may need staking; poor soil produces sturdier plants. Site it at the back of a bed rather than the front.",
      },
    ],
  },
};

export const getHerbGuide = (slug) => HERB_GUIDES[slug];
