"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { LeadStatusSelect } from "./LeadStatusSelect";
import { LeadDeleteButton } from "./LeadDeleteButton";
import { cn, formatDateTime } from "@/lib/utils";
import type { Lead } from "@/types/database";

export function LeadDetailPanel({
  lead,
  onClose,
}: {
  lead: Lead | null;
  onClose: () => void;
}) {
  const open = lead != null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  const panel = (
    <aside
      aria-hidden={!open}
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-[28rem] transform border-l border-plynos-navy/10 bg-white shadow-[-12px_0_30px_-18px_rgba(11,18,32,0.18)] transition-transform duration-200 ease-out dark:border-white/10 dark:bg-plynos-navy",
        open ? "translate-x-0" : "pointer-events-none translate-x-full"
      )}
    >
      {lead ? (
        <div className="flex h-full flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-plynos-navy/10 px-6 py-5 dark:border-white/10">
            <div className="min-w-0">
              <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
                Lead
              </p>
              <h2 className="mt-1 truncate text-lg font-semibold text-plynos-navy dark:text-white">
                {lead.name}
              </h2>
              <p className="mt-0.5 truncate text-sm text-plynos-slate dark:text-white/60">
                {lead.email}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="-mr-2 rounded-md p-1.5 text-plynos-slate transition hover:bg-plynos-soft/40 hover:text-plynos-navy dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </header>

          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
            <Field label="Status">
              <LeadStatusSelect id={lead.id} status={lead.status} />
            </Field>

            <DetailList
              rows={[
                ["Created", formatDateTime(lead.created_at)],
                ["Phone", lead.phone ?? "-"],
                ["Company", lead.company ?? "-"],
                ["Website", lead.website_url ?? "-"],
                ["Industry", lead.niche ?? "-"],
                ["Source", lead.source ?? "-"],
                ["Goal", lead.goal ?? "-"],
                [
                  "Deadline",
                  lead.deadline ? formatDateTime(lead.deadline) : "-",
                ],
              ]}
            />

            {lead.notes ? (
              <div>
                <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
                  Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-plynos-navy dark:text-white">
                  {lead.notes}
                </p>
              </div>
            ) : null}
          </div>

          <footer className="flex items-center justify-end border-t border-plynos-navy/10 px-6 py-4 dark:border-white/10">
            <LeadDeleteButton id={lead.id} />
          </footer>
        </div>
      ) : null}
    </aside>
  );

  return createPortal(panel, document.body);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function DetailList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="divide-y divide-plynos-navy/5 dark:divide-white/5">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-6 py-3 text-sm">
          <dt className="text-plynos-slate dark:text-white/60">{k}</dt>
          <dd className="min-w-0 truncate text-right text-plynos-navy dark:text-white">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}
