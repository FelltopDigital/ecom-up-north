"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EVENT, NAV_LINKS } from "@/lib/content";
import { Logo } from "./logo";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  return (
    <footer ref={ref} className="relative overflow-hidden px-4 pt-20">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 md:flex-row">
        <div className="max-w-xs">
          <Logo dark />
          <p className="mt-4 text-sm text-white/55">
            {EVENT.dates} · {EVENT.venue}, {EVENT.city}. The North&apos;s home of ecommerce and retail innovation.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs tracking-wider text-white/40 uppercase">Event</p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/65 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-wider text-white/40 uppercase">Get involved</p>
            <ul className="mt-4 space-y-2 text-white/65">
              <li><a href="#register" className="hover:text-white">Exhibit</a></li>
              <li><a href="#register" className="hover:text-white">Sponsor</a></li>
              <li><a href="#register" className="hover:text-white">Speak</a></li>
              <li><a href="#register" className="hover:text-white">Press</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-wider text-white/40 uppercase">Follow</p>
            <ul className="mt-4 space-y-2 text-white/65">
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">X</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col justify-between gap-2 border-t border-white/8 pt-6 text-xs text-white/45 sm:flex-row">
        <p>© 2026 Ecom Up North. All rights reserved.</p>
        <p>Privacy · Terms · Accessibility</p>
      </div>

      <motion.p
        aria-hidden
        style={{ y }}
        className="pointer-events-none mt-6 bg-gradient-to-b from-white/90 to-white/0 bg-clip-text text-center font-display text-[18.5vw] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap text-transparent select-none"
      >
        Up North
      </motion.p>
    </footer>
  );
}
