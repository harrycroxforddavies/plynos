import { LegalLayout } from "@/components/site/LegalLayout";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy policy" updated="May 2026">
      <p>
        Plynos (“we”, “us”) is operated by Harry Davies. This page describes
        what personal data we collect when you use plynos.dev, why we collect
        it, and how to exercise your rights.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          Information you submit through the lead form: name, email, company,
          current website, niche, project goals, deadline and consent.
        </li>
        <li>
          Information from any direct correspondence with us (email, calls,
          messages).
        </li>
        <li>
          Basic technical information collected by our hosting provider for
          security and reliability purposes.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and deliver any agreed work.</li>
        <li>To run our business: invoicing, project records and follow-up.</li>
        <li>To improve plynos.dev itself based on aggregate usage patterns.</li>
      </ul>

      <h2>Lawful basis</h2>
      <p>
        We rely on consent (for outreach you opt in to), performance of a
        contract (for paid work), and legitimate interests (for running and
        improving our business in a reasonable, proportionate way).
      </p>

      <h2>Data sharing</h2>
      <p>
        We do not sell your personal data. We use trusted infrastructure
        providers (such as Supabase and Vercel) to store and operate the site.
        Any sub-processor used is bound to appropriate confidentiality and
        security commitments.
      </p>

      <h2>Retention</h2>
      <p>
        Lead and project information is retained for as long as it is useful to
        the working relationship and to meet legal/accounting obligations,
        after which it is deleted or fully anonymised.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request access, correction, deletion, or export of your data
        at any time. You can also unsubscribe from outreach using the link in
        any email or by contacting us directly.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy-related question, email{" "}
        <a href="mailto:hello@plynos.dev">hello@plynos.dev</a>.
      </p>
    </LegalLayout>
  );
}
