"use client";

import { motion } from "motion/react";
import { WHY } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Badge, Reveal, SplitHeading } from "./ui";

export function WhyAttend() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-28 md:py-36">
      <div className="text-center">
        <Badge dark>Why attend</Badge>
        <SplitHeading
          text="Built for doing deals, not collecting lanyards"
          className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-lg text-white/55">
            For retailers, DTC brands, marketplace sellers, agencies and the tech that powers them.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-3 md:grid-cols-6">
        {WHY.map((w, i) => (
          <Reveal
            key={w.title}
            delay={i * 0.08}
            className={cn(i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2")}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={cn(
                "relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-2xl p-7",
                i === 3 ? "bg-lime text-ink" : "border border-white/8 bg-panel text-white",
              )}
            >
              {i === 0 && <MeetingsVisual />}
              <div className="relative">
                <p className="font-display text-6xl font-semibold tracking-[-0.05em]">{w.stat}</p>
                <p className={cn("mt-1 font-mono text-xs tracking-wider uppercase", i === 3 ? "text-black/45" : "text-white/45")}>
                  {w.statLabel}
                </p>
              </div>
              <div className={cn("relative mt-10 max-w-md", i === 0 && "lg:max-w-[46%]")}>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{w.title}</h3>
                <p className={cn("mt-2", i === 3 ? "text-black/60" : "text-white/60")}>{w.body}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Floating "match" cards illustrating hosted meetings. */
function MeetingsVisual() {
  const cards = [
    { label: "Head of Ecommerce · Fashion", time: "10:40", top: "12%", right: "6%", hue: 88 },
    { label: "Founder · Beauty DTC", time: "13:15", top: "40%", right: "14%", hue: 330 },
    { label: "VP Marketplaces · Home", time: "15:00", top: "68%", right: "4%", hue: 200 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="absolute top-0 right-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgb(196_242_58/0.18),transparent_60%)]" />
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 0.3 + i * 0.15 },
            x: { delay: 0.3 + i * 0.15, type: "spring" },
            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
          }}
          className="glass-dark absolute flex items-center gap-3 rounded-xl py-2.5 pr-4 pl-2.5"
          style={{ top: c.top, right: c.right }}
        >
          <span
            className="size-8 rounded-lg"
            style={{ background: `linear-gradient(135deg, oklch(0.85 0.15 ${c.hue}), oklch(0.5 0.15 ${c.hue + 40}))` }}
          />
          <div>
            <p className="text-xs font-medium text-white">{c.label}</p>
            <p className="font-mono text-[10px] text-white/45">Meeting confirmed · {c.time}</p>
          </div>
          <span className="ml-2 grid size-5 place-items-center rounded-full bg-lime text-[10px] text-ink">✓</span>
        </motion.div>
      ))}
    </div>
  );
}
