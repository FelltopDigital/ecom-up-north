"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { STATS } from "@/lib/content";
import { Reveal } from "./ui";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (node.textContent = Math.round(v).toLocaleString("en-GB") + suffix),
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="glass-dark rounded-2xl p-6">
            <p className="font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-white/55">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
