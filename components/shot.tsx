"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ProjectKind } from "@/lib/projects";

/**
 * Galeri screenshot. Satu frame dirender dalam satu waktu; kalau galerinya
 * lebih dari satu, frame berganti otomatis tiap 2,5 detik (berhenti saat
 * di-hover/fokus, dan mati total kalau prefers-reduced-motion). Dots dan
 * tombol bisa dipakai untuk pindah manual.
 */
export function Shot({
  kind,
  shots,
  alt,
  sizes,
  priority = false,
  prevLabel,
  nextLabel,
}: {
  kind: ProjectKind;
  shots: string[];
  alt: string;
  sizes: string;
  priority?: boolean;
  prevLabel: string;
  nextLabel: string;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = shots.length;
  const i = n === 0 ? 0 : idx % n;

  useEffect(() => {
    if (n < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % n), 2500);
    return () => clearInterval(t);
  }, [n, paused]);

  if (n === 0) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={kind === "mobile" ? "shot shot-portrait" : "shot"}>
        {shots.map((s, k) => (
          <div
            key={s}
            className="shot-frame"
            data-on={k === i}
            aria-hidden={k !== i}
          >
            <Image
              src={s}
              alt={k === i ? (n > 1 ? `${alt} (${i + 1}/${n})` : alt) : ""}
              fill
              sizes={sizes}
              priority={priority && k === 0}
              loading={priority && k === 0 ? undefined : "eager"}
              className="shot-img"
            />
          </div>
        ))}
      </div>
      {n > 1 && (
        <div className="car-nav">
          <button
            type="button"
            className="car-btn"
            onClick={() => setIdx((i + n - 1) % n)}
            aria-label={prevLabel}
          >
            ←
          </button>
          <span className="car-count" aria-hidden="true">
            {i + 1} / {n}
          </span>
          <button
            type="button"
            className="car-btn"
            onClick={() => setIdx((i + 1) % n)}
            aria-label={nextLabel}
          >
            →
          </button>
          <div className="car-dots" role="group">
            {shots.map((s, k) => (
              <button
                key={s}
                type="button"
                className="car-dot"
                aria-current={k === i}
                aria-label={`${k + 1} / ${n}`}
                onClick={() => setIdx(k)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
