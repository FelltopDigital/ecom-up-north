"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/cn";

type Tile = {
  eyebrow: string;
  title: string;
  className: string;
  titleClass?: string;
  chip?: string;
};

const ROW_1: Tile[] = [
  {
    eyebrow: "Main stage",
    title: "Selling to shopping agents",
    className: "bg-[radial-gradient(120%_80%_at_20%_110%,#8b5cf6_0%,transparent_55%),linear-gradient(160deg,#0f0f1a,#1b1033)]",
    chip: "Keynote",
  },
  {
    eyebrow: "Hall A · Expo",
    title: "180 exhibitors. Zero fluff.",
    className: "bg-[radial-gradient(80%_70%_at_50%_120%,#c4f23a_0%,transparent_60%),linear-gradient(180deg,#0b0b0c,#121a0a)]",
    titleClass: "font-serif italic",
  },
  {
    eyebrow: "Manchester Central",
    title: "MANCHESTER, 14 APRIL 2027",
    className: "bg-[linear-gradient(180deg,#8fa3b8_0%,#3c4a5a_55%,#1a1f26_100%)]",
    titleClass: "uppercase font-bold tracking-tight",
  },
  {
    eyebrow: "Growth stage",
    title: "RETAIL MEDIA, REBUILT",
    className: "bg-[radial-gradient(70%_60%_at_80%_20%,#fb7185_0%,transparent_60%),linear-gradient(135deg,#2a1215,#0d0d0f)]",
    titleClass: "uppercase font-bold",
  },
  {
    eyebrow: "Workshops",
    title: "40+ masterclasses",
    className: "bg-[radial-gradient(90%_80%_at_0%_0%,#2ee6c5_0%,transparent_60%),linear-gradient(135deg,#062421,#0d0d0f)]",
  },
];

const ROW_2: Tile[] = [
  {
    eyebrow: "The Northern Social",
    title: "UP NORTH AFTER DARK",
    className: "bg-[radial-gradient(60%_50%_at_30%_30%,#f59e0b_0%,transparent_60%),radial-gradient(60%_60%_at_80%_80%,#8b5cf6_0%,transparent_60%),linear-gradient(#0d0d0f,#0d0d0f)]",
    titleClass: "uppercase font-black tracking-tighter",
  },
  {
    eyebrow: "Hosted meetings",
    title: "12,000 meetings that actually matter",
    className: "bg-[linear-gradient(160deg,#e9ecef,#cfd6dd)] text-ink",
  },
  {
    eyebrow: "Ops theatre",
    title: "Returns are a feature",
    className: "bg-[radial-gradient(90%_90%_at_100%_100%,#38bdf8_0%,transparent_60%),linear-gradient(160deg,#0b1220,#0d0d0f)]",
  },
  {
    eyebrow: "Brand stage",
    title: "COMMUNITY > CAC",
    className: "bg-[linear-gradient(135deg,#c4f23a,#8fd11a)] text-ink",
    titleClass: "font-black tracking-tighter",
  },
  {
    eyebrow: "Up North Awards",
    title: "The North's best in commerce",
    className: "bg-[radial-gradient(70%_70%_at_50%_0%,#fde68a_0%,transparent_60%),linear-gradient(180deg,#1f1a0e,#0d0d0f)]",
    titleClass: "font-serif italic",
  },
];

export function ShowcaseWall() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-4%", "-22%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-24%", "-6%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.9, 1]);

  return (
    <div ref={ref} className="relative z-10 mt-20 pb-24 [perspective:1400px]">
      <motion.div style={{ rotateX, scale }} className="flex origin-top flex-col gap-4">
        <Row tiles={ROW_1} x={x1} />
        <Row tiles={ROW_2} x={x2} offset />
      </motion.div>
    </div>
  );
}

function Row({ tiles, x, offset }: { tiles: Tile[]; x: MotionValue<string>; offset?: boolean }) {
  const doubled = [...tiles, ...tiles];
  return (
    <motion.div style={{ x }} className={cn("flex w-max gap-4", offset && "pl-40")}>
      {doubled.map((t, i) => (
        <motion.article
          key={i}
          whileHover={{ y: -6, rotate: i % 2 ? 0.6 : -0.6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "grain relative flex h-56 w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/10 sm:h-64 sm:w-[380px]",
            t.className,
          )}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase backdrop-blur-md">
              {t.eyebrow}
            </span>
            {t.chip && (
              <span className="rounded-full bg-lime px-2.5 py-1 text-[11px] font-medium text-ink">{t.chip}</span>
            )}
          </div>
          <h3 className={cn("font-display text-3xl leading-[0.95] tracking-tight text-balance sm:text-4xl", t.titleClass)}>
            {t.title}
          </h3>
        </motion.article>
      ))}
    </motion.div>
  );
}
