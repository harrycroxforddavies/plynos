"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ClientStatus } from "@/types/database";

const STATUSES: ClientStatus[] = ["active", "paused", "archived"];

function asTrimmed(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

function nullable(s: string) {
  return s.length > 0 ? s : null;
}

export async function createClient(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };

  const name = asTrimmed(formData.get("name"));
  if (!name) return { error: "Name is required" };

  const statusRaw = asTrimmed(formData.get("status"));
  const status = (STATUSES as string[]).includes(statusRaw)
    ? (statusRaw as ClientStatus)
    : "active";

  const { error } = await supabase.from("clients").insert({
    name,
    primary_contact_name: nullable(asTrimmed(formData.get("primary_contact_name"))),
    primary_contact_email: nullable(asTrimmed(formData.get("primary_contact_email"))),
    primary_contact_phone: nullable(asTrimmed(formData.get("primary_contact_phone"))),
    country: nullable(asTrimmed(formData.get("country"))),
    locale: nullable(asTrimmed(formData.get("locale"))),
    website_url: nullable(asTrimmed(formData.get("website_url"))),
    status,
    source_lead_id: nullable(asTrimmed(formData.get("source_lead_id"))),
    source_opportunity_id: nullable(
      asTrimmed(formData.get("source_opportunity_id"))
    ),
    notes: nullable(asTrimmed(formData.get("notes"))),
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/clients");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}

export async function updateClientStatus(id: string, status: ClientStatus) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  if (!(STATUSES as string[]).includes(status)) {
    return { error: "Invalid status" };
  }

  const archived_at = status === "archived" ? new Date().toISOString() : null;

  const { error } = await supabase
    .from("clients")
    .update({ status, archived_at, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/clients");
  return { ok: true };
}

export async function deleteClient(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/clients");
  revalidatePath("/admin/developments");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}
