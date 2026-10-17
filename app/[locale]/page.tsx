import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeClient } from "@/components/home";
import { getCvPath, getProjectsWithShots } from "@/lib/assets";
import { isLocale } from "@/lib/i18n";
import { getDotfiles, getOtherProjects } from "@/lib/projects";
import { alternatesFor } from "@/lib/seo";

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
  return (
    <HomeClient
      projects={getProjectsWithShots(locale)}
      others={getOtherProjects(locale)}
      dotfiles={getDotfiles(locale)}
      cv={getCvPath(locale)}
    />
  );
}
