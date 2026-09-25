"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AGENDA, type Session } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Badge, Reveal, SplitHeading } from "./ui";

const SLOTS = [
  { id: "morning", label: "Morning", time: "08:00–12:30" },
  { id: "afternoon", label: "Afternoon", time: "13:00–late" },
] as const;

const KIND_STYLES: Record<NonNullable<Session["kind"]>, string> = {
  keynote: "bg-white text-ink",
  panel: "ring-1 ring-white/15 text-white/80",
  workshop: "bg-aurora-teal/15 text-aurora-teal",
  social: "bg-lime text-ink",
};

export function Agenda() {
  const [slot, setSlot] = useState<(typeof SLOTS)[number]["id"]>("morning");

  return (
    <section id="agenda" className="mx-auto max-w-5xl px-4 py-28 md:py-36">
      <div className="text-center">
        <Badge dark>Agenda preview</Badge>
        <SplitHeading
          text="One day that moves the needle"
          className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]"
        />
      </div>

      <Reveal delay={0.15} className="mt-10 flex justify-center">
        <div className="glass-dark inline-flex rounded-2xl p-1.5" role="tablist">
          {SLOTS.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={slot === d.id}
              onClick={() => setSlot(d.id)}
              className="relative rounded-xl px-5 py-2.5 text-sm"
            >
              {slot === d.id && (
                <motion.span
                  layoutId="slot-pill"
                  className="absolute inset-0 rounded-xl bg-lime shadow-[inset_0_1px_0_rgb(255_255_255/0.5)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={cn("relative transition-colors", slot === d.id ? "text-ink" : "text-white/60")}>
                <span className="font-medium">{d.label}</span>
                <span className="ml-2 hidden opacity-60 sm:inline">{d.time}</span>
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="relative mt-10 min-h-[560px]">
        <AnimatePresence mode="wait">
          <motion.ol
            key={slot}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              show: { transition: { staggerChildren: 0.05 } },
              exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
            }}
            className="divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-panel"
          >
            {AGENDA[slot].map((s) => (
              <motion.li
                key={s.time + s.title}
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                className="group grid grid-cols-[4.5rem_1fr] gap-4 px-5 py-5 transition-colors hover:bg-panel-2 md:grid-cols-[6rem_1fr_auto] md:px-7"
              >
                <span className="font-mono text-sm text-white/45 tabular-nums">{s.time}</span>
                <div>
                  <p className="font-display text-lg leading-snug font-medium tracking-tight">{s.title}</p>
                  <p className="mt-1 text-sm text-white/50">
                    {s.stage}
                    {s.speakers && <> · {s.speakers}</>}
                  </p>
                </div>
                {s.kind && (
                  <span
                    className={cn(
                      "col-start-2 w-fit self-center rounded-full px-3 py-1 text-xs capitalize md:col-start-auto",
                      KIND_STYLES[s.kind],
                    )}
                  >
                    {s.kind}
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}
