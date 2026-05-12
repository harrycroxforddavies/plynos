import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/PageHeader";
import { Stat } from "@/components/admin/Stat";
import {
  NewClientProvider,
  NewClientToggle,
  NewClientPanel,
} from "@/components/admin/clients/NewClientForm";
import { ClientsView } from "@/components/admin/clients/ClientsView";
import type {
  ClientWithMeta,
} from "@/components/admin/clients/ClientDetailPanel";
import type { Lead, Opportunity } from "@/types/database";

export const dynamic = "force-dynamic";
export const metadata = { title: "Clients" };

type DevelopmentLite = {
  id: string;
  client_id: string;
  title: string;
  stage: string;
  updated_at: string;
};

export default async function ClientsPage() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const [clientsRes, developmentsRes, leadsRes, oppsRes] = await Promise.all([
    supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("developments")
      .select("id,client_id,title,stage,updated_at")
      .is("archived_at", null),
    supabase
      .from("leads")
      .select("id,name,email")
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("opportunities")
      .select("id,lead_id,value_eur,status,created_at")
      .order("created_at", { ascending: false })
      .limit(200),
  ]);

  const setupNeeded =
    (clientsRes.error && /relation .* does not exist/i.test(clientsRes.error.message)) ||
    (developmentsRes.error && /relation .* does not exist/i.test(developmentsRes.error.message));

  const clients = (clientsRes.data ?? []) as ClientWithMeta[];
  const developments = (developmentsRes.data ?? []) as DevelopmentLite[];
  const leads = (leadsRes.data ?? []) as Pick<Lead, "id" | "name" | "email">[];
  const opps = (oppsRes.data ?? []) as Pick<
    Opportunity,
    "id" | "lead_id" | "value_eur" | "status" | "created_at"
  >[];

  // Attach development counts + last activity per client
  const enriched: ClientWithMeta[] = clients.map((c) => {
    const devs = developments.filter((d) => d.client_id === c.id);
    const last = devs.reduce<string | null>((acc, d) => {
      if (!acc) return d.updated_at;
      return new Date(d.updated_at) > new Date(acc) ? d.updated_at : acc;
    }, null);
    return {
      ...c,
      developments_count: devs.length,
      developments_preview: devs.slice(0, 5).map((d) => ({
        id: d.id,
        title: d.title,
        stage: d.stage,
      })),
      last_development_at: last,
    };
  });

  const totalClients = enriched.filter((c) => !c.archived_at).length;
  const activeClients = enriched.filter((c) => c.status === "active").length;
  const totalDevelopments = developments.length;
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const newLast30 = enriched.filter(
    (c) => new Date(c.created_at).getTime() >= thirtyDaysAgo
  ).length;

  return (
    <NewClientProvider>
      <div className="space-y-8">
        <PageHeader
          title="Clients"
          description="Companies you've worked with. Developments, documents, activity, billing in one place."
          actions={<NewClientToggle />}
        />

        {setupNeeded ? (
          <div className="border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            The <code className="font-mono">clients</code> and{" "}
            <code className="font-mono">developments</code> tables don&apos;t exist
            yet. Run the SQL in{" "}
            <code className="font-mono">supabase/migrations/0001_clients_developments.sql</code>{" "}
            in Supabase SQL editor to enable this page.
          </div>
        ) : null}

        <section>
          <div className="grid border-b border-r border-plynos-navy/10 dark:border-white/10 sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-l [&>*]:border-t [&>*]:border-plynos-navy/10 dark:[&>*]:border-white/10">
            <Stat label="Total clients" value={totalClients} />
            <Stat label="Active" value={activeClients} />
            <Stat label="Developments in flight" value={totalDevelopments} />
            <Stat label="New last 30 days" value={newLast30} />
          </div>
        </section>

        <NewClientPanel leads={leads} opportunities={opps} />

        <ClientsView clients={enriched} />

        <p className="text-xs text-plynos-slate dark:text-white/40">
          Want a bigger view? Each client links to its{" "}
          <Link
            href="/admin/developments"
            className="font-medium text-plynos-navy underline-offset-2 hover:underline dark:text-white"
          >
            developments
          </Link>{" "}
          and{" "}
          <Link
            href="/admin/opportunities"
            className="font-medium text-plynos-navy underline-offset-2 hover:underline dark:text-white"
          >
            opportunities
          </Link>
          .
        </p>
      </div>
    </NewClientProvider>
  );
}
