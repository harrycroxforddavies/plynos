"use client";

import { useTransition } from "react";
import { Select } from "@/components/admin/Select";
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
    <Select<NicheDecision>
      options={DECISIONS}
      value={decision ?? "testing"}
      disabled={pending}
      ariaLabel="Niche decision"
      onChange={(next) =>
        startTransition(() => {
          void updateNicheDecision(id, next);
        })
      }
    />
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
      className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
    >
      Delete
    </button>
  );
}
