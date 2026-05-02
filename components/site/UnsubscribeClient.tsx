"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

type Strings = {
  emailLabel: string;
  reasonLabel: string;
  reasonPlaceholder: string;
  submit: string;
  submitting: string;
  successHeadline: string;
  successBody: string;
};

export function UnsubscribeClient({
  defaultEmail,
  strings,
}: {
  defaultEmail: string;
  strings: Strings;
}) {
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
        setError(data?.error ?? "Could not unsubscribe. Please email harry@plynos.dev.");
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
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" />
        <div>
          <p className="font-medium text-plynos-navy">{strings.successHeadline}</p>
          <p className="mt-1 text-sm text-plynos-slate">{strings.successBody}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="label-field">{strings.emailLabel}</label>
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
        <label className="label-field">{strings.reasonLabel}</label>
        <textarea
          className="input-field min-h-[80px]"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={strings.reasonPlaceholder}
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
            <Loader2 className="h-4 w-4 animate-spin" /> {strings.submitting}
          </>
        ) : (
          strings.submit
        )}
      </button>
    </form>
  );
}
