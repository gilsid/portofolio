"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  KIND_LABEL,
  type LinkItem,
  type Project,
  type ProjectKind,
} from "@/lib/projects";
import { pathFor } from "@/lib/i18n";
import { EMAIL } from "@/lib/site";
import { Shot } from "@/components/shot";
import { useI18n } from "@/components/i18n";

type Filter = "all" | ProjectKind;

const CHIP_ORDER: Filter[] = ["all", "web", "mobile", "cli"];

export function HomeClient({
  projects,
  others,
  dotfiles,
  cv,
}: {
  projects: Project[];
  others: LinkItem[];
  dotfiles: LinkItem[];
  cv?: string;
}) {
  const { locale, dict } = useI18n();
  const { hero, home, detail } = dict.ui;
  const [filter, setFilter] = useState<Filter>("all");
  const [hoverId, setHoverId] = useState<string>(projects[0]?.id ?? "");

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.kind === filter)),
    [filter, projects]
  );

  const preview = useMemo(
    () => filtered.find((p) => p.id === hoverId) ?? filtered[0],
    [filtered, hoverId]
  );

  return (
    <main id="main">
      <section className="wrap hero">
        <p className="status">
          <span className="dot" aria-hidden="true" />
          {hero.status}
        </p>
        <h1 className="h1">{hero.title}</h1>
        <p className="lede">{hero.lede}</p>
        <p className="facts">
          {hero.facts.map((f) => (
            <span key={f.badge}>
              <b>{f.badge}</b> {f.text}
            </span>
          ))}
        </p>
        <p className="cta">
          <a className="btn" href={`mailto:${EMAIL}`}>
            {hero.contact}
          </a>
          {cv && (
            <a className="btn btn-ghost" href={cv} target="_blank" rel="noreferrer">
              {dict.ui.footer.downloadCv}
            </a>
          )}
        </p>
      </section>

      <section className="wrap sec">
        <div className="lh">
          <h2 className="lab">
            {home.projects} ({filtered.length})
          </h2>
          <div className="chips" role="group" aria-label={home.filterLabel}>
            {CHIP_ORDER.map((c) => (
              <button
                key={c}
                type="button"
                className={filter === c ? "chip chip-on" : "chip"}
                onClick={() => {
                  setFilter(c);
                  const list =
                    c === "all" ? projects : projects.filter((p) => p.kind === c);
                  if (list[0]) setHoverId(list[0].id);
                }}
                aria-pressed={filter === c}
              >
                {home.filters[c]}
              </button>
            ))}
          </div>
        </div>

        <div className="hg">
          <div className="list">
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={pathFor(locale, { name: "project", id: p.id })}
                className={p.id === preview?.id ? "row row-on" : "row"}
                onMouseEnter={() => setHoverId(p.id)}
                onFocus={() => setHoverId(p.id)}
              >
                <span className="yr">{p.year}</span>
                <span className="mid">
                  <span className="nm">{p.name}</span>
                  <span className="sm">{p.summary}</span>
                </span>
                <span className="ty">{KIND_LABEL[p.kind]}</span>
              </Link>
            ))}
          </div>

          {preview && (
            <aside className="pv" aria-label={home.previewLabel}>
              <div className="pvc">
                {preview.shots.length > 0 && (
                  <Shot
                    key={preview.id}
                    kind={preview.kind}
                    shots={preview.shots}
                    alt={`${detail.shotAlt} ${preview.name}`}
                    sizes="360px"
                    prevLabel={detail.previous}
                    nextLabel={detail.next}
                  />
                )}
                <div>
                  <p className="pvn">{preview.name}</p>
                  <p className="pvs">
                    {KIND_LABEL[preview.kind]} · {preview.year}
                  </p>
                </div>
                <p className="pvs">{preview.stack.join(" · ")}</p>
                <Link className="go" href={pathFor(locale, { name: "project", id: preview.id })}
                >
                  {home.openDetail}
                </Link>
              </div>
            </aside>
          )}
        </div>
      </section>

      <section className="wrap sec">
        <div className="arch">
          <div>
            <h2 className="lab">{home.other}</h2>
            <ul>
              {others.map((l) => (
                <li key={l.name}>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.name}
                  </a>{" "}
                  · {l.desc}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="lab">{home.dotfiles}</h2>
            <ul>
              {dotfiles.map((l) => (
                <li key={l.name}>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.name}
                  </a>{" "}
                  · {l.desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
