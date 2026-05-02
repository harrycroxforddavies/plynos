import { LegalLayout } from "@/components/site/LegalLayout";

export const metadata = { title: "Cookies" };

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie policy" updated="May 2026">
      <h2>What we use</h2>
      <p>
        plynos.dev uses only the cookies and storage strictly necessary to make
        the site work. The admin area uses authentication cookies issued by
        Supabase to keep authorised users signed in.
      </p>

      <h2>Analytics</h2>
      <p>
        We do not use third-party advertising or behavioural-tracking cookies.
        Any future analytics will be privacy-preserving and noted here before
        being enabled.
      </p>

      <h2>Your control</h2>
      <p>
        You can clear cookies or block them in your browser at any time. Doing
        so on the public site will not affect functionality. Doing so in the
        admin area will sign you out.
      </p>

      <h2>Questions</h2>
      <p>
        Email <a href="mailto:hello@plynos.dev">hello@plynos.dev</a> with any
        question about how we use cookies.
      </p>
    </LegalLayout>
  );
}
