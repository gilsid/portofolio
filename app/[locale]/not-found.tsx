"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n";
import { pathFor } from "@/lib/i18n";

export default function NotFound() {
  const { locale, dict } = useI18n();
  const t = dict.ui.notFound;
  return (
    <main id="main" className="wrap dt">
      <title>{t.title}</title>
      <p className="lab">404</p>
      <h1 className="h1 dh">{t.heading}</h1>
      <p className="lede">{t.text}</p>
      <Link className="go" href={pathFor(locale, { name: "home" })}>
        {t.link}
      </Link>
    </main>
  );
}
