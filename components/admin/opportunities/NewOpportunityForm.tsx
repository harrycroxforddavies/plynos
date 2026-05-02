"use client";

import { createContext, useContext, useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Select } from "@/components/admin/Select";
import { createOpportunity } from "@/app/admin/(protected)/opportunities/actions";
import type { OpportunityPaymentStatus, OpportunityStatus } from "@/types/database";

const STATUS_OPTIONS: OpportunityStatus[] = ["open", "won", "lost"];
const PAYMENT_OPTIONS: OpportunityPaymentStatus[] = [
  "unpaid",
  "deposit",
  "paid",
  "refunded",
];

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const NewOpportunityCtx = createContext<Ctx | null>(null);

function useNewOpportunity() {
  const c = useContext(NewOpportunityCtx);
  if (!c) throw new Error("NewOpportunityProvider missing");
  return c;
}

export function NewOpportunityProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <NewOpportunityCtx.Provider value={{ open, setOpen }}>{children}</NewOpportunityCtx.Provider>
  );
}

export function NewOpportunityToggle() {
  const { open, setOpen } = useNewOpportunity();
  if (open) return null;
  return (
    <button type="button" onClick={() => setOpen(true)} className="btn-primary">
      Add opportunity
    </button>
  );
}

export function NewOpportunityPanel({
  leads,
}: {
  leads: Array<{ id: string; name: string; email: string }>;
}) {
  const { open, setOpen } = useNewOpportunity();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createOpportunity(fd);
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
        <h2 className="text-base font-semibold text-plynos-navy dark:text-white">New opportunity</h2>
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
          <label className="label-field">Lead</label>
          <Select<string>
            name="lead_id"
            defaultValue=""
            placeholder="- none -"
            options={[
              { value: "", label: "- none -" },
              ...leads.map((l) => ({
                value: l.id,
                label: `${l.name} - ${l.email}`,
              })),
            ]}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div>
          <label className="label-field">Value (EUR)</label>
          <input className="input-field" name="value_eur" type="number" min={0} step={1} placeholder="600" />
        </div>
        <div>
          <label className="label-field">Status</label>
          <Select<OpportunityStatus>
            name="status"
            defaultValue="open"
            options={STATUS_OPTIONS}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div>
          <label className="label-field">Payment status</label>
          <Select<OpportunityPaymentStatus>
            name="payment_status"
            defaultValue="unpaid"
            options={PAYMENT_OPTIONS}
            buttonClassName="py-3 text-sm"
          />
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
            {pending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>) : "Save opportunity"}
          </button>
        </div>
      </form>
    </div>
  );
}
