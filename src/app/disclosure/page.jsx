import Link from "next/link";
import { SITE } from "@/lib/site";
import { Breadcrumbs, PageHeader } from "@/components/ui";

export const metadata = {
  title: "Affiliate & Editorial Disclosure",
  description:
    "How The Homestead Shelf makes money, what an affiliate link is, and what it does and does not change about what we publish.",
  alternates: { canonical: "/disclosure" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/disclosure", label: "Disclosure" },
        ]}
      />
      <PageHeader
        eyebrow="Disclosure"
        title="Affiliate and editorial disclosure"
        standfirst="Required by the FTC, and worth stating clearly regardless."
      />

      <div className="prose-shelf mt-8">
        <h2>The short version</h2>
        <p>
          <strong>
            {SITE.name} earns affiliate commissions from some of the products it
            reviews.
          </strong>{" "}
          If you click a link on this site and buy something, we may receive a
          commission from the seller. It costs you nothing extra — the price is
          the same whether you use our link or go direct.
        </p>

        <h2>What an affiliate link is</h2>
        <p>
          An affiliate link is a normal link with a tracking code attached. If
          you buy after clicking it, the seller can tell the sale came from us
          and pays a percentage. We mark these links so browsers and search
          engines can identify them, and they open in a new tab.
        </p>
        <p>
          Currently, product links on this site point to sellers using the
          Digistore24 payment platform. We are not the seller, we do not process
          your payment, and we do not handle your personal or payment details.
          Your purchase, delivery, support and refund relationship is with the
          seller and their payment processor.
        </p>

        <h2>What it changes about our writing — nothing</h2>
        <p>
          This is the part that matters. Our reviews routinely include
          information that reduces sales:
        </p>
        <ul>
          <li>Which parts of a product are genuinely difficult or slow</li>
          <li>When a cheaper alternative would serve you better</li>
          <li>Who should not buy the product at all</li>
          <li>
            Where a sales page overstates something, including artificial
            urgency
          </li>
        </ul>
        <p>
          We include those because a review without them is advertising. If we
          ever had to choose between an accurate statement and a commission, the
          commission goes.
        </p>

        <h2>Ratings</h2>
        <p>
          Ratings on this site are our own editorial assessment, and each review
          states what the rating is based on. They are not aggregated customer
          scores, and we do not display a rating we did not arrive at ourselves.
        </p>

        <h2>Health information</h2>
        <p>
          Some products we review involve plants with traditional or folk
          histories of use. We describe that history as history. Nothing on this
          site is medical advice, and nothing here is intended to diagnose,
          treat, cure or prevent any disease or condition. Consult a qualified
          healthcare provider before using any herbal preparation.
        </p>

        <h2>Questions</h2>
        <p>
          If anything here is unclear, or you think we have got something wrong,{" "}
          <Link href="/contact">please tell us</Link>.
        </p>
      </div>
    </div>
  );
}
