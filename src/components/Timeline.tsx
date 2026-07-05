"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data — edit freely                                                  */
/* ------------------------------------------------------------------ */

type Entry = {
  period: string;
  title: string;
  description: string;
  tags?: string[];
  href?: string;
};

const ENTRIES: Entry[] = [
  {
    period: "2022",
    title: "BSc — Physics, Computer Science & Mathematics",
    description:
      "Built a foundation in analytical thinking and problem-solving that carries directly into how I structure and debug code today.",
  },
  {
    period: "2024",
    title: "Full-Stack Development, Self-Directed",
    description:
      "Completed an intensive course spanning the modern web stack — from markup fundamentals to production-grade databases.",
    tags: ["HTML", "CSS", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Api","Sanity CMS", "Database"],
  },
  {
    period: "Project",
    title: "Cake Corner",
    description:
      "A responsive bakery website with a warm, product-first layout — my first fully deployed client-style build.",
    tags: ["Next.js", "Tailwind CSS"],
    href: "https://cake-corner-two.vercel.app",
  },
  {
    period: "Project",
    title: "Noire",
    description:
      "A headless e-commerce store with luxury minimal styling, powered by a fully connected CMS backend.",
    tags: ["Next.js","Tailwind CSS" ,"Sanity CMS"],
    href: "https://noire-e-commerce.vercel.app",
  },
  {
    period: "Project",
    title: "EstateHub",
    description:
      "My most ambitious build — a production-grade real estate platform with scroll-driven Lottie animations and a full-stack database layer.",
    tags: ["Next.js", "GSAP", "Lottie", "Drizzle ORM", "Neon PostgreSQL"],
  },
  {
    period: "Now",
    title: "Open for Freelance & Internship Work",
    description:
      "Actively taking on remote projects and full-stack roles — reach out if there's something worth building together.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".timeline-reveal", {
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

      // The spine draws downward as the section enters view
      gsap.fromTo(
        ".timeline-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".timeline-list",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      // Each entry fades/slides in and its node lights up gold as it passes
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item) => {
        gsap.from(item, {
          x: -24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        });

        const node = item.querySelector(".timeline-node");
        if (node) {
          gsap.to(node, {
            backgroundColor: "#c9a227",
            borderColor: "#c9a227",
            scrollTrigger: {
              trigger: item,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full bg-black text-white py-28 md:py-36"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <p className="timeline-reveal text-[#c9a227] text-xs tracking-[0.25em] font-semibold uppercase mb-4">
          Timeline
        </p>
        <div className="timeline-reveal w-10 h-px bg-[#c9a227] mb-10" />

        {/* Heading */}
        <h2 className="timeline-reveal font-serif text-4xl md:text-6xl leading-[1.1] mb-6 max-w-xl">
          How I got <span className="text-[#c9a227]">here.</span>
        </h2>

        <p className="timeline-reveal text-white/60 text-base md:text-lg max-w-xl mb-20 leading-relaxed">
          A running log of what I&apos;ve studied, shipped, and learned along
          the way.
        </p>

        {/* Timeline list */}
        <div className="timeline-list relative pl-10 md:pl-14">
          {/* Spine */}
          <div className="timeline-spine absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-[#c9a227] origin-top" />
          {/* Faint static track behind the spine so the unlit path is visible */}
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-white/10 -z-10" />

          <div className="space-y-14">
            {ENTRIES.map((entry) => (
              <div key={entry.title} className="timeline-item relative">
                {/* Node */}
                <span className="timeline-node absolute -left-10 md:-left-14 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white/25 bg-black transition-colors duration-300" />

                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-2">
                  {entry.period}
                </p>

                {entry.href ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2"
                  >
                    <h3 className="text-xl md:text-2xl font-serif group-hover:text-[#c9a227] transition-colors">
                      {entry.title}
                    </h3>
                    <span className="text-[#c9a227] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </a>
                ) : (
                  <h3 className="text-xl md:text-2xl font-serif">
                    {entry.title}
                  </h3>
                )}

                <p className="text-white/60 mt-3 max-w-xl leading-relaxed">
                  {entry.description}
                </p>

                {entry.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs tracking-wide text-[#c9a227]/80 border border-[#c9a227]/30 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}