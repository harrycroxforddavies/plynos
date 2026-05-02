import { LegalLayout } from "@/components/site/LegalLayout";
import { getLang } from "@/lib/i18n/lang";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  const lang = getLang();
  return (
    <LegalLayout
      title={lang === "es" ? "Política de privacidad" : "Privacy policy"}
      updated={lang === "es" ? "Mayo 2026" : "May 2026"}
    >
      {lang === "es" ? <Es /> : <En />}
    </LegalLayout>
  );
}

function En() {
  return (
    <>
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
        <li>Information from any direct correspondence with us (email, calls, messages).</li>
        <li>Basic technical information collected by our hosting provider for security and reliability purposes.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and deliver any agreed work.</li>
        <li>To run our business: invoicing, project records and follow-up.</li>
        <li>To improve plynos.dev itself based on aggregate usage patterns.</li>
      </ul>

      <h2>Lawful basis</h2>
      <p>
        We rely on consent (for outreach you opt in to), performance of a contract (for paid work),
        and legitimate interests (for running and improving our business in a reasonable, proportionate way).
      </p>

      <h2>Data sharing</h2>
      <p>
        We do not sell your personal data. We use trusted infrastructure providers (such as Supabase and
        Vercel) to store and operate the site. Any sub-processor used is bound to appropriate confidentiality
        and security commitments.
      </p>

      <h2>Retention</h2>
      <p>
        Lead and project information is retained for as long as it is useful to the working relationship and
        to meet legal/accounting obligations, after which it is deleted or fully anonymised.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request access, correction, deletion, or export of your data at any time. You can also
        unsubscribe from outreach using the link in any email or by contacting us directly.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy-related question, email{" "}
        <a href="mailto:harry@plynos.dev">harry@plynos.dev</a>.
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Plynos (“nosotros”) está operado por Harry Davies. Esta página describe qué datos personales
        recopilamos cuando usas plynos.dev, por qué los recopilamos y cómo ejercer tus derechos.
      </p>

      <h2>Información que recopilamos</h2>
      <ul>
        <li>
          Información que envías a través del formulario de contacto: nombre, email, empresa,
          web actual, sector, objetivos del proyecto, plazo y consentimiento.
        </li>
        <li>Información de cualquier correspondencia directa con nosotros (email, llamadas, mensajes).</li>
        <li>Información técnica básica recopilada por nuestro proveedor de hosting con fines de seguridad y fiabilidad.</li>
      </ul>

      <h2>Cómo la usamos</h2>
      <ul>
        <li>Para responder a tu consulta y entregar el trabajo acordado.</li>
        <li>Para gestionar nuestro negocio: facturación, registros de proyectos y seguimiento.</li>
        <li>Para mejorar plynos.dev a partir de patrones de uso agregados.</li>
      </ul>

      <h2>Base legal</h2>
      <p>
        Nos basamos en el consentimiento (para el contacto al que has optado), la ejecución de un contrato
        (para el trabajo remunerado) y los intereses legítimos (para gestionar y mejorar nuestro negocio
        de forma razonable y proporcionada).
      </p>

      <h2>Compartición de datos</h2>
      <p>
        No vendemos tus datos personales. Usamos proveedores de infraestructura de confianza (como Supabase
        y Vercel) para almacenar y operar la web. Cualquier subprocesador que utilicemos está sujeto a los
        compromisos adecuados de confidencialidad y seguridad.
      </p>

      <h2>Conservación</h2>
      <p>
        La información de contactos y proyectos se conserva mientras resulta útil para la relación y para
        cumplir las obligaciones legales y contables, tras lo cual se elimina o anonimiza por completo.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes solicitar acceso, corrección, eliminación o exportación de tus datos en cualquier momento.
        También puedes darte de baja del contacto usando el enlace de cualquier email o escribiéndonos
        directamente.
      </p>

      <h2>Contacto</h2>
      <p>
        Para cualquier consulta sobre privacidad, escribe a{" "}
        <a href="mailto:harry@plynos.dev">harry@plynos.dev</a>.
      </p>
    </>
  );
}
