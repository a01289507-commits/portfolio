"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Config — edit these to update links in one place                   */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/a01289507-commits",
    icon: (
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.921.678 1.856 0 1.34-.012 2.421-.012 2.751 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arooj-kainat-317b98264/",
    icon: (
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.75h3.88V21H3.5V8.75Zm6.6 0h3.72v1.68h.05c.52-.94 1.79-1.93 3.68-1.93 3.94 0 4.67 2.5 4.67 5.76V21h-3.88v-5.9c0-1.41-.03-3.22-1.98-3.22-1.98 0-2.28 1.5-2.28 3.12V21H10.1V8.75Z" />
    ),
  },
  {
    label: "Email",
    href: "a01289507@gmail.com", // TODO: replace with your actual email
    icon: (
      <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2.2 7.8 6.1 7.8-6.1H4.2Zm15.8 1.6-7.4 5.8a1 1 0 0 1-1.2 0L4 7.3V18.5c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V7.3Z" />
    ),
  },
];

const MARQUEE_TEXT =
  "AVAILABLE FOR FREELANCE   •   OPEN TO INTERNSHIPS   •   BASED IN MULTAN, PAKISTAN   •   ";

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      // Kill any leftover tween first — prevents duplicate/stacked
      // animations (common with Fast Refresh) from masking speed changes.
      gsap.killTweensOf(".marquee-track");

      // Continuous marquee scroll — higher duration = slower speed
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 60,
        ease: "linear",
      });

      // Fade the footer content up as it enters view
      gsap.from(".footer-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative w-full bg-black text-white">
      {/* Signature marquee band */}
      <div className="relative border-y border-[#c9a227]/30 overflow-hidden py-4">
        <div className="marquee-track flex w-max whitespace-nowrap will-change-transform">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-serif italic text-lg md:text-2xl tracking-wide text-[#c9a227]/90 pr-2"
              aria-hidden={i === 1}
            >
              {MARQUEE_TEXT.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12 md:gap-8">
          {/* Brand */}
          <div className="footer-reveal">
            <p className="font-serif text-3xl mb-4">
              Arooj<span className="text-[#c9a227]">.</span>
            </p>
            <p className="text-white/50 leading-relaxed max-w-xs">
              Full-stack developer building fast, polished web experiences
              with Next.js, TypeScript, and Sanity CMS.
            </p>
          </div>

          {/* Navigate */}
          <div className="footer-reveal">
            <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#c9a227] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-reveal">
            <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-5">
              Connect
            </p>
            <ul className="space-y-3 mb-6">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white/70 hover:text-[#c9a227] transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-current shrink-0"
                    >
                      {link.icon}
                    </svg>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-reveal mt-16 pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/40 tracking-wide">
            © {year} Arooj Kainat. All rights reserved.
          </p>

          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-[#c9a227] transition-colors"
          >
            Back to top
            <span
              aria-hidden
              className="inline-block w-7 h-7 rounded-full border border-white/20 group-hover:border-[#c9a227] flex items-center justify-center transition-colors"
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}