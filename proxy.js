import { NextResponse } from "next/server";

const LOCALES = ["en", "tr"];
const DEFAULT_LOCALE = "en";

/** Pick the visitor's preferred supported language from Accept-Language. */
function preferredLocale(header) {
  const ranked = (header || "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((x) => x.lang)
    .sort((a, b) => b.q - a.q);
  return ranked.find((x) => LOCALES.includes(x.lang))?.lang ?? DEFAULT_LOCALE;
}

/** "/" → "/en" or "/tr". Locale pages themselves stay fully static. */
export function proxy(request) {
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request.headers.get("accept-language"))}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/"],
};
