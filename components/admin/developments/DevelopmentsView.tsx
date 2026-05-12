"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLink, Search, X } from "lucide-react";
import { Table, THead, TR, TH } from "@/components/admin/Table";
import { Select } from "@/components/admin/Select";
import { StageBadge } from "./StageBadge";
import {
  DevelopmentDetailPanel,
  type DevelopmentWithClient,
} from "./DevelopmentDetailPanel";
import { cn, formatDateTime } from "@/lib/utils";
import type { DevelopmentStage } from "@/types/database";

const STAGE_FILTER: ReadonlyArray<{
  value: "all" | DevelopmentStage;
  label: string;
}> = [
  { value: "all", label: "All stages" },
  { value: "kickoff", label: "Kickoff" },
  { value: "discovery", label: "Discovery" },
  { value: "design", label: "Design" },
  { value: "dev", label: "Dev" },
  { value: "staging", label: "Staging" },
  { value: "live", label: "Live" },
  { value: "maintenance", label: "Maintenance" },
];

function daysSince(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}

export function DevelopmentsView({
  developments,
  clientFilter,
}: {
  developments: DevelopmentWithClient[];
  clientFilter: string | null;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<"all" | DevelopmentStage>("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return developments.filter((d) => {
      if (stage !== "all" && d.stage !== stage) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        (d.client?.name ?? "").toLowerCase().includes(q) ||
        (d.domain ?? "").toLowerCase().includes(q)
      );
    });
  }, [developments, search, stage]);

  const selected = developments.find((d) => d.id === selectedId) ?? null;

  const filteredClientName = clientFilter
    ? developments[0]?.client?.name ?? "this client"
    : null;

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-plynos-slate dark:text-white/60"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, client, domain"
              className="h-9 w-full rounded-lg border border-plynos-navy/15 bg-white pl-8 pr-3 text-xs font-medium text-plynos-navy placeholder:text-plynos-slate focus:border-plynos-blue focus:outline-none focus:ring-2 focus:ring-plynos-blue/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/50"
            />
          </div>
          <div className="w-full sm:w-44">
            <Select<"all" | DevelopmentStage>
              value={stage}
              onChange={(v) => setStage(v)}
              options={STAGE_FILTER}
              buttonClassName="py-1.5 text-xs"
              ariaLabel="Filter by stage"
            />
          </div>
        </div>

        {clientFilter ? (
          <Link
            href="/admin/developments"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-plynos-slate hover:text-plynos-navy dark:text-white/60 dark:hover:text-white"
          >
            <X className="h-3 w-3" aria-hidden />
            Clear client filter ({filteredClientName})
          </Link>
        ) : null}
      </div>

      <Table className="mt-4">
        <THead>
          <TR>
            <TH>Project</TH>
            <TH>Client</TH>
            <TH>Stage</TH>
            <TH className="text-right">Progress</TH>
            <TH>Days in stage</TH>
            <TH>Last activity</TH>
          </TR>
        </THead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-12 text-center text-sm text-plynos-slate dark:text-white/60"
              >
                {developments.length === 0
                  ? "No developments yet. Add one with the button above."
                  : "No developments match this filter."}
              </td>
            </tr>
          ) : (
            filtered.map((d) => {
              const active = d.id === selectedId;
              const dayCount = daysSince(d.stage_changed_at);
              const liveUrl = d.live_url || d.staging_url || d.preview_url;
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
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0">
                        <div className="font-medium text-plynos-navy dark:text-white">
                          {d.title}
                        </div>
                        {liveUrl ? (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-0.5 inline-flex items-center gap-1 truncate text-xs text-plynos-slate hover:text-plynos-navy dark:text-white/60 dark:hover:text-white"
                          >
                            {liveUrl.replace(/^https?:\/\//, "")}
                            <ExternalLink className="h-3 w-3" aria-hidden />
                          </a>
                        ) : d.domain ? (
                          <div className="mt-0.5 truncate text-xs text-plynos-slate dark:text-white/60">
                            {d.domain}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <Link
                      href="/admin/clients"
                      onClick={(e) => e.stopPropagation()}
                      className="text-plynos-navy hover:underline dark:text-white"
                    >
                      {d.client?.name ?? "-"}
                    </Link>
                    {d.client?.country ? (
                      <div className="text-xs text-plynos-slate dark:text-white/60">
                        {d.client.country}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <StageBadge stage={d.stage} />
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    <ProgressBar value={d.progress_pct} />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={cn(
                        "tabular-nums",
                        dayCount >= 14
                          ? "text-amber-700 dark:text-amber-300"
                          : "text-plynos-slate dark:text-white/60"
                      )}
                    >
                      {dayCount}d
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 align-top text-plynos-slate dark:text-white/60">
                    {formatDateTime(d.updated_at)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      <DevelopmentDetailPanel
        development={selected}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}

function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="inline-flex w-28 items-center gap-2">
      <div className="h-1 flex-1 overflow-hidden bg-plynos-soft dark:bg-white/10">
        <div
          className="h-full bg-plynos-blue dark:bg-plynos-soft"
          style={{ width: `${v}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs tabular-nums text-plynos-slate dark:text-white/60">
        {v}%
      </span>
    </div>
  );
}
