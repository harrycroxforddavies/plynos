import Link from "next/link";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export function Hero() {
  const ui = t(getLang());
  return (
    <section className="relative overflow-hidden bg-white transition-colors dark:bg-plynos-navy">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-plynos-soft/70 via-white/0 to-transparent dark:from-plynos-blue/15 dark:via-transparent"
        aria-hidden
      />
      <div className="container-page pt-16 pb-32 md:pt-28 md:pb-44 lg:pt-40 lg:pb-56">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-plynos-navy/10 bg-white px-3 py-1.5 text-xs font-medium text-plynos-slate shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:shadow-none">
            {ui.hero.pill}
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold !leading-tight text-plynos-navy md:text-6xl lg:text-7xl dark:text-white">
            {ui.hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-plynos-slate md:text-xl dark:text-white/70">
            {ui.hero.subhead}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="#lead-form" className="btn-primary">
              {ui.hero.ctaPrimary}
            </Link>
            <Link href="/blogs" className="btn-secondary">
              {ui.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
