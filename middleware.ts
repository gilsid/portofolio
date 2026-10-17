import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  isLocale,
  negotiate,
  parsePath,
  pathFor,
} from "@/lib/i18n";

/* Semua alamat harus berawalan /id atau /en.
   - Tanpa awalan (mis. "/"): arahkan ke bahasa dari cookie atau Accept-Language.
   - Dengan awalan tapi slug bahasa lain (/en/tentang): arahkan ke slug yang benar. */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/").filter(Boolean)[0];

  if (isLocale(first)) {
    const { locale, route } = parsePath(pathname);
    if (locale && route) {
      const canonical = pathFor(locale, route);
      if (canonical !== pathname.replace(/\/+$/, "")) {
        const url = req.nextUrl.clone();
        url.pathname = canonical;
        return NextResponse.redirect(url, 308);
      }
    }
    return NextResponse.next();
  }

  const locale = negotiate(
    req.cookies.get(LOCALE_COOKIE)?.value,
    req.headers.get("accept-language")
  );
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Lewati _next, api, dan file statis (yang punya titik: favicon.ico, robots.txt, dll).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
