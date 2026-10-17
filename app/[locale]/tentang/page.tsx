import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const a = getDictionary(locale).about;
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: alternatesFor(locale, { name: "about" }),
  };
}

/* Folder bernama "tentang" untuk kedua bahasa; slug Inggris (/en/about)
   dipetakan ke sini lewat rewrites di next.config.ts. */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const a = getDictionary(locale).about;

  return (
    <main id="main" className="wrap dt">
      <p className="lab">{a.label}</p>
      <h1 className="h1 dh">{a.title}</h1>
      <div className="ab">
        <div className="kv">
          <h2 className="lab">{a.summary.label}</h2>
          <div>
            {a.summary.paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>

        <div className="kv">
          <h2 className="lab">{a.ai.label}</h2>
          <div>
            {a.ai.paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>

        <div className="kv">
          <h2 className="lab">{a.education.label}</h2>
          <div>
            <p>{a.education.degree}</p>
            <p className="small">{a.education.period}</p>
          </div>
        </div>

        <div className="kv">
          <h2 className="lab">{a.skills.label}</h2>
          <div>
            {a.skills.items.map((s) => (
              <p className="sk" key={s.label}>
                <span>{s.label}</span>
                <span>{s.value}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="kv">
          <h2 className="lab">{a.achievements.label}</h2>
          <div>
            {a.achievements.items.map((i) => (
              <p className="ev" key={i.text}>
                <span>{i.text}</span>
                <span>{i.year}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="kv">
          <h2 className="lab">{a.certifications.label}</h2>
          <div>
            {a.certifications.items.map((i) => (
              <p className="ev" key={i.text}>
                <span>{i.text}</span>
                <span>{i.year}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
