import { LegalLayout } from "@/components/site/LegalLayout";
import { LegalContent, type LegalDoc } from "@/components/site/LegalContent";
import { getLang, type Lang } from "@/lib/i18n/lang";

export const metadata = { title: "Privacy" };

const docs: Record<Lang, LegalDoc> = {
  en_us: {
    title: "Privacy policy",
    updated: "May 2026",
    blocks: [
      {
        type: "p",
        text: 'Plynos ("we", "us") is operated by Harry Davies. This page describes what personal data we collect when you use plynos.dev, why we collect it, and how to exercise your rights.',
      },
      { type: "h2", text: "Information we collect" },
      {
        type: "ul",
        items: [
          "Information you submit through the lead form: name, email, company, current website, niche, project goals, deadline and consent.",
          "Information from any direct correspondence with us (email, calls, messages).",
          "Basic technical information collected by our hosting provider for security and reliability purposes.",
        ],
      },
      { type: "h2", text: "How we use it" },
      {
        type: "ul",
        items: [
          "To respond to your inquiry and deliver any agreed work.",
          "To run our business: invoicing, project records and follow-up.",
          "To improve plynos.dev itself based on aggregate usage patterns.",
        ],
      },
      { type: "h2", text: "Lawful basis" },
      {
        type: "p",
        text: "We rely on consent (for outreach you opt in to), performance of a contract (for paid work), and legitimate interests (for running and improving our business in a reasonable, proportionate way).",
      },
      { type: "h2", text: "Data sharing" },
      {
        type: "p",
        text: "We do not sell your personal data. We use trusted infrastructure providers (such as Supabase and Vercel) to store and operate the site. Any sub-processor used is bound to appropriate confidentiality and security commitments.",
      },
      { type: "h2", text: "Retention" },
      {
        type: "p",
        text: "Lead and project information is retained for as long as it is useful to the working relationship and to meet legal/accounting obligations, after which it is deleted or fully anonymized.",
      },
      { type: "h2", text: "Your rights" },
      {
        type: "p",
        text: "You can request access, correction, deletion, or export of your data at any time. You can also unsubscribe from outreach using the link in any email or by contacting us directly.",
      },
      { type: "h2", text: "Contact" },
      { type: "p", text: "For any privacy-related question, email {email}." },
    ],
  },
  en_gb: {
    title: "Privacy policy",
    updated: "May 2026",
    blocks: [
      {
        type: "p",
        text: 'Plynos ("we", "us") is operated by Harry Davies. This page describes what personal data we collect when you use plynos.dev, why we collect it, and how to exercise your rights.',
      },
      { type: "h2", text: "Information we collect" },
      {
        type: "ul",
        items: [
          "Information you submit through the lead form: name, email, company, current website, niche, project goals, deadline and consent.",
          "Information from any direct correspondence with us (email, calls, messages).",
          "Basic technical information collected by our hosting provider for security and reliability purposes.",
        ],
      },
      { type: "h2", text: "How we use it" },
      {
        type: "ul",
        items: [
          "To respond to your enquiry and deliver any agreed work.",
          "To run our business: invoicing, project records and follow-up.",
          "To improve plynos.dev itself based on aggregate usage patterns.",
        ],
      },
      { type: "h2", text: "Lawful basis" },
      {
        type: "p",
        text: "We rely on consent (for outreach you opt in to), performance of a contract (for paid work), and legitimate interests (for running and improving our business in a reasonable, proportionate way).",
      },
      { type: "h2", text: "Data sharing" },
      {
        type: "p",
        text: "We do not sell your personal data. We use trusted infrastructure providers (such as Supabase and Vercel) to store and operate the site. Any sub-processor used is bound to appropriate confidentiality and security commitments.",
      },
      { type: "h2", text: "Retention" },
      {
        type: "p",
        text: "Lead and project information is retained for as long as it is useful to the working relationship and to meet legal/accounting obligations, after which it is deleted or fully anonymised.",
      },
      { type: "h2", text: "Your rights" },
      {
        type: "p",
        text: "You can request access, correction, deletion, or export of your data at any time. You can also unsubscribe from outreach using the link in any email or by contacting us directly.",
      },
      { type: "h2", text: "Contact" },
      { type: "p", text: "For any privacy-related question, email {email}." },
    ],
  },
  es: {
    title: "Política de privacidad",
    updated: "Mayo 2026",
    blocks: [
      {
        type: "p",
        text: 'Plynos ("nosotros") está operado por Harry Davies. Esta página describe qué datos personales recopilamos cuando usas plynos.dev, por qué los recopilamos y cómo ejercer tus derechos.',
      },
      { type: "h2", text: "Información que recopilamos" },
      {
        type: "ul",
        items: [
          "Información que envías a través del formulario de contacto: nombre, email, empresa, web actual, sector, objetivos del proyecto, plazo y consentimiento.",
          "Información de cualquier correspondencia directa con nosotros (email, llamadas, mensajes).",
          "Información técnica básica recopilada por nuestro proveedor de hosting con fines de seguridad y fiabilidad.",
        ],
      },
      { type: "h2", text: "Cómo la usamos" },
      {
        type: "ul",
        items: [
          "Para responder a tu consulta y entregar el trabajo acordado.",
          "Para gestionar nuestro negocio: facturación, registros de proyectos y seguimiento.",
          "Para mejorar plynos.dev a partir de patrones de uso agregados.",
        ],
      },
      { type: "h2", text: "Base legal" },
      {
        type: "p",
        text: "Nos basamos en el consentimiento (para el contacto al que has optado), la ejecución de un contrato (para el trabajo remunerado) y los intereses legítimos (para gestionar y mejorar nuestro negocio de forma razonable y proporcionada).",
      },
      { type: "h2", text: "Compartición de datos" },
      {
        type: "p",
        text: "No vendemos tus datos personales. Usamos proveedores de infraestructura de confianza (como Supabase y Vercel) para almacenar y operar la web. Cualquier subprocesador que utilicemos está sujeto a los compromisos adecuados de confidencialidad y seguridad.",
      },
      { type: "h2", text: "Conservación" },
      {
        type: "p",
        text: "La información de contactos y proyectos se conserva mientras resulta útil para la relación y para cumplir las obligaciones legales y contables, tras lo cual se elimina o anonimiza por completo.",
      },
      { type: "h2", text: "Tus derechos" },
      {
        type: "p",
        text: "Puedes solicitar acceso, corrección, eliminación o exportación de tus datos en cualquier momento. También puedes darte de baja del contacto usando el enlace de cualquier email o escribiéndonos directamente.",
      },
      { type: "h2", text: "Contacto" },
      { type: "p", text: "Para cualquier consulta sobre privacidad, escribe a {email}." },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    updated: "Mai 2026",
    blocks: [
      {
        type: "p",
        text: 'Plynos ("nous") est exploité par Harry Davies. Cette page décrit les données personnelles que nous collectons lorsque vous utilisez plynos.dev, pourquoi nous les collectons et comment exercer vos droits.',
      },
      { type: "h2", text: "Informations que nous collectons" },
      {
        type: "ul",
        items: [
          "Les informations que vous transmettez via le formulaire de contact : nom, email, entreprise, site actuel, secteur, objectifs du projet, délai et consentement.",
          "Les informations issues de toute correspondance directe avec nous (email, appels, messages).",
          "Les informations techniques de base collectées par notre hébergeur à des fins de sécurité et de fiabilité.",
        ],
      },
      { type: "h2", text: "Comment nous les utilisons" },
      {
        type: "ul",
        items: [
          "Pour répondre à votre demande et livrer le travail convenu.",
          "Pour gérer notre activité : facturation, dossiers de projets et suivi.",
          "Pour améliorer plynos.dev à partir de schémas d'usage agrégés.",
        ],
      },
      { type: "h2", text: "Base légale" },
      {
        type: "p",
        text: "Nous nous appuyons sur le consentement (pour les communications auxquelles vous avez souscrit), l'exécution d'un contrat (pour les prestations payantes) et les intérêts légitimes (pour faire fonctionner et améliorer notre activité de manière raisonnable et proportionnée).",
      },
      { type: "h2", text: "Partage des données" },
      {
        type: "p",
        text: "Nous ne vendons pas vos données personnelles. Nous utilisons des fournisseurs d'infrastructure de confiance (comme Supabase et Vercel) pour stocker et exploiter le site. Tout sous-traitant utilisé est tenu à des engagements appropriés de confidentialité et de sécurité.",
      },
      { type: "h2", text: "Conservation" },
      {
        type: "p",
        text: "Les informations relatives aux contacts et aux projets sont conservées tant qu'elles sont utiles à la relation de travail et au respect des obligations légales et comptables, puis sont supprimées ou totalement anonymisées.",
      },
      { type: "h2", text: "Vos droits" },
      {
        type: "p",
        text: "Vous pouvez demander à tout moment l'accès, la correction, la suppression ou l'export de vos données. Vous pouvez aussi vous désinscrire en utilisant le lien présent dans nos emails ou en nous contactant directement.",
      },
      { type: "h2", text: "Contact" },
      { type: "p", text: "Pour toute question liée à la vie privée, écrivez à {email}." },
    ],
  },
  nl: {
    title: "Privacybeleid",
    updated: "Mei 2026",
    blocks: [
      {
        type: "p",
        text: 'Plynos ("wij", "ons") wordt gevoerd door Harry Davies. Deze pagina beschrijft welke persoonsgegevens we verzamelen wanneer je plynos.dev gebruikt, waarom we ze verzamelen en hoe je je rechten kunt uitoefenen.',
      },
      { type: "h2", text: "Gegevens die we verzamelen" },
      {
        type: "ul",
        items: [
          "Informatie die je via het contactformulier indient: naam, e-mail, bedrijf, huidige website, sector, projectdoelen, deadline en toestemming.",
          "Informatie uit elke directe correspondentie met ons (e-mail, telefoon, berichten).",
          "Basis-technische informatie die door onze hostingprovider wordt verzameld voor beveiliging en betrouwbaarheid.",
        ],
      },
      { type: "h2", text: "Hoe we ze gebruiken" },
      {
        type: "ul",
        items: [
          "Om op je aanvraag te reageren en het overeengekomen werk op te leveren.",
          "Om onze bedrijfsvoering te runnen: facturatie, projectadministratie en opvolging.",
          "Om plynos.dev zelf te verbeteren op basis van geaggregeerde gebruikspatronen.",
        ],
      },
      { type: "h2", text: "Rechtsgrondslag" },
      {
        type: "p",
        text: "We baseren ons op toestemming (voor benadering waarvoor je je hebt aangemeld), uitvoering van een overeenkomst (voor betaald werk) en gerechtvaardigd belang (om onze bedrijfsvoering op een redelijke, proportionele manier te runnen en te verbeteren).",
      },
      { type: "h2", text: "Delen van gegevens" },
      {
        type: "p",
        text: "We verkopen je persoonsgegevens niet. We gebruiken vertrouwde infrastructuurproviders (zoals Supabase en Vercel) om de site te bewaren en te draaien. Elke ingeschakelde subverwerker is gebonden aan passende vertrouwelijkheids- en beveiligingsverplichtingen.",
      },
      { type: "h2", text: "Bewaartermijn" },
      {
        type: "p",
        text: "Lead- en projectinformatie wordt bewaard zolang dat nuttig is voor de samenwerking en om wettelijke en boekhoudkundige verplichtingen na te komen, daarna wordt het verwijderd of volledig geanonimiseerd.",
      },
      { type: "h2", text: "Jouw rechten" },
      {
        type: "p",
        text: "Je kunt op elk moment inzage, correctie, verwijdering of export van je gegevens aanvragen. Je kunt je ook uitschrijven via de link in elke e-mail of door direct contact met ons op te nemen.",
      },
      { type: "h2", text: "Contact" },
      { type: "p", text: "Voor elke privacygerelateerde vraag, mail naar {email}." },
    ],
  },
  de: {
    title: "Datenschutzerklärung",
    updated: "Mai 2026",
    blocks: [
      {
        type: "p",
        text: 'Plynos ("wir", "uns") wird von Harry Davies betrieben. Diese Seite beschreibt, welche personenbezogenen Daten wir erfassen, wenn du plynos.dev nutzt, warum wir sie erfassen und wie du deine Rechte ausüben kannst.',
      },
      { type: "h2", text: "Daten, die wir erfassen" },
      {
        type: "ul",
        items: [
          "Informationen, die du über das Kontaktformular übermittelst: Name, E-Mail, Unternehmen, aktuelle Website, Branche, Projektziele, Frist und Einwilligung.",
          "Informationen aus jeder direkten Korrespondenz mit uns (E-Mail, Anrufe, Nachrichten).",
          "Grundlegende technische Informationen, die unser Hosting-Anbieter aus Sicherheits- und Zuverlässigkeitsgründen erfasst.",
        ],
      },
      { type: "h2", text: "Wie wir sie verwenden" },
      {
        type: "ul",
        items: [
          "Um auf deine Anfrage zu antworten und vereinbarte Arbeiten zu liefern.",
          "Für unseren Geschäftsbetrieb: Rechnungsstellung, Projektakten und Nachfassen.",
          "Zur Verbesserung von plynos.dev auf Grundlage aggregierter Nutzungsmuster.",
        ],
      },
      { type: "h2", text: "Rechtsgrundlage" },
      {
        type: "p",
        text: "Wir stützen uns auf Einwilligung (für Outreach, dem du zugestimmt hast), Vertragserfüllung (für bezahlte Arbeit) und berechtigte Interessen (für den angemessenen, verhältnismäßigen Betrieb und die Verbesserung unseres Geschäfts).",
      },
      { type: "h2", text: "Datenweitergabe" },
      {
        type: "p",
        text: "Wir verkaufen deine personenbezogenen Daten nicht. Wir verwenden vertrauenswürdige Infrastrukturanbieter (etwa Supabase und Vercel), um die Seite zu speichern und zu betreiben. Jeder eingesetzte Auftragsverarbeiter ist an angemessene Vertraulichkeits- und Sicherheitsverpflichtungen gebunden.",
      },
      { type: "h2", text: "Aufbewahrung" },
      {
        type: "p",
        text: "Lead- und Projektdaten werden so lange aufbewahrt, wie sie für die Geschäftsbeziehung nützlich sind und gesetzliche bzw. buchhalterische Pflichten erfordert werden, danach werden sie gelöscht oder vollständig anonymisiert.",
      },
      { type: "h2", text: "Deine Rechte" },
      {
        type: "p",
        text: "Du kannst jederzeit Auskunft, Berichtigung, Löschung oder Export deiner Daten verlangen. Du kannst dich auch über den Link in jeder E-Mail oder durch direkte Kontaktaufnahme abmelden.",
      },
      { type: "h2", text: "Kontakt" },
      { type: "p", text: "Bei datenschutzbezogenen Fragen schreibe an {email}." },
    ],
  },
};

export default function PrivacyPage() {
  const lang = getLang();
  const doc = docs[lang];
  return (
    <LegalLayout title={doc.title} updated={doc.updated}>
      <LegalContent blocks={doc.blocks} />
    </LegalLayout>
  );
}
