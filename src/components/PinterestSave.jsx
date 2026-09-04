import Image from "next/image";
import { SITE } from "@/lib/site";

/**
 * A ready-made vertical pin, offered to the reader to save.
 *
 * Pinterest is the one discovery channel where a ten-day-old domain competes on
 * equal terms with the RHS -- pins surface on engagement, not on domain age.
 * The image is built by `scripts/make-pins.mjs` from herbs.js, so what a pin
 * claims and what the page says cannot drift apart.
 *
 * The link is Pinterest's documented save endpoint. It opens their composer
 * with the URL, image and description filled in; nothing is posted without the
 * reader completing it there.
 */
export default function PinterestSave({ slug, title, description }) {
  const pin = `/img/pins/${slug}.jpg`;
  const pageUrl = `${SITE.url}/guides/${slug}`;
  const save =
    "https://www.pinterest.com/pin/create/button/" +
    `?url=${encodeURIComponent(pageUrl)}` +
    `&media=${encodeURIComponent(SITE.url + pin)}` +
    `&description=${encodeURIComponent(description ?? title)}`;

  return (
    <aside className="not-prose my-9 overflow-hidden rounded-xl border border-line bg-surface-sunk">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <a
          href={save}
          target="_blank"
          rel="noopener noreferrer"
          data-plain
          className="group relative block w-28 shrink-0 self-start overflow-hidden rounded-lg border border-line shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)] sm:w-32"
        >
          <Image
            src={pin}
            alt={`Pinnable card: ${title}`}
            width={1000}
            height={1500}
            sizes="128px"
            className="h-auto w-full"
          />
        </a>

        <div className="min-w-0">
          <h2 className="font-serif text-lg font-semibold">
            Save this guide for planting season
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Sowing dates arrive months after most people read about them. Pin it
            now and it will be waiting when the timing actually matters.
          </p>
          <p className="mt-4">
            <a
              href={save}
              target="_blank"
              rel="noopener noreferrer"
              data-plain
              className="inline-flex items-center gap-2 rounded-lg bg-[#b8242a] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9c1e23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8242a]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
              Save to Pinterest
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
