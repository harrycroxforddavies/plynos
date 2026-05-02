"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteNiche, updateNicheDecision } from "@/app/admin/(protected)/niches/actions";
import type { NicheDecision } from "@/types/database";

const DECISIONS: NicheDecision[] = ["testing", "narrow", "kill", "keep"];

export function NicheDecisionSelect({
  id,
  decision,
}: {
  id: string;
  decision: NicheDecision | null;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      defaultValue={decision ?? "testing"}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          void updateNicheDecision(id, e.target.value as NicheDecision);
        })
      }
      className="rounded-lg border border-plynos-navy/15 bg-white px-2 py-1 text-xs text-plynos-navy focus:border-plynos-blue focus:outline-none focus:ring-2 focus:ring-plynos-blue/20"
    >
      {DECISIONS.map((d) => (
        <option key={d} value={d}>{d}</option>
      ))}
    </select>
  );
}

export function NicheDeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this niche?")) return;
        startTransition(() => {
          void deleteNiche(id);
        });
      }}
      className="inline-flex items-center gap-1 rounded-lg border border-plynos-navy/10 px-2 py-1 text-xs text-plynos-slate hover:border-rose-300 hover:text-rose-600 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" /> Delete
    </button>
  );
}
