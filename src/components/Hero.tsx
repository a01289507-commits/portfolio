'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GOLD = '#c9a227';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          '.hero-line',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo(
          '.hero-sub',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          '.hero-rule',
          { scaleX: 0 },
          { scaleX: 1, duration: 1, transformOrigin: 'left' },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-black overflow-hidden pt-28 md:pt-24"
    >
      {/* Subtle background glow — restrained, single accent */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        style={{ backgroundColor: GOLD }}
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <p
          className="hero-eyebrow text-[13px] tracking-[0.3em] uppercase mb-6"
          style={{ color: GOLD }}
        >
          Full-Stack Developer
        </p>

        <h1
          className="text-[#f5f1e8] font-light leading-[1.05] mb-8"
          style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          <span className="hero-line block overflow-hidden">
            Building interfaces
          </span>
          <span className="hero-line block overflow-hidden">
            that feel <span style={{ color: GOLD }}>alive.</span>
          </span>
        </h1>

        <div
          className="hero-rule h-[1px] w-24 mb-8"
          style={{ backgroundColor: GOLD }}
        />

        <p className="hero-sub text-[#a8a8a8] text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          I&apos;m Arooj — a full-stack developer crafting fast, animated,
          production-ready web apps with Next.js, TypeScript, and GSAP.
          Background in Physics, Computer Science &amp; Mathematics informs
          how I approach every build.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="hero-cta px-7 py-3 text-[13px] tracking-[0.12em] uppercase transition-all duration-300"
            style={{ backgroundColor: GOLD, color: '#0a0a0a' }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="hero-cta px-7 py-3 text-[13px] tracking-[0.12em] uppercase border transition-all duration-300 hover:bg-[#c9a227] hover:text-black text-[#c9a227]"
            style={{ borderColor: GOLD }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ color: '#666' }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-10 animate-pulse"
          style={{ backgroundColor: GOLD }}
        />
      </div>
    </section>
  );
}