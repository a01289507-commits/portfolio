import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type SanityProject = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  screenshot: any;
  demoVideoUrl?: string; // resolved file asset URL (see query below)
  techStack?: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* ------------------------------------------------------------------ */
/*  Static params — pre-builds a page for every project at build time  */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

/* ------------------------------------------------------------------ */
/*  SEO — per-project metadata (title, description, OG, Twitter card)  */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title, description, screenshot
    }`,
    { slug }
  );

  if (!project) {
    return { title: "Project not found" };
  }

  const ogImage = project.screenshot
    ? urlFor(project.screenshot).width(1200).height(630).url()
    : undefined;

  return {
    title: project.title, // combines with the template in layout.tsx → "Noire | Arooj Kainat"
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: project.title }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // NOTE: demoVideo is a Sanity `file` field — you must expand
  // `demoVideo.asset->url` in the GROQ query, otherwise you only get
  // back an asset reference (an _id string), not a playable URL.
  const project: SanityProject | null = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      ...,
      "demoVideoUrl": demoVideo.asset->url
    }`,
    { slug }
  );

  if (!project) {
    notFound();
  }
const imageUrl = project.screenshot
  ? urlFor(project.screenshot).width(1200).quality(75).url()
  : null;

  // Structured data (JSON-LD) — helps Google understand this is a
  // portfolio/creative work piece, can improve rich result eligibility.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Person",
      name: "Arooj Kainat",
    },
    image: imageUrl ?? undefined,
    url: project.liveDemoUrl ?? undefined,
  };

  return (
    <section className="relative w-full bg-black text-white min-h-screen py-28 md:py-36">
      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/40 hover:text-[#c9a227] transition-colors mb-12"
        >
          ← Back to Projects
        </Link>

        {/* Eyebrow */}
        <p className="text-[#c9a227] text-xs tracking-[0.25em] font-semibold uppercase mb-4">
          Project
        </p>
        <div className="w-10 h-px bg-[#c9a227] mb-8" />

        {/* Title — single h1 per page, good for SEO structure */}
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-8">
          {project.title}
        </h1>

        {/* Demo video — shown first if present, screenshot as fallback */}
        {project.demoVideoUrl ? (
          <div className="relative w-full mb-12 border border-white/10">
            <video
              src={project.demoVideoUrl}
              poster={imageUrl ?? undefined}
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
        ) : (
          imageUrl && (
            <div className="relative w-full mb-12 border border-white/10">
              <Image
                src={imageUrl}
                alt={project.title}
                width={2000}
                height={1400}
                className="w-full h-auto"
                priority
              />
            </div>
          )
        )}

        {/* Description */}
        <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
          {project.description}
        </p>

        {/* Tech stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mb-10">
            <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">
              Built With
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm tracking-wide text-[#c9a227]/80 border border-[#c9a227]/30 rounded-full px-4 py-1.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-8 pt-6 border-t border-white/10">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a227] text-black font-semibold text-sm tracking-wide uppercase px-6 py-3 hover:bg-[#e0b62f] transition-colors"
            >
              View Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-white/80 hover:text-[#c9a227] transition-colors"
            >
              View on GitHub <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}