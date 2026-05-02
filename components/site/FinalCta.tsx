import { Drift } from "./Drift";
import { ContactForm } from "./ContactForm";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export function FinalCta() {
  const lang = getLang();
  const c = t(lang).contact;

  return (
    <section id="lead-form" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <Drift>
            <h2 className="text-balance text-3xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-5xl">
              {c.headline}
            </h2>
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
      </div>
    </section>
  );
}
