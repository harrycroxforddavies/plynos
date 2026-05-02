import { LegalLayout } from "@/components/site/LegalLayout";

export const metadata = { title: "Legal notice" };

export default function LegalPage() {
  return (
    <LegalLayout title="Legal notice" updated="May 2026">
      <h2>Operator</h2>
      <p>
        Plynos is operated by Harry Davies. For correspondence, email{" "}
        <a href="mailto:hello@plynos.dev">hello@plynos.dev</a>.
      </p>

      <h2>Scope of services</h2>
      <p>
        Plynos delivers custom-built websites within an agreed delivery
        window after the client provides the required content, assets and
        payment. The standard scope covers: site structure, copy layout,
        responsive design, contact form, basic SEO metadata, and launch with
        clean handover.
      </p>

      <h2>Process and revisions</h2>
      <ul>
        <li>The delivery window starts after required content and payment are received.</li>
        <li>One revision round is included on the review build.</li>
        <li>Hosting and domain are recommended, not managed by default.</li>
        <li>Complex applications and e-commerce are scoped and quoted separately.</li>
      </ul>

      <h2>Ownership</h2>
      <p>
        On handover, the client owns the source code, hosting account and
        domain registration. Plynos retains no operational lock-in over the
        delivered site.
      </p>

      <h2>Liability</h2>
      <p>
        Plynos provides services on a best-effort professional basis. Liability
        is limited to the fees paid for the services in question. Plynos is
        not liable for indirect, consequential, or business-loss damages.
      </p>

      <h2>Governing law</h2>
      <p>
        Any dispute relating to the use of plynos.dev or services provided is
        subject to the laws of the operator's jurisdiction unless otherwise
        agreed in writing.
      </p>
    </LegalLayout>
  );
}
