import type { MetadataRoute } from "next";
import { LOCALES, pathFor, type Route } from "@/lib/i18n";
import { PROJECT_IDS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Route[] = [
    { name: "home" },
    { name: "about" },
    ...PROJECT_IDS.map((id): Route => ({ name: "project", id })),
  ];
  // Satu entri per bahasa, masing-masing menunjuk versi bahasa lainnya.
  return routes.flatMap((route) => {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}${pathFor(l, route)}`])
    );
    return LOCALES.map((l) => ({
      url: `${SITE_URL}${pathFor(l, route)}`,
      lastModified: now,
      alternates: { languages },
    }));
  });
}
