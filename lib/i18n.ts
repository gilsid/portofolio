/**
 * Bahasa dan URL. Setiap bahasa punya awalan path sendiri (/id dan /en),
 * jadi tiap halaman punya satu alamat per bahasa yang bisa dibagikan.
 */
export const LOCALES = ["id", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "id";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined): value is Locale {
  return value === "id" || value === "en";
}

export type Route =
  | { name: "home" }
  | { name: "about" }
  | { name: "project"; id: string };

const SEGMENTS: Record<Locale, { about: string; projects: string }> = {
  id: { about: "tentang", projects: "proyek" },
  en: { about: "about", projects: "projects" },
};

const ABOUT_SEGMENTS: string[] = LOCALES.map((l) => SEGMENTS[l].about);
const PROJECT_SEGMENTS: string[] = LOCALES.map((l) => SEGMENTS[l].projects);

export function pathFor(locale: Locale, route: Route): string {
  const s = SEGMENTS[locale];
  switch (route.name) {
    case "home":
      return `/${locale}`;
    case "about":
      return `/${locale}/${s.about}`;
    case "project":
      return `/${locale}/${s.projects}/${route.id}`;
  }
}

/** Memecah pathname jadi bahasa + halaman. route null = bukan halaman yang dikenal. */
export function parsePath(pathname: string): {
  locale: Locale | null;
  route: Route | null;
} {
  const seg = pathname.split("/").filter(Boolean);
  const locale = isLocale(seg[0]) ? seg[0] : null;
  if (!locale) return { locale: null, route: null };
  const rest = seg.slice(1);
  if (rest.length === 0) return { locale, route: { name: "home" } };
  if (rest.length === 1 && ABOUT_SEGMENTS.includes(rest[0]))
    return { locale, route: { name: "about" } };
  if (rest.length === 2 && PROJECT_SEGMENTS.includes(rest[0]))
    return { locale, route: { name: "project", id: rest[1] } };
  return { locale, route: null };
}

/** Memilih bahasa dari cookie, lalu header Accept-Language. */
export function negotiate(
  cookie: string | undefined,
  acceptLanguage: string | null
): Locale {
  if (isLocale(cookie)) return cookie;
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const weight = q ? Number(q.trim().slice(2)) : 1;
      return {
        primary: tag.trim().toLowerCase().split("-")[0],
        weight: Number.isFinite(weight) ? weight : 0,
        index,
      };
    })
    .filter((x) => x.primary && x.primary !== "*" && x.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  for (const { primary } of ranked) {
    if (primary === "id" || primary === "in") return "id";
    if (primary === "en") return "en";
  }
  // Header ada tapi bukan id/en: Inggris lebih berguna daripada Indonesia.
  return ranked.length > 0 ? "en" : DEFAULT_LOCALE;
}
