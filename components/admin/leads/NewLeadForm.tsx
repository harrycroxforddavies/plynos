"use client";

import { createContext, useContext, useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Select } from "@/components/admin/Select";
import { createLead } from "@/app/admin/(protected)/leads/actions";
import type { LeadSource, LeadStatus } from "@/types/database";

const SOURCE_OPTIONS: LeadSource[] = [
  "website",
  "resend",
  "fiverr",
  "referral",
  "cold_call",
  "whatsapp",
  "other",
];

const STATUS_OPTIONS: LeadStatus[] = [
  "new",
  "contacted",
  "replied",
  "call_booked",
  "proposal_sent",
  "won",
  "lost",
  "unsubscribed",
];

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const NewLeadCtx = createContext<Ctx | null>(null);

function useNewLead() {
  const c = useContext(NewLeadCtx);
  if (!c) throw new Error("NewLeadProvider missing");
  return c;
}

export function NewLeadProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <NewLeadCtx.Provider value={{ open, setOpen }}>{children}</NewLeadCtx.Provider>;
}

export function NewLeadToggle() {
  const { open, setOpen } = useNewLead();
  if (open) return null;
  return (
    <button type="button" onClick={() => setOpen(true)} className="btn-primary">
      Add lead
    </button>
  );
}

export function NewLeadPanel() {
  const { open, setOpen } = useNewLead();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) return null;

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

  return (
    <div className="mx-auto max-w-3xl border border-plynos-navy/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-plynos-navy dark:text-white">New lead</h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs font-medium text-plynos-slate hover:text-plynos-navy dark:text-white/60 dark:hover:text-white"
        >
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
          <label className="label-field">Industry</label>
          <input className="input-field" name="niche" />
        </div>
        <div>
          <label className="label-field">Website URL</label>
          <input className="input-field" name="website_url" />
        </div>
        <div>
          <label className="label-field">Source</label>
          <Select<LeadSource>
            name="source"
            defaultValue="website"
            options={SOURCE_OPTIONS}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div>
          <label className="label-field">Status</label>
          <Select<LeadStatus>
            name="status"
            defaultValue="new"
            options={STATUS_OPTIONS}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="label-field">Goal</label>
          <textarea className="input-field min-h-[100px] resize-none" name="goal" />
        </div>
        <div className="md:col-span-2">
          <label className="label-field">Notes</label>
          <textarea className="input-field min-h-[80px] resize-none" name="notes" />
        </div>

        {error ? (
          <p className="md:col-span-2 border-l-2 border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-200">
            {error}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Saving…
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
