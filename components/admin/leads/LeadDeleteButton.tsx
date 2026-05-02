"use client";

import { useTransition } from "react";
import { deleteLead } from "@/app/admin/(protected)/leads/actions";

export function LeadDeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this lead? This cannot be undone.")) return;
        startTransition(() => {
          void deleteLead(id);
        });
      }}
      className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
    >
      Delete
    </button>
  );
}
