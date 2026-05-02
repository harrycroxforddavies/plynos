"use client";

import { useTransition } from "react";
import { Select } from "@/components/admin/Select";
import {
  deleteOpportunity,
  toggleOpportunityStage,
  updateOpportunityPayment,
  updateOpportunityStatus,
} from "@/app/admin/(protected)/opportunities/actions";
import type { OpportunityPaymentStatus, OpportunityStatus } from "@/types/database";

const STAGES = [
  { field: "assets_received", label: "Assets" },
  { field: "build_started", label: "Build" },
  { field: "review_sent", label: "Review" },
  { field: "launched", label: "Launch" },
  { field: "handover_complete", label: "Handover" },
] as const;

const STATUS_OPTIONS: OpportunityStatus[] = ["open", "won", "lost"];
const PAYMENT_OPTIONS: OpportunityPaymentStatus[] = [
  "unpaid",
  "deposit",
  "paid",
  "refunded",
];

export function OpportunityStatusSelect({ id, status }: { id: string; status: OpportunityStatus }) {
  const [pending, startTransition] = useTransition();
  return (
    <Select<OpportunityStatus>
      options={STATUS_OPTIONS}
      value={status}
      disabled={pending}
      ariaLabel="Opportunity status"
      onChange={(next) =>
        startTransition(() => {
          void updateOpportunityStatus(id, next);
        })
      }
    />
  );
}

export function OpportunityPaymentSelect({
  id,
  payment_status,
}: {
  id: string;
  payment_status: OpportunityPaymentStatus;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <Select<OpportunityPaymentStatus>
      options={PAYMENT_OPTIONS}
      value={payment_status}
      disabled={pending}
      ariaLabel="Payment status"
      onChange={(next) =>
        startTransition(() => {
          void updateOpportunityPayment(id, next);
        })
      }
    />
  );
}

export function OpportunityStageToggles({
  id,
  values,
}: {
  id: string;
  values: Record<(typeof STAGES)[number]["field"], boolean>;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <div className="flex flex-wrap gap-1.5">
      {STAGES.map((s) => {
        const active = values[s.field];
        return (
          <button
            key={s.field}
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(() => {
                void toggleOpportunityStage(id, s.field, !active);
              })
            }
            className={
              "rounded-full border px-2 py-0.5 text-[11px] font-medium transition disabled:opacity-50 " +
              (active
                ? "border-plynos-blue bg-plynos-blue text-white"
                : "border-plynos-navy/15 bg-white text-plynos-slate hover:border-plynos-navy/30")
            }
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

export function OpportunityDeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this opportunity?")) return;
        startTransition(() => {
          void deleteOpportunity(id);
        });
      }}
      className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
    >
      Delete
    </button>
  );
}
