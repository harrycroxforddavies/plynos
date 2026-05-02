export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col items-start justify-between gap-4 border-b border-plynos-navy/10 pb-6 md:flex-row md:items-end">
      <div>
        <h1 className="text-2xl font-semibold tracking-tightish text-plynos-navy md:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-xl text-sm text-plynos-slate">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
