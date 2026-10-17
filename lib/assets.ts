import { existsSync } from "node:fs";
import path from "node:path";
import type { Locale } from "./i18n";
import { getProjects, type Project } from "./projects";

/* Hanya dipanggil dari server component. File yang belum ada di public/
   dikeluarkan dari galeri; kalau galerinya kosong, bingkai tidak
   ditampilkan sama sekali (tidak ada gambar rusak). */
function publicFileExists(p?: string): boolean {
  if (!p) return false;
  return existsSync(path.join(process.cwd(), "public", p));
}

export function withShot(project: Project): Project {
  return { ...project, shots: project.shots.filter(publicFileExists) };
}

export function getProjectsWithShots(locale: Locale): Project[] {
  return getProjects(locale).map(withShot);
}

/** Path CV (PDF) per bahasa kalau file-nya sudah ditaruh di public/cv/. */
export function getCvPath(locale: Locale): string | undefined {
  const p = `/cv/gilang-nur-akbar-${locale}.pdf`;
  return publicFileExists(p) ? p : undefined;
}
