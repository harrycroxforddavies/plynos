"use client";

import { createContext, useContext, useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Select } from "@/components/admin/Select";
import { createDevelopment } from "@/app/admin/(protected)/developments/actions";
import type { DevelopmentStage } from "@/types/database";

const STAGE_OPTIONS: DevelopmentStage[] = [
  "kickoff",
  "discovery",
  "design",
  "dev",
  "staging",
  "live",
  "maintenance",
];

const TEMPLATE_OPTIONS = [
  { value: "", label: "- none -" },
  { value: "blue_collar", label: "Blue-collar landing" },
  { value: "boutique", label: "Boutique fitness / hospitality" },
  { value: "custom", label: "Full custom" },
];

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const Ctx = createContext<Ctx | null>(null);

function useNew() {
  const c = useContext(Ctx);
  if (!c) throw new Error("NewDevelopmentProvider missing");
  return c;
}

export function NewDevelopmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return <Ctx.Provider value={{ open, setOpen }}>{children}</Ctx.Provider>;
}

export function NewDevelopmentToggle({ hasClients }: { hasClients: boolean }) {
  const { open, setOpen } = useNew();
  if (open) return null;
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      disabled={!hasClients}
      className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
      title={hasClients ? undefined : "Add a client first"}
    >
      Add development
    </button>
  );
}

export function NewDevelopmentPanel({
  clients,
}: {
  clients: Array<{ id: string; name: string }>;
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
      const res = await createDevelopment(fd);
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
          New development
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
          <label className="label-field">Project title</label>
          <input
            className="input-field"
            name="title"
            required
            placeholder="Pacheco plumbing landing"
          />
        </div>

        <div>
          <label className="label-field">Client</label>
          <Select<string>
            name="client_id"
            defaultValue=""
            placeholder="Select a client"
            options={[
              { value: "", label: "Select a client" },
              ...clients.map((c) => ({ value: c.id, label: c.name })),
            ]}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div>
          <label className="label-field">Stage</label>
          <Select<DevelopmentStage>
            name="stage"
            defaultValue="kickoff"
            options={STAGE_OPTIONS}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div>
          <label className="label-field">Template</label>
          <Select<string>
            name="template"
            defaultValue=""
            options={TEMPLATE_OPTIONS}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div>
          <label className="label-field">Tech stack</label>
          <input
            className="input-field"
            name="tech_stack"
            placeholder="Next 14, Tailwind"
          />
        </div>
        <div>
          <label className="label-field">Domain</label>
          <input
            className="input-field"
            name="domain"
            placeholder="example.com"
          />
        </div>
        <div>
          <label className="label-field">Repository URL</label>
          <input
            className="input-field"
            name="repo_url"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="label-field">Preview URL</label>
          <input
            className="input-field"
            name="preview_url"
            placeholder="https://"
          />
        </div>
        <div>
          <label className="label-field">Staging URL</label>
          <input
            className="input-field"
            name="staging_url"
            placeholder="https://"
          />
        </div>
        <div>
          <label className="label-field">Live URL</label>
          <input
            className="input-field"
            name="live_url"
            placeholder="https://"
          />
        </div>
        <div>
          <label className="label-field">Started</label>
          <input className="input-field" name="started_at" type="date" />
        </div>
        <div>
          <label className="label-field">Expected live</label>
          <input className="input-field" name="expected_live_at" type="date" />
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
              "Save development"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
