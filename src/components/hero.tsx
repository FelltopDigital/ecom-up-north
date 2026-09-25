"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { EVENT, PARTNERS } from "@/lib/content";
import { Arrow, Button, SplitHeading } from "./ui";
import { Countdown } from "./countdown";
import { ShowcaseWall } from "./showcase-wall";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), { stiffness: 120, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-36 md:pt-44">
      <Aurora />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-dark mx-auto inline-flex items-center gap-2.5 rounded-full py-1 pr-3.5 pl-1"
        >
          <span className="flex -space-x-1.5">
            {[40, 160, 280].map((h) => (
              <span
                key={h}
                className="size-6 rounded-full ring-2 ring-night"
                style={{ background: `linear-gradient(135deg, oklch(0.88 0.12 ${h}), oklch(0.5 0.14 ${h + 60}))` }}
              />
            ))}
          </span>
          <span className="text-[13px] text-white/70">
            <strong className="font-semibold text-white">4,200+</strong> leaders already heading north
          </span>
        </motion.div>

        <SplitHeading
          as="h1"
          text="Where the future of commerce heads North"
          delay={0.3}
          className="mx-auto mt-7 max-w-5xl font-display text-[clamp(2.75rem,7.5vw,6.25rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mx-auto mt-6 max-w-3xl text-base text-pretty text-white/60 md:text-lg"
        >
          One day. Eight stages. 250+ speakers from the brands, retailers and marketplaces rewriting how the
          world shops — plus the UK&apos;s best-connected expo floor, outside of London.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="#tickets" variant="lime">
            Get your pass <Arrow />
          </Button>
          <Button href="#register" variant="ghost">
            Exhibit with us
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mx-auto mt-12 flex max-w-2xl flex-col items-stretch gap-3 sm:flex-row"
        >
          <div className="glass-dark flex flex-1 items-center gap-4 rounded-2xl px-5 py-4 text-left">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime text-ink">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="16" rx="3" />
                <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-display text-lg leading-tight font-semibold tracking-tight">{EVENT.dates}</p>
              <p className="text-sm text-white/55">
                {EVENT.venue} · {EVENT.city}
              </p>
            </div>
          </div>
          <Countdown to={EVENT.startsAt} />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mt-20">
        <p className="text-center text-sm text-white/45">Backed by the brands building northern commerce</p>
        <div className="mask-fade-x mt-6 flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14 hover:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={i}
                className="font-display text-xl font-semibold tracking-tight whitespace-nowrap text-white/30 transition-colors hover:text-white"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ShowcaseWall />
    </section>
  );
}

/** Northern-lights gradient field that drifts behind the hero. */
function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(ellipse_at_top,rgb(46_230_197/0.08),transparent_60%)]" />
      <div className="absolute top-[-20%] left-[10%] h-[70vh] w-[60vw] animate-aurora rounded-full bg-[conic-gradient(from_120deg,var(--color-lime),var(--color-aurora-teal),var(--color-aurora-violet),var(--color-lime))] opacity-30 blur-[110px]" />
      <div
        className="absolute top-[5%] right-[-10%] h-[50vh] w-[45vw] animate-aurora rounded-full bg-[radial-gradient(circle,var(--color-aurora-teal),transparent_70%)] opacity-25 blur-[90px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 30%, black, transparent)",
        }}
      />
    </div>
  );
}
