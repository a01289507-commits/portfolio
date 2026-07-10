// "use client";

// import { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// /* ------------------------------------------------------------------ */
// /*  Data — edit freely, everything below reads from this              */
// /* ------------------------------------------------------------------ */

// type SkillGroup = {
//   label: string;
//   note: string;
//   skills: string[];
// };

// const GROUPS: SkillGroup[] = [
//   {
//     label: "Frontend",
//     note: "Interfaces & interaction",
//     skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
//   },
//   {
//     label: "Backend & Data",
//     note: "Structure underneath",
//     skills: ["Node.js", "Drizzle ORM", "PostgreSQL", "Neon", "REST APIs"],
//   },
//   {
//     label: "Content & CMS",
//     note: "Where the words live",
//     skills: ["Sanity CMS", "Portable Text", "Content Modeling"],
//   },
//   {
//     label: "Craft & Tools",
//     note: "How it ships",
//     skills: ["Git & GitHub", "Vercel", "Figma", "Lottie"],
//   },
// ];

// // Marquee strip — flat list for the ambient top ribbon
// const MARQUEE = [
//   "Next.js",
//   "TypeScript",
//   "Tailwind CSS",
//   "GSAP",
//   "Sanity CMS",
//   "Node.js",
//   "PostgreSQL",
//   "Drizzle ORM",
//   "React",
//   "Vercel",
// ];

// /* ------------------------------------------------------------------ */
// /*  Component                                                          */
// /* ------------------------------------------------------------------ */

// export default function Skills() {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       // Eyebrow + heading + divider — simple fade/slide in, matches About section feel
//       gsap.from(".skills-reveal", {
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

//       // Each group column rises in with a slight stagger
//       gsap.from(".skill-group", {
//         y: 40,
//         opacity: 0,
//         duration: 0.9,
//         ease: "power3.out",
//         stagger: 0.15,
//         scrollTrigger: {
//           trigger: ".skills-grid",
//           start: "top 80%",
//         },
//       });

//       // Signature move: the gold underline beneath each group label
//       // draws left-to-right, then each skill row's connector line grows,
//       // giving a "wiring up" feel rather than a generic fade.
//       document.querySelectorAll<HTMLElement>(".skill-group").forEach((group) => {
//         const underline = group.querySelector(".group-underline");
//         const rows = group.querySelectorAll(".skill-row .row-line");

//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: group,
//             start: "top 78%",
//           },
//         });

//         if (underline) {
//           tl.fromTo(
//             underline,
//             { scaleX: 0 },
//             { scaleX: 1, duration: 0.6, ease: "power2.out", transformOrigin: "left" }
//           );
//         }

//         tl.fromTo(
//           rows,
//           { scaleX: 0 },
//           {
//             scaleX: 1,
//             duration: 0.4,
//             ease: "power1.out",
//             stagger: 0.08,
//             transformOrigin: "left",
//           },
//           "-=0.25"
//         );
//       });

//       // Ambient infinite marquee — continuous, not scroll-tied, gives page
//       // the "alive" motion promised in the hero
//       const marquee = document.querySelector(".marquee-track");
//       if (marquee) {
//         gsap.to(marquee, {
//           xPercent: -50,
//           repeat: -1,
//           duration: 22,
//           ease: "linear",
//         });
//       }
//     },
//     { scope: sectionRef }
//   );

//   return (
//     <section
//       id="skills"
//       ref={sectionRef}
//       className="relative w-full bg-black text-white py-28 md:py-36 overflow-hidden"
//     >
//       {/* Ambient marquee ribbon */}
//       <div className="relative w-full overflow-hidden mb-24 border-y border-white/10 py-4 opacity-70">
//         <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
//           {[...MARQUEE, ...MARQUEE].map((item, i) => (
//             <span
//               key={i}
//               className="text-sm tracking-[0.2em] uppercase text-white font-medium"
//             >
//               {item} <span className="text-[#c9a227] mx-3">•</span>
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 md:px-10">
//         {/* Eyebrow */}
//         <p className="skills-reveal text-[#c9a227] text-xs tracking-[0.25em] font-semibold uppercase mb-4">
//           Skills
//         </p>
//         <div className="skills-reveal w-10 h-px bg-[#c9a227] mb-10" />

