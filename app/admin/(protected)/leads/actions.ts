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

const HEADER_ALIASES: Record<string, string[]> = {
  name: ["name", "full name", "contact", "contact name"],
  email: ["email", "email address", "e-mail"],
  phone: ["phone", "telephone", "mobile", "phone number"],
  company: ["company", "business", "organisation", "organization"],
  niche: ["niche", "industry", "sector"],
  goal: ["goal", "project", "request", "interest"],
  source: ["source", "channel"],
  status: ["status", "stage"],
  notes: ["notes", "comments"],
  website_url: ["website", "website_url", "url", "site"],
};

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cur);
      cur = "";
    } else if (ch === "\r") {
      // ignore
    } else if (ch === "\n") {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
    } else {
      cur += ch;
    }
  }
  if (cur.length || row.length) {
    row.push(cur);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim().length > 0));
}

export async function importLeadsCSV(formData: FormData) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase not configured" };

  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false as const, error: "No file provided" };
  if (file.size === 0) return { ok: false as const, error: "Empty file" };
  if (file.size > 2_000_000) return { ok: false as const, error: "File too large (max 2MB)" };

  const text = await file.text();
  const rows = parseCSV(text);
  if (rows.length < 2) {
    return { ok: false as const, error: "CSV must include a header row and at least one data row" };
  }

  const header = rows[0].map((c) => c.trim().toLowerCase());
  const idx: Record<string, number> = {};
  for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
    idx[field] = header.findIndex((h) => aliases.includes(h));
  }
  if (idx.name < 0 || idx.email < 0) {
    return { ok: false as const, error: "CSV must include 'name' and 'email' columns" };
  }

  const get = (row: string[], col: number) =>
    col >= 0 ? (row[col] ?? "").trim() : "";

  type LeadInsert = {
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    website_url: string | null;
    niche: string | null;
    goal: string | null;
    source: LeadSource;
    status: LeadStatus;
    notes: string | null;
  };
  const inserts: LeadInsert[] = [];
  let skipped = 0;

  for (const r of rows.slice(1)) {
    const name = get(r, idx.name);
    const email = get(r, idx.email).toLowerCase();
    if (!name || !email) {
      skipped++;
      continue;
    }
    const sourceRaw = get(r, idx.source).toLowerCase();
    const statusRaw = get(r, idx.status).toLowerCase();
    const source = (SOURCES as string[]).includes(sourceRaw)
      ? (sourceRaw as LeadSource)
      : "other";
    const status = (STATUSES as string[]).includes(statusRaw)
      ? (statusRaw as LeadStatus)
      : "new";
    inserts.push({
      name,
      email,
      phone: get(r, idx.phone) || null,
      company: get(r, idx.company) || null,
      website_url: get(r, idx.website_url) || null,
      niche: get(r, idx.niche) || null,
      goal: get(r, idx.goal) || null,
      source,
      status,
      notes: get(r, idx.notes) || null,
    });
  }

  if (inserts.length === 0) {
    return {
      ok: false as const,
      error: `No valid rows. Skipped ${skipped} (missing name or email).`,
    };
  }

  const { error } = await supabase.from("leads").insert(inserts);
  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
  return { ok: true as const, inserted: inserts.length, skipped };
}
