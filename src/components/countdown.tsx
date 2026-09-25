"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    Days: Math.floor(ms / 86_400_000),
    Hrs: Math.floor(ms / 3_600_000) % 24,
    Min: Math.floor(ms / 60_000) % 60,
    Sec: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  // Render nothing time-dependent on the server to avoid hydration mismatch
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const tick = () => setT(diff(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="glass-dark flex flex-1 items-center justify-between gap-1 rounded-2xl px-4 py-3" aria-label="Countdown to doors open">
      {(["Days", "Hrs", "Min", "Sec"] as const).map((k) => (
        <div key={k} className="flex min-w-12 flex-col items-center">
          <div className="relative h-8 overflow-hidden font-display text-2xl font-semibold tabular-nums tracking-tight">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={t ? t[k] : "–"}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {t ? String(t[k]).padStart(2, "0") : "--"}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="font-mono text-[10px] tracking-wider text-white/45 uppercase">{k}</span>
        </div>
      ))}
    </div>
  );
}
