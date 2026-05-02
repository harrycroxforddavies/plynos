import type {
  Lead,
  Niche,
  Campaign,
  ContentPost,
  Deal,
  Unsubscribe,
} from "@/types/database";
import type { DashboardMetrics } from "./metrics";

// All mock data is for previewing the admin UI when Supabase is not configured.
// Mutations (insert/update/delete) still no-op because the server actions
// short-circuit when the Supabase client is null.

const NOW = new Date();
function daysAgo(d: number) {
  return new Date(NOW.getTime() - d * 86400_000).toISOString();
}

export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    created_at: daysAgo(0),
    name: "Aoife Murphy",
    email: "aoife@northshorejoinery.ie",
    phone: "+353 87 123 4567",
    company: "Northshore Joinery",
    website_url: null,
    niche: "Bespoke joinery",
    goal: "Replace outdated WordPress site with a credible portfolio.",
    deadline: null,
    source: "website",
    status: "new",
    notes: null,
  },
  {
    id: "lead-2",
    created_at: daysAgo(1),
    name: "Declan O'Reilly",
    email: "declan@haldenstrength.com",
    phone: "+44 7700 900245",
    company: "Halden Strength",
    website_url: "https://haldenstrength.com",
    niche: "Strength coach",
    goal: "Single-page conversion site for online programmes.",
    deadline: null,
    source: "referral",
    status: "contacted",
    notes: null,
  },
  {
    id: "lead-3",
    created_at: daysAgo(3),
    name: "Sinead Walsh",
    email: "sinead@verduregardenco.ie",
    phone: "+353 86 555 0190",
    company: "Verdure Garden Co.",
    website_url: null,
    niche: "Landscaping",
    goal: "Photo-led site with quote form.",
    deadline: null,
    source: "website",
    status: "call_booked",
    notes: null,
  },
  {
    id: "lead-4",
    created_at: daysAgo(6),
    name: "Tom Brennan",
    email: "tom@brennanelectrics.ie",
    phone: "+353 85 222 1357",
    company: "Brennan Electrics",
    website_url: null,
    niche: "Electrician",
    goal: "Local SEO and quote requests.",
    deadline: null,
    source: "cold_call",
    status: "proposal_sent",
    notes: null,
  },
  {
    id: "lead-5",
    created_at: daysAgo(10),
    name: "Niamh Kelly",
    email: "niamh@kellyandco.law",
    phone: "+353 1 555 0142",
    company: "Kelly & Co Solicitors",
    website_url: "https://kellyandco.law",
    niche: "Solicitors",
    goal: "Refresh of dated firm website with practice areas.",
    deadline: null,
    source: "referral",
    status: "won",
    notes: null,
  },
  {
    id: "lead-6",
    created_at: daysAgo(14),
    name: "Liam Doherty",
    email: "liam@dohertyplumbing.com",
    phone: "+353 87 999 0033",
    company: "Doherty Plumbing",
    website_url: null,
    niche: "Plumber",
    goal: "Simple credibility site with contact form.",
    deadline: null,
    source: "whatsapp",
    status: "lost",
    notes: null,
  },
  {
    id: "lead-7",
    created_at: daysAgo(20),
    name: "Caoimhe Byrne",
    email: "caoimhe@byrnephoto.ie",
    phone: "+353 86 444 8821",
    company: "Byrne Photography",
    website_url: "https://byrnephoto.ie",
    niche: "Photographer",
    goal: "Portfolio refresh and booking flow.",
    deadline: null,
    source: "website",
    status: "replied",
    notes: null,
  },
  {
    id: "lead-8",
    created_at: daysAgo(25),
    name: "Eoin McCarthy",
    email: "eoin@mccarthyjoinery.ie",
    phone: "+353 86 778 1199",
    company: "McCarthy Joinery",
    website_url: null,
    niche: "Bespoke joinery",
    goal: "Project gallery and lead form.",
    deadline: null,
    source: "fiverr",
    status: "won",
    notes: null,
  },
];

