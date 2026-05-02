"use client";

import { useTransition } from "react";
import { Select } from "@/components/admin/Select";
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
    <Select<LeadStatus>
      options={OPTIONS}
      value={status}
      disabled={pending}
      ariaLabel="Lead status"
      onChange={(next) => {
        startTransition(() => {
          void updateLeadStatus(id, next);
        });
      }}
    />
  );
}
