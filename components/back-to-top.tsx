"use client";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="back"
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      {label}
    </button>
  );
}
