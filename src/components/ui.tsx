"use client";

import { Fragment } from "react";
import { motion, useMotionTemplate, useMotionValue, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Headline that reveals word by word, rising out of a mask.
 * A "\n" in `text` forces a line break from the lg breakpoint up; below that it wraps naturally.
 */
export function SplitHeading({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const lines = text.split("\n").map((line) => line.trim().split(/\s+/));
  let wordIndex = 0;
  return (
    <Tag className={cn("text-balance", className)} aria-label={text.replace(/\s*\n\s*/g, " ")}>
      {lines.map((words, l) => (
        <Fragment key={l}>
          {l > 0 && <br aria-hidden className="hidden lg:block" />}
          {words.map((word) => {
            const i = wordIndex++;
            return (
              <Fragment key={i}>
                {/* Real space between inline-blocks so lines wrap and centre cleanly */}
                {i > 0 && " "}
                <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%", rotate: 4 }}
                    whileInView={{ y: "0%", rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </Tag>
  );
}

export function Badge({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] tracking-wide uppercase",
        dark ? "border border-white/12 text-white/70" : "border border-black/8 bg-white text-black/60",
      )}
    >
      <span className="size-1.5 rounded-full bg-lime animate-pulse-dot" />
      {children}
    </span>
  );
}

export function Button({
  children,
  href,
  variant = "dark",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "dark" | "light" | "lime" | "ghost";
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-medium transition-colors",
        variant === "dark" && "bg-ink text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15),0_8px_20px_-8px_rgb(0_0_0/0.5)]",
        variant === "light" && "bg-white text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-black/5",
        variant === "lime" && "bg-lime text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_10px_30px_-10px_rgb(196_242_58/0.8)]",
        variant === "ghost" && "glass-dark text-white",
        className,
      )}
    >
      {/* sheen sweep */}
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

/** Card with a cursor-following spotlight glow. */
export function SpotlightCard({
  children,
  className,
  color = "196 242 58",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgb(${color} / 0.14), transparent 70%)`;
  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className={cn("group relative overflow-hidden", className)}
    >
      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: bg }} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={cn("size-4 transition-transform group-hover:translate-x-0.5", className)}>
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
