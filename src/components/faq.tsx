"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FAQS } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Badge, SplitHeading } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq" className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
      <div className="md:sticky md:top-32 md:self-start">
        <Badge>Good to know</Badge>
        <SplitHeading
          text="Frequently asked"
          className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]"
        />
        <p className="mt-5 max-w-sm text-black/55">
          Can&apos;t find your answer? Email{" "}
          <a href="mailto:hello@ecomupnorth.co.uk" className="font-medium text-ink underline decoration-lime decoration-2 underline-offset-4">
            hello@ecomupnorth.co.uk
          </a>
        </p>
      </div>

      <ul className="space-y-2">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className={cn("rounded-2xl border transition-colors", isOpen ? "border-black/10 bg-white shadow-[0_12px_30px_-15px_rgb(0_0_0/0.2)]" : "border-black/5 bg-white/60")}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span className="font-display text-lg font-medium tracking-tight">{f.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#c4f23a" : "rgba(0,0,0,0.06)" }}
                  className="grid size-8 shrink-0 place-items-center rounded-full text-lg text-ink"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-black/60">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
