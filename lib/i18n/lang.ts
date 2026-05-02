import { cookies } from "next/headers";

/**
 * Supported locales. Internal cookie/code values use lowercase ASCII
 * with underscores so they can be used as TypeScript object keys
 * without bracket notation. Display names are in `LANG_LABELS`.
 */
export type Lang = "en_us" | "en_gb" | "es" | "fr" | "nl" | "de";

export const LANGS: Lang[] = ["en_us", "en_gb", "es", "fr", "nl", "de"];

export const LANG_LABELS: Record<Lang, string> = {
  en_us: "English (United States)",
  en_gb: "English (United Kingdom)",
  es: "Español",
  fr: "Français",
  nl: "Nederlands",
  de: "Deutsch",
};

export const DEFAULT_LANG: Lang = "en_gb";
export const LANG_COOKIE = "plynos-lang";

/**
 * Reads the current locale from the request cookie. Server components only.
 * Falls back to en-GB (the original British English content) when no cookie
 * is set or the value is unrecognised.
 */
export function getLang(): Lang {
  try {
    const value = cookies().get(LANG_COOKIE)?.value;
    if (value && (LANGS as string[]).includes(value)) return value as Lang;
  } catch {
    // ignore — getLang() is sometimes called outside a request scope
  }
  return DEFAULT_LANG;
}
