"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data — edit freely                                                  */
/* ------------------------------------------------------------------ */

const SOCIALS = [
  { label: "Email", value: "a01289507@gmail.com" },
  {
    label: "LinkedIn",
    value: "arooj-kainat",
    href: "https://linkedin.com/in/arooj-kainat-317b98264/",
  },
  { label: "GitHub", value: "github.com/aroojk", href: "https://github.com/a01289507-commits" },
  { label: "Fiverr", value: "Arooj", href: "https://www.fiverr.com/sellers/aroojk0113/edit" },
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

      gsap.from(".contact-field", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
        },
      });

      gsap.from(".social-row", {
        x: -16,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".social-list",
          start: "top 85%",
        },
      });

      // Signature move: the big gold "Let's talk." headline underline
      // draws in, echoing the same underline motif used in Skills/About
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
      className="relative w-full bg-black text-white py-28 md:py-36"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
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

        <p className="contact-reveal text-white/60 text-base md:text-lg max-w-xl mb-20 leading-relaxed mt-10">
          Have a project in mind, or just want to say hi? My inbox is open —
          I read and reply to every message myself.
        </p>

        {/* items-start: keeps both columns aligned to the same top edge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 lg:items-start">
          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-form space-y-8">
            <div className="contact-field">
              <label
                htmlFor="name"
                className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3"
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
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#c9a227] focus:shadow-[0_1px_0_0_#c9a227] transition-all"
              />
            </div>

            <div className="contact-field">
              <label
                htmlFor="email"
                className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3"
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
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#c9a227] focus:shadow-[0_1px_0_0_#c9a227] transition-all"
              />
            </div>

            <div className="contact-field">
              <label
                htmlFor="message"
                className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3"
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
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#c9a227] focus:shadow-[0_1px_0_0_#c9a227] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="contact-field inline-flex items-center gap-3 bg-[#c9a227] text-black font-semibold text-sm tracking-wide uppercase px-8 py-4 hover:bg-[#e0b62f] transition-colors disabled:opacity-60"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message Sent"
                : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="text-sm text-[#c9a227] pt-1">
                Thanks — I&apos;ll get back to you soon.
              </p>
            )}
          </form>

          {/* Socials / direct info */}
          <div className="social-list flex flex-col">
            <div className="space-y-6">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-row group flex items-center justify-between border-b border-white/10 pb-5 hover:border-[#c9a227]/50 transition-colors"
                >
                  <span className="text-xs tracking-[0.2em] uppercase text-white/40 group-hover:text-[#c9a227] transition-colors">
                    {social.label}
                  </span>
                  <span className="text-white/80 group-hover:text-white transition-colors text-sm md:text-base">
                    {social.value}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
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