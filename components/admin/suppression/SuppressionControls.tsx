"use client";

import { useRef, useTransition } from "react";
import {
  addSuppression,
  removeSuppression,
} from "@/app/admin/(protected)/suppression/actions";

export function AddSuppressionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await addSuppression(fd);
      if (!res?.error) formRef.current?.reset();
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]"
    >
      <input className="input-field" type="email" name="email" placeholder="email@example.com" required />
      <input className="input-field" name="source" placeholder="source (manual, email…)" />
      <input className="input-field" name="reason" placeholder="reason (optional)" />
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
        Suppress
      </button>
    </form>
  );
}

export function SuppressionDeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Remove from suppression list?")) return;
        startTransition(() => {
          void removeSuppression(id);
        });
      }}
      className="text-xs font-medium text-plynos-slate hover:text-red-600 disabled:opacity-50 dark:text-white/60 dark:hover:text-red-400"
    >
      Remove
    </button>
  );
}
