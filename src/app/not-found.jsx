import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        404
      </p>
      <h1 className="mt-3 text-3xl sm:text-4xl">We could not find that page</h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
        The link may be out of date, or the page may not be written yet. We only
        publish pages once they are actually finished.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          data-plain
          className="inline-flex items-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
        >
          Back to home
        </Link>
        <Link
          href="/reviews"
          data-plain
          className="inline-flex items-center rounded-lg border border-line px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface-sunk"
        >
          Browse reviews
        </Link>
      </div>
    </div>
  );
}
