import { cookies } from "next/headers";

export type Lang = "en" | "es";

export const LANG_COOKIE = "plynos-lang";

/**
 * Reads the current locale from the request cookie. Server components only.
 * Client components should receive the language as a prop or via the
 * LanguageSwitcher's local state.
 */
export function getLang(): Lang {
  try {
    const c = cookies().get(LANG_COOKIE)?.value;
    return c === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}
