"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Logo } from "./logo";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [onDark, setOnDark] = useState(true);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
    // The page is dark; switch to light glass while the nav sits over a light panel
    const probeY = 40;
    const light = Array.from(document.querySelectorAll("[data-nav-light]")).some((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= probeY && r.bottom >= probeY;
    });
    setOnDark(!light);
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.nav
        initial={{ maxWidth: 1200 }}
        animate={{ maxWidth: scrolled ? 880 : 1200 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className={cn(
          "w-full rounded-2xl px-3 py-2.5 transition-[box-shadow,background-color,border-color] duration-500",
          onDark ? "glass-dark" : "glass",
          scrolled && "shadow-[0_20px_40px_-20px_rgb(0_0_0/0.35)]",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2 pl-1" aria-label="Ecom Up North home">
            <Logo dark={onDark} />
          </a>

          <ul className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  onMouseEnter={() => setHovered(l.href)}
                  className={cn(
                    "relative z-10 block px-3.5 py-2 text-sm transition-colors",
                    onDark ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black",
                  )}
                >
                  {l.label}
                </a>
                {hovered === l.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className={cn(
                      "absolute inset-0 rounded-lg",
                      onDark ? "bg-white/10" : "bg-white/70 shadow-[inset_0_1px_0_white,0_1px_3px_rgb(0_0_0/0.08)]",
                    )}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden -space-x-2 lg:flex" aria-hidden>
              {[88, 200, 330].map((h) => (
                <span
                  key={h}
                  className="size-7 rounded-full ring-2 ring-white/80"
                  style={{ background: `linear-gradient(135deg, oklch(0.85 0.15 ${h}), oklch(0.55 0.15 ${h + 40}))` }}
                />
              ))}
            </div>
            <a
              href="#tickets"
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-500",
                onDark
                  ? "bg-lime text-ink"
                  : "bg-ink text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] hover:bg-black",
              )}
            >
              Get tickets
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className={cn("grid size-9 place-items-center rounded-lg md:hidden", onDark ? "bg-white/10" : "bg-white/70")}
            >
              <div className="flex w-4 flex-col gap-1">
                <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }} className={cn("h-0.5 rounded", onDark ? "bg-white" : "bg-ink")} />
                <motion.span animate={{ opacity: open ? 0 : 1 }} className={cn("h-0.5 rounded", onDark ? "bg-white" : "bg-ink")} />
                <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className={cn("h-0.5 rounded", onDark ? "bg-white" : "bg-ink")} />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-3 font-display text-lg font-medium tracking-tight",
                      onDark && "text-white",
                    )}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