export const mockNiches: Niche[] = [
  {
    id: "niche-1",
    created_at: daysAgo(30),
    name: "Bespoke joinery",
    hypothesis: "High-AOV service businesses needing portfolio sites convert well on cold outreach.",
    status: "keep",
    score: 8,
    start_date: daysAgo(30).slice(0, 10),
    end_date: null,
    decision: "keep",
    decision_notes: "Two wins in this niche already. Doubling down.",
  },
  {
    id: "niche-2",
    created_at: daysAgo(20),
    name: "Strength coaches",
    hypothesis: "Online coaches with mailing lists convert via referrals + email.",
    status: "testing",
    score: 6,
    start_date: daysAgo(20).slice(0, 10),
    end_date: null,
    decision: "testing",
    decision_notes: null,
  },
  {
    id: "niche-3",
    created_at: daysAgo(15),
    name: "Solicitors",
    hypothesis: "Mid-tier law firms with outdated sites have budget and urgency.",
    status: "narrow",
    score: 7,
    start_date: daysAgo(15).slice(0, 10),
    end_date: null,
    decision: "narrow",
    decision_notes: "Narrowing to firms < 10 partners.",
  },
  {
    id: "niche-4",
    created_at: daysAgo(40),
    name: "Generic SaaS",
    hypothesis: "B2B SaaS founders.",
    status: "kill",
    score: 3,
    start_date: daysAgo(40).slice(0, 10),
    end_date: daysAgo(10).slice(0, 10),
    decision: "kill",
    decision_notes: "Too crowded, low reply rate.",
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: "camp-1",
    created_at: daysAgo(20),
    name: "Joinery cold email v1",
    niche_id: "niche-1",
    channel: "email",
    subject: "Portfolio site in 24h",
    variant: "A",
    sent: 220,
    replies: 18,
    bounces: 4,
    unsubscribes: 6,
    booked_calls: 5,
    wins: 2,
  },
  {
    id: "camp-2",
    created_at: daysAgo(14),
    name: "Strength coach DM blitz",
    niche_id: "niche-2",
    channel: "whatsapp",
    subject: "Single-page conversion site",
    variant: "B",
    sent: 80,
    replies: 12,
    bounces: 0,
    unsubscribes: 1,
    booked_calls: 4,
    wins: 1,
  },
  {
    id: "camp-3",
    created_at: daysAgo(7),
    name: "Solicitors referral push",
    niche_id: "niche-3",
    channel: "email",
    subject: "Refresh your firm site",
    variant: "A",
    sent: 45,
    replies: 6,
    bounces: 2,
    unsubscribes: 0,
    booked_calls: 2,
    wins: 0,
  },
];

export const mockContent: ContentPost[] = [
  {
    id: "post-1",
    created_at: daysAgo(2),
    type: "blog",
    title: "Why blue-collar businesses can't skip a website anymore",
    slug: "why-blue-collar-businesses-cant-skip-a-website",
    excerpt: "Word-of-mouth still works. But customers Google before they call.",
    body: null,
    cover_url: "/concepts/concept-5.svg",
    published: true,
  },
  {
    id: "post-2",
    created_at: daysAgo(5),
    type: "blog",
    title: "What Stripe, Linear and Apple taught us about websites",
    slug: "what-stripe-linear-and-apple-taught-us-about-websites",
    excerpt: "Three brands worth studying — and the one thing each does that you can steal.",
    body: null,
    cover_url: "/concepts/concept-4.svg",
    published: true,
  },
  {
    id: "post-3",
    created_at: daysAgo(10),
    type: "portfolio",
    title: "Northshore Joinery (sample)",
    slug: "northshore-joinery",
    excerpt: "Sample concept piece for a high-end joiner.",
    body: null,
    cover_url: "/concepts/concept-1.svg",
    published: false,
  },
  {
    id: "post-4",
    created_at: daysAgo(15),
    type: "testimonial",
    title: "Niamh Kelly, Kelly & Co",
    slug: "niamh-kelly",
    excerpt: "\"Brief and brilliant. Live within the week.\"",
    body: null,
    cover_url: null,
    published: false,
  },
];

