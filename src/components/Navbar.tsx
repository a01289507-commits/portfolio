// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { Menu, X } from 'lucide-react';

// const NAV_ITEMS = [
//   { label: 'About', href: '#about' },
//   { label: 'Skills', href: '#skills' },
//   { label: 'Projects', href: '#projects' },
//   { label: 'Timeline', href: '#timeline' },
//   { label: 'Contact', href: '#contact' },
// ];

// const GOLD = '#c9a227';

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [active, setActive] = useState('About');
//   const navRef = useRef<HTMLElement>(null);

//   // Entrance animation
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         navRef.current,
//         { y: -40, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
//       );
//     });
//     return () => ctx.revert();
//   }, []);

//   // Background solidify on scroll
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   // Scrollspy
//   useEffect(() => {
//     const sections = NAV_ITEMS.map((item) =>
//       document.querySelector(item.href)
//     ).filter(Boolean) as Element[];

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const match = NAV_ITEMS.find(
//               (item) => item.href === `#${entry.target.id}`
//             );
//             if (match) setActive(match.label);
//           }
//         });
//       },
//       { rootMargin: '-40% 0px -50% 0px' }
//     );

//     sections.forEach((section) => observer.observe(section));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <nav
//       ref={navRef}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         scrolled
//           ? 'bg-black/95 backdrop-blur-md border-b border-[#c9a227]/20 py-3'
//           : 'bg-black py-6'
//       }`}
//     >
//       <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
//         {/* Logo */}
//         <a
//           href="#hero"
//           className="flex items-center gap-2 text-[#f5f1e8]"
//         >
//           <span
//             className="text-xl tracking-[0.15em] font-light"
//             style={{ fontFamily: 'Georgia, serif' }}
//           >
//             AROOJ
//           </span>
//           <span style={{ color: GOLD }}>•</span>
//         </a>

//         {/* Desktop nav */}
//         <div className="hidden md:flex items-center gap-9">
//           {NAV_ITEMS.map((item) => {
//             const isActive = active === item.label;
//             return (
//               <a
//                 key={item.label}
//                 href={item.href}
//                 className="group relative py-2 text-[13px] tracking-[0.12em] uppercase transition-colors"
//                 style={{ color: isActive ? GOLD : '#a8a8a8' }}
//               >
//                 {item.label}
//                 <span
//                   className="absolute left-0 -bottom-0.5 h-[1px] transition-all duration-300"
//                   style={{
//                     backgroundColor: GOLD,
//                     width: isActive ? '100%' : '0%',
//                   }}
//                 />
//                 <span
//                   className="absolute left-0 -bottom-0.5 h-[1px] w-0 transition-all duration-300 group-hover:w-full"
//                   style={{ backgroundColor: GOLD, opacity: isActive ? 0 : 1 }}
//                 />
//               </a>
//             );
//           })}

//           <a
//             href="/resume.pdf"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="ml-2 px-5 py-2 text-[12px] tracking-[0.12em] uppercase border transition-all duration-300 hover:bg-[#c9a227] hover:text-black text-[#c9a227]"
//             style={{ borderColor: GOLD }}
//           >
//             Resume
//           </a>
//         </div>

//         {/* Mobile toggle */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden p-2"
//           style={{ color: GOLD }}
//           aria-label={open ? 'Close menu' : 'Open menu'}
//         >
//           {open ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </div>

//       {/* Mobile panel */}
//       {open && (
//         <div className="md:hidden mt-4 mx-4 border border-[#c9a227]/25 bg-black overflow-hidden">
//           {NAV_ITEMS.map((item) => (
//             <a
//               key={item.label}
//               href={item.href}
//               onClick={() => setOpen(false)}
//               className="flex items-center justify-between px-5 py-4 text-[13px] tracking-[0.12em] uppercase border-b border-[#c9a227]/10 last:border-0 transition-colors"
//               style={{ color: active === item.label ? GOLD : '#d4d4d4' }}
//             >
//               {item.label}
//               <span style={{ color: GOLD }}>→</span>
//             </a>
//           ))}
//           <a
//             href="/resume.pdf"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center justify-between px-5 py-4 text-[13px] tracking-[0.12em] uppercase"
//             style={{ color: GOLD }}
//           >
//             Resume
//             <span>↓</span>
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// }






'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

const GOLD = '#c9a227';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('About');
  const navRef = useRef<HTMLElement>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  // Background solidify on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = NAV_ITEMS.find(
              (item) => item.href === `#${entry.target.id}`
            );
            if (match) setActive(match.label);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-[#c9a227]/20 py-3'
          : 'bg-black py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-[#f5f1e8]"
        >
          <span
            className="text-xl tracking-[0.15em] font-light"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            AROOJ
          </span>
          <span style={{ color: GOLD }}>•</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                className="group relative py-2 text-[13px] tracking-[0.12em] uppercase transition-colors"
                style={{ color: isActive ? GOLD : '#a8a8a8' }}
              >
                {item.label}
                <span
                  className="absolute left-0 -bottom-0.5 h-[1px] transition-all duration-300"
                  style={{
                    backgroundColor: GOLD,
                    width: isActive ? '100%' : '0%',
                  }}
                />
                <span
                  className="absolute left-0 -bottom-0.5 h-[1px] w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: GOLD, opacity: isActive ? 0 : 1 }}
                />
              </a>
            );
          })}

          {/* Preview-only: target="_blank" opens the PDF in a new tab using
              the browser's built-in viewer. No `download` attribute here —
              adding one would force a download instead of showing it. */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 text-[12px] tracking-[0.12em] uppercase border transition-all duration-300 hover:bg-[#c9a227] hover:text-black text-[#c9a227]"
            style={{ borderColor: GOLD }}
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          style={{ color: GOLD }}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden mt-4 mx-4 border border-[#c9a227]/25 bg-black overflow-hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-5 py-4 text-[13px] tracking-[0.12em] uppercase border-b border-[#c9a227]/10 last:border-0 transition-colors"
              style={{ color: active === item.label ? GOLD : '#d4d4d4' }}
            >
              {item.label}
              <span style={{ color: GOLD }}>→</span>
            </a>
          ))}

          {/* Same preview-only behavior as desktop — icon changed from ↓
              to ↗ so it doesn't visually imply a download. */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-4 text-[13px] tracking-[0.12em] uppercase"
            style={{ color: GOLD }}
          >
            Resume
            <span>↗</span>
          </a>
        </div>
      )}
    </nav>
  );
}