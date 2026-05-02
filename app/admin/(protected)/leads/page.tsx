import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, THead, TR, TH, TD, EmptyRow } from "@/components/admin/Table";
import { NewLeadForm } from "@/components/admin/leads/NewLeadForm";
import { LeadStatusSelect } from "@/components/admin/leads/LeadStatusSelect";
import { LeadDeleteButton } from "@/components/admin/leads/LeadDeleteButton";
import { formatDateTime } from "@/lib/utils";
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
    <div className="space-y-8">
      <PageHeader
        title="Leads"
        description="Every enquiry from the public site, outbound and referrals."
        actions={<NewLeadForm />}
      />

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error.message}
        </p>
      ) : null}

      <Table>
        <THead>
          <TR>
            <TH>Created</TH>
            <TH>Name</TH>
            <TH>Email</TH>
            <TH>Phone</TH>
            <TH>Company</TH>
            <TH>Industry</TH>
            <TH>Source</TH>
            <TH>Status</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <tbody>
          {leads.length === 0 ? (
            <EmptyRow cols={9} message="No leads yet." />
          ) : (
            leads.map((l) => (
              <TR key={l.id}>
                <TD className="whitespace-nowrap text-plynos-slate">{formatDateTime(l.created_at)}</TD>
                <TD className="font-medium">{l.name}</TD>
                <TD className="text-plynos-slate">{l.email}</TD>
                <TD className="whitespace-nowrap text-plynos-slate">{l.phone ?? "-"}</TD>
                <TD className="text-plynos-slate">{l.company ?? "-"}</TD>
                <TD className="text-plynos-slate">{l.niche ?? "-"}</TD>
                <TD className="text-plynos-slate">{l.source ?? "-"}</TD>
                <TD>
                  <LeadStatusSelect id={l.id} status={l.status} />
                </TD>
                <TD className="text-right">
                  <LeadDeleteButton id={l.id} />
                </TD>
              </TR>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
