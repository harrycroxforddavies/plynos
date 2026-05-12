"use client";

import { useState, useTransition } from "react";
import { updateDevelopmentProgress } from "@/app/admin/(protected)/developments/actions";

export function DevelopmentProgressInput({
  id,
  value,
}: {
  id: string;
  value: number;
}) {
  const [local, setLocal] = useState(value);
  const [pending, startTransition] = useTransition();

  function commit(next: number) {
    const clamped = Math.max(0, Math.min(100, Math.round(next)));
    setLocal(clamped);
    startTransition(() => {
      void updateDevelopmentProgress(id, clamped);
    });
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={local}
        onChange={(e) => setLocal(Number(e.target.value))}
        onMouseUp={(e) => commit(Number((e.target as HTMLInputElement).value))}
        onTouchEnd={(e) =>
          commit(Number((e.target as HTMLInputElement).value))
        }
        disabled={pending}
        className="flex-1 accent-plynos-blue disabled:opacity-60"
        aria-label="Progress"
      />
      <span className="w-10 text-right text-sm font-medium tabular-nums text-plynos-navy dark:text-white">
        {local}%
      </span>
    </div>
  );
}
