"use client";

import { useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { importLeadsCSV } from "@/app/admin/(protected)/leads/actions";
import { cn } from "@/lib/utils";

export function LeadsCSVImport() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
    rowErrors?: { row: number; error: string }[];
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function pick() {
    if (pending) return;
    setResult(null);
    inputRef.current?.click();
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    startTransition(async () => {
      const res = await importLeadsCSV(fd);
      if (res.ok) {
        const tail = res.skipped > 0 ? `, skipped ${res.skipped}` : "";
        setResult({
          ok: true,
          message: `Imported ${res.inserted} lead${res.inserted === 1 ? "" : "s"}${tail}.`,
          rowErrors: res.rowErrors,
        });
      } else {
        setResult({ ok: false, message: res.error });
      }
      if (inputRef.current) inputRef.current.value = "";
    });
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={pick}
        disabled={pending}
        title="CSV columns: name (required), email (required), phone, company, industry, goal, source, status, notes, website"
        className="btn-secondary disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : null}
        Import CSV
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={onChange}
      />
      {result ? (
        <div className="flex flex-col items-end gap-1">
          <p
            className={cn(
              "text-xs",
              result.ok
                ? "text-plynos-slate dark:text-white/60"
                : "text-red-600 dark:text-red-400"
            )}
          >
            {result.message}
          </p>
          {result.rowErrors && result.rowErrors.length > 0 ? (
            <ul className="max-w-xs space-y-0.5 text-right text-[11px] text-red-600 dark:text-red-400">
              {result.rowErrors.map((e) => (
                <li key={e.row}>row {e.row}: {e.error}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
