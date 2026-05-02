"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/app/admin/(protected)/leads/actions";
import type { LeadStatus } from "@/types/database";

const OPTIONS: LeadStatus[] = [
  "new",
  "contacted",
  "replied",
  "call_booked",
  "proposal_sent",
  "won",
  "lost",
  "unsubscribed",
];

export function LeadStatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as LeadStatus;
        startTransition(() => {
          void updateLeadStatus(id, next);
        });
      }}
      className="rounded-lg border border-plynos-navy/15 bg-white px-2 py-1 text-xs text-plynos-navy focus:border-plynos-blue focus:outline-none focus:ring-2 focus:ring-plynos-blue/20"
    >
      {OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
