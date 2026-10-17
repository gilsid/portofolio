"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useI18n } from "./i18n";

type Theme = "dark" | "light";

const STORAGE_KEY = "gilang-theme";

/** Warna bg0 Gruvbox Material, untuk meta theme-color (bar alamat di HP). */
const THEME_COLOR: Record<Theme, string> = {
  dark: "#282828",
  light: "#fbf1c7",
};

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[theme]);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Skrip inline di layout.tsx sudah memasang tema tersimpan sebelum paint
    // pertama. Di sini state React cukup mengikuti atribut itu.
    const current = readTheme();
    setTheme(current);
    applyTheme(current);

    // Sinkron kalau tema diganti dari tab lain.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      if (e.newValue === "light" || e.newValue === "dark") {
        setTheme(e.newValue);
        applyTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Posisi thumb, ikon, dan label digambar lewat CSS dari atribut
 * html[data-theme], bukan dari state React. Jadi pengunjung dengan tema
 * terang tidak melihat toggle "meluncur" sesaat setelah halaman dimuat.
 * Nama aksesibelnya tetap, status dibaca dari aria-checked.
 */
export function ThemeToggleButton() {
  const { theme, toggle } = useTheme();
  const { dict } = useI18n();
  return (
    <button
      type="button"
      className="toggle"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label={dict.ui.nav.themeLabel}
      onClick={toggle}
      data-testid="theme-toggle"
    >
      <span className="toggle-track" aria-hidden="true">
        <svg
          className="toggle-side toggle-side-sun"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </svg>
        <svg
          className="toggle-side toggle-side-moon"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.6 14.6A8.8 8.8 0 0 1 9.4 3.4a.7.7 0 0 0-.9-.9 10.2 10.2 0 1 0 12.9 12.9.7.7 0 0 0-.8-.8Z" />
        </svg>
        <span className="toggle-thumb">
          <svg
            className="toggle-face toggle-face-moon"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.6 14.6A8.8 8.8 0 0 1 9.4 3.4a.7.7 0 0 0-.9-.9 10.2 10.2 0 1 0 12.9 12.9.7.7 0 0 0-.8-.8Z" />
          </svg>
          <svg
            className="toggle-face toggle-face-sun"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
          </svg>
        </span>
      </span>
      <span className="toggle-label" aria-hidden="true">
        <span className="lbl-dark">{dict.ui.nav.dark}</span>
        <span className="lbl-light">{dict.ui.nav.light}</span>
      </span>
    </button>
  );
}
