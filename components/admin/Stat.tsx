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
    <div className="rounded-2xl border border-plynos-navy/10 bg-white p-5">
      <p className="text-xs font-medium text-plynos-slate">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tightish text-plynos-navy md:text-3xl">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-plynos-slate">{hint}</p> : null}
    </div>
  );
}