//         {/* Heading */}
//         <h2 className="skills-reveal font-serif text-4xl md:text-6xl leading-[1.1] mb-6 max-w-2xl">
//           Tools I reach for.
//         </h2>
//         <p className="skills-reveal text-white/60 text-base md:text-lg max-w-xl mb-20 leading-relaxed">
//           A stack chosen for speed, motion, and maintainability — the same
//           principles I bring from Physics and Mathematics into every build.
//         </p>

//         {/* Grid */}
//         <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
//           {GROUPS.map((group) => (
//             <div key={group.label} className="skill-group">
//               <h3 className="text-lg md:text-xl font-serif text-white mb-1">
//                 {group.label}
//               </h3>
//               <p className="text-xs text-white/40 tracking-wide uppercase mb-3">
//                 {group.note}
//               </p>
//               <div className="group-underline w-8 h-[2px] bg-[#c9a227] mb-6 origin-left" />

//               <ul className="space-y-3">
//                 {group.skills.map((skill) => (
//                   <li
//                     key={skill}
//                     className="skill-row flex items-center gap-3 text-white/80 text-sm md:text-[15px]"
//                   >
//                     <span className="row-line inline-block w-4 h-px bg-[#c9a227]/70 origin-left" />
//                     <span>{skill}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGreensock,
  SiNodedotjs,
  SiPostgresql,
  SiSanity,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiStripe,
} from "react-icons/si";
import { FiZap, FiDatabase } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data — icon + brand color per skill. Colors are the real brand    */
/*  hexes so each badge reads correctly even against the black bg.    */
/* ------------------------------------------------------------------ */

type Skill = {
  label: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
};

const SKILLS: Skill[] = [
  { label: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { label: "CSS", Icon: SiCss, color: "#1572B6" },
  { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { label: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { label: "React", Icon: SiReact, color: "#61DAFB" },
  { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { label: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { label: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { label: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { label: "Drizzle ORM", Icon: FiDatabase, color: "#C5F74F" },
  { label: "Neon", Icon: FiZap, color: "#00E599" },
  { label: "Sanity CMS", Icon: SiSanity, color: "#F03E2F" },
  { label: "Stripe", Icon: SiStripe, color: "#635BFF" },
  { label: "Git", Icon: SiGit, color: "#F05032" },
  { label: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { label: "Vercel", Icon: SiVercel, color: "#ffffff" },
  { label: "Figma", Icon: SiFigma, color: "#F24E1E" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".skills-reveal", {
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

      gsap.from(".skill-badge", {
        y: 30,
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: {
          amount: 0.9,
          grid: "auto",
          from: "start",
        },
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
        clearProps: "opacity,transform",
      });

      // Safety net: if ScrollTrigger somehow never fires (e.g. element
      // already in view on load in some edge cases), force full visibility
      // after 1.5s so content is never permanently stuck invisible.
      const fallback = setTimeout(() => {
        gsap.set(".skill-badge", { clearProps: "opacity,transform" });
      }, 1500);
      return () => clearTimeout(fallback);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-black text-white py-28 md:py-36 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
        <p className="skills-reveal text-[#c9a227] text-xs tracking-[0.25em] font-semibold uppercase mb-4">
          Skills
        </p>
        <h2 className="skills-reveal font-serif text-3xl md:text-5xl leading-[1.1] mb-16">
          Tools I reach for.
        </h2>

        <div className="skills-grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-5 max-w-3xl mx-auto">
          {SKILLS.map(({ label, Icon, color }) => (
            <div
              key={label}
              className="skill-badge group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a227]/50 hover:bg-white/[0.06]"
              title={label}
            >
              <Icon
                className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110"
                style={{ color }}
              />
              <span className="text-[11px] md:text-xs text-white/60 group-hover:text-white/90 transition-colors text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}