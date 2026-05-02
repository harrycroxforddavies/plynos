import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminUser } from "@/lib/supabase/admin-guard";

export const metadata = {
  title: "Plynos admin",
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const guard = await requireAdminUser();

  if (!guard.ok) {
    // Supabase env is missing. Refuse to render the admin shell.
    return (
      <main className="min-h-screen bg-plynos-soft/30 px-6 py-20">
        <div className="card mx-auto max-w-xl">
          <h1 className="text-xl font-semibold text-plynos-navy">
            Supabase is not configured
          </h1>
          <p className="mt-2 text-sm text-plynos-slate">
            Set <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in
            your environment to enable the admin area, then run the SQL
            migrations in <code className="font-mono">supabase/migrations/</code>.
          </p>
        </div>
      </main>
    );
  }

  return (
    <AdminShell email={guard.user.email ?? null}>{children}</AdminShell>
  );
}
