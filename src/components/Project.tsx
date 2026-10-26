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

const MAX_TAGS = 3;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// "https://noire-e-commerce.vercel.app/" -> "noire-e-commerce.vercel.app"
function getHost(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

/* ------------------------------------------------------------------ */
/*  Single project card                                                */
/*                                                                     */
/*  Unique animation: screenshot ek mini browser window ke andar hai.  */
/*  Hover par poori website neeche tak "scroll" hoti hai, jaise koi    */
/*  page browse kar raha ho. Window ki height 12rem (h-48) hai, aur    */
/*  scroll distance calc(-100% + 12rem) — dono jagah same rakhna.      */
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
  const projectHref = `/projects/${slug}`;
  const safeTags = tags ?? [];
  const host = getHost(liveDemoUrl);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#c9a227]/15 bg-neutral-950 transition-colors duration-300 hover:border-[#c9a227]/50">
      {/* Mini browser bar */}
      <div className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-neutral-900 px-3">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 min-w-0 flex-1 truncate rounded bg-black/40 px-2 py-0.5 text-[10px] leading-none text-gray-500">
          {host || "localhost"}
        </span>
      </div>

      {/* Browser window — hover par page scroll hota hai */}
      <Link
        href={projectHref}
        className="relative block h-48 w-full overflow-hidden bg-neutral-900"
        aria-label={`Open ${title} case study`}
      >
        {thumbnail ? (
          <div
            className="
              w-full
              transition-transform duration-700 ease-out
              group-hover:duration-[4500ms] group-hover:ease-in-out
              group-hover:translate-y-[min(0px,calc(-100%_+_12rem))]
              motion-reduce:transition-none
              motion-reduce:group-hover:translate-y-0
            "
          >
            <Image
              src={thumbnail}
              alt={`${title} — website preview`}
              width={800}
              height={2400}
              className="block h-auto min-h-[12rem] w-full object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-600">
            No preview available
          </div>
        )}

        {/* Neeche halka fade, taake card ka content saaf alag dikhe */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-neutral-950 to-transparent" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-white transition-colors group-hover:text-[#c9a227]">
          {title}
        </h3>

        <p className="mt-1.5 line-clamp-2 min-h-[2.25rem] text-[13px] leading-snug text-gray-400">
          {description}
        </p>

        <div className="mt-3 flex min-h-[1.75rem] flex-wrap gap-1.5">
          {safeTags.slice(0, MAX_TAGS).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#c9a227]/25 px-2.5 py-0.5 text-[11px] text-[#c9a227]/80"
            >
              {tag}
            </span>
          ))}
          {safeTags.length > MAX_TAGS && (
            <span className="px-1.5 py-0.5 text-[11px] text-gray-500">
              +{safeTags.length - MAX_TAGS}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={projectHref}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[#c9a227] transition-all hover:gap-2"
          >
            View Project
            <ArrowUpRight size={13} />
          </Link>

          <div className="ml-auto flex items-center gap-1.5">
            {liveDemoUrl && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-[#c9a227] px-2.5 py-1 text-[11px] font-semibold text-black transition-transform hover:scale-105"
                aria-label={`View live demo of ${title}`}
              >
                Live
                <ArrowUpRight size={11} />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-white/10"
                aria-label={`View GitHub repo of ${title}`}
              >
                <GithubIcon />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
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

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            // Height nahi di: poora lamba screenshot chahiye taake hover par scroll ho sake
            const thumbnail = project.screenshot
              ? urlFor(project.screenshot).width(800).quality(75).url()
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