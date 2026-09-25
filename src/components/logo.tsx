import { cn } from "@/lib/cn";

/** Compass-style north arrow inside a rounded hexagon. */
export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
        <path
          d="M14 2.5 24 8.25v11.5L14 25.5 4 19.75V8.25L14 2.5Z"
          fill="var(--color-lime)"
          stroke={dark ? "#fff" : "var(--color-ink)"}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M14 7.5 18.5 19 14 16.5 9.5 19 14 7.5Z" fill="var(--color-ink)" />
      </svg>
      <span
        className={cn(
          "font-display text-[17px] leading-none font-semibold tracking-tight",
          dark ? "text-white" : "text-ink",
        )}
      >
        Ecom Up North
      </span>
    </span>
  );
}
