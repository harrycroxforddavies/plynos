import Link from "next/link";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export function SiteHeader() {
  const ui = t(getLang());
  return (
    <header className="sticky top-0 z-40 border-b border-plynos-navy/10 bg-white/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop nav (hidden on mobile) */}
        <nav className="hidden items-center justify-center gap-8 text-sm text-plynos-slate md:flex">
          <Link href="/blogs" className="hover:text-plynos-navy">{ui.nav.blogs}</Link>
          <Link href="/contact" className="hover:text-plynos-navy">{ui.nav.contact}</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center justify-end gap-3">
          {/* Desktop CTA + lang */}
          <Link
            href="/#lead-form"
            className="hidden btn-primary md:inline-flex"
          >
            {ui.nav.requestWebsite}
          </Link>
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile menu trigger (visible only on mobile) */}
          <MobileMenu strings={ui.nav} />
        </div>
      </div>
    </header>
  );
}
