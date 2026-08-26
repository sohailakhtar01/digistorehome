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
  FAQ,
  Figure,
  JsonLd,
  KitCallout,
  MedicalDisclaimer,
  PageHeader,
  TableOfContents,
  slugifyHeading,
} from "@/components/ui";

const PUBLISHED = "2026-08-25";
const MODIFIED = "2026-08-25";

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
      publishedTime: PUBLISHED,
      modifiedTime: MODIFIED,
      images: [{ url: `/img/og/${slug}.jpg`, width: 1200, height: 630 }],
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
  const headings = guide.sections.map((s) => s.h2);

  // The stratification section doubles as a HowTo — it is a genuine
  // step-by-step procedure, which is exactly what the type is for.
  const stratSection = guide.sections.find((s) => Array.isArray(s.list) && /stratification/i.test(s.h2));

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE.url}/guides/${slug}#article`,
    headline: guide.title,
    description: guide.description,
    image: img ? [`${SITE.url}${img.src}`] : undefined,
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
    inLanguage: "en-US",
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntityOfPage: `${SITE.url}/guides/${slug}`,
    about: {
      "@type": "Thing",
      name: herb.name.split(" (")[0],
      alternateName: herb.latin,
    },
  };

  const faqLd = guide.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const howToLd = stratSection
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to cold stratify ${herb.name.split(" (")[0].toLowerCase()} seeds`,
        description: `Cold, moist stratification for ${herb.latin} — the step that most improves germination.`,
        totalTime: "P28D",
        supply: [
          { "@type": "HowToSupply", name: `${herb.name.split(" (")[0]} seeds` },
          { "@type": "HowToSupply", name: "Barely damp sand or paper towel" },
          { "@type": "HowToSupply", name: "Sealable bag or container" },
        ],
        tool: [{ "@type": "HowToTool", name: "Refrigerator" }],
        step: stratSection.list.map((text, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          text,
        })),
      }
    : null;

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
      {faqLd ? <JsonLd data={faqLd} /> : null}
      {howToLd ? <JsonLd data={howToLd} /> : null}
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
        meta={`By ${SITE.name} · Updated 25 August 2026 · ${herb.latin} · ${herb.lifecycle}`}
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
            common reason people get poor results.{" "}
            <Link
              href="/guides/cold-stratification"
              className="underline underline-offset-2"
            >
              Full stratification method
            </Link>
            .
          </p>
        </Callout>
      ) : null}

      <TableOfContents
        headings={headings}
        extra={guide.faqs?.length ? [{ id: "faq", label: "Frequently asked questions" }] : []}
      />

      <div className="prose-shelf mt-8">
        {guide.sections.map((section, i) => (
          <section key={section.h2}>
            <h2 id={slugifyHeading(section.h2)}>{section.h2}</h2>
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

        {/* Every species with a guide is a packet in the kit, so the bridge
            belongs on all of them. It sits after the growing advice, not before
            it — a reader who has not been helped yet has no reason to care. */}
        <KitCallout herb={herb.name.split(" (")[0]} />
      </div>

      {guide.faqs?.length ? (
        <section className="mt-12">
          <h2
            id="faq"
            className="mb-4 scroll-mt-24 font-serif text-2xl font-semibold"
          >
            Frequently asked questions
          </h2>
          <FAQ items={guide.faqs} />
        </section>
      ) : null}

      <div className="mt-10">
        <MedicalDisclaimer />
      </div>

      <nav className="mt-10 border-t border-line pt-8">
        <h2 className="font-serif text-xl font-semibold">Related</h2>
        <ul className="mt-4 flex flex-col gap-2 text-[0.95rem]">
          <li>
            <Link
              href="/guides/cold-stratification"
              className="text-accent underline underline-offset-2"
            >
              Cold stratification: the four-week step that fixes stubborn seed
            </Link>
          </li>
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
