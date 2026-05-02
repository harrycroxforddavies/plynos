"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
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
      className="inline-flex items-center gap-1 rounded-lg border border-plynos-navy/10 px-2 py-1 text-xs text-plynos-slate hover:border-rose-300 hover:text-rose-600 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" /> Delete
    </button>
  );
}
