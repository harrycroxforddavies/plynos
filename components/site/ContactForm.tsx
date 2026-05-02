"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

type Strings = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  successHeadline: string;
  successBody: string;
  successAction: string;
};

export function ContactForm({ strings }: { strings: Strings }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      goal: String(fd.get("message") ?? "").trim(),
      consent: true,
      website: String(fd.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.fieldErrors) setFieldErrors(data.fieldErrors);
        setError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("Network error. Please try again in a moment.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-4 rounded-2xl border border-plynos-navy/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5 dark:shadow-none">
        <CheckCircle2 className="mt-0.5 h-6 w-6 flex-none text-emerald-500" />
        <div>
          <h3 className="text-lg font-semibold text-plynos-navy dark:text-white">
            {strings.successHeadline}
          </h3>
          <p className="mt-1 text-sm text-plynos-slate dark:text-white/70">{strings.successBody}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-5 text-sm font-medium text-plynos-blue hover:underline dark:text-plynos-soft"
          >
            {strings.successAction}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      {/* Honeypot */}
      <div aria-hidden className="hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={strings.nameLabel} name="name" error={fieldErrors.name}>
          <input
            id="name"
            className="input-field"
            type="text"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder={strings.namePlaceholder}
          />
        </Field>
        <Field label={strings.emailLabel} name="email" error={fieldErrors.email}>
          <input
            id="email"
            className="input-field"
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder={strings.emailPlaceholder}
          />
        </Field>
      </div>

      <Field label={strings.messageLabel} name="message" error={fieldErrors.goal}>
        <textarea
          id="message"
          className="input-field min-h-[160px] resize-none"
          name="message"
          required
          maxLength={2000}
          placeholder={strings.messagePlaceholder}
        />
      </Field>

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {strings.sending}
            </>
          ) : (
            strings.send
          )}
        </button>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-plynos-navy dark:text-white">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
