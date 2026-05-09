import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const postSchema = z.object({
  email: z.string().email().max(200),
  reason: z.string().max(400).optional().nullable(),
  source: z.string().max(80).optional().nullable(),
});

const getQuerySchema = z.object({
  email: z.string().email("Invalid email").max(200),
  reason: z.string().max(400).optional().nullable(),
  source: z.string().max(80).optional().nullable(),
});

async function record(
  email: string,
  reason?: string | null,
  source?: string | null
): Promise<{ ok: true; stored: boolean } | { ok: false; error: string }> {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { ok: true, stored: false };
  }

  const normalised = email.trim().toLowerCase();

  const { error } = await supabase
    .from("unsubscribes")
    .upsert(
      { email: normalised, reason: reason ?? null, source: source ?? "manual" },
      { onConflict: "email" }
    );

  if (error) {
    console.error("[/api/unsubscribe] upsert failed", error);
    return { ok: false, error: "Could not record unsubscribe. Please try again." };
  }

  await supabase
    .from("leads")
    .update({ status: "unsubscribed" })
    .eq("email", normalised);

  return { ok: true, stored: true };
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

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const result = await record(parsed.data.email, parsed.data.reason, parsed.data.source);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: result.stored });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const limit = rateLimit(`unsub:${ip}`, 10, 60_000);
  if (!limit.ok) {
    return NextResponse.redirect(new URL("/unsubscribe", url), 303);
  }

  const parsed = getQuerySchema.safeParse({
    email: url.searchParams.get("email"),
    reason: url.searchParams.get("reason"),
    source: url.searchParams.get("source"),
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/unsubscribe", url), 303);
  }

  const result = await record(
    parsed.data.email,
    parsed.data.reason,
    parsed.data.source ?? "link"
  );

  const next = new URL("/unsubscribe", url);
  next.searchParams.set("email", parsed.data.email);
  if (result.ok) next.searchParams.set("status", "ok");
  return NextResponse.redirect(next, 303);
}
