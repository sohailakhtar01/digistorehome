import { SITE } from "@/lib/site";
import { Breadcrumbs, PageHeader } from "@/components/ui";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with The Homestead Shelf — corrections, questions and feedback.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        standfirst="Corrections especially welcome. If we have published something inaccurate we want to know."
      />

      <div className="prose-shelf mt-8">
        <p>
          Email us at{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>What we respond to</h2>
        <ul>
          <li>
            <strong>Corrections.</strong> If a fact on this site is wrong, tell
            us what and where. We will verify it, fix it, and note the change on
            the page.
          </li>
          <li>
            <strong>Questions about a product we have reviewed.</strong> If we
            do not know the answer we will say so rather than guess.
          </li>
          <li>
            <strong>Growing questions</strong> on species we have written guides
            for.
          </li>
        </ul>

        <h2>What we do not do</h2>
        <ul>
          <li>
            <strong>Paid reviews or sponsored placements.</strong> We do not
            sell coverage, positions in a list, or ratings.
          </li>
          <li>
            <strong>Medical advice.</strong> We cannot and will not advise on
            health conditions, medication interactions or treatment. Please
            speak to a qualified healthcare provider.
          </li>
        </ul>
      </div>
    </div>
  );
}
