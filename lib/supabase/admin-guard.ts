import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./server";

export async function requireAdminUser() {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return { configured: false as const, supabase: null, user: null };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Optional: check role on profiles table; default to allowed if profile row missing.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile && profile.role && profile.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }

  return { configured: true as const, supabase, user };
}
