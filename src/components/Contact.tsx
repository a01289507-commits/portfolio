"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, Briefcase, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#c9a227";

/* ------------------------------------------------------------------ */
/*  Inline brand icons (lucide dropped brand icons in newer versions)  */
/* ------------------------------------------------------------------ */

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data — edit freely                                                  */
/* ------------------------------------------------------------------ */

const SOCIALS = [
  {
    label: "Email",
    value: "a01289507@gmail.com",
    href: "mailto:a01289507@gmail.com",
    icon: <Mail size={16} />,
  },
  {
    label: "LinkedIn",
    value: "arooj-kainat",
    href: "https://linkedin.com/in/arooj-kainat-317b98264/",
    icon: <LinkedinIcon />,
  },
  {
    label: "GitHub",
    value: "github.com/aroojk",
    href: "https://github.com/a01289507-commits",
    icon: <GithubIcon />,
  },
  {
    label: "Fiverr",
    value: "Arooj",
    href: "https://www.fiverr.com/sellers/aroojk0113/edit",
    icon: <Briefcase size={16} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
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

      gsap.from(".contact-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.fromTo(
        ".contact-underline",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power2.out",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // Replace this block with your real submit logic —
    // e.g. fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 900);
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black text-white py-28 md:py-36"
    >
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#c9a227]/[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-[#c9a227]/[0.04] blur-[140px]" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <p className="contact-reveal text-[#c9a227] text-xs tracking-[0.25em] font-semibold uppercase mb-4">
          Contact
        </p>
        <div className="contact-reveal w-10 h-px bg-[#c9a227] mb-10" />

        {/* Heading */}
        <div className="contact-reveal relative mb-6 max-w-2xl">
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1]">
            Let&apos;s build
            <br />
            something <span className="text-[#c9a227]">real.</span>
          </h2>
          <div className="contact-underline absolute -bottom-4 left-0 h-[2px] w-32 bg-[#c9a227] origin-left" />
        </div>

        <p className="contact-reveal text-white/60 text-base md:text-lg max-w-xl mb-16 leading-relaxed mt-10">
          Have a project in mind, or just want to say hi? My inbox is open —
          I read and reply to every message myself.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:items-start">
          {/* Form — now in a card */}
          <form
            onSubmit={handleSubmit}
            className="contact-card rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 space-y-7 backdrop-blur-sm"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-2"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                autoComplete="off"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@company.com"
                autoComplete="off"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me a bit about your project..."
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#c9a227] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:bg-[#e0b62f] disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? (
                "Sending..."
              ) : status === "sent" ? (
                "Message Sent"
              ) : (
                <>
                  Send Message <Send size={15} />
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="text-sm text-[#c9a227] pt-1">
                Thanks — I&apos;ll get back to you soon.
              </p>
            )}
          </form>

          {/* Socials / direct info — now in a card too */}
          <div className="contact-card flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 backdrop-blur-sm">
            <div className="space-y-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-[#c9a227]/[0.06]"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                      style={{ borderColor: `${GOLD}40`, color: GOLD }}
                    >
                      {social.icon}
                    </span>
                    <span className="text-xs tracking-[0.2em] uppercase text-white/40 transition-colors group-hover:text-[#c9a227]">
                      {social.label}
                    </span>
                  </span>
                  <span className="text-sm text-white/80 transition-colors group-hover:text-white md:text-base">
                    {social.value}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-2">
                Based In
              </p>
              <p className="text-white/80">Multan, Pakistan — Remote friendly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}