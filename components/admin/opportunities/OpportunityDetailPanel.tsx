"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  OpportunityStatusSelect,
  OpportunityPaymentSelect,
  OpportunityStageToggles,
  OpportunityDeleteButton,
} from "./OpportunityControls";
import { cn, formatDateTime, formatEUR } from "@/lib/utils";
import type { Opportunity } from "@/types/database";

export type OpportunityWithLead = Opportunity & {
  lead: { name: string; email: string } | null;
};

export function OpportunityDetailPanel({
  opportunity,
  onClose,
}: {
  opportunity: OpportunityWithLead | null;
  onClose: () => void;
}) {
  const open = opportunity != null;
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
      {opportunity ? (
        <div className="flex h-full flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-plynos-navy/10 px-6 py-5 dark:border-white/10">
            <div className="min-w-0">
              <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
                Opportunity
              </p>
              <h2 className="mt-1 truncate text-lg font-semibold text-plynos-navy dark:text-white">
                {opportunity.lead?.name ?? "Unlinked opportunity"}
              </h2>
              <p className="mt-0.5 truncate text-sm text-plynos-slate dark:text-white/60">
                {opportunity.lead?.email ?? "No linked lead"}
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
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Status">
                <OpportunityStatusSelect
                  id={opportunity.id}
                  status={opportunity.status}
                />
              </Field>
              <Field label="Payment">
                <OpportunityPaymentSelect
                  id={opportunity.id}
                  payment_status={opportunity.payment_status}
                />
              </Field>
            </div>

            <Field label="Stages">
              <OpportunityStageToggles
                id={opportunity.id}
                values={{
                  assets_received: opportunity.assets_received,
                  build_started: opportunity.build_started,
                  review_sent: opportunity.review_sent,
                  launched: opportunity.launched,
                  handover_complete: opportunity.handover_complete,
                }}
              />
            </Field>

            <DetailList
              rows={[
                ["Created", formatDateTime(opportunity.created_at)],
                ["Value", formatEUR(Number(opportunity.value_eur ?? 0))],
                ["Deadline", formatDateTime(opportunity.deadline)],
                ["Final URL", opportunity.final_url ?? "-"],
              ]}
            />

            {opportunity.notes ? (
              <div>
                <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
                  Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-plynos-navy dark:text-white">
                  {opportunity.notes}
                </p>
              </div>
            ) : null}
          </div>

          <footer className="flex items-center justify-end border-t border-plynos-navy/10 px-6 py-4 dark:border-white/10">
            <OpportunityDeleteButton id={opportunity.id} />
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
