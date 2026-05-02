"use client";

import { useRef, useState, useTransition } from "react";
import { Plus, Loader2 } from "lucide-react";
import { createNiche } from "@/app/admin/(protected)/niches/actions";

export function NewNicheForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createNiche(fd);
      if (res?.error) {
        setError(res.error);
        return;
      }
      formRef.current?.reset();
      setOpen(false);
    });
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn-primary">
        <Plus className="h-4 w-4" /> Add niche
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-plynos-navy/10 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-plynos-navy">New niche experiment</h2>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-plynos-slate hover:text-plynos-navy">
          Cancel
        </button>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="label-field">Name</label>
          <input className="input-field" name="name" required />
        </div>
        <div>
          <label className="label-field">Decision</label>
          <select className="input-field" name="decision" defaultValue="testing">
            {["testing", "narrow", "kill", "keep"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-field">Score (0-10)</label>
          <input className="input-field" name="score" type="number" min={0} max={10} />
        </div>
        <div>
          <label className="label-field">Start date</label>
          <input className="input-field" name="start_date" type="date" />
        </div>
        <div>
          <label className="label-field">End date</label>
          <input className="input-field" name="end_date" type="date" />
        </div>
        <div className="md:col-span-2">
          <label className="label-field">Hypothesis</label>
          <textarea className="input-field min-h-[80px]" name="hypothesis" />
        </div>
        <div className="md:col-span-2">
          <label className="label-field">Decision notes</label>
          <textarea className="input-field min-h-[60px]" name="decision_notes" />
        </div>

        {error ? (
          <p className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
            {pending ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
            ) : (
              "Save niche"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
