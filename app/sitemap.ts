import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ticoblockchain.cr";

// Date the edition's content was last substantially updated. Bump when
// the agenda or speaker roster changes materially so crawlers pick it up.
const LAST_UPDATED = new Date("2026-04-11");

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const ROUTES: readonly Route[] = [
  { path: "/", priority: 1.0, changeFrequency: "hourly" },
  { path: "/agenda", priority: 0.9, changeFrequency: "daily" },
  { path: "/exponentes", priority: 0.8, changeFrequency: "weekly" },
  { path: "/mapa", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sponsors", priority: 0.6, changeFrequency: "weekly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_UPDATED,
    changeFrequency,
    priority,
  }));
}
