"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function asTrimmed(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}
function asInt(v: FormDataEntryValue | null) {
  if (typeof v !== "string" || !v) return 0;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

export async function createCampaign(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };

  const name = asTrimmed(formData.get("name"));
  if (!name) return { error: "Name is required" };

  const { error } = await supabase.from("campaigns").insert({
    name,
    niche_id: asTrimmed(formData.get("niche_id")) || null,
    channel: asTrimmed(formData.get("channel")) || null,
    subject: asTrimmed(formData.get("subject")) || null,
    variant: asTrimmed(formData.get("variant")) || null,
    sent: asInt(formData.get("sent")),
    replies: asInt(formData.get("replies")),
    bounces: asInt(formData.get("bounces")),
    unsubscribes: asInt(formData.get("unsubscribes")),
    booked_calls: asInt(formData.get("booked_calls")),
    wins: asInt(formData.get("wins")),
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/campaigns");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}

export async function updateCampaignStat(
  id: string,
  field: "sent" | "replies" | "bounces" | "unsubscribes" | "booked_calls" | "wins",
  value: number
) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const safe = Math.max(0, Math.floor(value || 0));
  const { error } = await supabase.from("campaigns").update({ [field]: safe }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/campaigns");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}

export async function deleteCampaign(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("campaigns").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/campaigns");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}
