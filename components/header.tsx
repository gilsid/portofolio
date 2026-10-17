"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GITHUB_URL, NAME } from "@/lib/site";
import { parsePath, pathFor } from "@/lib/i18n";
import { useI18n } from "./i18n";
import { LanguageSwitch } from "./language-switch";
import { ThemeToggleButton } from "./theme";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, dict } = useI18n();
  const { route } = parsePath(pathname);
  const isAbout = route?.name === "about";
  const isProjects = route?.name === "home" || route?.name === "project";
  const n = dict.ui.nav;

  return (
    <header className="wrap hd">
      <Link href={pathFor(locale, { name: "home" })} className="brand">
        {NAME}
      </Link>
      <nav className="nav" aria-label={n.label}>
        <Link
          href={pathFor(locale, { name: "home" })}
          className={isProjects ? "nl nl-on" : "nl"}
          aria-current={isProjects ? "page" : undefined}
        >
          {n.projects}
        </Link>
        <Link
          href={pathFor(locale, { name: "about" })}
          className={isAbout ? "nl nl-on" : "nl"}
          aria-current={isAbout ? "page" : undefined}
        >
          {n.about}
        </Link>
        <a className="nl" href={GITHUB_URL} target="_blank" rel="noreferrer">
          {n.github} ↗
        </a>
      </nav>
      <div className="tools">
        <LanguageSwitch />
        <ThemeToggleButton />
      </div>
    </header>
  );
}
