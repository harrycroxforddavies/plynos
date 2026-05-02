"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { NicheDecision } from "@/types/database";

const DECISIONS: NicheDecision[] = ["testing", "narrow", "kill", "keep"];

function asTrimmed(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}
function asInt(v: FormDataEntryValue | null) {
  if (typeof v !== "string") return null;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

export async function createNiche(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };

  const name = asTrimmed(formData.get("name"));
  if (!name) return { error: "Name is required" };

  const decisionRaw = asTrimmed(formData.get("decision"));
  const decision = (DECISIONS as string[]).includes(decisionRaw)
    ? (decisionRaw as NicheDecision)
    : "testing";

  const { error } = await supabase.from("niches").insert({
    name,
    hypothesis: asTrimmed(formData.get("hypothesis")) || null,
    status: decision,
    score: asInt(formData.get("score")),
    start_date: asTrimmed(formData.get("start_date")) || null,
    end_date: asTrimmed(formData.get("end_date")) || null,
    decision,
    decision_notes: asTrimmed(formData.get("decision_notes")) || null,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/niches");
  return { ok: true };
}

export async function updateNicheDecision(id: string, decision: NicheDecision) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  if (!(DECISIONS as string[]).includes(decision)) return { error: "Invalid decision" };
  const { error } = await supabase
    .from("niches")
    .update({ decision, status: decision })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/niches");
  return { ok: true };
}

export async function deleteNiche(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("niches").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/niches");
  return { ok: true };
}
