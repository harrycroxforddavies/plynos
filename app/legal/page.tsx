import { LegalLayout } from "@/components/site/LegalLayout";
import { getLang } from "@/lib/i18n/lang";

export const metadata = { title: "Legal notice" };

export default function LegalPage() {
  const lang = getLang();
  return (
    <LegalLayout
      title={lang === "es" ? "Aviso legal" : "Legal notice"}
      updated={lang === "es" ? "Mayo 2026" : "May 2026"}
    >
      {lang === "es" ? <Es /> : <En />}
    </LegalLayout>
  );
}

function En() {
  return (
    <>
      <h2>Operator</h2>
      <p>
        Plynos is operated by Harry Davies. For correspondence, email{" "}
        <a href="mailto:harry@plynos.dev">harry@plynos.dev</a>.
      </p>

      <h2>Scope of services</h2>
      <p>
        Plynos delivers custom-built websites within an agreed delivery window after the client provides
        the required content, assets and payment. The standard scope covers: site structure, copy layout,
        responsive design, contact form, basic SEO metadata, and launch with clean handover.
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
        On handover, the client owns the source code, hosting account and domain registration.
        Plynos retains no operational lock-in over the delivered site.
      </p>

      <h2>Liability</h2>
      <p>
        Plynos provides services on a best-effort professional basis. Liability is limited to the fees
        paid for the services in question. Plynos is not liable for indirect, consequential, or
        business-loss damages.
      </p>

      <h2>Governing law</h2>
      <p>
        Any dispute relating to the use of plynos.dev or services provided is subject to the laws of the
        operator's jurisdiction unless otherwise agreed in writing.
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <h2>Operador</h2>
      <p>
        Plynos está operado por Harry Davies. Para cualquier comunicación, escribe a{" "}
        <a href="mailto:harry@plynos.dev">harry@plynos.dev</a>.
      </p>

      <h2>Alcance del servicio</h2>
      <p>
        Plynos entrega webs a medida dentro de una ventana de entrega acordada, una vez que el cliente
        proporciona el contenido, los activos y el pago necesarios. El alcance estándar incluye:
        estructura del sitio, maquetación de textos, diseño responsive, formulario de contacto,
        metadatos básicos de SEO y lanzamiento con entrega limpia.
      </p>

      <h2>Proceso y revisiones</h2>
      <ul>
        <li>La ventana de entrega comienza tras recibir el contenido necesario y el pago.</li>
        <li>Se incluye una ronda de revisión en la versión de revisión.</li>
        <li>Hosting y dominio se recomiendan, pero no se gestionan por defecto.</li>
        <li>Las aplicaciones complejas y el e-commerce se cotizan por separado.</li>
      </ul>

      <h2>Propiedad</h2>
      <p>
        En la entrega, el cliente es propietario del código fuente, la cuenta de hosting y el registro
        del dominio. Plynos no mantiene ningún tipo de bloqueo operativo sobre la web entregada.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        Plynos presta sus servicios bajo el principio de mejor esfuerzo profesional. La responsabilidad
        se limita a los honorarios pagados por los servicios en cuestión. Plynos no se hace responsable
        de daños indirectos, consecuentes o por pérdida de negocio.
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Cualquier disputa relacionada con el uso de plynos.dev o con los servicios prestados queda
        sujeta a las leyes de la jurisdicción del operador, salvo acuerdo escrito en contrario.
      </p>
    </>
  );
}
