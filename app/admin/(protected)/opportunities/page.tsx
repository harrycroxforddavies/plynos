import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  NewOpportunityProvider,
  NewOpportunityToggle,
  NewOpportunityPanel,
} from "@/components/admin/opportunities/NewOpportunityForm";
import { OpportunitiesView } from "@/components/admin/opportunities/OpportunitiesView";
import type { OpportunityWithLead } from "@/components/admin/opportunities/OpportunityDetailPanel";
import type { Lead } from "@/types/database";

export const dynamic = "force-dynamic";
export const metadata = { title: "Opportunities" };

export default async function OpportunitiesPage() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const [{ data: opportunities }, { data: leadsRows }] = await Promise.all([
    supabase
      .from("opportunities")
      .select("*, lead:leads(name,email)")
      .order("created_at", { ascending: false }),
    supabase
      .from("leads")
      .select("id,name,email")
      .order("created_at", { ascending: false })
      .limit(200),
  ]);
  const rows = (opportunities ?? []) as OpportunityWithLead[];
  const leads = (leadsRows ?? []) as Pick<Lead, "id" | "name" | "email">[];

  return (
    <NewOpportunityProvider>
      <div className="space-y-8">
        <PageHeader
          title="Opportunities"
          description="Active and past projects. Payment, build, review, launch, handover."
          actions={<NewOpportunityToggle />}
        />

        <NewOpportunityPanel leads={leads} />

        <OpportunitiesView opportunities={rows} />
      </div>
    </NewOpportunityProvider>
  );
}
