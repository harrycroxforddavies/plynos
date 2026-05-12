"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { deleteClient } from "@/app/admin/(protected)/clients/actions";

export function ClientDeleteButton({ id }: { id: string }) {
  const [confirm, setConfirm] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!confirm) {
    return (
      <button
        type="button"
        onClick={() => setConfirm(true)}
        className="text-xs font-medium text-plynos-slate hover:text-red-600 dark:text-white/60 dark:hover:text-red-300"
      >
        Delete client
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setConfirm(false)}
        className="text-xs font-medium text-plynos-slate hover:text-plynos-navy dark:text-white/60 dark:hover:text-white"
      >
        Cancel
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(() => {
            void deleteClient(id);
          })
        }
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-60 dark:text-red-300 dark:hover:text-red-200"
      >
        {pending ? <Loader2 className="h-3 w-3 animate-spin" aria-hidden /> : null}
        Confirm delete
      </button>
    </div>
  );
}
