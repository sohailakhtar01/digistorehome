import Link from "next/link";
import { SITE } from "@/lib/site";
import { Breadcrumbs, PageHeader } from "@/components/ui";

export const metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of The Homestead Shelf, including editorial, affiliate and health information disclaimers.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/terms", label: "Terms" },
        ]}
      />
      <PageHeader
        eyebrow="Legal"
        title="Terms of use"
        standfirst="Last updated 25 August 2026."
      />

      <div className="prose-shelf mt-8">
        <h2>Using this site</h2>
        <p>
          {SITE.name} publishes editorial opinion and research about consumer
          products. By using the site you accept these terms. If you do not
          agree with them, please do not use the site.
        </p>

        <h2>No medical advice</h2>
        <p>
          <strong>
            Content on this site is educational and is not medical advice.
          </strong>{" "}
          Nothing here is intended to diagnose, treat, cure or prevent any
          disease or condition. Descriptions of traditional or historical plant
          use are statements about history, not claims of effect. Plants can be
          toxic, can be misidentified, and can interact with medication. Always
          consult a qualified healthcare provider before using any herbal
          preparation, and never use a plant medicinally without expert
          identification.
        </p>

        <h2>We are not the seller</h2>
        <p>
          We review products we do not sell. Purchases are made from third-party
          sellers under their own terms. Pricing, availability, delivery,
          support, warranties, guarantees and refunds are entirely the
          responsibility of that seller and their payment processor.
        </p>
        <p>
          Prices and product details quoted on this site were accurate when
          written and may change without notice. Always check the seller&apos;s
          own page before buying.
        </p>

        <h2>Affiliate relationships</h2>
        <p>
          We earn commissions on some purchases made through links on this site.
          See our <Link href="/disclosure">full disclosure</Link>.
        </p>

        <h2>Accuracy and opinion</h2>
        <p>
          We research carefully and correct errors when they are pointed out.
          Ratings and assessments are editorial opinion. Growing guidance
          reflects general horticultural practice — results vary with climate,
          soil, season and technique, and we cannot guarantee outcomes in your
          garden.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE.name} is not liable for
          any loss arising from use of this site or reliance on its content,
          including decisions to purchase or not purchase any product.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms: <Link href="/contact">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
