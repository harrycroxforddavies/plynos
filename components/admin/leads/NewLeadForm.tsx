"use client";

import { useRef, useState, useTransition } from "react";
import { Plus, Loader2 } from "lucide-react";
import { createLead } from "@/app/admin/(protected)/leads/actions";

export function NewLeadForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createLead(fd);
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
        <Plus className="h-4 w-4" /> Add lead
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-plynos-navy/10 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-plynos-navy">New lead</h2>
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
          <label className="label-field">Email</label>
          <input className="input-field" name="email" type="email" required />
        </div>
        <div>
          <label className="label-field">Phone</label>
          <input className="input-field" name="phone" type="tel" placeholder="+44 7700 900123" />
        </div>
        <div>
          <label className="label-field">Company</label>
          <input className="input-field" name="company" />
        </div>
        <div>
          <label className="label-field">Niche</label>
          <input className="input-field" name="niche" />
        </div>
        <div>
          <label className="label-field">Website URL</label>
          <input className="input-field" name="website_url" />
        </div>
        <div>
          <label className="label-field">Deadline</label>
          <input className="input-field" name="deadline" />
        </div>
        <div>
          <label className="label-field">Source</label>
          <select className="input-field" name="source" defaultValue="website">
            {[
              "website",
              "resend",
              "fiverr",
              "referral",
              "cold_call",
              "whatsapp",
              "other",
            ].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-field">Status</label>
          <select className="input-field" name="status" defaultValue="new">
            {[
              "new",
              "contacted",
              "replied",
              "call_booked",
              "proposal_sent",
              "won",
              "lost",
              "unsubscribed",
            ].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="label-field">Goal</label>
          <textarea className="input-field min-h-[100px]" name="goal" />
        </div>
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
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </>
            ) : (
              "Save lead"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
