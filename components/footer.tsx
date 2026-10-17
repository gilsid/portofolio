import Link from "next/link";
import { EMAIL, GITHUB_URL, NAME } from "@/lib/site";
import { getCvPath } from "@/lib/assets";
import type { Dictionary } from "@/lib/dictionaries";
import { pathFor, type Locale } from "@/lib/i18n";
import { BackToTop } from "./back-to-top";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();
  const cv = getCvPath(locale);
  const f = dict.ui.footer;
  return (
    <footer className="wrap ft">
      <div className="ft-in">
        <div className="ft-grid">
          <div>
            <h2 className="lab">{f.navigation}</h2>
            <Link className="ft-link" href={pathFor(locale, { name: "home" })}>
              {dict.ui.nav.projects}
            </Link>
            <Link className="ft-link" href={pathFor(locale, { name: "about" })}>
              {dict.ui.nav.about}
            </Link>
          </div>
          <div>
            <h2 className="lab">{f.contact}</h2>
            <div className="ft-stack">
              <a className="ft-link" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <a
                className="ft-link"
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
              >
                github.com/gilsid
              </a>
              {cv && (
                <a className="ft-link" href={cv} target="_blank" rel="noreferrer">
                  {f.downloadCv}
                </a>
              )}
            </div>
          </div>
          <div>
            <h2 className="lab">{f.status}</h2>
            <p className="status ft-status">
              <span className="dot" aria-hidden="true" />
              {f.statusLine}
            </p>
            <p className="small">{f.statusNote}</p>
          </div>
        </div>
        <div className="ft-base">
          <p className="small">
            © {year} {NAME}
          </p>
          <BackToTop label={f.backToTop} />
        </div>
      </div>
    </footer>
  );
}
