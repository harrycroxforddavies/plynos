"use client";

import { useState } from "react";
import { Table, THead, TR, TH } from "@/components/admin/Table";
import { LeadDetailPanel } from "./LeadDetailPanel";
import { cn, formatDateTime } from "@/lib/utils";
import type { Lead } from "@/types/database";

export function LeadsView({ leads }: { leads: Lead[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = leads.find((l) => l.id === selectedId) ?? null;

  return (
    <>
      <Table>
        <THead>
          <TR>
            <TH>Created</TH>
            <TH>Name</TH>
            <TH>Email</TH>
            <TH>Industry</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-12 text-center text-sm text-plynos-slate dark:text-white/60"
              >
                No leads yet.
              </td>
            </tr>
          ) : (
            leads.map((l) => {
              const active = l.id === selectedId;
              return (
                <tr
                  key={l.id}
                  onClick={() => setSelectedId(l.id)}
                  className={cn(
                    "cursor-pointer border-t border-plynos-navy/10 transition first:border-t-0 dark:border-white/10",
                    active
                      ? "bg-plynos-soft/60 dark:bg-white/[0.06]"
                      : "hover:bg-plynos-soft/20 dark:hover:bg-white/[0.03]"
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-3 align-top text-plynos-slate dark:text-white/60">
                    {formatDateTime(l.created_at)}
                  </td>
                  <td className="px-4 py-3 align-top font-medium text-plynos-navy dark:text-white">
                    {l.name}
                  </td>
                  <td className="px-4 py-3 align-top text-plynos-slate dark:text-white/60">
                    {l.email}
                  </td>
                  <td className="px-4 py-3 align-top text-plynos-slate dark:text-white/60">
                    {l.niche ?? "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-plynos-slate dark:text-white/60">
                    {l.status}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      <LeadDetailPanel lead={selected} onClose={() => setSelectedId(null)} />
    </>
  );
}
