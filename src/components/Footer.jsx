import Link from "next/link";
import { EDITOR, FOOTER_GROUPS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface-sunk">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
        {/* Brand spans the full width until desktop; the three link groups
            pair up two-across on phones so the footer does not become a long
            single-file column, then all four sit in a row from lg. */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <p className="font-serif text-lg font-semibold">{SITE.name}</p>
            <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted">
              {SITE.description}
            </p>
            <p className="mt-4 text-sm text-muted">
              Written by{" "}
              <Link
                href="/about"
                className="font-medium text-foreground underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                {EDITOR.name}
              </Link>
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-1.5 inline-block break-all text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
            >
              {SITE.email}
            </a>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
                {group.heading}
              </p>
              <ul className="mt-3.5 flex flex-col gap-2.5 text-sm">
                {group.links.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        data-plain
                        className="text-muted transition-colors hover:text-accent"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        data-plain
                        className="text-muted transition-colors hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Two required notices, given equal weight and room to breathe rather
            than being run together into one grey paragraph. */}
        <div className="mt-12 grid gap-6 border-t border-line pt-8 text-xs leading-relaxed text-subtle sm:grid-cols-2 sm:gap-10">
          <p>
            <strong className="font-semibold text-muted">
              Affiliate disclosure
            </strong>
            <br />
            Some links on this site are affiliate links. If you buy through one
            we may earn a commission at no additional cost to you. It never
            changes what we write.{" "}
            <Link
              href="/disclosure"
              className="underline decoration-line-strong underline-offset-2 transition-colors hover:decoration-accent"
            >
              Full policy
            </Link>
            .
          </p>
          <p>
            <strong className="font-semibold text-muted">Not medical advice</strong>
            <br />
            Everything here is educational. Nothing is intended to diagnose,
            treat or prevent any condition. Consult a qualified healthcare
            provider before using any plant preparation.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE.founded} {SITE.name}. All rights reserved.
          </p>
          {/* Per-image attribution is rendered beside each photograph, which is
              what the CC licences actually require. Repeating every
              photographer's name here as well made the footer unreadable. */}
          <p>
            Plant photography from Wikimedia Commons under CC licences, credited
            beside each image.
          </p>
        </div>
      </div>
    </footer>
  );
}
