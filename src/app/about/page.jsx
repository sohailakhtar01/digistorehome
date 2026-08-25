import Link from "next/link";
import { SITE } from "@/lib/site";
import { Breadcrumbs, Callout, PageHeader } from "@/components/ui";

// TODO (site owner): replace the editor block below with your real name and a
// two-line bio before you promote this page. An "about" page with no human
// behind it is the weakest part of any review site — and inventing a persona
// is not an option we will take.

export const metadata = {
  title: "About",
  description:
    "Who runs The Homestead Shelf, how we research products, how we make money, and the rules we hold ourselves to.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
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
          that omits them is not worth reading.{" "}
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
