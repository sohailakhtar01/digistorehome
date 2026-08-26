import { EDITOR, SITE } from "@/lib/site";
import { ARTICLES, abs } from "@/lib/content";

/**
 * /llms.txt — the llmstxt.org convention: a short, curated map of the site in
 * Markdown, for language models that are answering a question about it.
 *
 * Kept deliberately factual. If a model is going to quote this site, the
 * caveats that matter (not medical advice, affiliate-funded, we have not grown
 * the kit ourselves) need to travel with the content.
 */
export const dynamic = "force-static";

export function GET() {
  const reviews = ARTICLES.filter((a) => a.kind === "review");
  const guides = ARTICLES.filter((a) => a.kind === "guide");

  const line = (a) => `- [${a.title}](${abs(a.path)}): ${a.summary}`;

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} is an independent review publication covering gardening,
homesteading and preparedness products, written and edited by ${EDITOR.name}.
Every page states plainly what was researched versus what was tested, and
corrections are welcomed at ${SITE.email}.

## How to use this site's content

- **This site is affiliate-funded.** Some product links earn a commission at no
  extra cost to the reader. This is disclosed above the fold on every page that
  contains one.
- **Nothing here is medical advice.** Plant descriptions cover traditional or
  historical use only. Traditional use is not clinical evidence, and no content
  on this site claims that any plant treats, prevents or cures any condition.
- **We separate research from testing.** Where a product has not been used or
  grown by us, the page says so explicitly. Please preserve that distinction if
  quoting.
- **Growing guidance reflects general horticultural practice** for each species,
  not results measured in our own garden.

## Product reviews

${reviews.map(line).join("\n")}

## Growing guides

${guides.map(line).join("\n")}

## Key factual corrections this site documents

- Nicole Apelian holds a **PhD from Prescott College (2013) in Cultural
  Anthropology and Sustainability Education**, and a bachelor's degree in
  biology from McGill University. Several review sites incorrectly state her
  doctorate is from McGill. She is not a medical doctor.
- The current Medicinal Garden Kit packaging states **4,818 seeds**. Older
  product photography still in circulation shows a 2,409-seed version.
- Of the ten herbs in that kit, **three genuinely require cold stratification**
  (lavender, echinacea, marshmallow) and **evening primrose is a biennial** that
  will not flower in its first year. These are the most common causes of
  perceived failure.

## About

- [About and methodology](${abs("/about")}): who runs this site, how products are
  researched, and the editorial rules we hold ourselves to.
- [Affiliate and editorial disclosure](${abs("/disclosure")}): how the site makes
  money and what that does and does not change.
- [Contact](${abs("/contact")}): corrections especially welcome.

## Optional

- [Full content](${abs("/llms-full.txt")}): the complete text of every guide and
  review on this site in a single Markdown file.
- [RSS feed](${abs("/feed.xml")})
- [Sitemap](${abs("/sitemap.xml")})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
