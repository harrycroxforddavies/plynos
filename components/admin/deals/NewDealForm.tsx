"use client";

import { useRef, useState, useTransition } from "react";
import { Plus, Loader2 } from "lucide-react";
import { createDeal } from "@/app/admin/(protected)/deals/actions";

export function NewDealForm({
  leads,
}: {
  leads: Array<{ id: string; name: string; email: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createDeal(fd);
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
        <Plus className="h-4 w-4" /> Add deal
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-plynos-navy/10 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-plynos-navy">New deal</h2>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-plynos-slate hover:text-plynos-navy">
          Cancel
        </button>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="label-field">Lead</label>
          <select className="input-field" name="lead_id" defaultValue="">
            <option value="">- none -</option>
            {leads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} - {l.email}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-field">Value (EUR)</label>
          <input className="input-field" name="value_eur" type="number" min={0} step={1} placeholder="600" />
        </div>
        <div>
          <label className="label-field">Status</label>
          <select className="input-field" name="status" defaultValue="open">
            {["open", "won", "lost"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="label-field">Payment status</label>
          <select className="input-field" name="payment_status" defaultValue="unpaid">
            {["unpaid", "deposit", "paid", "refunded"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="label-field">Deadline</label>
          <input className="input-field" name="deadline" type="datetime-local" />
        </div>
        <div>
          <label className="label-field">Final URL</label>
          <input className="input-field" name="final_url" placeholder="https://" />
        </div>
        <label className="md:col-span-2 flex items-center gap-2 text-sm text-plynos-slate">
          <input type="checkbox" name="assets_received" className="h-4 w-4 rounded border-plynos-navy/20 text-plynos-blue focus:ring-plynos-blue" />
          Required assets received
        </label>
        <div className="md:col-span-2">
          <label className="label-field">Notes</label>
          <textarea className="input-field min-h-[80px]" name="notes" />
        </div>

        {error ? (
          <p className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
            {pending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>) : "Save deal"}
          </button>
        </div>
      </form>
    </div>
  );
}
