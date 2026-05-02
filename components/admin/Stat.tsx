export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="px-5 py-6">
      <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-tightish text-plynos-navy dark:text-white md:text-3xl">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-plynos-slate dark:text-white/50">{hint}</p>
      ) : null}
    </div>
  );
}
