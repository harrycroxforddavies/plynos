"use client";

import { createContext, useContext, useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Select } from "@/components/admin/Select";
import { createClient } from "@/app/admin/(protected)/clients/actions";
import type { ClientStatus } from "@/types/database";

const STATUS_OPTIONS: ClientStatus[] = ["active", "paused", "archived"];

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const Ctx = createContext<Ctx | null>(null);

function useNew() {
  const c = useContext(Ctx);
  if (!c) throw new Error("NewClientProvider missing");
  return c;
}

export function NewClientProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}

export function NewClientToggle() {
  const { open, setOpen } = useNew();
  if (open) return null;
  return (
    <button type="button" onClick={() => setOpen(true)} className="btn-primary">
      Add client
    </button>
  );
}

export function NewClientPanel({
  leads,
  opportunities,
}: {
  leads: Array<{ id: string; name: string; email: string }>;
  opportunities: Array<{
    id: string;
    lead_id: string | null;
    value_eur: number | null;
    status: string;
    created_at: string;
  }>;
}) {
  const { open, setOpen } = useNew();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createClient(fd);
      if (res?.error) {
        setError(res.error);
        return;
      }
      formRef.current?.reset();
      setOpen(false);
    });
  }

  return (
    <div className="border border-plynos-navy/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-plynos-navy dark:text-white">
          New client
        </h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs font-medium text-plynos-slate hover:text-plynos-navy dark:text-white/60 dark:hover:text-white"
        >
          Cancel
        </button>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-5 grid gap-4 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <label className="label-field">Company name</label>
          <input
            className="input-field"
            name="name"
            required
            placeholder="Hidráulica Pacheco"
          />
        </div>

        <div>
          <label className="label-field">Primary contact name</label>
          <input className="input-field" name="primary_contact_name" />
        </div>
        <div>
          <label className="label-field">Primary contact email</label>
          <input
            className="input-field"
            name="primary_contact_email"
            type="email"
          />
        </div>
        <div>
          <label className="label-field">Primary contact phone</label>
          <input className="input-field" name="primary_contact_phone" />
        </div>
        <div>
          <label className="label-field">Country</label>
          <input className="input-field" name="country" placeholder="ES" />
        </div>
        <div>
          <label className="label-field">Locale</label>
          <input className="input-field" name="locale" placeholder="es" />
        </div>
        <div>
          <label className="label-field">Status</label>
          <Select<ClientStatus>
            name="status"
            defaultValue="active"
            options={STATUS_OPTIONS}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="label-field">Website URL</label>
          <input
            className="input-field"
            name="website_url"
            placeholder="https://"
          />
        </div>

        <div>
          <label className="label-field">Source lead</label>
          <Select<string>
            name="source_lead_id"
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
          <label className="label-field">Source opportunity</label>
          <Select<string>
            name="source_opportunity_id"
            defaultValue=""
            placeholder="- none -"
            options={[
              { value: "", label: "- none -" },
              ...opportunities.map((o) => ({
                value: o.id,
                label: `${o.status} · ${
                  o.value_eur != null ? `€${o.value_eur}` : "—"
                } · ${new Date(o.created_at).toLocaleDateString("en-GB")}`,
              })),
            ]}
            buttonClassName="py-3 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label-field">Notes</label>
          <textarea className="input-field min-h-[80px]" name="notes" />
        </div>

        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 md:col-span-2">
            {error}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="btn-primary disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </>
            ) : (
              "Save client"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
