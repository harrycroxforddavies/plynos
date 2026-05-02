"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { LeadSource, LeadStatus } from "@/types/database";

const STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "replied",
  "call_booked",
  "proposal_sent",
  "won",
  "lost",
  "unsubscribed",
];
const SOURCES: LeadSource[] = [
  "website",
  "resend",
  "fiverr",
  "referral",
  "cold_call",
  "whatsapp",
  "other",
];

function asTrimmed(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value.trim();
}

export async function createLead(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };

  const name = asTrimmed(formData.get("name"));
  const email = asTrimmed(formData.get("email")).toLowerCase();
  const phone = asTrimmed(formData.get("phone")) || null;
  const company = asTrimmed(formData.get("company")) || null;
  const niche = asTrimmed(formData.get("niche")) || null;
  const goal = asTrimmed(formData.get("goal")) || null;
  const deadline = asTrimmed(formData.get("deadline")) || null;
  const sourceRaw = asTrimmed(formData.get("source"));
  const statusRaw = asTrimmed(formData.get("status"));
  const source = (SOURCES as string[]).includes(sourceRaw)
    ? (sourceRaw as LeadSource)
    : "other";
  const status = (STATUSES as string[]).includes(statusRaw)
    ? (statusRaw as LeadStatus)
    : "new";

  if (!name || !email) return { error: "Name and email are required" };

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    phone,
    company,
    website_url: asTrimmed(formData.get("website_url")) || null,
    niche,
    goal,
    deadline,
    source,
    status,
    notes: asTrimmed(formData.get("notes")) || null,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  if (!(STATUSES as string[]).includes(status)) {
    return { error: "Invalid status" };
  }
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}

export async function deleteLead(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}
