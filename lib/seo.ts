import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, pathFor, type Locale, type Route } from "./i18n";

/** canonical + hreflang untuk satu halaman. x-default: beranda ke "/" (memilih bahasa otomatis), halaman lain ke versi default. */
export function alternatesFor(locale: Locale, route: Route): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = pathFor(l, route);
  languages["x-default"] =
    route.name === "home" ? "/" : pathFor(DEFAULT_LOCALE, route);
  return { canonical: pathFor(locale, route), languages };
}
