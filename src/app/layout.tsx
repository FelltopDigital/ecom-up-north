import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecom Up North 2027 — The North's biggest ecommerce event",
  description:
    "One day, eight stages, 250+ speakers and 6,000 retail and ecommerce leaders. Wednesday 14 April 2027, Manchester Central.",
  // Pre-launch: noindex/nofollow unless ALLOW_INDEXING=true (see next.config.ts)
  robots:
    process.env.ALLOW_INDEXING === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} antialiased`}
    >
      <body className="min-h-full bg-night font-sans text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
