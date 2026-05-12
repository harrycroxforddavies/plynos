import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export const metadata = {
  title: "A website built for the work you do",
  description:
    "A clean landing page for trades and small operators, from €300. Built in 2 days, fully owned by you.",
};

export default function PresentationPage() {
  const p = t(getLang()).presentation;

  return (
    <>
      <SiteHeader />
      <main className="bg-white transition-colors dark:bg-plynos-navy">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white transition-colors dark:bg-plynos-navy">
          <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden />
          <div
            className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-plynos-soft/70 via-white/0 to-transparent dark:from-plynos-blue/15 dark:via-transparent"
            aria-hidden
          />
          <div className="container-page pt-24 pb-20 md:pt-40 md:pb-28 lg:pt-52 lg:pb-32">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-plynos-navy/10 bg-white px-3 py-1.5 text-xs font-medium text-plynos-slate shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:shadow-none">
                {p.pill}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-semibold !leading-tight text-plynos-navy md:text-6xl lg:text-7xl dark:text-white">
                {p.headline}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-plynos-slate md:text-xl dark:text-white/70">
                {p.subhead}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  {p.ctaPrimary}
                </Link>
                <Link href="#how" className="btn-secondary">
                  {p.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="border-t border-plynos-navy/10 bg-white py-20 transition-colors md:py-28 dark:border-white/10 dark:bg-plynos-navy">
          <div className="container-page">
            <div className="mx-auto max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-plynos-slate dark:text-white/60">
                {p.whyEyebrow}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold !leading-tight text-plynos-navy md:text-5xl dark:text-white">
                {p.whyHeadline}
              </h2>
            </div>

            <div className="mt-14 grid gap-px border border-plynos-navy/10 bg-plynos-navy/10 sm:grid-cols-3 dark:border-white/10 dark:bg-white/10">
              {p.why.map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-8 dark:bg-plynos-navy md:p-10"
                >
                  <h3 className="text-balance text-xl font-semibold text-plynos-navy md:text-2xl dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-balance text-base leading-relaxed text-plynos-slate dark:text-white/70">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section
          id="how"
          className="scroll-mt-24 border-t border-plynos-navy/10 bg-white py-20 transition-colors md:py-28 dark:border-white/10 dark:bg-plynos-navy"
        >
          <div className="container-page">
            <div className="mx-auto max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-plynos-slate dark:text-white/60">
                {p.howEyebrow}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold !leading-tight text-plynos-navy md:text-5xl dark:text-white">
                {p.howHeadline}
              </h2>
            </div>

            <ol className="mt-14 divide-y divide-plynos-navy/10 border-y border-plynos-navy/10 dark:divide-white/10 dark:border-white/10">
              {p.how.map((item) => (
                <li
                  key={item.step}
                  className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-8 md:grid-cols-[6rem_1fr_2fr] md:gap-x-10 md:py-10"
                >
                  <span className="font-mono text-sm text-plynos-slate dark:text-white/50">
                    {item.step}
                  </span>
                  <h3 className="text-balance text-xl font-semibold text-plynos-navy md:text-2xl dark:text-white">
                    {item.title}
                  </h3>
                  <p className="col-start-2 max-w-xl text-balance text-base leading-relaxed text-plynos-slate md:col-start-3 md:row-start-1 dark:text-white/70">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Investment */}
        <section className="bg-white py-20 transition-colors md:py-28 dark:bg-plynos-navy">
          <div className="container-page">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#1c2535] to-[#5B6472] px-6 py-20 text-white md:rounded-[2rem] md:px-12 md:py-28">
                <div
                  className="pointer-events-none absolute inset-0 opacity-50"
                  aria-hidden
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(11,95,255,0.22), transparent 65%)",
                  }}
                />
                <div className="relative mx-auto max-w-3xl text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                    {p.investmentEyebrow}
                  </p>
                  <p className="mt-6 text-balance text-6xl font-semibold !leading-none md:text-8xl">
                    {p.investmentPrice}
                    <span className="ml-3 align-middle text-base font-normal text-white/60 md:text-lg">
                      {p.investmentSuffix}
                    </span>
                  </p>
                  <h2 className="mx-auto mt-10 max-w-2xl text-balance text-2xl font-semibold !leading-tight md:text-4xl">
                    {p.investmentHeadline}
                  </h2>
                  <p className="mx-auto mt-6 max-w-xl text-balance text-base text-white/70 md:text-lg">
                    {p.investmentBody}
                  </p>
                  <p className="mt-6 text-sm text-white/60">{p.investmentTerms}</p>
                  <Link
                    href="/contact"
                    className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-plynos-navy"
                  >
                    {p.investmentCta}
                  </Link>
                </div>
              </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-plynos-navy/10 bg-white py-24 transition-colors md:py-32 dark:border-white/10 dark:bg-plynos-navy">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold !leading-tight text-plynos-navy md:text-5xl dark:text-white">
                {p.closingHeadline}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-plynos-slate md:text-xl dark:text-white/70">
                {p.closingBody}
              </p>
              <Link href="/contact" className="btn-primary mt-10">
                {p.closingCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
