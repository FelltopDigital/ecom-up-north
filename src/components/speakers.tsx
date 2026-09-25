"use client";

import { motion } from "motion/react";
import { AGENDA, SPEAKERS } from "@/lib/content";
import { Arrow, Badge, Reveal, SplitHeading } from "./ui";

/** "Main stage · Morning" for a speaker, looked up from the agenda. */
function slotFor(name: string) {
  for (const [slot, sessions] of Object.entries(AGENDA)) {
    const session = sessions.find((s) => s.speakers?.includes(name));
    if (session) return `${session.stage} · ${slot === "morning" ? "Morning" : "Afternoon"}`;
  }
  return null;
}

export function Speakers() {
  return (
    <section id="speakers" className="px-3">
      <div data-nav-light className="relative overflow-hidden rounded-[2rem] bg-paper px-4 py-24 text-ink md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Badge>2027 speakers</Badge>
              <SplitHeading
                text="The operators behind the brands you shop"
                className="mt-5 max-w-2xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]"
              />
            </div>
            <Reveal delay={0.2}>
              <a href="#agenda" className="group inline-flex items-center gap-2 text-sm text-black/60 hover:text-black">
                See all 250+ speakers <Arrow />
              </a>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            {SPEAKERS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 0.08}>
                <motion.article whileHover="hover" initial="rest" animate="rest" className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-panel">
                    <motion.div
                      variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="grain absolute inset-0 grayscale-[0.55] transition-[filter] duration-500 group-hover:grayscale-0"
                      style={{
                        background: `radial-gradient(60% 45% at 50% 38%, oklch(0.78 0.12 ${s.hue}) 0%, transparent 70%), radial-gradient(90% 60% at 50% 110%, oklch(0.55 0.16 ${s.hue + 30}) 0%, transparent 70%), linear-gradient(180deg, #1d1d20, #0d0d0f)`,
                      }}
                    />
                    {/* abstract silhouette */}
                    <motion.svg
                      viewBox="0 0 200 250"
                      variants={{ rest: { y: 0 }, hover: { y: -6 } }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-x-0 bottom-0 w-full"
                      style={{ x: `${((i % 3) - 1) * 8}%` }}
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id={`sil-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#000" stopOpacity="0.35" />
                          <stop offset="1" stopColor="#000" stopOpacity="0.85" />
                        </linearGradient>
                      </defs>
                      <ellipse cx="100" cy={96 + (i % 2) * 8} rx="38" ry="44" fill={`url(#sil-${i})`} />
                      <path d="M14 250c0-58 38-94 86-94s86 36 86 94Z" fill={`url(#sil-${i})`} />
                    </motion.svg>
                    <span className="absolute top-3 left-3 font-display text-sm font-semibold text-white/80">
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <motion.div
                      variants={{ rest: { y: "100%", opacity: 0 }, hover: { y: "0%", opacity: 1 } }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="glass-dark absolute inset-x-2 bottom-2 rounded-xl px-3 py-2 text-xs text-white/85"
                    >
                      Speaking: {slotFor(s.name) ?? "Session TBA"}
                    </motion.div>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{s.name}</h3>
                  <p className="text-sm text-black/50">
                    {s.role}, <span className="text-black/75">{s.company}</span>
                  </p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
