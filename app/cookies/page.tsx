import { LegalLayout } from "@/components/site/LegalLayout";
import { getLang } from "@/lib/i18n/lang";

export const metadata = { title: "Cookies" };

export default function CookiesPage() {
  const lang = getLang();
  return (
    <LegalLayout
      title={lang === "es" ? "Política de cookies" : "Cookie policy"}
      updated={lang === "es" ? "Mayo 2026" : "May 2026"}
    >
      {lang === "es" ? <Es /> : <En />}
    </LegalLayout>
  );
}

function En() {
  return (
    <>
      <h2>What we use</h2>
      <p>
        plynos.dev uses only the cookies and storage strictly necessary to make the site work.
        The admin area uses authentication cookies issued by Supabase to keep authorised users signed in.
      </p>

      <h2>Analytics</h2>
      <p>
        We do not use third-party advertising or behavioural-tracking cookies. Any future analytics will
        be privacy-preserving and noted here before being enabled.
      </p>

      <h2>Your control</h2>
      <p>
        You can clear cookies or block them in your browser at any time. Doing so on the public site will
        not affect functionality. Doing so in the admin area will sign you out.
      </p>

      <h2>Questions</h2>
      <p>
        Email <a href="mailto:harry@plynos.dev">harry@plynos.dev</a> with any question about how we use
        cookies.
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <h2>Qué utilizamos</h2>
      <p>
        plynos.dev solo utiliza las cookies y el almacenamiento estrictamente necesarios para que la web
        funcione. El área de administración utiliza cookies de autenticación emitidas por Supabase para
        mantener la sesión iniciada de los usuarios autorizados.
      </p>

      <h2>Analítica</h2>
      <p>
        No utilizamos cookies publicitarias ni de seguimiento de comportamiento de terceros. Cualquier
        analítica futura será respetuosa con la privacidad y se anunciará aquí antes de activarla.
      </p>

      <h2>Tu control</h2>
      <p>
        Puedes borrar las cookies o bloquearlas en tu navegador en cualquier momento. Hacerlo en la web
        pública no afectará a la funcionalidad. Hacerlo en el área de administración cerrará tu sesión.
      </p>

      <h2>Dudas</h2>
      <p>
        Escribe a <a href="mailto:harry@plynos.dev">harry@plynos.dev</a> para cualquier pregunta sobre
        cómo usamos las cookies.
      </p>
    </>
  );
}
