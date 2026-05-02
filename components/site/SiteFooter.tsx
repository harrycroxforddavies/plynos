import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export function SiteFooter() {
  const ui = t(getLang()).footer;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-plynos-navy/10 bg-white transition-colors dark:border-white/10 dark:bg-plynos-navy">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 md:px-8">
        <Logo />

        <div className="mt-8 grid grid-cols-2 gap-10">
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <Link
                href="/blogs"
                className="text-plynos-navy hover:text-plynos-blue dark:text-white dark:hover:text-plynos-soft"
              >
                {ui.blogs}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-plynos-navy hover:text-plynos-blue dark:text-white dark:hover:text-plynos-soft"
              >
                {ui.privacy}
              </Link>
            </li>
            <li>
              <Link
                href="/legal"
                className="text-plynos-navy hover:text-plynos-blue dark:text-white dark:hover:text-plynos-soft"
              >
                {ui.legal}
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="text-plynos-navy hover:text-plynos-blue dark:text-white dark:hover:text-plynos-soft"
              >
                {ui.cookies}
              </Link>
            </li>
          </ul>

          <div>
            <ThemeSwitcher lightLabel={ui.light} darkLabel={ui.dark} />
          </div>
        </div>

        <p className="mt-12 text-xs text-plynos-slate dark:text-white/50">
          © {year} Plynos.
        </p>
      </div>
    </footer>
  );
}
