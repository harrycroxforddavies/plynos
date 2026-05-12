import { cn } from "@/lib/utils";
import type { DevelopmentStage } from "@/types/database";

const STAGE_STYLES: Record<DevelopmentStage, string> = {
  kickoff:
    "border-plynos-navy/15 bg-plynos-soft/40 text-plynos-slate dark:border-white/15 dark:bg-white/5 dark:text-white/60",
  discovery:
    "border-sky-500/30 bg-sky-50 text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-200",
  design:
    "border-violet-500/30 bg-violet-50 text-violet-700 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-200",
  dev: "border-amber-500/30 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200",
  staging:
    "border-orange-500/30 bg-orange-50 text-orange-700 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-200",
  live: "border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200",
  maintenance:
    "border-teal-500/30 bg-teal-50 text-teal-700 dark:border-teal-400/30 dark:bg-teal-400/10 dark:text-teal-200",
};

export function StageBadge({
  stage,
  className,
}: {
  stage: DevelopmentStage;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 text-[11px] font-medium",
        STAGE_STYLES[stage],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {stage}
    </span>
  );
}
