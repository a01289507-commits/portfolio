'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#c9a227';

const FACTS = [
  { label: 'Education', value: 'BSc Physics, CS & Mathematics — 2022' },
  { label: 'ROLE', value: 'Full-Stack Web Development' },
  { label: 'CORE TECHNOLOGIES', value: 'Next.js · TypeScript · GSAP · PostgreSQL · Sanity.io' },
  { label: 'Currently Building', value: 'EstateHub — Real Estate Platform' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.about-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          transformOrigin: 'left',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.fact-card',
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-28 md:py-36"
    >
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#c9a227]/[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#c9a227]/[0.04] blur-[140px]" />
      {/* Faint decorative serial number, top-right */}
      <p className="pointer-events-none absolute right-6 top-10 hidden font-serif text-[10rem] leading-none text-white/[0.03] md:block">
        02
      </p>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <p
            className="about-reveal text-[13px] tracking-[0.3em] uppercase"
            style={{ color: GOLD }}
          >
            About
          </p>
          <div className="about-rule h-[1px] w-24" style={{ backgroundColor: GOLD }} />
        </div>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-16">
          {/* Left — narrative */}
          <div>
            <h2
              className="about-reveal text-[#f5f1e8] font-light leading-[1.15] mb-8"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              }}
            >
              Turning ideas into{' '}
              <span style={{ color: GOLD }}>digital experiences.</span>
            </h2>

            <p className="about-reveal text-[#a8a8a8] text-base md:text-lg leading-relaxed mb-5">
              I&apos;m Arooj, a full-stack developer with a background in Physics,
              Computer Science, and Mathematics. That foundation influences how I
              build—understanding problems first, designing with purpose, and
              writing clean, maintainable code.
            </p>

            <p className="about-reveal text-[#a8a8a8] text-base md:text-lg leading-relaxed mb-10">
              I build full-stack web applications with a focus on clean
              architecture, smooth interactions, and thoughtful user
              experiences. My recent work includes an e-commerce platform, a
              bakery website, and EstateHub— a premium real estate platform
              currently in development.
            </p>

            {/* Subtle signature-style divider */}
            <div className="about-reveal flex items-center gap-3">
              <div
                className="h-px flex-1 max-w-[60px]"
                style={{ backgroundColor: `${GOLD}66` }}
              />
              <p className="text-xs tracking-[0.2em] uppercase text-white/30">
                Based in Multan, Pakistan
              </p>
            </div>
          </div>

          {/* Right — quick facts, spec-sheet style */}
          <div className="flex flex-col gap-1">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="fact-card group border-b border-[#c9a227]/10 py-5 pl-6 transition-all duration-300 first:pt-0 last:border-b-0 hover:border-[#c9a227]/40 hover:bg-[#c9a227]/[0.03]"
                style={{ borderLeft: `1px solid ${GOLD}33` }}
              >
                <p
                  className="text-[11px] tracking-[0.2em] uppercase mb-2 transition-colors group-hover:text-[#e0b62f]"
                  style={{ color: GOLD }}
                >
                  {fact.label}
                </p>
                <p className="text-[#d4d4d4] text-sm leading-relaxed">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}