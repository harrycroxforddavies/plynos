import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/PageHeader";
import { Stat } from "@/components/admin/Stat";
import {
  NewDevelopmentProvider,
  NewDevelopmentToggle,
  NewDevelopmentPanel,
} from "@/components/admin/developments/NewDevelopmentForm";
import { DevelopmentsView } from "@/components/admin/developments/DevelopmentsView";
import type { DevelopmentWithClient } from "@/components/admin/developments/DevelopmentDetailPanel";
import type { Client } from "@/types/database";

export const dynamic = "force-dynamic";
export const metadata = { title: "Developments" };

export default async function DevelopmentsPage({
  searchParams,
}: {
  searchParams: { client?: string };
}) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const [devsRes, clientsRes] = await Promise.all([
    supabase
      .from("developments")
      .select("*, client:clients(id,name,country,locale)")
      .order("created_at", { ascending: false }),
    supabase
      .from("clients")
      .select("id,name")
      .order("name", { ascending: true }),
  ]);

  const setupNeeded =
    (devsRes.error && /relation .* does not exist/i.test(devsRes.error.message)) ||
    (clientsRes.error && /relation .* does not exist/i.test(clientsRes.error.message));

  const allDevelopments = (devsRes.data ?? []) as DevelopmentWithClient[];
  const clients = (clientsRes.data ?? []) as Pick<Client, "id" | "name">[];

  // Pre-filter by ?client=… when arriving from a client detail panel.
  const developments = searchParams.client
    ? allDevelopments.filter((d) => d.client_id === searchParams.client)
    : allDevelopments;

  const activeCount = allDevelopments.filter(
    (d) => !d.archived_at && d.stage !== "live" && d.stage !== "maintenance"
  ).length;
  const inDev = allDevelopments.filter((d) => d.stage === "dev").length;
  const inStaging = allDevelopments.filter((d) => d.stage === "staging").length;
  const live = allDevelopments.filter(
    (d) => d.stage === "live" || d.stage === "maintenance"
  ).length;

  return (
    <NewDevelopmentProvider>
      <div className="space-y-8">
        <PageHeader
          title="Developments"
          description="Active builds, stages, and the operational view of every project in flight."
          actions={<NewDevelopmentToggle hasClients={clients.length > 0} />}
        />

        {setupNeeded ? (
          <div className="border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            The <code className="font-mono">developments</code> table doesn&apos;t
            exist yet. Run the SQL in{" "}
            <code className="font-mono">supabase/migrations/0001_clients_developments.sql</code>{" "}
            in Supabase SQL editor to enable this page.
          </div>
        ) : null}

        {!setupNeeded && clients.length === 0 ? (
          <div className="border border-plynos-navy/10 bg-plynos-soft/20 px-4 py-3 text-sm text-plynos-slate dark:border-white/10 dark:bg-white/[0.04] dark:text-white/60">
            Add a client first. Developments belong to a client.
          </div>
        ) : null}

        <section>
          <div className="grid border-b border-r border-plynos-navy/10 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-l [&>*]:border-t [&>*]:border-plynos-navy/10 dark:[&>*]:border-white/10">
            <Stat label="In flight" value={activeCount} hint="Excludes live + maintenance" />
            <Stat label="In dev" value={inDev} />
            <Stat label="In staging" value={inStaging} />
            <Stat label="Live + maintenance" value={live} />
          </div>
        </section>

        <NewDevelopmentPanel clients={clients} />

        <DevelopmentsView
          developments={developments}
          clientFilter={searchParams.client ?? null}
        />
      </div>
    </NewDevelopmentProvider>
  );
}
