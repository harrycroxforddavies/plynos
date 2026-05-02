import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mockCampaigns, mockNiches } from "@/lib/admin/mock";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, THead, TR, TH, TD, EmptyRow } from "@/components/admin/Table";
import { NewCampaignForm } from "@/components/admin/campaigns/NewCampaignForm";
import {
  CampaignStatInput,
  CampaignDeleteButton,
} from "@/components/admin/campaigns/CampaignControls";
import { pct } from "@/lib/utils";
import type { Campaign } from "@/types/database";

export const dynamic = "force-dynamic";
export const metadata = { title: "Campaigns" };

export default async function CampaignsPage() {
  const supabase = createSupabaseServerClient();
  let rows: Campaign[] = [];
  let niches: { id: string; name: string }[] = [];
  if (supabase) {
    const [campaignsRes, nichesRes] = await Promise.all([
      supabase.from("campaigns").select("*").order("created_at", { ascending: false }),
      supabase.from("niches").select("id,name").order("name"),
    ]);
    rows = (campaignsRes.data ?? []) as Campaign[];
    niches = (nichesRes.data ?? []).map((n) => ({ id: n.id, name: n.name }));
  } else {
    rows = mockCampaigns;
    niches = mockNiches.map((n) => ({ id: n.id, name: n.name }));
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Campaigns"
        description="Track outbound batches, hooks and reply rates."
        actions={<NewCampaignForm niches={niches} />}
      />

      <Table>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>Channel</TH>
            <TH>Variant</TH>
            <TH>Sent</TH>
            <TH>Replies</TH>
            <TH>Reply rate</TH>
            <TH>Bounces</TH>
            <TH>Unsubs</TH>
            <TH>Calls</TH>
            <TH>Wins</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <tbody>
          {rows.length === 0 ? (
            <EmptyRow cols={11} message="No campaigns yet." />
          ) : (
            rows.map((c) => (
              <TR key={c.id}>
                <TD className="font-medium">{c.name}</TD>
                <TD className="text-plynos-slate">{c.channel ?? "-"}</TD>
                <TD className="text-plynos-slate">{c.variant ?? "-"}</TD>
                <TD><CampaignStatInput id={c.id} field="sent" value={c.sent} /></TD>
                <TD><CampaignStatInput id={c.id} field="replies" value={c.replies} /></TD>
                <TD className="text-plynos-slate">{pct(c.replies, c.sent)}</TD>
                <TD><CampaignStatInput id={c.id} field="bounces" value={c.bounces} /></TD>
                <TD><CampaignStatInput id={c.id} field="unsubscribes" value={c.unsubscribes} /></TD>
                <TD><CampaignStatInput id={c.id} field="booked_calls" value={c.booked_calls} /></TD>
                <TD><CampaignStatInput id={c.id} field="wins" value={c.wins} /></TD>
                <TD className="text-right">
                  <CampaignDeleteButton id={c.id} />
                </TD>
              </TR>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
