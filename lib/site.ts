/**
 * URL publik situs, dipakai untuk metadata, sitemap, dan robots.
 *
 * Urutan: NEXT_PUBLIC_SITE_URL (domain sendiri) -> domain produksi Vercel
 * (diisi otomatis oleh Vercel saat build) -> localhost saat dev.
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const SITE_URL = (fromEnv ?? "http://localhost:3000").replace(/\/$/, "");

export const NAME = "Gilang Nur Akbar";
export const EMAIL = "gnurakbar19@gmail.com";
export const GITHUB_URL = "https://github.com/gilsid";

/** Semester berjalan. Naikkan satu tiap awal semester (ganjil: Sep, genap: Feb). */
export const SEMESTER = 5;
