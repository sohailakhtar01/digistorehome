import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5">
        <Link
          href="/"
          data-plain
          className="group flex min-w-0 items-center gap-2 sm:gap-2.5"
          aria-label={`${SITE.name} — home`}
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4.5 w-4.5"
            >
              <path d="M12 21V10" />
              <path d="M12 13c0-3.2 2.1-5.8 5.3-6.3-.2 3.4-2.1 5.8-5.3 6.3Z" />
              <path d="M12 16.5c0-2.8-1.9-5.1-4.8-5.5.2 3 1.9 5.1 4.8 5.5Z" />
              <path d="M4 21h16" />
            </svg>
          </span>
          {/* Below 360px the full wordmark plus three nav links cannot fit,
              so the mark carries the brand on its own there. Above it, the
              wordmark returns. */}
          <span className="hidden truncate font-serif text-[0.95rem] font-semibold tracking-tight min-[360px]:inline sm:text-[1.05rem]">
            {SITE.name}
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center text-sm sm:gap-0.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-plain
                  className="block rounded-md px-2 py-2 font-medium text-muted transition-colors hover:bg-surface-sunk hover:text-accent sm:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
