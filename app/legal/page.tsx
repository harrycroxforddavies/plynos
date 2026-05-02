import { LegalLayout } from "@/components/site/LegalLayout";
import { LegalContent, type LegalDoc } from "@/components/site/LegalContent";
import { getLang, type Lang } from "@/lib/i18n/lang";

export const metadata = { title: "Legal notice" };

const docs: Record<Lang, LegalDoc> = {
  en_us: {
    title: "Legal notice",
    updated: "May 2026",
    blocks: [
      { type: "h2", text: "Operator" },
      { type: "p", text: "Plynos is operated by Harry Davies. For correspondence, email {email}." },
      { type: "h2", text: "Scope of services" },
      {
        type: "p",
        text: "Plynos delivers custom-built websites within an agreed delivery window after the client provides the required content, assets and payment. The standard scope covers: site structure, copy layout, responsive design, contact form, basic SEO metadata, and launch with clean handover.",
      },
      { type: "h2", text: "Process and revisions" },
      {
        type: "ul",
        items: [
          "The delivery window starts after required content and payment are received.",
          "One revision round is included on the review build.",
          "Hosting and domain are recommended, not managed by default.",
          "Complex applications and e-commerce are scoped and quoted separately.",
        ],
      },
      { type: "h2", text: "Ownership" },
      {
        type: "p",
        text: "On handover, the client owns the source code, hosting account and domain registration. Plynos retains no operational lock-in over the delivered site.",
      },
      { type: "h2", text: "Liability" },
      {
        type: "p",
        text: "Plynos provides services on a best-effort professional basis. Liability is limited to the fees paid for the services in question. Plynos is not liable for indirect, consequential, or business-loss damages.",
      },
      { type: "h2", text: "Governing law" },
      {
        type: "p",
        text: "Any dispute relating to the use of plynos.dev or services provided is subject to the laws of the operator's jurisdiction unless otherwise agreed in writing.",
      },
    ],
  },
  en_gb: {
    title: "Legal notice",
    updated: "May 2026",
    blocks: [
      { type: "h2", text: "Operator" },
      { type: "p", text: "Plynos is operated by Harry Davies. For correspondence, email {email}." },
      { type: "h2", text: "Scope of services" },
      {
        type: "p",
        text: "Plynos delivers custom-built websites within an agreed delivery window after the client provides the required content, assets and payment. The standard scope covers: site structure, copy layout, responsive design, contact form, basic SEO metadata, and launch with clean handover.",
      },
      { type: "h2", text: "Process and revisions" },
      {
        type: "ul",
        items: [
          "The delivery window starts after required content and payment are received.",
          "One revision round is included on the review build.",
          "Hosting and domain are recommended, not managed by default.",
          "Complex applications and e-commerce are scoped and quoted separately.",
        ],
      },
      { type: "h2", text: "Ownership" },
      {
        type: "p",
        text: "On handover, the client owns the source code, hosting account and domain registration. Plynos retains no operational lock-in over the delivered site.",
      },
      { type: "h2", text: "Liability" },
      {
        type: "p",
        text: "Plynos provides services on a best-effort professional basis. Liability is limited to the fees paid for the services in question. Plynos is not liable for indirect, consequential, or business-loss damages.",
      },
      { type: "h2", text: "Governing law" },
      {
        type: "p",
        text: "Any dispute relating to the use of plynos.dev or services provided is subject to the laws of the operator's jurisdiction unless otherwise agreed in writing.",
      },
    ],
  },
  es: {
    title: "Aviso legal",
    updated: "Mayo 2026",
    blocks: [
      { type: "h2", text: "Operador" },
      { type: "p", text: "Plynos está operado por Harry Davies. Para cualquier comunicación, escribe a {email}." },
      { type: "h2", text: "Alcance del servicio" },
      {
        type: "p",
        text: "Plynos entrega webs a medida dentro de una ventana de entrega acordada, una vez que el cliente proporciona el contenido, los activos y el pago necesarios. El alcance estándar incluye: estructura del sitio, maquetación de textos, diseño responsive, formulario de contacto, metadatos básicos de SEO y lanzamiento con entrega limpia.",
      },
      { type: "h2", text: "Proceso y revisiones" },
      {
        type: "ul",
        items: [
          "La ventana de entrega comienza tras recibir el contenido necesario y el pago.",
          "Se incluye una ronda de revisión en la versión de revisión.",
          "Hosting y dominio se recomiendan, pero no se gestionan por defecto.",
          "Las aplicaciones complejas y el e-commerce se cotizan por separado.",
        ],
      },
      { type: "h2", text: "Propiedad" },
      {
        type: "p",
        text: "En la entrega, el cliente es propietario del código fuente, la cuenta de hosting y el registro del dominio. Plynos no mantiene ningún tipo de bloqueo operativo sobre la web entregada.",
      },
      { type: "h2", text: "Responsabilidad" },
      {
        type: "p",
        text: "Plynos presta sus servicios bajo el principio de mejor esfuerzo profesional. La responsabilidad se limita a los honorarios pagados por los servicios en cuestión. Plynos no se hace responsable de daños indirectos, consecuentes o por pérdida de negocio.",
      },
      { type: "h2", text: "Ley aplicable" },
      {
        type: "p",
        text: "Cualquier disputa relacionada con el uso de plynos.dev o con los servicios prestados queda sujeta a las leyes de la jurisdicción del operador, salvo acuerdo escrito en contrario.",
      },
    ],
  },
  fr: {
    title: "Mentions légales",
    updated: "Mai 2026",
    blocks: [
      { type: "h2", text: "Exploitant" },
      { type: "p", text: "Plynos est exploité par Harry Davies. Pour toute correspondance, écrivez à {email}." },
      { type: "h2", text: "Périmètre des services" },
      {
        type: "p",
        text: "Plynos livre des sites web sur-mesure dans un délai convenu, après que le client a fourni le contenu, les éléments et le paiement requis. Le périmètre standard couvre : structure du site, mise en page des textes, design responsive, formulaire de contact, métadonnées SEO de base et lancement avec passation propre.",
      },
      { type: "h2", text: "Processus et révisions" },
      {
        type: "ul",
        items: [
          "Le délai de livraison commence après réception du contenu et du paiement requis.",
          "Une série de révisions est incluse sur la version de relecture.",
          "L'hébergement et le domaine sont recommandés, non gérés par défaut.",
          "Les applications complexes et le e-commerce sont cadrés et chiffrés séparément.",
        ],
      },
      { type: "h2", text: "Propriété" },
      {
        type: "p",
        text: "À la livraison, le client devient propriétaire du code source, du compte d'hébergement et de l'enregistrement du domaine. Plynos ne conserve aucun verrouillage opérationnel sur le site livré.",
      },
      { type: "h2", text: "Responsabilité" },
      {
        type: "p",
        text: "Plynos fournit ses prestations sur la base d'une obligation de moyens professionnelle. La responsabilité est limitée aux honoraires payés pour les services concernés. Plynos n'est pas responsable des dommages indirects, immatériels ou liés à une perte d'exploitation.",
      },
      { type: "h2", text: "Droit applicable" },
      {
        type: "p",
        text: "Tout litige lié à l'utilisation de plynos.dev ou aux services fournis est soumis au droit de la juridiction de l'exploitant, sauf accord écrit contraire.",
      },
    ],
  },
  nl: {
    title: "Juridische kennisgeving",
    updated: "Mei 2026",
    blocks: [
      { type: "h2", text: "Exploitant" },
      { type: "p", text: "Plynos wordt gevoerd door Harry Davies. Voor correspondentie, mail naar {email}." },
      { type: "h2", text: "Reikwijdte van de dienstverlening" },
      {
        type: "p",
        text: "Plynos levert maatwerk-websites binnen een afgesproken opleveringsperiode nadat de klant de benodigde content, assets en betaling heeft aangeleverd. De standaardreikwijdte omvat: sitestructuur, tekstindeling, responsive design, contactformulier, basis-SEO-metadata en lancering met schone overdracht.",
      },
      { type: "h2", text: "Proces en revisies" },
      {
        type: "ul",
        items: [
          "De opleveringsperiode start na ontvangst van de benodigde content en betaling.",
          "Eén revisieronde is inbegrepen op de review-build.",
          "Hosting en domein worden aanbevolen, niet standaard beheerd.",
          "Complexe applicaties en e-commerce worden apart afgebakend en geoffreerd.",
        ],
      },
      { type: "h2", text: "Eigendom" },
      {
        type: "p",
        text: "Bij oplevering wordt de klant eigenaar van de broncode, het hostingaccount en de domeinregistratie. Plynos behoudt geen operationele lock-in over de geleverde site.",
      },
      { type: "h2", text: "Aansprakelijkheid" },
      {
        type: "p",
        text: "Plynos levert diensten op basis van een professionele inspanningsverplichting. De aansprakelijkheid is beperkt tot het voor de betreffende dienst betaalde bedrag. Plynos is niet aansprakelijk voor indirecte, gevolg- of bedrijfsschade.",
      },
      { type: "h2", text: "Toepasselijk recht" },
      {
        type: "p",
        text: "Elk geschil met betrekking tot het gebruik van plynos.dev of de geleverde diensten is onderworpen aan het recht van de jurisdictie van de exploitant, tenzij schriftelijk anders overeengekomen.",
      },
    ],
  },
  de: {
    title: "Impressum",
    updated: "Mai 2026",
    blocks: [
      { type: "h2", text: "Betreiber" },
      { type: "p", text: "Plynos wird von Harry Davies betrieben. Für Korrespondenz schreibe an {email}." },
      { type: "h2", text: "Leistungsumfang" },
      {
        type: "p",
        text: "Plynos liefert maßgeschneiderte Websites innerhalb eines vereinbarten Lieferzeitraums, nachdem der Kunde die erforderlichen Inhalte, Assets und Zahlung bereitgestellt hat. Der Standardumfang umfasst: Seitenstruktur, Textlayout, responsives Design, Kontaktformular, grundlegende SEO-Metadaten und Launch mit sauberer Übergabe.",
      },
      { type: "h2", text: "Prozess und Revisionen" },
      {
        type: "ul",
        items: [
          "Der Lieferzeitraum beginnt nach Eingang der benötigten Inhalte und Zahlung.",
          "Eine Revisionsrunde ist beim Review-Build enthalten.",
          "Hosting und Domain werden empfohlen, standardmäßig aber nicht verwaltet.",
          "Komplexe Anwendungen und E-Commerce werden separat abgegrenzt und angeboten.",
        ],
      },
      { type: "h2", text: "Eigentum" },
      {
        type: "p",
        text: "Bei der Übergabe gehören dem Kunden der Quellcode, das Hosting-Konto und die Domainregistrierung. Plynos behält keinerlei betrieblichen Lock-in über die gelieferte Seite.",
      },
      { type: "h2", text: "Haftung" },
      {
        type: "p",
        text: "Plynos erbringt Leistungen auf Basis einer professionellen Bemühungspflicht. Die Haftung ist auf die für die betreffenden Leistungen gezahlten Honorare begrenzt. Plynos haftet nicht für indirekte, Folgeschäden oder Geschäftsausfälle.",
      },
      { type: "h2", text: "Anwendbares Recht" },
      {
        type: "p",
        text: "Jeder Streitfall im Zusammenhang mit der Nutzung von plynos.dev oder den erbrachten Leistungen unterliegt dem Recht der Gerichtsbarkeit des Betreibers, sofern nicht schriftlich anders vereinbart.",
      },
    ],
  },
};

export default function LegalPage() {
  const lang = getLang();
  const doc = docs[lang];
  return (
    <LegalLayout title={doc.title} updated={doc.updated}>
      <LegalContent blocks={doc.blocks} />
    </LegalLayout>
  );
}
