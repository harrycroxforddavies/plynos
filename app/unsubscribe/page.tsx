import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { UnsubscribeClient } from "@/components/site/UnsubscribeClient";

export const metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="container-page py-20 md:py-28">
          <div className="mx-auto max-w-xl">
            <span className="eyebrow">Email preferences</span>
            <h1 className="mt-5 text-balance text-3xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-4xl">
              Unsubscribe from Plynos outreach.
            </h1>
            <p className="mt-4 text-sm text-plynos-slate">
              Add your email below to suppress all future outreach. We honour
              suppression immediately.
            </p>
            <div className="mt-8 card">
              <UnsubscribeClient defaultEmail={searchParams.email ?? ""} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
