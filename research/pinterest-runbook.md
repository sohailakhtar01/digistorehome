# Pinterest — what to do, in order

The pins are built and deployed. Everything below needs the account holder.
Budget about 90 minutes for setup, then ~10 minutes a day.

## Why this channel

The site ranks 85th on its best keyword because it is ten days old with zero
referring domains. Pinterest does not weight domain age — pins surface on
engagement. It is the only channel available to us this month.

## Setup, once

1. **Create a free Pinterest Business account.** Use a new one, not a personal
   profile. Business accounts get analytics, which is how we will know whether
   any of this works.

2. **Claim thehomesteadshelf.com** — Settings > Claimed accounts > Claim
   website. Pinterest gives you either an HTML meta tag or a file to upload.
   Send me whichever it gives you and I will deploy it; do not skip this, as
   attribution and Rich Pins both depend on it.

3. **Apply for Rich Pins** using Pinterest's Rich Pin Validator with any guide
   URL, for example `https://www.thehomesteadshelf.com/guides/lavender`. The
   pages already emit `og:type=article`, `og:title`, `og:description` and
   Article schema, so validation should pass without further work. Rich Pins
   pull the title and description from the page automatically.

4. **Make five boards**, not one:

   ```
   Growing Herbs From Seed        the ten species guides
   Seed Starting                  stratification, timing, germination
   Medicinal Herb Garden          the species, framed as a garden
   Cottage Garden Flowers         calendula, poppy, chamomile, feverfew
   Homestead Garden Planning      the calculator, when-to-plant
   ```

   Five boards means one pin can be saved to several relevant boards over time,
   which is normal Pinterest behaviour rather than duplication.

## The pins

22 files in `public/img/pins/`, live at
`https://www.thehomesteadshelf.com/img/pins/<name>.jpg`:

```
lavender.jpg      lavender-b.jpg      calendula.jpg      calendula-b.jpg
echinacea.jpg     echinacea-b.jpg     chicory.jpg        chicory-b.jpg
yarrow.jpg        yarrow-b.jpg        chamomile.jpg      chamomile-b.jpg
feverfew.jpg      feverfew-b.jpg      marshmallow.jpg    marshmallow-b.jpg
evening-primrose.jpg / -b.jpg         california-poppy.jpg / -b.jpg
cold-stratification.jpg / -b.jpg
```

Download them from the site or take them from the repo. Regenerate any time
with `npm run pins`.

## Posting

**One or two pins a day. Never all 22 at once** — Pinterest reads a burst from
a new account as spam, and the account is the asset here.

Each pin needs:
- **Destination URL** — the guide it belongs to, e.g.
  `https://www.thehomesteadshelf.com/guides/lavender`
- **Title** — the headline on the pin itself
- **Description** — two or three natural sentences. Say what the guide covers.
  Do not stuff keywords; Pinterest reads them as text, and a list of terms
  reads as spam to both the algorithm and the person.

A description that works, as a pattern rather than a template to copy ten
times:

> Lavender is genuinely difficult from seed — even nurseries usually take
> cuttings instead. Here is the germination method step by step, why trays
> come up empty, and how long to actually wait.

Write each one fresh. Ten near-identical descriptions is the thing that gets
a new account throttled.

**Order for the first two weeks.** Lead with what is in season: cold
stratification, then lavender and echinacea (the two hardest, so the two with
the most people looking for help), then the easy species.

## What to expect

Honestly: little for the first few weeks. New Pinterest accounts are
distributed cautiously, the same way new domains are. The realistic shape is
minimal movement for 3-4 weeks, then traffic building if pinning stays
consistent. Consistency beats volume — 1 pin a day for a month beats 22 in a
weekend and then nothing.

Watch in Pinterest Analytics: **outbound clicks**, not impressions or saves.
Clicks are the only number that becomes site traffic.

## What not to do

- **No affiliate links on Pinterest.** Pin to the guide; the guide carries the
  affiliate link with its disclosure. Direct affiliate links on Pinterest are
  a policy risk for no gain.
- **No engagement pods or follow-for-follow.** That is the spam line.
- **Do not delete and re-upload a pin that underperforms.** It resets its
  history for nothing.
