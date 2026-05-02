"use client";

import { useState } from "react";
import { Table, THead, TR, TH } from "@/components/admin/Table";
import {
  OpportunityDetailPanel,
  type OpportunityWithLead,
} from "./OpportunityDetailPanel";
import { cn, formatDateTime, formatEUR } from "@/lib/utils";

export function OpportunitiesView({
  opportunities,
}: {
  opportunities: OpportunityWithLead[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected =
    opportunities.find((o) => o.id === selectedId) ?? null;

  return (
    <>
      <Table>
        <THead>
          <TR>
            <TH>Created</TH>
            <TH>Lead</TH>
            <TH>Value</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <tbody>
          {opportunities.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-12 text-center text-sm text-plynos-slate dark:text-white/60"
              >
                No opportunities yet.
              </td>
            </tr>
          ) : (
            opportunities.map((d) => {
              const active = d.id === selectedId;
              return (
                <tr
                  key={d.id}
                  onClick={() => setSelectedId(d.id)}
                  className={cn(
                    "cursor-pointer border-t border-plynos-navy/10 transition first:border-t-0 dark:border-white/10",
                    active
                      ? "bg-plynos-soft/60 dark:bg-white/[0.06]"
                      : "hover:bg-plynos-soft/20 dark:hover:bg-white/[0.03]"
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-3 align-top text-plynos-slate dark:text-white/60">
                    {formatDateTime(d.created_at)}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="font-medium text-plynos-navy dark:text-white">
                      {d.lead?.name ?? "-"}
                    </div>
                    <div className="text-xs text-plynos-slate dark:text-white/60">
                      {d.lead?.email ?? ""}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-plynos-navy dark:text-white">
                    {formatEUR(Number(d.value_eur ?? 0))}
                  </td>
                  <td className="px-4 py-3 align-top text-plynos-slate dark:text-white/60">
                    {d.status}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      <OpportunityDetailPanel
        opportunity={selected}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
