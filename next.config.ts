import type { NextConfig } from "next";

// Pre-launch: keep search engines out unless ALLOW_INDEXING=true is set.
// Deliberately no robots.txt Disallow — crawlers must be able to fetch pages
// to see the noindex, otherwise URLs can still be indexed from external links.
const allowIndexing = process.env.ALLOW_INDEXING === "true";

const nextConfig: NextConfig = {
  async headers() {
    if (allowIndexing) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
