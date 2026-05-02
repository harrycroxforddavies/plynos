import type { SupabaseClient } from "@supabase/supabase-js";

type SB = SupabaseClient;

export type DashboardMetrics = {
  leadsToday: number;
  leads7: number;
  leads30: number;
  conversionRate: number;
  callsBooked: number;
  proposalsSent: number;
  closedWon: number;
  closedLost: number;
  aov: number;
  revenue30: number;
  campaignReplyRate: number;
  campaignsTotal: { sent: number; replies: number; bounces: number; unsubscribes: number; wins: number };
  leadsByNiche: Array<{ niche: string; count: number }>;
  recentLeads: Array<{ id: string; created_at: string; name: string; email: string; status: string; niche: string | null }>;
};

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString();
}

export async function getDashboardMetrics(supabase: SB): Promise<DashboardMetrics> {
  const today = isoDaysAgo(0);
  const seven = isoDaysAgo(7);
  const thirty = isoDaysAgo(30);

  const [
    leadsTodayRes,
    leads7Res,
    leads30Res,
    callsRes,
    proposalsRes,
    wonRes,
    lostRes,
    dealsRes,
    campaignsRes,
    leadsAllRes,
    recentLeadsRes,
  ] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", today),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", seven),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", thirty),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "call_booked"),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "proposal_sent"),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "won"),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "lost"),
    supabase.from("deals").select("value_eur,status,created_at"),
    supabase.from("campaigns").select("sent,replies,bounces,unsubscribes,wins"),
    supabase.from("leads").select("niche"),
    supabase
      .from("leads")
      .select("id,created_at,name,email,status,niche")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const totalLeads = leads30Res.count ?? 0;
  const callsBooked = callsRes.count ?? 0;
  const closedWon = wonRes.count ?? 0;
  const closedLost = lostRes.count ?? 0;
  const conversionRate = totalLeads ? closedWon / totalLeads : 0;

  const wonDeals = (dealsRes.data ?? []).filter((d) => d.status === "won");
  const aov =
    wonDeals.length > 0
      ? wonDeals.reduce((sum, d) => sum + (Number(d.value_eur) || 0), 0) / wonDeals.length
      : 0;
  const revenue30 = wonDeals
    .filter((d) => d.created_at >= thirty)
    .reduce((sum, d) => sum + (Number(d.value_eur) || 0), 0);

  const campaignsTotal = (campaignsRes.data ?? []).reduce(
    (acc, c) => ({
      sent: acc.sent + (c.sent ?? 0),
      replies: acc.replies + (c.replies ?? 0),
      bounces: acc.bounces + (c.bounces ?? 0),
      unsubscribes: acc.unsubscribes + (c.unsubscribes ?? 0),
      wins: acc.wins + (c.wins ?? 0),
    }),
    { sent: 0, replies: 0, bounces: 0, unsubscribes: 0, wins: 0 }
  );
  const campaignReplyRate = campaignsTotal.sent ? campaignsTotal.replies / campaignsTotal.sent : 0;

  const nicheMap = new Map<string, number>();
  for (const row of leadsAllRes.data ?? []) {
    const key = (row.niche ?? "Unspecified").trim() || "Unspecified";
    nicheMap.set(key, (nicheMap.get(key) ?? 0) + 1);
  }
  const leadsByNiche = Array.from(nicheMap.entries())
    .map(([niche, count]) => ({ niche, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    leadsToday: leadsTodayRes.count ?? 0,
    leads7: leads7Res.count ?? 0,
    leads30: leads30Res.count ?? 0,
    conversionRate,
    callsBooked,
    proposalsSent: proposalsRes.count ?? 0,
    closedWon,
    closedLost,
    aov,
    revenue30,
    campaignReplyRate,
    campaignsTotal,
    leadsByNiche,
    recentLeads: (recentLeadsRes.data ?? []) as DashboardMetrics["recentLeads"],
  };
}
