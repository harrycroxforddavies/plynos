/**
 * Sends a "new lead" email via Resend (https://resend.com).
 *
 * Configure with three env vars:
 *   RESEND_API_KEY            — get from resend.com → API keys
 *   LEAD_NOTIFICATION_TO      — recipient (e.g. harry@plynos.dev)
 *   LEAD_NOTIFICATION_FROM    — sender, must use a domain verified in Resend
 *                               (e.g. "Plynos <leads@plynos.dev>"). For testing
 *                               before verification, "onboarding@resend.dev"
 *                               works but only delivers to the address you
 *                               signed up to Resend with.
 *
 * If any of those env vars is missing, the function is a no-op and returns
 * { ok: false, reason: "not_configured" } so the lead form still succeeds.
 */

export type LeadEmailPayload = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  websiteUrl: string | null;
  niche: string | null;
  goal: string;
  source: string | null;
};

type SendResult =
  | { ok: true; id: string | null }
  | { ok: false; reason: "not_configured" | "send_failed"; status?: number; detail?: string };

export async function sendLeadNotification(
  lead: LeadEmailPayload
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_TO;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  if (!apiKey || !to || !from) {
    return { ok: false, reason: "not_configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `New lead from ${lead.name}`,
        html: renderHtml(lead),
        text: renderText(lead),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[mailer] Resend error", res.status, detail.slice(0, 500));
      return { ok: false, reason: "send_failed", status: res.status, detail };
    }

    const json = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: json.id ?? null };
  } catch (err) {
    console.error("[mailer] Resend fetch failed", err);
    return {
      ok: false,
      reason: "send_failed",
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

// --- helpers ---

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://plynos.dev";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function line(label: string, value: string | null) {
  if (!value) return "";
  return `${label}: ${escapeHtml(value)}<br>`;
}

function renderHtml(l: LeadEmailPayload): string {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0B1220;font-size:15px;line-height:1.6;max-width:600px;margin:0;padding:16px;">
<img src="${siteUrl()}/plynos.svg" alt="" width="56" height="56" style="display:block;width:56px;height:56px;margin:0 0 24px 0;border:0;">

<p style="margin:0 0 16px 0;">New lead just came in.</p>

<p style="margin:0 0 16px 0;line-height:1.8;">
${line("Name", l.name)}${line("Email", l.email)}${line("Phone", l.phone)}${line("Company", l.company)}${line("Industry", l.niche)}${line("Website", l.websiteUrl)}</p>

<p style="margin:0 0 8px 0;">Message:</p>

<p style="margin:0 0 32px 0;white-space:pre-wrap;">${escapeHtml(l.goal)}</p>

<p style="margin:0;color:#5B6472;font-size:13px;">Reply directly to this email to respond.</p>
</div>`;
}

function renderText(l: LeadEmailPayload): string {
  const parts = ["New lead just came in.", ""];
  parts.push(`Name: ${l.name}`);
  parts.push(`Email: ${l.email}`);
  if (l.phone) parts.push(`Phone: ${l.phone}`);
  if (l.company) parts.push(`Company: ${l.company}`);
  if (l.niche) parts.push(`Industry: ${l.niche}`);
  if (l.websiteUrl) parts.push(`Website: ${l.websiteUrl}`);
  parts.push("", "Message:", "", l.goal, "");
  parts.push("Reply directly to this email to respond.");
  return parts.join("\n");
}
