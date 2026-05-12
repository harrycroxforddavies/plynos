"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Table, THead, TR, TH } from "@/components/admin/Table";
import { Select } from "@/components/admin/Select";
import {
  ClientDetailPanel,
  type ClientWithMeta,
} from "./ClientDetailPanel";
import { cn, formatDateTime } from "@/lib/utils";
import type { ClientStatus } from "@/types/database";

const STATUS_FILTER: ReadonlyArray<{ value: "all" | ClientStatus; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "archived", label: "Archived" },
];

export function ClientsView({ clients }: { clients: ClientWithMeta[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | ClientStatus>("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return clients.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        (c.primary_contact_name ?? "").toLowerCase().includes(q) ||
        (c.primary_contact_email ?? "").toLowerCase().includes(q) ||
        (c.country ?? "").toLowerCase().includes(q)
      );
    });
  }, [clients, search, status]);

  const selected = clients.find((c) => c.id === selectedId) ?? null;

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-plynos-slate dark:text-white/60"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, contact, country"
            className="h-9 w-full rounded-lg border border-plynos-navy/15 bg-white pl-8 pr-3 text-xs font-medium text-plynos-navy placeholder:text-plynos-slate focus:border-plynos-blue focus:outline-none focus:ring-2 focus:ring-plynos-blue/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/50"
          />
        </div>
        <div className="w-full sm:w-44">
          <Select<"all" | ClientStatus>
            value={status}
            onChange={(v) => setStatus(v)}
            options={STATUS_FILTER}
            buttonClassName="py-1.5 text-xs"
            ariaLabel="Filter by status"
          />
        </div>
      </div>

      <Table className="mt-4">
        <THead>
          <TR>
            <TH>Client</TH>
            <TH>Contact</TH>
            <TH>Country</TH>
            <TH className="text-right">Developments</TH>
            <TH>Last activity</TH>
            <TH>Status</TH>
          </TR>
        </THead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-12 text-center text-sm text-plynos-slate dark:text-white/60"
              >
                {clients.length === 0
                  ? "No clients yet. Add your first one with the button above."
                  : "No clients match this filter."}
              </td>
            </tr>
          ) : (
            filtered.map((c) => {
              const active = c.id === selectedId;
              return (
                <tr
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={cn(
                    "cursor-pointer border-t border-plynos-navy/10 transition first:border-t-0 dark:border-white/10",
                    active
                      ? "bg-plynos-soft/60 dark:bg-white/[0.06]"
                      : "hover:bg-plynos-soft/20 dark:hover:bg-white/[0.03]"
                  )}
                >
                  <td className="px-4 py-3 align-top">
                    <div className="font-medium text-plynos-navy dark:text-white">
                      {c.name}
                    </div>
                    {c.website_url ? (
                      <div className="mt-0.5 truncate text-xs text-plynos-slate dark:text-white/60">
                        {c.website_url.replace(/^https?:\/\//, "")}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="text-plynos-navy dark:text-white">
                      {c.primary_contact_name ?? "-"}
                    </div>
                    <div className="text-xs text-plynos-slate dark:text-white/60">
                      {c.primary_contact_email ?? ""}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-plynos-slate dark:text-white/60">
                    {c.country ?? "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-right tabular-nums text-plynos-navy dark:text-white">
                    {c.developments_count}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 align-top text-plynos-slate dark:text-white/60">
                    {formatDateTime(c.last_development_at ?? c.updated_at)}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <StatusPill status={c.status} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      <ClientDetailPanel
        client={selected}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}

function StatusPill({ status }: { status: ClientStatus }) {
  const tone =
    status === "active"
      ? "border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200"
      : status === "paused"
      ? "border-amber-500/30 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200"
      : "border-plynos-navy/15 bg-plynos-soft/40 text-plynos-slate dark:border-white/15 dark:bg-white/5 dark:text-white/60";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 text-[11px] font-medium",
        tone
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {status}
    </span>
  );
}
