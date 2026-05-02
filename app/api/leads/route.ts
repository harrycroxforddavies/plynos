import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { leadSchema } from "@/lib/validation";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(`leads:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  let parsed;
  try {
    parsed = leadSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of err.errors) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return NextResponse.json(
        { error: "Please review the form.", fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Honeypot - silently accept
  if (parsed.website && parsed.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    // Configuration is incomplete; log and reply with friendly message.
    console.warn("[/api/leads] Supabase is not configured; lead not stored.", {
      email: parsed.email,
    });
    return NextResponse.json({
      ok: true,
      stored: false,
      message:
        "Received, but storage is not yet configured. Harry has been notified.",
    });
  }

  // Block emails on the suppression list.
  const { data: suppressed } = await supabase
    .from("unsubscribes")
    .select("email")
    .eq("email", parsed.email.toLowerCase())
    .maybeSingle();

  if (suppressed) {
    return NextResponse.json({
      ok: true,
      stored: false,
      message: "Request received.",
    });
  }

  const { error } = await supabase.from("leads").insert({
    name: parsed.name,
    email: parsed.email.toLowerCase(),
    phone: parsed.phone ?? null,
    company: parsed.company ?? null,
    website_url: parsed.website_url ?? null,
    niche: parsed.niche ?? null,
    goal: parsed.goal,
    deadline: parsed.deadline ?? null,
    source: "website",
    status: "new",
    notes: null,
  });

  if (error) {
    console.error("[/api/leads] insert failed", error);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
