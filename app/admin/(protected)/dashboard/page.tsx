import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getDashboardMetrics } from "@/lib/admin/metrics";
import { getMockDashboardMetrics } from "@/lib/admin/mock";
import { PageHeader } from "@/components/admin/PageHeader";
import { Stat } from "@/components/admin/Stat";
import { Table, THead, TR, TH, TD, EmptyRow } from "@/components/admin/Table";
import { formatDateTime, formatEUR, pct } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const metrics = supabase
    ? await getDashboardMetrics(supabase)
    : getMockDashboardMetrics();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="A quick read of leads, conversion, campaigns and deal flow."
      />

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stat label="Leads today" value={metrics.leadsToday} />
        <Stat label="Leads 7d" value={metrics.leads7} />
        <Stat label="Leads 30d" value={metrics.leads30} />
        <Stat
          label="Conversion (30d)"
          value={pct(metrics.closedWon, metrics.leads30)}
          hint={`${metrics.closedWon} won / ${metrics.leads30} leads`}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stat label="Calls booked" value={metrics.callsBooked} />
        <Stat label="Proposals sent" value={metrics.proposalsSent} />
        <Stat label="Closed won" value={metrics.closedWon} hint={`${metrics.closedLost} lost`} />
        <Stat label="AOV" value={formatEUR(metrics.aov)} hint={`Target €600`} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-plynos-navy/10 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-plynos-navy">Recent leads</h2>
            <Link href="/admin/leads" className="text-xs text-plynos-blue hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-4">
            <Table>
              <THead>
                <TR>
                  <TH>Created</TH>
                  <TH>Name</TH>
                  <TH>Email</TH>
                  <TH>Niche</TH>
                  <TH>Status</TH>
                </TR>
              </THead>
              <tbody>
                {metrics.recentLeads.length === 0 ? (
                  <EmptyRow cols={5} message="No leads yet - your first request will appear here." />
                ) : (
                  metrics.recentLeads.map((l) => (
                    <TR key={l.id}>
                      <TD className="whitespace-nowrap text-plynos-slate">
                        {formatDateTime(l.created_at)}
                      </TD>
                      <TD className="font-medium">{l.name}</TD>
                      <TD className="text-plynos-slate">{l.email}</TD>
                      <TD className="text-plynos-slate">{l.niche ?? "-"}</TD>
                      <TD>
                        <span className="rounded-full border border-plynos-navy/10 bg-plynos-soft/60 px-2 py-0.5 text-xs text-plynos-slate">
                          {l.status}
                        </span>
                      </TD>
                    </TR>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-plynos-navy/10 bg-white p-6">
            <h2 className="text-base font-semibold text-plynos-navy">Outbound</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-plynos-slate">Sent</dt>
                <dd className="font-medium">{metrics.campaignsTotal.sent}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-plynos-slate">Reply rate</dt>
                <dd className="font-medium">{pct(metrics.campaignsTotal.replies, metrics.campaignsTotal.sent)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-plynos-slate">Bounces</dt>
                <dd className="font-medium">{metrics.campaignsTotal.bounces}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-plynos-slate">Unsubscribes</dt>
                <dd className="font-medium">{metrics.campaignsTotal.unsubscribes}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-plynos-slate">Wins from campaigns</dt>
                <dd className="font-medium">{metrics.campaignsTotal.wins}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-plynos-navy/10 bg-white p-6">
            <h2 className="text-base font-semibold text-plynos-navy">Leads by niche</h2>
            {metrics.leadsByNiche.length === 0 ? (
              <p className="mt-4 text-sm text-plynos-slate">No data yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {metrics.leadsByNiche.map((row) => {
                  const max = metrics.leadsByNiche[0].count || 1;
                  const width = Math.max(6, Math.round((row.count / max) * 100));
                  return (
                    <li key={row.niche} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="truncate pr-3 text-plynos-navy">{row.niche}</span>
                        <span className="text-plynos-slate">{row.count}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-plynos-soft">
                        <div
                          className="h-full rounded-full bg-plynos-blue"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-plynos-navy/10 bg-white p-6">
            <h2 className="text-base font-semibold text-plynos-navy">Revenue (30d)</h2>
            <p className="mt-3 text-2xl font-semibold tracking-tightish text-plynos-navy">
              {formatEUR(metrics.revenue30)}
            </p>
            <p className="mt-1 text-xs text-plynos-slate">From won deals in the last 30 days.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
