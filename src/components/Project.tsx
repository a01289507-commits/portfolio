"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "../sanity/lib/image";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type SanityProject = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  screenshot?: any;
  techStack?: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
};

/* ------------------------------------------------------------------ */
/*  Single project card                                                */
/* ------------------------------------------------------------------ */

function ProjectCard({
  title,
  description,
  thumbnail,
  tags,
  slug,
  liveDemoUrl,
  githubUrl,
}: {
  title: string;
  description: string;
  thumbnail: string | null;
  tags?: string[];
  slug: string;
  liveDemoUrl?: string;
  githubUrl?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#c9a227]/15 bg-neutral-950 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a227]/50 hover:shadow-[0_0_35px_-8px_rgba(201,162,39,0.35)]">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${title} — project screenshot`}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-600">
            No preview available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

        <div className="absolute right-3 top-3 flex translate-y-[-8px] gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {liveDemoUrl && (
            <Link
              href={liveDemoUrl}
              target="_blank"
              className="rounded-full bg-[#c9a227] p-2 text-black shadow-md transition-transform hover:scale-110"
              aria-label={`View live demo of ${title}`}
            >
              <ArrowUpRight size={16} />
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm shadow-md transition-transform hover:scale-110 hover:bg-white/20"
              aria-label={`View GitHub repo of ${title}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-[#c9a227]">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-400">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(tags ?? []).slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#c9a227]/25 px-3 py-1 text-xs text-[#c9a227]/80"
            >
              {tag}
            </span>
          ))}
          {(tags?.length ?? 0) > 4 && (
            <span className="rounded-full px-3 py-1 text-xs text-gray-500">
              +{(tags?.length ?? 0) - 4} more
            </span>
          )}
        </div>

        <Link
          href={`/projects/${slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#c9a227] transition-all group-hover:gap-2"
        >
          View Project
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper — renders heading + grid of project cards          */
/* ------------------------------------------------------------------ */

export default function Project({ projects }: { projects: SanityProject[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="relative w-full bg-black px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
          Work
        </p>
        <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Featured <span className="text-[#c9a227]">Projects.</span>
        </h2>
        <p className="mt-4 max-w-xl text-gray-400">
          A selection of things I&apos;ve designed, built, and shipped end to end.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const thumbnail = project.screenshot
              ? urlFor(project.screenshot).width(800).height(500).quality(75).url()
              : null;

            return (
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description}
                thumbnail={thumbnail}
                tags={project.techStack}
                slug={project.slug?.current}
                liveDemoUrl={project.liveDemoUrl}
                githubUrl={project.githubUrl}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

