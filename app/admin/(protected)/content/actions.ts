"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ContentType } from "@/types/database";

const TYPES: ContentType[] = ["blog", "news", "portfolio", "testimonial"];

function asTrimmed(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || `post-${Date.now()}`;
}

export async function createContent(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };

  const title = asTrimmed(formData.get("title"));
  if (!title) return { error: "Title is required" };

  const typeRaw = asTrimmed(formData.get("type"));
  const type = (TYPES as string[]).includes(typeRaw)
    ? (typeRaw as ContentType)
    : "blog";

  const slugInput = asTrimmed(formData.get("slug"));
  const slug = slugify(slugInput || title);

  const { error } = await supabase.from("content_posts").insert({
    type,
    title,
    slug,
    excerpt: asTrimmed(formData.get("excerpt")) || null,
    body: asTrimmed(formData.get("body")) || null,
    cover_url: asTrimmed(formData.get("cover_url")) || null,
    published: formData.get("published") === "on",
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/content");
  return { ok: true };
}

export async function togglePublished(id: string, published: boolean) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase
    .from("content_posts")
    .update({ published })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/content");
  return { ok: true };
}

export async function deleteContent(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("content_posts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/content");
  return { ok: true };
}
