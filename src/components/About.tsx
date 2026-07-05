'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#c9a227';

const FACTS = [
  { label: 'Education', value: 'BSc Physics, CS & Mathematics — 2022' },
  { label: 'ROLE', value: 'Full-Stack Web Development' },
  { label: 'CORE TECHNOLOGIES', value: 'Next.js · TypeScript · GSAP · PostgreSQL . Sanity.io' },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-black py-28 md:py-36"
    >
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="about-reveal text-[13px] tracking-[0.3em] uppercase mb-4"
          style={{ color: GOLD }}
        >
          About
        </p>

        <div className="about-rule h-[1px] w-24 mb-12" style={{ backgroundColor: GOLD }} />

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-16">
          {/* Left — narrative */}
          <div>
            <h2
              className="about-reveal text-[#f5f1e8] font-light leading-[1.15] mb-6"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              }}
            >
             Turning ideas into digital experiences.
            </h2>

            <p className="about-reveal text-[#a8a8a8] text-base md:text-lg leading-relaxed mb-5">
             I'm Arooj, a full-stack developer with a background in Physics, Computer Science, and Mathematics. That foundation influences how I build—understanding problems first, designing with purpose, and writing clean, maintainable code.
            </p>

            <p className="about-reveal text-[#a8a8a8] text-base md:text-lg leading-relaxed">
             I build full-stack web applications with a focus on clean architecture,
             smooth interactions, and thoughtful user experiences. My recent work
             includes an e-commerce platform, a bakery website, and EstateHub—
             a premium real estate platform currently in development.
            </p>
          </div>

          {/* Right — quick facts, spec-sheet style */}
          <div className="about-reveal flex flex-col gap-6 border-l border-[#c9a227]/20 pl-8">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <p
                  className="text-[11px] tracking-[0.2em] uppercase mb-1.5"
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