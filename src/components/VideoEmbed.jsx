"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Click-to-load YouTube facade.
 *
 * Nothing is requested from YouTube until the visitor presses play: the poster
 * frame is a local WebP. That keeps third-party JS off the critical path, which
 * matters both for Core Web Vitals and because an embedded player would
 * otherwise be the heaviest thing on the page by a wide margin.
 */
export default function VideoEmbed({ video, caption }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden rounded-xl border border-line bg-surface-ink shadow-[var(--shadow-md)]">
        <div className="relative aspect-video">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              {/* The accessible name is built from this button's contents, so it
                  contains the visible title — an aria-label here would trip the
                  label/content mismatch rule instead. */}
              <span className="sr-only">Play video: </span>
              <Image
                src={video.thumb}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-crimson shadow-lg transition-transform duration-300 group-hover:scale-110"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-7 w-7 text-white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-5">
                <span className="block font-serif text-base font-semibold leading-snug text-white sm:text-lg">
                  {video.title}
                </span>
                <span className="mt-1 block text-xs text-white/75">
                  {video.channel} · plays on YouTube
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
      {(caption || video.why) && (
        <figcaption className="mt-2.5 text-sm leading-relaxed text-subtle">
          {caption ?? video.why}
        </figcaption>
      )}
    </figure>
  );
}