export const mockDeals: (Deal & { lead: { name: string; email: string } | null })[] = [
  {
    id: "deal-1",
    created_at: daysAgo(0),
    lead_id: "lead-3",
    value_eur: 600,
    status: "open",
    payment_status: "deposit",
    assets_received: true,
    build_started: true,
    review_sent: false,
    launched: false,
    handover_complete: false,
    deadline: daysAgo(-2),
    final_url: null,
    notes: null,
    lead: { name: "Sinead Walsh", email: "sinead@verduregardenco.ie" },
  },
  {
    id: "deal-2",
    created_at: daysAgo(8),
    lead_id: "lead-5",
    value_eur: 750,
    status: "won",
    payment_status: "paid",
    assets_received: true,
    build_started: true,
    review_sent: true,
    launched: true,
    handover_complete: true,
    deadline: daysAgo(5),
    final_url: "https://kellyandco.law",
    notes: null,
    lead: { name: "Niamh Kelly", email: "niamh@kellyandco.law" },
  },
  {
    id: "deal-3",
    created_at: daysAgo(12),
    lead_id: "lead-4",
    value_eur: 600,
    status: "open",
    payment_status: "unpaid",
    assets_received: false,
    build_started: false,
    review_sent: false,
    launched: false,
    handover_complete: false,
    deadline: null,
    final_url: null,
    notes: "Awaiting brief signoff.",
    lead: { name: "Tom Brennan", email: "tom@brennanelectrics.ie" },
  },
  {
    id: "deal-4",
    created_at: daysAgo(22),
    lead_id: "lead-8",
    value_eur: 600,
    status: "won",
    payment_status: "paid",
    assets_received: true,
    build_started: true,
    review_sent: true,
    launched: true,
    handover_complete: true,
    deadline: daysAgo(18),
    final_url: "https://mccarthyjoinery.ie",
    notes: null,
    lead: { name: "Eoin McCarthy", email: "eoin@mccarthyjoinery.ie" },
  },
];

export const mockUnsubscribes: Unsubscribe[] = [
  {
    id: "unsub-1",
    created_at: daysAgo(7),
    email: "noreply@megacorp.example",
    source: "email",
    reason: "Not interested",
  },
  {
    id: "unsub-2",
    created_at: daysAgo(15),
    email: "ceo@bigfirm.example",
    source: "email",
    reason: null,
  },
];

export function getMockDashboardMetrics(): DashboardMetrics {
  const today = NOW.toISOString().slice(0, 10);
  const sevenDays = new Date(NOW.getTime() - 7 * 86400_000).toISOString();
  const thirtyDays = new Date(NOW.getTime() - 30 * 86400_000).toISOString();

  const leadsToday = mockLeads.filter((l) => l.created_at.slice(0, 10) === today).length;
  const leads7 = mockLeads.filter((l) => l.created_at >= sevenDays).length;
  const leads30 = mockLeads.length;
  const closedWon = mockLeads.filter((l) => l.status === "won").length;
  const closedLost = mockLeads.filter((l) => l.status === "lost").length;
  const callsBooked = mockLeads.filter((l) => l.status === "call_booked").length;
  const proposalsSent = mockLeads.filter((l) => l.status === "proposal_sent").length;

  const wonDeals = mockDeals.filter((d) => d.status === "won");
  const aov = wonDeals.length
    ? wonDeals.reduce((s, d) => s + (Number(d.value_eur) || 0), 0) / wonDeals.length
    : 0;
  const revenue30 = wonDeals
    .filter((d) => d.created_at >= thirtyDays)
    .reduce((s, d) => s + (Number(d.value_eur) || 0), 0);

  const campaignsTotal = mockCampaigns.reduce(
    (acc, c) => ({
      sent: acc.sent + c.sent,
      replies: acc.replies + c.replies,
      bounces: acc.bounces + c.bounces,
      unsubscribes: acc.unsubscribes + c.unsubscribes,
      wins: acc.wins + c.wins,
    }),
    { sent: 0, replies: 0, bounces: 0, unsubscribes: 0, wins: 0 }
  );
  const campaignReplyRate = campaignsTotal.sent ? campaignsTotal.replies / campaignsTotal.sent : 0;

  const nicheMap = new Map<string, number>();
  for (const l of mockLeads) {
    const k = l.niche ?? "Unspecified";
    nicheMap.set(k, (nicheMap.get(k) ?? 0) + 1);
  }
  const leadsByNiche = Array.from(nicheMap.entries())
    .map(([niche, count]) => ({ niche, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const recentLeads = mockLeads.slice(0, 8).map((l) => ({
    id: l.id,
    created_at: l.created_at,
    name: l.name,
    email: l.email,
    status: l.status,
    niche: l.niche,
  }));

  return {
    leadsToday,
    leads7,
    leads30,
    conversionRate: leads30 ? closedWon / leads30 : 0,
    callsBooked,
    proposalsSent,
    closedWon,
    closedLost,
    aov,
    revenue30,
    campaignReplyRate,
    campaignsTotal,
    leadsByNiche,
    recentLeads,
  };
}
