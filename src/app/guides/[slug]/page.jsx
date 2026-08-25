import Link from "next/link";
import { notFound } from "next/navigation";
import { PUBLISHED_HERB_GUIDES, getHerb } from "@/lib/herbs";
import { getHerbGuide } from "@/lib/herbGuides";
import { getHerbImage, VIDEOS } from "@/lib/media";
import { SITE } from "@/lib/site";
import VideoEmbed from "@/components/VideoEmbed";
import {
  Breadcrumbs,
  Callout,
  DifficultyBadge,
  Figure,
  JsonLd,
  MedicalDisclaimer,
  PageHeader,
} from "@/components/ui";

// Which verified video belongs on which guide.
const GUIDE_VIDEO = {
  echinacea: VIDEOS.echinaceaFromSeed,
  lavender: VIDEOS.lavenderFromSeed,
};

export function generateStaticParams() {
  return PUBLISHED_HERB_GUIDES.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = getHerbGuide(slug);
  if (!guide) return {};
  const img = getHerbImage(slug);
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `/guides/${slug}`,
      images: img ? [{ url: img.src, width: 900, height: 675 }] : undefined,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const guide = getHerbGuide(slug);
  const herb = getHerb(slug);
  if (!guide || !herb) notFound();

  const img = getHerbImage(slug);
  const video = GUIDE_VIDEO[slug];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: img ? `${SITE.url}${img.src}` : undefined,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/guides/${slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE.url}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: herb.name,
        item: `${SITE.url}/guides/${slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />

      <Breadcrumbs
        trail={[
          { href: "/", label: "Home" },
          { href: "/guides", label: "Guides" },
          { href: `/guides/${slug}`, label: herb.name },
        ]}
      />

      <PageHeader
        eyebrow="Growing guide"
        title={guide.title}
        standfirst={guide.standfirst}
        meta={`By ${SITE.name} · ${herb.latin} · ${herb.lifecycle}`}
      />

      {img ? (
        <Figure
          src={img.src}
          alt={img.alt}
          width={900}
          height={675}
          priority
          sizes="(max-width: 768px) 100vw, 720px"
          credit={`Photo: ${img.author} / Wikimedia Commons (${img.license})`}
        />
      ) : null}

      <div className="not-prose grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-line bg-surface px-5 py-5 text-sm shadow-[var(--shadow-sm)] sm:grid-cols-4">
        <div>
          <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
            Difficulty
          </p>
          <p className="mt-1.5">
            <DifficultyBadge level={herb.difficulty} />
          </p>
        </div>
        <div>
          <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
            Germination
          </p>
          <p className="mt-1 font-semibold">{herb.germDays}</p>
        </div>
        <div>
          <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
            Sow depth
          </p>
          <p className="mt-1 font-semibold">{herb.sowDepth}</p>
        </div>
        <div>
          <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-subtle">
            First flowers
          </p>
          <p className="mt-1 font-semibold">{herb.firstHarvest}</p>
        </div>
      </div>

      {herb.stratification ? (
        <Callout tone="warn" title="Stratification needed">
          <p>
            {herb.name.split(" (")[0]} germinates far more reliably after a
            period of cold, moist storage before sowing:{" "}
            <strong>{herb.stratification}</strong>. Skipping this is the most
            common reason people get poor results.
          </p>
        </Callout>
      ) : null}

      <div className="prose-shelf mt-8">
        {guide.sections.map((section, i) => (
          <section key={section.h2}>
            <h2>{section.h2}</h2>
            {section.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {section.list ? (
              <ol>
                {section.list.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ol>
            ) : null}
            {/* Drop the video in after the second section, where technique starts. */}
            {i === 1 && video ? <VideoEmbed video={video} /> : null}
          </section>
        ))}
      </div>

      <div className="mt-8">
        <MedicalDisclaimer />
      </div>

      <nav className="mt-10 border-t border-line pt-8">
        <h2 className="font-serif text-xl font-semibold">Related</h2>
        <ul className="mt-4 flex flex-col gap-2 text-[0.95rem]">
          <li>
            <Link
              href="/guides/medicinal-herbs-to-grow"
              className="text-accent underline underline-offset-2"
            >
              All 10 medicinal herbs, ranked by how hard they are to grow
            </Link>
          </li>
          <li>
            <Link
              href="/reviews/medicinal-garden-kit"
              className="text-accent underline underline-offset-2"
            >
              Medicinal Garden Kit review — is the seed kit worth it?
            </Link>
          </li>
        </ul>
      </nav>
    </article>
  );
}
