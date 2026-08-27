import Link from "next/link";
import { EDITOR, SITE } from "@/lib/site";
import { Breadcrumbs, Callout, JsonLd, PageHeader } from "@/components/ui";

export const metadata = {
  title: "About",
  description:
    "Who runs The Homestead Shelf, how we research products, how we make money, and the rules we hold ourselves to.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  // Person, linked to the Organization by @id. Naming a real editor is the
  // cheapest credibility signal a small review site has, and the schema makes
  // that relationship explicit rather than leaving it to be inferred.
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#editor`,
    name: EDITOR.name,
    jobTitle: EDITOR.role,
    email: EDITOR.email,
    url: EDITOR.url,
    worksFor: { "@id": `${SITE.url}/#organization` },
    knowsAbout: [
      "Affiliate product research",
      "Medicinal herb gardening",
      "Growing herbs from seed",
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <JsonLd data={personLd} />
      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />
      <PageHeader
        eyebrow="About"
        title="How we work"
        standfirst="A small independent review site covering gardening, homesteading and preparedness products. Here is exactly how we research, how we earn, and what we will not do."
      />

      <div className="prose-shelf mt-8">
        <h2>What this site is</h2>
        <p>
          {SITE.name} reviews products that get sold hard and reviewed badly.
          The homesteading and preparedness market is full of sales pages with
          countdown timers and review sites that simply restate them. We think
          there is room for something plainer: what is in the box, what the
          sales page underplays, and who should not buy it.
        </p>

        <h2>Who writes this</h2>
        <p>
          My name is {EDITOR.name}, and I run {SITE.name}. It is a one-person
          site — there is no editorial team behind the word &ldquo;we&rdquo;, and
          I would rather say that plainly than let the plural imply otherwise.
        </p>
        <p>
          I am not a horticulturist, a herbalist or a medical professional, and
          nothing on this site should be read as though I were. What I do is
          read the primary sources properly: the actual sales page rather than
          other people&apos;s summaries of it, the university and extension
          material behind a growing claim, and the public record behind a
          credential. Then I write down what I found, including the parts that
          make a product look worse.
        </p>
        <p>
          The growing guides here reflect established horticultural practice for
          each species, not trials I ran in my own garden. Where a page depends
          on something I have not done myself, it says so on the page rather
          than in a disclaimer at the bottom.
        </p>
        <p>
          If something here is wrong, I would genuinely rather know. Corrections
          go to{" "}
          <a href={`mailto:${EDITOR.email}`}>{EDITOR.email}</a> and I will fix
          the page and say what changed.
        </p>

        <h2>How we research</h2>
        <ul>
          <li>
            <strong>We read the actual sales page and vendor documentation</strong>{" "}
            rather than summarising other reviews.
          </li>
          <li>
            <strong>We verify credentials against primary sources.</strong> When
            a product is sold on someone&apos;s expertise, we check that
            expertise — and where other sites have it wrong, we say so and show
            the correction.
          </li>
          <li>
            <strong>We separate what we tested from what we researched.</strong>{" "}
            If we have not used a product ourselves, the review says so in
            plain language on the page. We do not imply trials we did not run.
          </li>
          <li>
            <strong>We mark uncertainty as uncertainty.</strong> If a fact
            cannot be verified, we leave it out or label it unknown rather than
            guessing.
          </li>
        </ul>

        <h2>How we make money</h2>
        <p>
          Some links on this site are affiliate links. If you buy through one,
          we may earn a commission at no additional cost to you. That is how the
          site is funded, and we disclose it at the top of every page that
          contains one.
        </p>
        <p>
          What a commission does not do is change the assessment. Our reviews
          include the things that reduce sales — the species that are hard to
          grow, the year-long wait, the cheaper alternative — because a review
          that omits them is not worth reading. You can check that against the
          one we have published: the{" "}
          <Link href="/reviews/medicinal-garden-kit">
            Medicinal Garden Kit review
          </Link>{" "}
          names three species we think its sales page understates.{" "}
          <Link href="/disclosure">Read the full disclosure</Link>.
        </p>

        <Callout title="Our hard rules">
          <ul className="flex list-disc flex-col gap-1.5 pl-4">
            <li>No claim that any product treats, cures or prevents anything</li>
            <li>No invented testing, photos, ratings or reviewer personas</li>
            <li>No copied vendor sales copy</li>
            <li>No hidden affiliate links and no buried disclosure</li>
            <li>No countdown timers or manufactured urgency</li>
            <li>
              We never remove a true statement to protect a commission. If it
              came to that, the link would go, not the fact.
            </li>
          </ul>
        </Callout>

        <h2>On herbs and health</h2>
        <p>
          Several products we cover involve plants with long traditional or folk
          histories. We write about that history because it is genuinely
          interesting and it explains why these species are grown together.
        </p>
        <p>
          Traditional use is not clinical evidence. Nothing on this site is
          medical advice, and nothing here is intended to diagnose, treat, cure
          or prevent any condition. Plants can interact with medications. Talk to
          a qualified healthcare provider before using any herbal preparation.
        </p>

        <h2>Corrections</h2>
        <p>
          If you find something inaccurate, tell us and we will fix it and note
          the change. Accuracy is the only real asset a site like this has.{" "}
          <Link href="/contact">Get in touch</Link>.
        </p>
      </div>
    </div>
  );
}
