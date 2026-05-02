import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getDashboardMetrics } from "@/lib/admin/metrics";
import { PageHeader } from "@/components/admin/PageHeader";
import { Stat } from "@/components/admin/Stat";
import { Table, THead, TR, TH, TD, EmptyRow } from "@/components/admin/Table";
import { formatDateTime, formatEUR, pct } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;
  const metrics = await getDashboardMetrics(supabase);

  return (
    <div className="space-y-12">
      <PageHeader
        title="Dashboard"
        description="A read of leads, conversion, campaigns and pipeline."
      />

      {/* Top metrics — broken into two rows for breathing room and rhythm. */}
      <section>
        <h2 className="text-xs font-medium text-plynos-slate dark:text-white/60">
          Lead volume
        </h2>
        <div className="mt-3 grid border-b border-r border-plynos-navy/10 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-l [&>*]:border-t [&>*]:border-plynos-navy/10 dark:[&>*]:border-white/10">
          <Stat label="Today" value={metrics.leadsToday} />
          <Stat label="Last 7 days" value={metrics.leads7} />
          <Stat label="Last 30 days" value={metrics.leads30} />
          <Stat
            label="Conversion (30d)"
            value={pct(metrics.closedWon, metrics.leads30)}
            hint={`${metrics.closedWon} won, ${metrics.leads30} total`}
          />
        </div>
      </section>

      <section>
        <h2 className="text-xs font-medium text-plynos-slate dark:text-white/60">
          Pipeline
        </h2>
        <div className="mt-3 grid border-b border-r border-plynos-navy/10 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-l [&>*]:border-t [&>*]:border-plynos-navy/10 dark:[&>*]:border-white/10">
          <Stat label="Calls booked" value={metrics.callsBooked} />
          <Stat label="Proposals sent" value={metrics.proposalsSent} />
          <Stat
            label="Closed won"
            value={metrics.closedWon}
            hint={`${metrics.closedLost} lost`}
          />
          <Stat
            label="Average opportunity"
            value={formatEUR(metrics.aov)}
            hint="Target €600"
          />
        </div>
      </section>

      {/* Recent leads + side panel */}
      <section className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-baseline justify-between">
            <h2 className="text-base font-semibold text-plynos-navy dark:text-white">
              Recent leads
            </h2>
            <Link
              href="/admin/leads"
              className="text-xs font-medium text-plynos-blue hover:underline dark:text-plynos-soft"
            >
              View all
            </Link>
          </div>
          <div className="mt-4">
            <Table>
              <THead>
                <TR>
                  <TH>Created</TH>
                  <TH>Name</TH>
                  <TH>Email</TH>
                  <TH>Industry</TH>
                  <TH>Status</TH>
                </TR>
              </THead>
              <tbody>
                {metrics.recentLeads.length === 0 ? (
                  <EmptyRow
                    cols={5}
                    message="No leads yet. Your first request will appear here."
                  />
                ) : (
                  metrics.recentLeads.map((l) => (
                    <TR key={l.id}>
                      <TD className="whitespace-nowrap text-plynos-slate dark:text-white/60">
                        {formatDateTime(l.created_at)}
                      </TD>
                      <TD className="font-medium">{l.name}</TD>
                      <TD className="text-plynos-slate dark:text-white/60">
                        {l.email}
                      </TD>
                      <TD className="text-plynos-slate dark:text-white/60">
                        {l.niche ?? "-"}
                      </TD>
                      <TD className="text-plynos-slate dark:text-white/60">
                        {l.status}
                      </TD>
                    </TR>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="text-base font-semibold text-plynos-navy dark:text-white">
              Outbound
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Row
                label="Sent"
                value={String(metrics.campaignsTotal.sent)}
              />
              <Row
                label="Reply rate"
                value={pct(
                  metrics.campaignsTotal.replies,
                  metrics.campaignsTotal.sent
                )}
              />
              <Row
                label="Bounces"
                value={String(metrics.campaignsTotal.bounces)}
              />
              <Row
                label="Unsubscribes"
                value={String(metrics.campaignsTotal.unsubscribes)}
              />
              <Row
                label="Wins from campaigns"
                value={String(metrics.campaignsTotal.wins)}
              />
            </dl>
          </div>

          <div>
            <h2 className="text-base font-semibold text-plynos-navy dark:text-white">
              Leads by industry
            </h2>
            {metrics.leadsByNiche.length === 0 ? (
              <p className="mt-4 text-sm text-plynos-slate dark:text-white/60">
                No data yet.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {metrics.leadsByNiche.map((row) => {
                  const max = metrics.leadsByNiche[0].count || 1;
                  const width = Math.max(
                    6,
                    Math.round((row.count / max) * 100)
                  );
                  return (
                    <li key={row.niche} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="truncate pr-3 text-plynos-navy dark:text-white">
                          {row.niche}
                        </span>
                        <span className="text-plynos-slate dark:text-white/60">
                          {row.count}
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden bg-plynos-soft dark:bg-white/10">
                        <div
                          className="h-full bg-plynos-blue dark:bg-plynos-soft"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-plynos-navy/5 pb-3 text-sm last:border-b-0 dark:border-white/5">
      <dt className="text-plynos-slate dark:text-white/60">{label}</dt>
      <dd className="font-medium text-plynos-navy dark:text-white">{value}</dd>
    </div>
  );
}
