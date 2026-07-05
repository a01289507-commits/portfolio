// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { urlFor } from "@/src/sanity/lib/image"

// gsap.registerPlugin(ScrollTrigger);

// /* ------------------------------------------------------------------ */
// /*  Types — mirrors the Sanity `project` schema                        */
// /* ------------------------------------------------------------------ */

// export type SanityProject = {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   description: string;
//   screenshot: any; // Sanity image object
//   techStack?: string[];
//   liveDemoUrl?: string;
//   githubUrl?: string;
//   featured?: boolean;
//   order?: number;
// };

// type ProjectsProps = {
//   projects: SanityProject[];
// };

// /* ------------------------------------------------------------------ */
// /*  Single project card                                                */
// /* ------------------------------------------------------------------ */

// function ProjectCard({ project }: { project: SanityProject }) {
//   const imageUrl = project.screenshot
//     ? urlFor(project.screenshot).width(1200).height(800).url()
//     : null;

//   return (
//     <div className="project-card group relative border border-white/10 hover:border-[#c9a227]/50 transition-colors duration-300">
//       {/* Clickable area: image + title + description → detail page */}
//       <Link href={`/projects/${project.slug.current}`}>
//         {/* Screenshot */}
//         <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/5">
//           {imageUrl ? (
//             <Image
//               src={imageUrl}
//               alt={project.title}
//               fill
//               className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
//               sizes="(max-width: 768px) 100vw, 50vw"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
//               No preview
//             </div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </div>

//         <div className="px-6 md:px-8 pt-6 md:pt-8">
//           <h3 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-[#c9a227] transition-colors">
//             {project.title}
//           </h3>

//           <p className="text-white/60 leading-relaxed mb-5">
//             {project.description}
//           </p>
//         </div>
//       </Link>

//       {/* Content below stays outside the Link (external links can't nest inside an <a>) */}
//       <div className="px-6 md:px-8 pb-6 md:pb-8">
//         {project.techStack && project.techStack.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-6">
//             {project.techStack.map((tech) => (
//               <span
//                 key={tech}
//                 className="text-xs tracking-wide text-[#c9a227]/80 border border-[#c9a227]/30 rounded-full px-3 py-1"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         )}

//         <div className="flex items-center gap-6">
//           {project.liveDemoUrl && (
//             <a
//               href={project.liveDemoUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-white/80 hover:text-[#c9a227] transition-colors"
//             >
//               Live Demo <span aria-hidden>↗</span>
//             </a>
//           )}
//           {project.githubUrl && (
//             <a
//               href={project.githubUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-white/80 hover:text-[#c9a227] transition-colors"
//             >
//               GitHub <span aria-hidden>↗</span>
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Section                                                             */
// /* ------------------------------------------------------------------ */

// export default function Projects({ projects }: ProjectsProps) {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const sorted = [...projects].sort(
//     (a, b) => (a.order ?? 999) - (b.order ?? 999)
//   );

//   useGSAP(
//     () => {
//       gsap.from(".projects-reveal", {
//         y: 24,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out",
//         stagger: 0.08,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 75%",
//         },
//       });

//       gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
//         gsap.from(card, {
//           y: 40,
//           opacity: 0,
//           duration: 0.8,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: card,
//             start: "top 85%",
//           },
//         });
//       });
//     },
//     { scope: sectionRef, dependencies: [projects] }
//   );

//   return (
//     <section
//       id="projects"
//       ref={sectionRef}
//       className="relative w-full bg-black text-white py-28 md:py-36"
//     >
//       <div className="max-w-6xl mx-auto px-6 md:px-10">
//         {/* Eyebrow */}
//         <p className="projects-reveal text-[#c9a227] text-xs tracking-[0.25em] font-semibold uppercase mb-4">
//           Work
//         </p>
//         <div className="projects-reveal w-10 h-px bg-[#c9a227] mb-10" />

//         {/* Heading */}
//         <h2 className="projects-reveal font-serif text-4xl md:text-6xl leading-[1.1] mb-6 max-w-xl">
//           Featured <span className="text-[#c9a227]">Projects.</span>
//         </h2>

//         <p className="projects-reveal text-white/60 text-base md:text-lg max-w-xl mb-16 leading-relaxed">
//           A selection of things I&apos;ve designed, built, and shipped end to
//           end.
//         </p>

