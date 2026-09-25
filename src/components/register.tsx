"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { Badge, SplitHeading } from "./ui";

const MODES = [
  { id: "attend", label: "Register interest" },
  { id: "exhibit", label: "Exhibit or sponsor" },
] as const;

const INTERESTS = ["Agentic commerce", "Retail media", "Marketplaces", "Ops & returns", "CRO & UX", "Payments"];

const inputCls =
  "w-full rounded-xl border border-black/8 bg-paper px-4 py-3.5 text-sm text-ink placeholder:text-black/35 outline-none transition focus:border-ink/30 focus:bg-white focus:ring-4 focus:ring-lime/40";

export function Register() {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("attend");
  const [picked, setPicked] = useState<string[]>(["Agentic commerce"]);
  const [sent, setSent] = useState(false);

  const toggle = (i: string) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <div id="register" className="relative mx-auto max-w-3xl pt-28 md:pt-40">
      <div className="text-center">
        <Badge>Join us in Manchester</Badge>
        <SplitHeading
          text="Save your seat before the North sells out"
          className="mx-auto mt-5 max-w-2xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]"
        />
        <p className="mt-5 text-black/55">
          Tell us who you are and we&apos;ll send your pass, or the exhibitor brochure.
        </p>
      </div>

      <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)] ring-1 ring-black/5">
        <div className="grid grid-cols-2 border-b border-black/8" role="tablist">
          {MODES.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className={cn("relative py-4 text-sm transition-colors", mode === m.id ? "text-ink font-medium" : "text-black/45 hover:text-black/70")}
            >
              {m.label}
              {mode === m.id && (
                <motion.span layoutId="reg-tab" className="absolute inset-x-6 -bottom-px h-0.5 rounded-full bg-ink" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center px-6 py-20 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                className="grid size-16 place-items-center rounded-full bg-lime text-2xl text-ink"
              >
                ✓
              </motion.span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">You&apos;re on the list</h3>
              <p className="mt-2 max-w-sm text-black/55">
                Check your inbox — we&apos;ve sent {mode === "attend" ? "your next steps" : "the exhibitor brochure"}. See you up North.
              </p>
              <button onClick={() => setSent(false)} className="mt-6 text-sm text-ink underline decoration-lime decoration-2 underline-offset-4">
                Submit another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5 p-6 md:p-8"
            >
              <fieldset className="space-y-3">
                <legend className="mb-3 text-sm text-black/70">Contact information</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required name="name" placeholder="Full name" autoComplete="name" className={inputCls} />
                  <input required type="email" name="email" placeholder="you@company.com" autoComplete="email" className={inputCls} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required name="company" placeholder="Company" autoComplete="organization" className={inputCls} />
                  <input name="role" placeholder="Job title" autoComplete="organization-title" className={inputCls} />
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-sm text-black/70">
                  {mode === "attend" ? "What are you most interested in?" : "Which audiences do you want to reach?"}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => {
                    const on = picked.includes(i);
                    return (
                      <motion.button
                        type="button"
                        key={i}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggle(i)}
                        aria-pressed={on}
                        className={cn(
                          "flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors",
                          on ? "border-ink bg-ink text-white" : "border-black/10 text-black/60 hover:border-black/25",
                        )}
                      >
                        <span className={cn("grid size-4 place-items-center rounded border text-[10px]", on ? "border-lime bg-lime text-ink" : "border-black/20")}>
                          {on && "✓"}
                        </span>
                        {i}
                      </motion.button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="reg-select" className="mb-3 block text-sm text-black/70">
                  {mode === "attend" ? "Which pass?" : "Stand size / package"}
                </label>
                <div className="relative">
                  <select id="reg-select" defaultValue="" required className={cn(inputCls, "appearance-none")}>
                    <option value="" disabled>
                      Select
                    </option>
                    {(mode === "attend"
                      ? ["Expo Pass (free)", "Conference Pass", "VIP Pass", "Group of 5+"]
                      : ["Shell scheme 9m²", "Space only 18m²+", "Stage sponsorship", "Headline partner"]
                    ).map((o) => (
                      <option key={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <svg viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-black/50" fill="none">
                    <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-lime py-4 text-sm font-semibold text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_20px_40px_-15px_rgb(150_200_20/0.7)] ring-1 ring-black/5"
              >
                {mode === "attend" ? "Reserve my pass" : "Send me the brochure"}
              </motion.button>
              <p className="text-center text-xs text-black/40">
                By submitting you agree to our Privacy Policy. We&apos;ll never sell your data.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
