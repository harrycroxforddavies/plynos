"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function asTrimmed(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

export async function addSuppression(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };

  const email = asTrimmed(formData.get("email")).toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Valid email required" };
  }

  const { error } = await supabase.from("unsubscribes").upsert(
    {
      email,
      reason: asTrimmed(formData.get("reason")) || null,
      source: asTrimmed(formData.get("source")) || "manual",
    },
    { onConflict: "email" }
  );

  if (error) return { error: error.message };
  await supabase.from("leads").update({ status: "unsubscribed" }).eq("email", email);
  revalidatePath("/admin/suppression");
  return { ok: true };
}

export async function removeSuppression(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("unsubscribes").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/suppression");
  return { ok: true };
}
