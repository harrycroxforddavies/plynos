import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email().max(200),
  reason: z.string().max(400).optional().nullable(),
  source: z.string().max(80).optional().nullable(),
});

async function handle(email: string, reason?: string | null, source?: string | null) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const normalised = email.trim().toLowerCase();

  const { error } = await supabase
    .from("unsubscribes")
    .upsert(
      {
        email: normalised,
        reason: reason ?? null,
        source: source ?? "manual",
      },
      { onConflict: "email" }
    );

  if (error) {
    console.error("[/api/unsubscribe] upsert failed", error);
    return NextResponse.json(
      { error: "Could not record unsubscribe. Please try again." },
      { status: 500 }
    );
  }

  // Best-effort: mark any existing leads as unsubscribed.
  await supabase
    .from("leads")
    .update({ status: "unsubscribed" })
    .eq("email", normalised);

  return NextResponse.json({ ok: true, stored: true });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const limit = rateLimit(`unsub:${ip}`, 10, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  return handle(parsed.data.email, parsed.data.reason, parsed.data.source);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const reason = url.searchParams.get("reason");
  const source = url.searchParams.get("source");

  const parsed = schema.safeParse({ email, reason, source });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  return handle(parsed.data.email, parsed.data.reason, parsed.data.source ?? "link");
}
