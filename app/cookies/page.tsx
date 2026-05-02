import { LegalLayout } from "@/components/site/LegalLayout";
import { LegalContent, type LegalDoc } from "@/components/site/LegalContent";
import { getLang, type Lang } from "@/lib/i18n/lang";

export const metadata = { title: "Cookies" };

const docs: Record<Lang, LegalDoc> = {
  en_us: {
    title: "Cookie policy",
    updated: "May 2026",
    blocks: [
      { type: "h2", text: "What we use" },
      {
        type: "p",
        text: "plynos.dev uses only the cookies and storage strictly necessary to make the site work. The admin area uses authentication cookies issued by Supabase to keep authorized users signed in.",
      },
      { type: "h2", text: "Analytics" },
      {
        type: "p",
        text: "We do not use third-party advertising or behavioral-tracking cookies. Any future analytics will be privacy-preserving and noted here before being enabled.",
      },
      { type: "h2", text: "Your control" },
      {
        type: "p",
        text: "You can clear cookies or block them in your browser at any time. Doing so on the public site will not affect functionality. Doing so in the admin area will sign you out.",
      },
      { type: "h2", text: "Questions" },
      { type: "p", text: "Email {email} with any question about how we use cookies." },
    ],
  },
  en_gb: {
    title: "Cookie policy",
    updated: "May 2026",
    blocks: [
      { type: "h2", text: "What we use" },
      {
        type: "p",
        text: "plynos.dev uses only the cookies and storage strictly necessary to make the site work. The admin area uses authentication cookies issued by Supabase to keep authorised users signed in.",
      },
      { type: "h2", text: "Analytics" },
      {
        type: "p",
        text: "We do not use third-party advertising or behavioural-tracking cookies. Any future analytics will be privacy-preserving and noted here before being enabled.",
      },
      { type: "h2", text: "Your control" },
      {
        type: "p",
        text: "You can clear cookies or block them in your browser at any time. Doing so on the public site will not affect functionality. Doing so in the admin area will sign you out.",
      },
      { type: "h2", text: "Questions" },
      { type: "p", text: "Email {email} with any question about how we use cookies." },
    ],
  },
  es: {
    title: "Política de cookies",
    updated: "Mayo 2026",
    blocks: [
      { type: "h2", text: "Qué utilizamos" },
      {
        type: "p",
        text: "plynos.dev solo utiliza las cookies y el almacenamiento estrictamente necesarios para que la web funcione. El área de administración utiliza cookies de autenticación emitidas por Supabase para mantener la sesión iniciada de los usuarios autorizados.",
      },
      { type: "h2", text: "Analítica" },
      {
        type: "p",
        text: "No utilizamos cookies publicitarias ni de seguimiento de comportamiento de terceros. Cualquier analítica futura será respetuosa con la privacidad y se anunciará aquí antes de activarla.",
      },
      { type: "h2", text: "Tu control" },
      {
        type: "p",
        text: "Puedes borrar las cookies o bloquearlas en tu navegador en cualquier momento. Hacerlo en la web pública no afectará a la funcionalidad. Hacerlo en el área de administración cerrará tu sesión.",
      },
      { type: "h2", text: "Dudas" },
      { type: "p", text: "Escribe a {email} para cualquier pregunta sobre cómo usamos las cookies." },
    ],
  },
  fr: {
    title: "Politique de cookies",
    updated: "Mai 2026",
    blocks: [
      { type: "h2", text: "Ce que nous utilisons" },
      {
        type: "p",
        text: "plynos.dev n'utilise que les cookies et le stockage strictement nécessaires au fonctionnement du site. L'espace d'administration utilise des cookies d'authentification émis par Supabase pour maintenir la session des utilisateurs autorisés.",
      },
      { type: "h2", text: "Analytique" },
      {
        type: "p",
        text: "Nous n'utilisons aucun cookie publicitaire ni de suivi comportemental tiers. Toute analytique future sera respectueuse de la vie privée et signalée ici avant d'être activée.",
      },
      { type: "h2", text: "Votre contrôle" },
      {
        type: "p",
        text: "Vous pouvez supprimer les cookies ou les bloquer dans votre navigateur à tout moment. Le faire sur le site public n'affectera pas son fonctionnement. Le faire dans l'espace d'administration vous déconnectera.",
      },
      { type: "h2", text: "Questions" },
      { type: "p", text: "Écrivez à {email} pour toute question sur notre usage des cookies." },
    ],
  },
  nl: {
    title: "Cookiebeleid",
    updated: "Mei 2026",
    blocks: [
      { type: "h2", text: "Wat we gebruiken" },
      {
        type: "p",
        text: "plynos.dev gebruikt alleen de cookies en opslag die strikt noodzakelijk zijn voor de werking van de site. De admin-omgeving gebruikt authenticatiecookies van Supabase om geautoriseerde gebruikers ingelogd te houden.",
      },
      { type: "h2", text: "Analyse" },
      {
        type: "p",
        text: "We gebruiken geen advertentie- of gedragstrackingcookies van derden. Eventuele toekomstige analyses zijn privacyvriendelijk en worden hier aangekondigd voordat ze worden ingeschakeld.",
      },
      { type: "h2", text: "Jouw controle" },
      {
        type: "p",
        text: "Je kunt cookies op elk moment in je browser wissen of blokkeren. Op de openbare site heeft dat geen invloed op de functionaliteit. In de admin-omgeving word je daardoor uitgelogd.",
      },
      { type: "h2", text: "Vragen" },
      { type: "p", text: "Mail naar {email} met elke vraag over hoe we cookies gebruiken." },
    ],
  },
  de: {
    title: "Cookie-Richtlinie",
    updated: "Mai 2026",
    blocks: [
      { type: "h2", text: "Was wir verwenden" },
      {
        type: "p",
        text: "plynos.dev verwendet nur die Cookies und den Speicher, die für den Betrieb der Seite unbedingt erforderlich sind. Der Adminbereich verwendet von Supabase ausgestellte Authentifizierungs-Cookies, um autorisierte Nutzer angemeldet zu halten.",
      },
      { type: "h2", text: "Analyse" },
      {
        type: "p",
        text: "Wir verwenden keine Werbe- oder Verhaltens-Tracking-Cookies von Drittanbietern. Künftige Analysen werden datenschutzfreundlich sein und hier angekündigt, bevor sie aktiviert werden.",
      },
      { type: "h2", text: "Deine Kontrolle" },
      {
        type: "p",
        text: "Du kannst Cookies in deinem Browser jederzeit löschen oder blockieren. Auf der öffentlichen Seite hat das keine Auswirkung auf die Funktionalität. Im Adminbereich wirst du dadurch abgemeldet.",
      },
      { type: "h2", text: "Fragen" },
      { type: "p", text: "Schreibe an {email} bei jeder Frage zur Nutzung von Cookies." },
    ],
  },
};

export default function CookiesPage() {
  const lang = getLang();
  const doc = docs[lang];
  return (
    <LegalLayout title={doc.title} updated={doc.updated}>
      <LegalContent blocks={doc.blocks} />
    </LegalLayout>
  );
}
