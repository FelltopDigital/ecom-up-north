"use client";

import { motion } from "motion/react";
import { TICKETS } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Arrow, Badge, Reveal, SplitHeading } from "./ui";

export function Tickets() {
  return (
    <section id="tickets" className="relative overflow-hidden px-4 pb-28 md:pb-36">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_0deg,var(--color-lime),var(--color-aurora-teal),var(--color-aurora-violet),var(--color-lime))] opacity-20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <Badge dark>Passes</Badge>
          <SplitHeading
            text="Pick your pass. Early bird ends 31 December."
            className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]"
          />
        </div>

        <div className="mt-14 grid items-stretch gap-3 md:grid-cols-3">
          {TICKETS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={cn(
                  "flex h-full flex-col rounded-3xl p-7",
                  t.featured ? "bg-white text-ink shadow-[0_40px_80px_-30px_rgb(196_242_58/0.35)] ring-1 ring-lime/60" : "glass-dark text-white",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{t.name}</h3>
                  {t.featured && (
                    <span className="rounded-full bg-lime px-2.5 py-1 text-[11px] font-medium text-ink">Most popular</span>
                  )}
                </div>
                <p className="mt-6 font-display text-6xl font-semibold tracking-[-0.05em]">{t.price}</p>
                <p className={cn("mt-1 text-sm", t.featured ? "text-black/50" : "text-white/50")}>{t.note}</p>

                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full text-[9px]",
                          t.featured ? "bg-ink text-lime" : "bg-lime text-ink",
                        )}
                      >
                        ✓
                      </span>
                      <span className={t.featured ? "text-black/70" : "text-white/75"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#register"
                  className={cn(
                    "group mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition",
                    t.featured ? "bg-ink text-white hover:bg-black" : "bg-white text-ink hover:bg-paper",
                  )}
                >
                  {t.cta} <Arrow />
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="mt-6 text-center text-sm text-white/50">
            Prices exclude VAT. Group discounts for teams of 5+ — mention it in the form below.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
