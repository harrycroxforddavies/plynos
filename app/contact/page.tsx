import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactForm } from "@/components/site/ContactForm";
import { Drift } from "@/components/site/Drift";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export const metadata = {
  title: "Contact",
  description:
    "Tell us about your project and we'll get back to you within one business day.",
};

export default function ContactPage() {
  const lang = getLang();
  const c = t(lang).contact;

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="container-page py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-2xl">
            <Drift>
              <h1 className="text-balance text-3xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-5xl">
                {c.headline}
              </h1>
              <p className="mt-6 max-w-xl text-balance text-lg text-plynos-slate md:text-xl">
                {c.subhead}
              </p>
            </Drift>

            <div className="mt-12 md:mt-16">
              <ContactForm strings={c} />
            </div>

            <p className="mt-8 text-sm text-plynos-slate">
              {c.plainEmailBefore}{" "}
              <a
                href="mailto:harry@plynos.dev"
                className="font-medium text-plynos-blue hover:underline"
              >
                harry@plynos.dev
              </a>{" "}
              {c.plainEmailAfter}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
