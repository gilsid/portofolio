import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectsWithShots, withShot } from "@/lib/assets";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, isLocale, pathFor } from "@/lib/i18n";
import {
  KIND_LABEL,
  PROJECT_IDS,
  getPrevNext,
  getProject,
} from "@/lib/projects";
import { alternatesFor } from "@/lib/seo";
import { Shot } from "@/components/shot";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    PROJECT_IDS.map((id) => ({ locale, id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const p = getProject(locale, id);
  if (!p) return {};
  return {
    title: p.name,
    description: p.lead,
    alternates: alternatesFor(locale, { name: "project", id }),
  };
}

/* Folder bernama "proyek" untuk kedua bahasa; /en/projects/:id dipetakan ke
   sini lewat rewrites di next.config.ts. */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const found = getProject(locale, id);
  if (!found) notFound();

  const d = getDictionary(locale).ui.detail;
  const p = withShot(found);
  const { prev, next } = getPrevNext(locale, id);
  const alt = `${d.shotAlt} ${p.name}`;

  return (
    <main id="main" className="wrap dt">
      <Link href={pathFor(locale, { name: "home" })} className="back">
        {d.back}
      </Link>
      <p className="lab">
        {p.year} · {KIND_LABEL[p.kind]}
      </p>
      <h1 className="h1 dh">{p.name}</h1>
      <p className="lede">{p.lead}</p>
      <p className="cta">
        <a className="btn" href={p.repo} target="_blank" rel="noreferrer">
          {d.repo}
        </a>
      </p>

      {p.shots.length > 0 && (
        <div className="big">
          <Shot
            kind={p.kind}
            shots={p.shots}
            alt={alt}
            sizes="(min-width: 1248px) 1104px, 100vw"
            priority
            prevLabel={d.previous}
            nextLabel={d.next}
          />
        </div>
      )}

      <div className="dgrid">
        <aside>
          <div className="sec2">
            <h2 className="lab">{d.stack}</h2>
            <ul className="ul stk">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          <div className="sec2">
            <h2 className="lab">{d.features}</h2>
            <ul className="ul">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="sec2">
            <h2 className="lab">{d.notes}</h2>
            <ul className="ul">
              {p.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <nav className="pn" aria-label={d.navLabel}>
        <Link
          href={pathFor(locale, { name: "project", id: prev.id })}
          className="pnb"
        >
          <span className="lab">{d.previous}</span>
          <span className="nm">{prev.name}</span>
        </Link>
        <Link
          href={pathFor(locale, { name: "project", id: next.id })}
          className="pnb"
        >
          <span className="lab">{d.next}</span>
          <span className="nm">{next.name}</span>
        </Link>
      </nav>
    </main>
  );
}
