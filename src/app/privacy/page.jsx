import Link from "next/link";
import { SITE } from "@/lib/site";
import { Breadcrumbs, PageHeader } from "@/components/ui";

export const metadata = {
  title: "Privacy Policy",
  description:
    "What data The Homestead Shelf collects, what it does not collect, and how affiliate links work.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/privacy", label: "Privacy" },
        ]}
      />
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        standfirst="Last updated 25 August 2026."
      />

      <div className="prose-shelf mt-8">
        <h2>What we collect</h2>
        <p>
          {SITE.name} does not ask you to create an account, and we do not
          collect names, addresses or payment details. We do not run a
          newsletter sign-up at this time.
        </p>
        <p>
          If you email us, we receive your email address and whatever you choose
          to write. We use it to reply and nothing else.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use privacy-respecting analytics to understand which pages are
          read, and search engine webmaster tools to see which queries bring
          people here. These report aggregate patterns — page views, search
          terms, general location at country level — not individuals.
        </p>

        <h2>Affiliate links</h2>
        <p>
          Some outbound links are affiliate links. When you click one, the
          destination site and its payment processor may set a cookie recording
          that the visit came from us, so any resulting sale can be attributed.
          That happens on their site under their privacy policy, not ours.
        </p>
        <p>
          We do not receive your personal information from those purchases. We
          see aggregate commission reporting only.{" "}
          <Link href="/disclosure">More about how affiliate links work</Link>.
        </p>

        <h2>Cookies we set</h2>
        <p>
          This site does not set advertising or tracking cookies of its own.
        </p>

        <h2>Third parties</h2>
        <p>
          Pages are served through a hosting provider, which processes standard
          server request data such as IP address and user agent for security and
          delivery. Fonts are served as part of the site build.
        </p>

        <h2>Your rights</h2>
        <p>
          If you have emailed us and want that correspondence deleted, ask and we
          will delete it. Contact details are on the{" "}
          <Link href="/contact">contact page</Link>.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes materially we will update the date at the top of
          this page.
        </p>
      </div>
    </div>
  );
}
