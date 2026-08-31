"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
        .from(
          ".hero-heading span",
          { y: 40, opacity: 0, duration: 0.7, stagger: 0.08 },
          "-=0.3"
        )
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          ".hero-cta",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        )
        .from(
          ".hero-photo",
          { scale: 0.9, opacity: 0, duration: 0.9, ease: "power2.out" },
          "-=0.8"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black px-6 py-24 md:px-16"
    >
      {/* Gold ambient glow accents */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#c9a227]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#c9a227]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Left: Text content */}
        <div>
          <p className="hero-eyebrow mb-4 inline-block rounded-full border border-[#c9a227]/40 px-4 py-1 text-sm tracking-widest text-[#c9a227]">
            FULL STACK DEVELOPER
          </p>

          <h1 className="hero-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Hi, I&apos;m</span>
            <span className="block bg-gradient-to-r from-[#c9a227] via-[#e8cf6e] to-[#c9a227] bg-clip-text text-transparent">
              Arooj Kainat.
            </span>
            <span className="block">I build Full-Stack</span>
            <span className="block">web experiences.</span>
          </h1>

          <p className="hero-sub mt-6 max-w-md text-base text-gray-400 sm:text-lg">
            I design and develop modern, responsive web applications using
            Next.js, TypeScript &amp; Tailwind CSS — turning ideas into
            polished, real-world products.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="hero-cta rounded-full bg-[#c9a227] px-8 py-3 font-medium text-black transition-transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="hero-cta rounded-full border border-[#c9a227]/50 px-8 py-3 font-medium text-[#c9a227] transition-colors hover:bg-[#c9a227]/10"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>

        {/* Right: Photo */}
        <div className="hero-photo relative mx-auto aspect-[4/5] w-full max-w-sm">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c9a227]/30 via-transparent to-transparent" />
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[#c9a227]/30 bg-neutral-900">
            <Image
              src="/arooj-photo.png"
              alt="Arooj Kainat — Full Stack Developer"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}