//         {/* Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
//           {sorted.map((project) => (
//             <ProjectCard key={project._id} project={project} />
//           ))}
//         </div>

//         {sorted.length === 0 && (
//           <p className="text-white/40 text-center py-20">
//             Projects coming soon.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { urlFor } from "@/src/sanity/lib/image"

// gsap.registerPlugin(ScrollTrigger);

// /* ------------------------------------------------------------------ */
// /*  Types — mirrors the Sanity `project` schema                        */
// /* ------------------------------------------------------------------ */

// export type SanityProject = {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   description: string;
//   screenshot: any; // Sanity image object
//   techStack?: string[];
//   liveDemoUrl?: string;
//   githubUrl?: string;
//   featured?: boolean;
//   order?: number;
// };

// type ProjectsProps = {
//   projects: SanityProject[];
// };

// /* ------------------------------------------------------------------ */
// /*  Single project card                                                */
// /* ------------------------------------------------------------------ */

// function ProjectCard({ project }: { project: SanityProject }) {
//   const imageUrl = project.screenshot
//     ? urlFor(project.screenshot).width(1200).height(800).url()
//     : null;

//   return (
//     <div className="project-card group relative border border-white/10 hover:border-[#c9a227]/50 transition-colors duration-300">
//       {/* Clickable area: image + title + description → detail page */}
//       <Link href={`/projects/${project.slug.current}`}>
//         {/* Screenshot — reduced height + darker overlay so home page stays light */}
//         <div className="relative w-full aspect-[16/10] overflow-hidden bg-white/5">
//           {imageUrl ? (
//             <Image
//               src={imageUrl}
//               alt={project.title}
//               fill
//               className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
//               sizes="(max-width: 768px) 100vw, 50vw"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
//               No preview
//             </div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//           {/* "View Project" pill shown on hover, so intent to see more is explicit */}
//           <div className="absolute bottom-4 left-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
//             <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[#c9a227] border border-[#c9a227]/50 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-sm">
//               View Project <span aria-hidden>→</span>
//             </span>
//           </div>
//         </div>

//         <div className="px-6 md:px-8 pt-6 md:pt-8">
//           <h3 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-[#c9a227] transition-colors">
//             {project.title}
//           </h3>

//           {/* Truncated to 2 lines — full description lives on the project detail page */}
//           <p className="text-white/60 leading-relaxed mb-5 line-clamp-2">
//             {project.description}
//           </p>
//         </div>
//       </Link>

//       {/* Content below stays outside the Link (external links can't nest inside an <a>) */}
//       <div className="px-6 md:px-8 pb-6 md:pb-8">
//         {project.techStack && project.techStack.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-6">
//             {project.techStack.slice(0, 4).map((tech) => (
//               <span
//                 key={tech}
//                 className="text-xs tracking-wide text-[#c9a227]/80 border border-[#c9a227]/30 rounded-full px-3 py-1"
//               >
//                 {tech}
//               </span>
//             ))}
//             {project.techStack.length > 4 && (
//               <span className="text-xs tracking-wide text-white/40 px-3 py-1">
//                 +{project.techStack.length - 4} more
//               </span>
//             )}
//           </div>
//         )}

//         <div className="flex items-center gap-6">
//           <Link
//             href={`/projects/${project.slug.current}`}
//             className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-[#c9a227] hover:text-white transition-colors"
//           >
//             Case Study <span aria-hidden>→</span>
//           </Link>
//           {project.liveDemoUrl && (
//             <a
//               href={project.liveDemoUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-white/80 hover:text-[#c9a227] transition-colors"
//             >
//               Live Demo <span aria-hidden>↗</span>
//             </a>
//           )}
//           {project.githubUrl && (
//             <a
//               href={project.githubUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-white/80 hover:text-[#c9a227] transition-colors"
//             >
//               GitHub <span aria-hidden>↗</span>
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Section                                                             */
// /* ------------------------------------------------------------------ */

// export default function Projects({ projects }: ProjectsProps) {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   const sorted = [...projects].sort(
//     (a, b) => (a.order ?? 999) - (b.order ?? 999)
//   );

