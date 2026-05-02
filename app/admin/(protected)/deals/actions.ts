"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { DealPaymentStatus, DealStatus } from "@/types/database";

const STATUSES: DealStatus[] = ["open", "won", "lost"];
const PAYMENTS: DealPaymentStatus[] = ["unpaid", "deposit", "paid", "refunded"];

const TOGGLES = ["assets_received", "build_started", "review_sent", "launched", "handover_complete"] as const;
type ToggleField = typeof TOGGLES[number];

function asTrimmed(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

export async function createDeal(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };

  const lead_id = asTrimmed(formData.get("lead_id")) || null;
  const valueRaw = asTrimmed(formData.get("value_eur"));
  const value_eur = valueRaw ? Number(valueRaw) : null;
  if (value_eur != null && Number.isNaN(value_eur)) return { error: "Invalid value" };

  const statusRaw = asTrimmed(formData.get("status"));
  const status = (STATUSES as string[]).includes(statusRaw) ? (statusRaw as DealStatus) : "open";

  const paymentRaw = asTrimmed(formData.get("payment_status"));
  const payment_status = (PAYMENTS as string[]).includes(paymentRaw)
    ? (paymentRaw as DealPaymentStatus)
    : "unpaid";

  const { error } = await supabase.from("deals").insert({
    lead_id,
    value_eur,
    status,
    payment_status,
    assets_received: formData.get("assets_received") === "on",
    build_started: false,
    review_sent: false,
    launched: false,
    handover_complete: false,
    deadline: asTrimmed(formData.get("deadline")) || null,
    final_url: asTrimmed(formData.get("final_url")) || null,
    notes: asTrimmed(formData.get("notes")) || null,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/deals");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}

export async function updateDealStatus(id: string, status: DealStatus) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  if (!(STATUSES as string[]).includes(status)) return { error: "Invalid status" };
  const { error } = await supabase.from("deals").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/deals");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}

export async function updateDealPayment(id: string, payment_status: DealPaymentStatus) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  if (!(PAYMENTS as string[]).includes(payment_status)) return { error: "Invalid payment" };
  const { error } = await supabase.from("deals").update({ payment_status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/deals");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}

export async function toggleDealStage(id: string, field: ToggleField, value: boolean) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  if (!TOGGLES.includes(field)) return { error: "Invalid field" };
  const { error } = await supabase.from("deals").update({ [field]: value }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/deals");
  return { ok: true };
}

export async function deleteDeal(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("deals").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/deals");
  revalidatePath("/admin/dashboard");
  return { ok: true };
}
