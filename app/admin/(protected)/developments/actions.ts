"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { DevelopmentStage } from "@/types/database";

const STAGES: DevelopmentStage[] = [
  "kickoff",
  "discovery",
  "design",
  "dev",
  "staging",
  "live",
  "maintenance",
];

function asTrimmed(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

function nullable(s: string) {
  return s.length > 0 ? s : null;
}

export async function createDevelopment(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };

  const title = asTrimmed(formData.get("title"));
  if (!title) return { error: "Title is required" };

  const client_id = asTrimmed(formData.get("client_id"));
  if (!client_id) return { error: "Client is required" };

  const stageRaw = asTrimmed(formData.get("stage"));
  const stage = (STAGES as string[]).includes(stageRaw)
    ? (stageRaw as DevelopmentStage)
    : "kickoff";

  const { error } = await supabase.from("developments").insert({
    client_id,
    title,
    stage,
    template: nullable(asTrimmed(formData.get("template"))),
    tech_stack: nullable(asTrimmed(formData.get("tech_stack"))),
    domain: nullable(asTrimmed(formData.get("domain"))),
    repo_url: nullable(asTrimmed(formData.get("repo_url"))),
    preview_url: nullable(asTrimmed(formData.get("preview_url"))),
    staging_url: nullable(asTrimmed(formData.get("staging_url"))),
    live_url: nullable(asTrimmed(formData.get("live_url"))),
    started_at: nullable(asTrimmed(formData.get("started_at"))),
    expected_live_at: nullable(asTrimmed(formData.get("expected_live_at"))),
    notes: nullable(asTrimmed(formData.get("notes"))),
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/developments");
  revalidatePath("/admin/clients");
  return { ok: true };
}

export async function updateDevelopmentStage(
  id: string,
  stage: DevelopmentStage
) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  if (!(STAGES as string[]).includes(stage)) return { error: "Invalid stage" };

  const now = new Date().toISOString();
  const patch: Record<string, string | null> = {
    stage,
    stage_changed_at: now,
    updated_at: now,
  };
  if (stage === "live") {
    patch.actual_live_at = now;
  }

  const { error } = await supabase
    .from("developments")
    .update(patch)
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/developments");
  revalidatePath("/admin/clients");
  return { ok: true };
}

export async function updateDevelopmentProgress(id: string, value: number) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    return { error: "Progress must be 0–100" };
  }

  const { error } = await supabase
    .from("developments")
    .update({
      progress_pct: Math.round(value),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/developments");
  return { ok: true };
}

export async function deleteDevelopment(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("developments").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/developments");
  revalidatePath("/admin/clients");
  return { ok: true };
}
