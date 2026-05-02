import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, THead, TR, TH, TD, EmptyRow } from "@/components/admin/Table";
import { NewNicheForm } from "@/components/admin/niches/NewNicheForm";
import { NicheDecisionSelect, NicheDeleteButton } from "@/components/admin/niches/NicheControls";
import { formatDate } from "@/lib/utils";
import type { Niche } from "@/types/database";

export const dynamic = "force-dynamic";
export const metadata = { title: "Niches" };

export default async function NichesPage() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("niches")
    .select("*")
    .order("created_at", { ascending: false });
  const niches = (data ?? []) as Niche[];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Niche experiments"
        description="Track which verticals you're testing, scoring, and keeping."
        actions={<NewNicheForm />}
      />

      <Table>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>Hypothesis</TH>
            <TH>Score</TH>
            <TH>Start</TH>
            <TH>End</TH>
            <TH>Decision</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <tbody>
          {niches.length === 0 ? (
            <EmptyRow cols={7} message="No niches tracked yet." />
          ) : (
            niches.map((n) => (
              <TR key={n.id}>
                <TD className="font-medium">{n.name}</TD>
                <TD className="text-plynos-slate">
                  <span
                    className="block max-w-[28ch] truncate"
                    title={n.hypothesis ?? undefined}
                  >
                    {n.hypothesis ?? "-"}
                  </span>
                </TD>
                <TD>{n.score ?? "-"}</TD>
                <TD className="text-plynos-slate">{formatDate(n.start_date)}</TD>
                <TD className="text-plynos-slate">{formatDate(n.end_date)}</TD>
                <TD>
                  <NicheDecisionSelect id={n.id} decision={n.decision} />
                </TD>
                <TD className="text-right">
                  <NicheDeleteButton id={n.id} />
                </TD>
              </TR>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
