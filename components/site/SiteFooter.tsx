import Link from "next/link";
import { Logo } from "./Logo";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export function SiteFooter() {
  const ui = t(getLang());
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-plynos-navy/10 bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between gap-8 px-6 py-12 md:flex-row md:items-center md:px-8">
        <Logo />
        <nav className="flex flex-wrap items-center gap-6 text-sm text-plynos-slate">
          <Link href="/blogs" className="hover:text-plynos-navy">{ui.footer.blogs}</Link>
          <Link href="/privacy" className="hover:text-plynos-navy">{ui.footer.privacy}</Link>
          <Link href="/legal" className="hover:text-plynos-navy">{ui.footer.legal}</Link>
          <Link href="/cookies" className="hover:text-plynos-navy">{ui.footer.cookies}</Link>
        </nav>
        <p className="text-xs text-plynos-slate">© {year} Plynos.</p>
      </div>
    </footer>
  );
}
