import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { NAME } from "@/lib/site";

export const alt = NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/* Kartu pratinjau saat tautan dibagikan (WhatsApp, LinkedIn, dll).
   Warna dari Gruvbox Material dark. Teks mengikuti bahasa halaman. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const og = getDictionary(isLocale(locale) ? locale : DEFAULT_LOCALE).meta.og;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#282828",
          color: "#ddc7a1",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#a89984",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: "#a9b665",
            }}
          />
          {og.status}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 80,
            lineHeight: 1.04,
            letterSpacing: -3,
          }}
        >
          {og.headline}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 32,
            color: "#a89984",
          }}
        >
          <span style={{ color: "#e78a4e" }}>{NAME}</span>
          <span>{og.stack}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
