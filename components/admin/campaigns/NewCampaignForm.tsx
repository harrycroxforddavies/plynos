"use client";

import { useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Select } from "@/components/admin/Select";
import { createCampaign } from "@/app/admin/(protected)/campaigns/actions";

export function NewCampaignForm({
  niches,
}: {
  niches: Array<{ id: string; name: string }>;
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
      const res = await createCampaign(fd);
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
        Add campaign
      </button>
    );
  }

  return (
    <div className="border border-plynos-navy/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-plynos-navy dark:text-white">New campaign</h2>
        <button type="button" onClick={() => setOpen(false)} className="text-xs font-medium text-plynos-slate hover:text-plynos-navy dark:text-white/60 dark:hover:text-white">
          Cancel
        </button>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="label-field">Name</label>
          <input className="input-field" name="name" required />
        </div>
        <div>
          <label className="label-field">Channel</label>
          <input className="input-field" name="channel" placeholder="email, whatsapp, cold_call" />
        </div>
        <div>
          <label className="label-field">Subject / hook</label>
          <input className="input-field" name="subject" />
        </div>
        <div>
          <label className="label-field">Variant</label>
          <input className="input-field" name="variant" placeholder="A / B / hook v2" />
        </div>
        <div>
          <label className="label-field">Niche</label>
          <Select<string>
            name="niche_id"
            defaultValue=""
            placeholder="- none -"
            options={[
              { value: "", label: "- none -" },
              ...niches.map((n) => ({ value: n.id, label: n.name })),
            ]}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div className="grid grid-cols-3 gap-3 md:col-span-2 md:grid-cols-6">
          <Stat label="Sent" name="sent" />
          <Stat label="Replies" name="replies" />
          <Stat label="Bounces" name="bounces" />
          <Stat label="Unsubs" name="unsubscribes" />
          <Stat label="Calls" name="booked_calls" />
          <Stat label="Wins" name="wins" />
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
              "Save campaign"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function Stat({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="label-field">{label}</label>
      <input className="input-field" name={name} type="number" min={0} defaultValue={0} />
    </div>
  );
}
