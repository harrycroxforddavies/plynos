import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  NewLeadProvider,
  NewLeadToggle,
  NewLeadPanel,
} from "@/components/admin/leads/NewLeadForm";
import { LeadsView } from "@/components/admin/leads/LeadsView";
import { LeadsCSVImport } from "@/components/admin/leads/LeadsCSVImport";
import type { Lead } from "@/types/database";

export const dynamic = "force-dynamic";
export const metadata = { title: "Leads" };

export default async function LeadsPage() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const res = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  const leads = (res.data ?? []) as Lead[];
  const error = res.error ?? null;

  return (
    <NewLeadProvider>
      <div className="space-y-8">
        <PageHeader
          title="Leads"
          description="Every enquiry from the public site, outbound and referrals."
          actions={
            <>
              <LeadsCSVImport />
              <NewLeadToggle />
            </>
          }
        />

        <NewLeadPanel />

        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error.message}
          </p>
        ) : null}

        <LeadsView leads={leads} />
      </div>
    </NewLeadProvider>
  );
}
