import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./server";

export type AdminGuardResult =
  | { ok: true; supabase: SupabaseClient; user: User }
  | { ok: false; reason: "not_configured" };

/**
 * Server-side admin gate. Returns a { ok: true } shape with the Supabase
 * client and authenticated admin user, OR a structured failure when env is
 * missing. On unauthenticated or non-admin users it issues a redirect, so
 * callers don't need to handle those cases.
 */
export async function requireAdminUser(): Promise<AdminGuardResult> {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, reason: "not_configured" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Defence in depth — the middleware also gates on presence of a session,
  // and RLS on each table also requires is_admin(). This is the third layer:
  // if a session exists but the profile is missing or non-admin, refuse.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }

  return { ok: true, supabase, user };
}
