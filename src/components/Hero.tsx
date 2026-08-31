"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const animatedEls =
        ".hero-eyebrow, .hero-heading span, .hero-sub, .hero-cta, .hero-photo";

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set(animatedEls, { clearProps: "opacity,transform" });
        },
      });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".hero-heading span",
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.3"
        )
        .from(
          ".hero-sub",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          ".hero-photo",
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.8"
        );

      // Safety net: if the timeline never fires (e.g. killed mid-animation
      // by a dev-mode Fast Refresh), force everything visible after 2.5s.
      const fallback = setTimeout(() => {
        gsap.set(animatedEls, { clearProps: "opacity,transform" });
      }, 2500);

      return () => clearTimeout(fallback);
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black px-6 py-24 md:px-16"
    >
      {/* Ambient Gold Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#c9a227]/20 blur-[120px]" />

      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#c9a227]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <p className="hero-eyebrow mb-5 inline-block rounded-full border border-[#c9a227]/40 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-[#c9a227]">
            FULL STACK DEVELOPER
          </p>

          <h1 className="hero-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">I design &amp; build</span>

            <span className="block bg-gradient-to-r from-[#c9a227] via-[#e8cf6e] to-[#c9a227] bg-clip-text text-transparent">
              modern digital
            </span>

            <span className="block">experiences.</span>
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            I create modern, responsive websites and web applications using
            clean architecture and powerful full-stack development.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="hero-cta rounded-full bg-[#c9a227] px-8 py-3.5 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-[#e8cf6e]"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="hero-cta rounded-full border border-[#c9a227]/50 px-8 py-3.5 font-medium text-[#c9a227] transition-all duration-300 hover:bg-[#c9a227]/10"
            >
              Let&apos;s Work Together
            </a>
          </div>

          {/* Tech Stack */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Sanity</span>
          </div>
        </div>

        {/* RIGHT PHOTO */}
        <div className="hero-photo relative mx-auto aspect-[4/5] w-full max-w-sm">
          {/* Glow */}
          <div className="absolute -inset-4 rounded-[2rem] bg-[#c9a227]/10 blur-2xl" />

          {/* Gold Gradient Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c9a227]/50 via-transparent to-[#c9a227]/10 p-[1px]">
            <div className="h-full w-full rounded-3xl bg-neutral-950" />
          </div>

          {/* Image */}
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[#c9a227]/30">
            <Image
              src="/arooj-photo.png"
              alt="Arooj Kainat — Full Stack Developer"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}