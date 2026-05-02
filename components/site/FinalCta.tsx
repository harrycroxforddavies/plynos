import { Drift } from "./Drift";
import { LeadForm } from "./LeadForm";

export function FinalCta() {
  return (
    <section id="lead-form" className="section bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <Drift className="text-center">
            <h2 className="text-balance text-3xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-5xl">
              Start your build.
            </h2>
            <p className="mt-4 text-base text-plynos-slate md:text-lg">
              Send a few details. We'll get back to you.
            </p>
          </Drift>

          <div className="mt-10">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
