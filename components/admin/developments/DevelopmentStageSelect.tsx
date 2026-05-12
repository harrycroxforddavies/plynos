"use client";

import { useTransition } from "react";
import { Select } from "@/components/admin/Select";
import { updateDevelopmentStage } from "@/app/admin/(protected)/developments/actions";
import type { DevelopmentStage } from "@/types/database";

const STAGES: DevelopmentStage[] = [
  "kickoff",
  "discovery",
  "design",
  "dev",
  "staging",
  "live",
  "maintenance",
];

export function DevelopmentStageSelect({
  id,
  stage,
}: {
  id: string;
  stage: DevelopmentStage;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <Select<DevelopmentStage>
      value={stage}
      onChange={(next) =>
        startTransition(() => {
          void updateDevelopmentStage(id, next);
        })
      }
      options={STAGES}
      buttonClassName="py-1.5 text-xs"
      disabled={pending}
      ariaLabel="Development stage"
    />
  );
}
