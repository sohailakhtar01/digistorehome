import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { HERB_IMAGES, SEED_IMAGES } from "@/lib/media";

export default function Footer() {
  // Credit every CC-licensed photograph in one place. CC BY-SA requires
  // attribution, so any new image set has to be added here as well as used.
  const credits = [...Object.values(HERB_IMAGES), ...Object.values(SEED_IMAGES)]
    .map((i) => `${i.author} (${i.license})`)
    .filter((v, i, a) => a.indexOf(v) === i);

  return (
    <footer className="mt-24 border-t border-line bg-surface-sunk">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-lg font-semibold">{SITE.name}</p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              {SITE.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-sm sm:grid-cols-1">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-plain
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/feed.xml"
                  data-plain
                  className="text-muted transition-colors hover:text-accent"
                >
                  RSS feed
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-7 text-xs leading-relaxed text-subtle">
          <p>
            <strong className="font-semibold text-muted">
              Affiliate disclosure:
            </strong>{" "}
            Some links on this site are affiliate links. If you buy through one,
            we may earn a commission at no additional cost to you. This never
            changes what we write.{" "}
            <Link href="/disclosure" className="underline underline-offset-2">
              Read our full disclosure
            </Link>
            .
          </p>
          <p className="mt-3">
            Information on this site is educational and is not medical advice.
            Nothing here is intended to diagnose, treat or prevent any condition.
            Consult a qualified healthcare provider before using any plant
            preparation.
          </p>
          <p className="mt-3">
            <strong className="font-semibold text-muted">
              Plant photography:
            </strong>{" "}
            sourced from Wikimedia Commons — {credits.join(", ")}. Product
            photography belongs to the respective vendor and is used for review
            purposes.
          </p>
          <p className="mt-5">
            © {SITE.founded} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
