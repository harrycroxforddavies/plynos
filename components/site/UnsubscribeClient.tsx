"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export function UnsubscribeClient({ defaultEmail }: { defaultEmail: string }) {
  const [email, setEmail] = useState(defaultEmail);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason: reason || null, source: "unsubscribe-page" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Could not unsubscribe. Please email hello@plynos.dev.");
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-plynos-blue" />
        <div>
          <p className="font-medium text-plynos-navy">You're unsubscribed.</p>
          <p className="mt-1 text-sm text-plynos-slate">
            We won't contact <strong>{email}</strong> again. Reply to any past
            email or write to hello@plynos.dev if you'd like to opt back in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="label-field">Email</label>
        <input
          type="email"
          required
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div>
        <label className="label-field">Reason (optional)</label>
        <textarea
          className="input-field min-h-[80px]"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Anything that helps us stop bothering people who don't want to hear from us."
        />
      </div>
      {error ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          "Unsubscribe"
        )}
      </button>
    </form>
  );
}
