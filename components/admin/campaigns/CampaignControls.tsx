"use client";

import { useTransition } from "react";
import {
  deleteCampaign,
  updateCampaignStat,
} from "@/app/admin/(protected)/campaigns/actions";

type StatField =
  | "sent"
  | "replies"
  | "bounces"
  | "unsubscribes"
  | "booked_calls"
  | "wins";

export function CampaignStatInput({
  id,
  field,
  value,
}: {
  id: string;
  field: StatField;
  value: number;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <input
      type="number"
      min={0}
      defaultValue={value}
      disabled={pending}
      onBlur={(e) => {
        const v = parseInt(e.target.value, 10);
        if (Number.isFinite(v) && v !== value) {
          startTransition(() => {
            void updateCampaignStat(id, field, v);
          });
        }
      }}
      className="w-16 rounded-lg border border-plynos-navy/15 bg-white px-2 py-1 text-xs text-plynos-navy focus:border-plynos-blue focus:outline-none focus:ring-2 focus:ring-plynos-blue/20"
    />
  );
}

export function CampaignDeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this campaign?")) return;
        startTransition(() => {
          void deleteCampaign(id);
        });
      }}
      className="text-xs font-medium text-plynos-slate hover:text-red-600 disabled:opacity-50 dark:text-white/60 dark:hover:text-red-400"
    >
      Delete
    </button>
  );
}
