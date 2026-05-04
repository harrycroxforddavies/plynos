"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import {
  deleteDeal,
  toggleDealStage,
  updateDealPayment,
  updateDealStatus,
} from "@/app/admin/(protected)/deals/actions";
import type { DealPaymentStatus, DealStatus } from "@/types/database";

const STAGES = [
  { field: "assets_received", label: "Assets" },
  { field: "build_started", label: "Build" },
  { field: "review_sent", label: "Review" },
  { field: "launched", label: "Launch" },
  { field: "handover_complete", label: "Handover" },
] as const;

export function DealStatusSelect({ id, status }: { id: string; status: DealStatus }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          void updateDealStatus(id, e.target.value as DealStatus);
        })
      }
      className="rounded-lg border border-plynos-navy/15 bg-white px-2 py-1 text-xs text-plynos-navy focus:border-plynos-blue focus:outline-none focus:ring-2 focus:ring-plynos-blue/20"
    >
      {(["open", "won", "lost"] as DealStatus[]).map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

export function DealPaymentSelect({
  id,
  payment_status,
}: {
  id: string;
  payment_status: DealPaymentStatus;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={payment_status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          void updateDealPayment(id, e.target.value as DealPaymentStatus);
        })
      }
      className="rounded-lg border border-plynos-navy/15 bg-white px-2 py-1 text-xs text-plynos-navy focus:border-plynos-blue focus:outline-none focus:ring-2 focus:ring-plynos-blue/20"
    >
      {(["unpaid", "deposit", "paid", "refunded"] as DealPaymentStatus[]).map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

export function DealStageToggles({
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
                void toggleDealStage(id, s.field, !active);
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

export function DealDeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this deal?")) return;
        startTransition(() => {
          void deleteDeal(id);
        });
      }}
      className="inline-flex items-center gap-1 rounded-lg border border-plynos-navy/10 px-2 py-1 text-xs text-plynos-slate hover:border-rose-300 hover:text-rose-600 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" /> Delete
    </button>
  );
}
