import Link from "next/link";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export function HeroBridge() {
  const ui = t(getLang());
  return (
    <section className="bg-white py-12 transition-colors md:py-16 lg:py-20 dark:bg-plynos-navy">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#1c2535] to-[#5B6472] px-6 py-24 text-center text-white md:rounded-[2rem] md:px-12 md:py-32 lg:py-40">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11,95,255,0.22), transparent 65%)",
              }}
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold !leading-tight tracking-tightish md:text-5xl lg:text-6xl">
                {ui.bridge.headline}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-balance text-base text-white/70 md:text-lg">
                {ui.bridge.subhead}
              </p>
              <Link
                href="/#lead-form"
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-plynos-navy"
              >
                {ui.bridge.cta}
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
