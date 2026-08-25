// Long-form content for the herb guides we have actually written.
// Only slugs present here should appear in PUBLISHED_HERB_GUIDES.
//
// Target queries (US monthly volume, DataForSEO, checked 2026-08-25):
//   lavender  — "how to grow lavender from seed" 1,900 (LOW competition)
//   echinacea — "how to grow echinacea from seed" 880 + "when to plant
//               echinacea seeds" 590 (LOW/MEDIUM competition)

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
};

export const getHerbGuide = (slug) => HERB_GUIDES[slug];
