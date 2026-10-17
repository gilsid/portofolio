"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "./i18n";
import {
  LOCALES,
  LOCALE_COOKIE,
  parsePath,
  pathFor,
  type Locale,
} from "@/lib/i18n";

const LABEL: Record<Locale, { short: string; name: string }> = {
  id: { short: "ID", name: "Bahasa Indonesia" },
  en: { short: "EN", name: "English" },
};

/**
 * Pindah bahasa = pindah ke alamat yang setara di bahasa lain (/id/tentang
 * <-> /en/about). Berupa tautan biasa, jadi bisa dibuka di tab baru dan
 * dibagikan. Pilihan juga disimpan di cookie supaya kunjungan berikutnya ke
 * "/" langsung ke bahasa itu.
 */
export function LanguageSwitch() {
  const pathname = usePathname();
  const { locale, dict } = useI18n();
  const route = parsePath(pathname).route ?? { name: "home" as const };

  return (
    <div className="lang" role="group" aria-label={dict.ui.nav.languageLabel}>
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathFor(l, route)}
            lang={l}
            hrefLang={l}
            className={active ? "lang-a lang-on" : "lang-a"}
            aria-current={active ? "true" : undefined}
            aria-label={LABEL[l].name}
            onClick={() => {
              try {
                document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
              } catch {}
            }}
          >
            {LABEL[l].short}
          </Link>
        );
      })}
    </div>
  );
}
