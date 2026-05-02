import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, THead, TR, TH, TD, EmptyRow } from "@/components/admin/Table";
import {
  AddSuppressionForm,
  SuppressionDeleteButton,
} from "@/components/admin/suppression/SuppressionControls";
import { formatDateTime } from "@/lib/utils";
import type { Unsubscribe } from "@/types/database";

export const dynamic = "force-dynamic";
export const metadata = { title: "Suppression" };

export default async function SuppressionPage() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("unsubscribes")
    .select("*")
    .order("created_at", { ascending: false });
  const rows = (data ?? []) as Unsubscribe[];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Suppression list"
        description="Emails that should never receive outreach. The lead form rejects new submissions from these addresses."
      />

      <div className="rounded-2xl border border-plynos-navy/10 bg-white p-6">
        <h2 className="text-base font-semibold text-plynos-navy">Add to suppression</h2>
        <p className="mt-1 text-xs text-plynos-slate">Marks any matching leads as unsubscribed.</p>
        <div className="mt-5">
          <AddSuppressionForm />
        </div>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>Created</TH>
            <TH>Email</TH>
            <TH>Source</TH>
            <TH>Reason</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <tbody>
          {rows.length === 0 ? (
            <EmptyRow cols={5} message="Suppression list is empty." />
          ) : (
            rows.map((u) => (
              <TR key={u.id}>
                <TD className="whitespace-nowrap text-plynos-slate">{formatDateTime(u.created_at)}</TD>
                <TD className="font-medium">{u.email}</TD>
                <TD className="text-plynos-slate">{u.source ?? "-"}</TD>
                <TD className="text-plynos-slate">{u.reason ?? "-"}</TD>
                <TD className="text-right">
                  <SuppressionDeleteButton id={u.id} />
                </TD>
              </TR>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
