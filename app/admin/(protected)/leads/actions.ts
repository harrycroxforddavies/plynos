"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { leadCsvRowSchema } from "@/lib/validation";
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
  const rowErrors: { row: number; error: string }[] = [];

  rows.slice(1).forEach((r, i) => {
    const rowNumber = i + 2; // +1 for header, +1 for 1-based
    const parsed = leadCsvRowSchema.safeParse({
      name: get(r, idx.name),
      email: get(r, idx.email),
      phone: get(r, idx.phone),
      company: get(r, idx.company),
      website_url: get(r, idx.website_url),
      niche: get(r, idx.niche),
      goal: get(r, idx.goal),
      notes: get(r, idx.notes),
      source: get(r, idx.source),
      status: get(r, idx.status),
    });

    if (!parsed.success) {
      const first = parsed.error.errors[0];
      const field = first?.path.join(".") ?? "row";
      rowErrors.push({ row: rowNumber, error: `${field}: ${first?.message ?? "invalid"}` });
      return;
    }

    inserts.push({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      company: parsed.data.company ?? null,
      website_url: parsed.data.website_url ?? null,
      niche: parsed.data.niche ?? null,
      goal: parsed.data.goal ?? null,
      notes: parsed.data.notes ?? null,
      source: parsed.data.source ?? "other",
      status: parsed.data.status ?? "new",
    });
  });

  const skipped = rowErrors.length;

  if (inserts.length === 0) {
    const sample = rowErrors
      .slice(0, 3)
      .map((e) => `row ${e.row}: ${e.error}`)
      .join("; ");
    return {
      ok: false as const,
      error:
        sample.length > 0
          ? `No valid rows. ${sample}${skipped > 3 ? ` (+${skipped - 3} more)` : ""}`
          : "No valid rows.",
    };
  }

  const { error } = await supabase.from("leads").insert(inserts);
  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
  return {
    ok: true as const,
    inserted: inserts.length,
    skipped,
    rowErrors: rowErrors.slice(0, 10),
  };
}
