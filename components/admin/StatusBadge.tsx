import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  new: "bg-plynos-soft text-plynos-blue border-plynos-blue/20",
  contacted: "bg-amber-50 text-amber-800 border-amber-200",
  replied: "bg-violet-50 text-violet-800 border-violet-200",
  call_booked: "bg-blue-50 text-blue-800 border-blue-200",
  proposal_sent: "bg-indigo-50 text-indigo-800 border-indigo-200",
  won: "bg-emerald-50 text-emerald-800 border-emerald-200",
  lost: "bg-rose-50 text-rose-700 border-rose-200",
  unsubscribed: "bg-zinc-100 text-zinc-700 border-zinc-200",
  open: "bg-plynos-soft text-plynos-blue border-plynos-blue/20",
  testing: "bg-amber-50 text-amber-800 border-amber-200",
  keep: "bg-emerald-50 text-emerald-800 border-emerald-200",
  narrow: "bg-blue-50 text-blue-800 border-blue-200",
  kill: "bg-rose-50 text-rose-700 border-rose-200",
  unpaid: "bg-rose-50 text-rose-700 border-rose-200",
  deposit: "bg-amber-50 text-amber-800 border-amber-200",
  paid: "bg-emerald-50 text-emerald-800 border-emerald-200",
  refunded: "bg-zinc-100 text-zinc-700 border-zinc-200",
};

export function StatusBadge({ status }: { status: string | null | undefined }) {
  const key = (status ?? "").toLowerCase();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        STYLES[key] ?? "border-plynos-navy/10 bg-plynos-soft/60 text-plynos-slate"
      )}
    >
      {status ?? "-"}
    </span>
  );
}
