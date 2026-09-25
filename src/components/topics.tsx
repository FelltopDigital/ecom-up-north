"use client";

import { motion } from "motion/react";
import { TOPICS, TRACKS } from "@/lib/content";
import { Badge, Reveal, SplitHeading, SpotlightCard } from "./ui";

export function Topics() {
  return (
    <section className="px-3">
      <div data-nav-light className="relative overflow-hidden rounded-[2rem] bg-paper px-4 py-24 text-ink md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_90deg,var(--color-aurora-teal),var(--color-lime),var(--color-aurora-violet),var(--color-aurora-teal))] opacity-25 blur-[120px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <Badge>The programme</Badge>
            <SplitHeading
              text="Every corner of commerce, under one roof"
              className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]"
            />
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2"
          >
            {TOPICS.map((t) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, y: 10, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ y: -3, backgroundColor: "rgb(196 242 58)", color: "#0b0b0c" }}
                className="cursor-default rounded-full border border-black/8 bg-white px-4 py-2 text-sm text-black/70 shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
              >
                {t}
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-16 grid gap-3 md:grid-cols-2">
            {TRACKS.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <SpotlightCard color="46 230 197" className="h-full rounded-2xl bg-white ring-1 ring-black/5">
                  <div className="flex h-full flex-col justify-between gap-10 p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-wider text-black/40 uppercase">0{i + 1}</span>
                      <span className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/60">{t.tag}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{t.title}</h3>
                      <p className="mt-3 max-w-md text-black/55">{t.body}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
