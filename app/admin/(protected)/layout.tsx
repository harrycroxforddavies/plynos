import { AdminShell } from "@/components/admin/AdminShell";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Plynos admin",
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  // Demo / preview mode: when Supabase isn't configured, render the admin
  // shell with a placeholder identity so the UI can be reviewed.
  if (!supabase) {
    return <AdminShell email="preview@plynos.dev">{children}</AdminShell>;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  // Optional admin role gate
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role && profile.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }

  return <AdminShell email={user.email ?? null}>{children}</AdminShell>;
}
