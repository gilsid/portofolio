import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme";
import { I18nProvider } from "@/components/i18n";
import { SiteHeader } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, isLocale } from "@/lib/i18n";
import { NAME, SITE_URL } from "@/lib/site";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getDictionary(locale).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: m.title, template: m.template },
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.shortDescription,
      type: "website",
      locale: m.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => getDictionary(l).meta.ogLocale
      ),
      siteName: NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.shortDescription,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#282828",
};

/* Memasang tema tersimpan sebelum paint pertama, supaya tidak berkedip.
   Default selalu gelap, tidak mengikuti pengaturan OS. */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("gilang-theme");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${mono.variable} ${sans.variable}`}>
        <I18nProvider locale={locale} dict={dict}>
          <ThemeProvider>
            <a href="#main" className="skip">
              {dict.ui.skip}
            </a>
            <SiteHeader />
            {children}
            <SiteFooter locale={locale} dict={dict} />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
