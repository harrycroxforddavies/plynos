import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mockDeals, mockLeads } from "@/lib/admin/mock";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, THead, TR, TH, TD, EmptyRow } from "@/components/admin/Table";
import { NewDealForm } from "@/components/admin/deals/NewDealForm";
import {
  DealStatusSelect,
  DealPaymentSelect,
  DealStageToggles,
  DealDeleteButton,
} from "@/components/admin/deals/DealControls";
import { formatDateTime, formatEUR } from "@/lib/utils";
import type { Deal, Lead } from "@/types/database";

type DealWithLead = Deal & { lead: { name: string; email: string } | null };

export const dynamic = "force-dynamic";
export const metadata = { title: "Deals" };

export default async function DealsPage() {
  const supabase = createSupabaseServerClient();
  let rows: DealWithLead[] = [];
  let leads: Pick<Lead, "id" | "name" | "email">[] = [];
  if (supabase) {
    const [{ data: deals }, { data: leadsRows }] = await Promise.all([
      supabase
        .from("deals")
        .select("*, lead:leads(name,email)")
        .order("created_at", { ascending: false }),
      supabase.from("leads").select("id,name,email").order("created_at", { ascending: false }).limit(200),
    ]);
    rows = (deals ?? []) as DealWithLead[];
    leads = (leadsRows ?? []) as Pick<Lead, "id" | "name" | "email">[];
  } else {
    rows = mockDeals;
    leads = mockLeads.map((l) => ({ id: l.id, name: l.name, email: l.email }));
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Deals & build tracker"
        description="Payment, asset readiness, build, review, launch and handover."
        actions={<NewDealForm leads={leads} />}
      />

      <Table>
        <THead>
          <TR>
            <TH>Created</TH>
            <TH>Lead</TH>
            <TH>Value</TH>
            <TH>Status</TH>
            <TH>Payment</TH>
            <TH>Stages</TH>
            <TH>Deadline</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <tbody>
          {rows.length === 0 ? (
            <EmptyRow cols={8} message="No deals yet." />
          ) : (
            rows.map((d) => (
              <TR key={d.id}>
                <TD className="whitespace-nowrap text-plynos-slate">{formatDateTime(d.created_at)}</TD>
                <TD>
                  <div className="font-medium">{d.lead?.name ?? "-"}</div>
                  <div className="text-xs text-plynos-slate">{d.lead?.email ?? ""}</div>
                </TD>
                <TD>{formatEUR(Number(d.value_eur ?? 0))}</TD>
                <TD><DealStatusSelect id={d.id} status={d.status} /></TD>
                <TD><DealPaymentSelect id={d.id} payment_status={d.payment_status} /></TD>
                <TD>
                  <DealStageToggles
                    id={d.id}
                    values={{
                      assets_received: d.assets_received,
                      build_started: d.build_started,
                      review_sent: d.review_sent,
                      launched: d.launched,
                      handover_complete: d.handover_complete,
                    }}
                  />
                </TD>
                <TD className="whitespace-nowrap text-plynos-slate">{formatDateTime(d.deadline)}</TD>
                <TD className="text-right">
                  <DealDeleteButton id={d.id} />
                </TD>
              </TR>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
