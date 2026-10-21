import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeClient } from "@/components/home";
import { getCvPath, getProjectsWithShots } from "@/lib/assets";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, pathFor } from "@/lib/i18n";
import { getDotfiles, getOtherProjects } from "@/lib/projects";
import { alternatesFor } from "@/lib/seo";
import { GITHUB_URL, NAME, SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { alternates: alternatesFor(locale, { name: "home" }) };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    url: `${SITE_URL}${pathFor(locale, { name: "home" })}`,
    sameAs: [GITHUB_URL],
    description: getDictionary(locale).meta.shortDescription,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomeClient
        projects={getProjectsWithShots(locale)}
        others={getOtherProjects(locale)}
        dotfiles={getDotfiles(locale)}
        cv={getCvPath(locale)}
      />
    </>
  );
}
