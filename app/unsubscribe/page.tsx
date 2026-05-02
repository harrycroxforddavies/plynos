import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { UnsubscribeClient } from "@/components/site/UnsubscribeClient";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export const metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const lang = getLang();
  const ui = t(lang).unsubscribe;
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="container-page py-20 md:py-28">
          <div className="mx-auto max-w-xl">
            <span className="eyebrow">{ui.eyebrow}</span>
            <h1 className="mt-5 text-balance text-3xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-4xl">
              {ui.headline}
            </h1>
            <p className="mt-4 text-sm text-plynos-slate">{ui.body}</p>
            <div className="mt-8 card">
              <UnsubscribeClient
                defaultEmail={searchParams.email ?? ""}
                strings={ui}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
