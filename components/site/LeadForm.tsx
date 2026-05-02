"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim() || null,
      company: String(formData.get("company") ?? "").trim() || null,
      website_url: String(formData.get("website_url") ?? "").trim() || null,
      niche: String(formData.get("niche") ?? "").trim() || null,
      goal: String(formData.get("goal") ?? "").trim(),
      deadline: String(formData.get("deadline") ?? "").trim() || null,
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
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
      <div className="card flex items-start gap-4">
        <CheckCircle2 className="mt-0.5 h-6 w-6 flex-none text-emerald-500" />
        <div>
          <h3 className="text-lg font-semibold text-plynos-navy">
            Thanks. Your request is in.
          </h3>
          <p className="mt-1 text-sm text-plynos-slate">
            Harry will review your request and reply by email within one
            business day, usually much sooner.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-5 text-sm font-medium text-plynos-blue hover:underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card grid gap-5"
      aria-describedby={error ? "lead-form-error" : undefined}
    >
      {/* Honeypot */}
      <div aria-hidden className="hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required error={fieldErrors.name}>
          <input className="input-field" type="text" name="name" required maxLength={120} autoComplete="name" />
        </Field>
        <Field label="Email" name="email" required error={fieldErrors.email}>
          <input className="input-field" type="email" name="email" required maxLength={200} autoComplete="email" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone number (optional)" name="phone" error={fieldErrors.phone}>
          <input
            className="input-field"
            type="tel"
            name="phone"
            maxLength={40}
            autoComplete="tel"
            placeholder="+44 7700 900123"
            inputMode="tel"
          />
        </Field>
        <Field label="Company name" name="company" error={fieldErrors.company}>
          <input className="input-field" type="text" name="company" maxLength={160} autoComplete="organization" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Current website (optional)" name="website_url" error={fieldErrors.website_url}>
          <input className="input-field" type="text" name="website_url" placeholder="https://" maxLength={300} />
        </Field>
        <Field label="Industry" name="niche" error={fieldErrors.niche}>
          <input className="input-field" type="text" name="niche" placeholder="e.g. Boutique fitness studio" maxLength={160} />
        </Field>
      </div>

      <Field label="What do you need the website to achieve?" name="goal" required error={fieldErrors.goal}>
        <textarea
          className="input-field min-h-[120px] resize-y"
          name="goal"
          required
          maxLength={2000}
          placeholder="More booked enquiries, replace an outdated site, look credible to new clients…"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-plynos-slate">
        <span className="relative mt-0.5 flex h-4 w-4 flex-none">
          <input
            type="checkbox"
            name="consent"
            required
            className="peer absolute inset-0 h-4 w-4 cursor-pointer opacity-0"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded border border-plynos-navy/25 bg-white transition peer-checked:border-plynos-navy peer-checked:bg-plynos-navy peer-focus-visible:ring-2 peer-focus-visible:ring-plynos-blue/40 peer-focus-visible:ring-offset-2"
          />
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute inset-0 h-4 w-4 text-white opacity-0 transition peer-checked:opacity-100"
          >
            <polyline points="2.5 6.5 5 9 9.5 3.5" />
          </svg>
        </span>
        <span>
          I agree to be contacted about this request. See our{" "}
          <a href="/privacy" className="text-plynos-blue hover:underline">
            privacy policy
          </a>
          .
        </span>
      </label>
      {fieldErrors.consent ? (
        <p className="-mt-3 text-xs text-red-600">{fieldErrors.consent}</p>
      ) : null}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Request a website"
          )}
        </button>
        <p className="text-xs text-plynos-slate">
          Replies usually within a few hours during the working day.
        </p>
      </div>

      {error ? (
        <p
          id="lead-form-error"
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
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-field">
        {label}
        {required ? <span className="ml-1 text-plynos-blue">*</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