//   useGSAP(
//     () => {
//       gsap.from(".projects-reveal", {
//         y: 24,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out",
//         stagger: 0.08,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 75%",
//         },
//       });

//       gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
//         gsap.from(card, {
//           y: 40,
//           opacity: 0,
//           duration: 0.8,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: card,
//             start: "top 85%",
//           },
//         });
//       });
//     },
//     { scope: sectionRef, dependencies: [projects] }
//   );

//   return (
//     <section
//       id="projects"
//       ref={sectionRef}
//       className="relative w-full bg-black text-white py-28 md:py-36"
//     >
//       <div className="max-w-6xl mx-auto px-6 md:px-10">
//         {/* Eyebrow */}
//         <p className="projects-reveal text-[#c9a227] text-xs tracking-[0.25em] font-semibold uppercase mb-4">
//           Work
//         </p>
//         <div className="projects-reveal w-10 h-px bg-[#c9a227] mb-10" />

//         {/* Heading */}
//         <h2 className="projects-reveal font-serif text-4xl md:text-6xl leading-[1.1] mb-6 max-w-xl">
//           Featured <span className="text-[#c9a227]">Projects.</span>
//         </h2>

//         <p className="projects-reveal text-white/60 text-base md:text-lg max-w-xl mb-16 leading-relaxed">
//           A selection of things I&apos;ve designed, built, and shipped end to
//           end.
//         </p>

//         {/* Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
//           {sorted.map((project) => (
//             <ProjectCard key={project._id} project={project} />
//           ))}
//         </div>

//         {sorted.length === 0 && (
//           <p className="text-white/40 text-center py-20">
//             Projects coming soon.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }



"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Types — mirrors the Sanity `project` schema                        */
/* ------------------------------------------------------------------ */

export type SanityProject = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  screenshot: any; // Sanity image object — used only on the detail page
  techStack?: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
};

type ProjectsProps = {
  projects: SanityProject[];
};

/* ------------------------------------------------------------------ */
/*  Single project card — no image here, image lives on detail page    */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: SanityProject }) {
  return (
    <div className="project-card group relative border border-white/10 hover:border-[#c9a227]/50 transition-colors duration-300">
      {/* Clickable area: title + description → detail page */}
      <Link href={`/projects/${project.slug.current}`}>
        <div className="px-6 md:px-8 pt-8 md:pt-10">
          <h3 className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-[#c9a227] transition-colors">
            {project.title}
          </h3>

          {/* Truncated to 2 lines — full description lives on the project detail page */}
          <p className="text-white/60 leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[#c9a227] group-hover:gap-3 transition-all">
            View Project <span aria-hidden>→</span>
          </span>
        </div>
      </Link>

      {/* Content below stays outside the Link (external links can't nest inside an <a>) */}
      <div className="px-6 md:px-8 pt-6 pb-8 md:pb-10">
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs tracking-wide text-[#c9a227]/80 border border-[#c9a227]/30 rounded-full px-3 py-1"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-xs tracking-wide text-white/40 px-3 py-1">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-6">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-white/80 hover:text-[#c9a227] transition-colors"
            >
              Live Demo <span aria-hidden>↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-white/80 hover:text-[#c9a227] transition-colors"
            >
              GitHub <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */

export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const sorted = [...projects].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999)
  );

  useGSAP(
    () => {
      gsap.from(".projects-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [projects] }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-black text-white py-28 md:py-36"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <p className="projects-reveal text-[#c9a227] text-xs tracking-[0.25em] font-semibold uppercase mb-4">
          Work
        </p>
        <div className="projects-reveal w-10 h-px bg-[#c9a227] mb-10" />

        {/* Heading */}
        <h2 className="projects-reveal font-serif text-4xl md:text-6xl leading-[1.1] mb-6 max-w-xl">
          Featured <span className="text-[#c9a227]">Projects.</span>
        </h2>

        <p className="projects-reveal text-white/60 text-base md:text-lg max-w-xl mb-16 leading-relaxed">
          A selection of things I&apos;ve designed, built, and shipped end to
          end.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {sorted.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {sorted.length === 0 && (
          <p className="text-white/40 text-center py-20">
            Projects coming soon.
          </p>
        )}
      </div>
    </section>
  );
}