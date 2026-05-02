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
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <Logo className="[&_img]:h-14 [&_img]:w-14" />

          <div className="grid grid-cols-2 gap-10 md:flex-1 md:max-w-md">
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
        </div>

        <p className="mt-12 text-xs text-plynos-slate dark:text-white/50">
          © {year} Plynos.
        </p>
      </div>
    </footer>
  );
}
