import { cn } from "@/lib/utils";

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden border border-plynos-navy/10 dark:border-white/10", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-plynos-soft/40 text-left text-xs font-medium text-plynos-slate dark:bg-white/5 dark:text-white/60">
      {children}
    </thead>
  );
}

export function TR({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <tr
      className={cn(
        "border-t border-plynos-navy/10 transition first:border-t-0 hover:bg-plynos-soft/20 dark:border-white/10 dark:hover:bg-white/[0.03]",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TH({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={cn("px-4 py-3 font-medium", className)}>{children}</th>;
}

export function TD({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={cn("px-4 py-3 align-top text-plynos-navy dark:text-white", className)}>
      {children}
    </td>
  );
}

export function EmptyRow({ cols, message }: { cols: number; message: string }) {
  return (
    <tr>
      <td
        colSpan={cols}
        className="px-4 py-12 text-center text-sm text-plynos-slate dark:text-white/60"
      >
        {message}
      </td>
    </tr>
  );
}
