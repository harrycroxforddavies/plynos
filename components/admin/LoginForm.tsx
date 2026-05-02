"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm({
  redirectTo,
  disabled,
}: {
  redirectTo: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setSubmitting(false);
        return;
      }

      router.replace(redirectTo);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not sign in. Please try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-medium text-plynos-slate dark:text-white/60"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="input-field"
          disabled={disabled || submitting}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-xs font-medium text-plynos-slate dark:text-white/60"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="input-field"
          disabled={disabled || submitting}
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="border-l-2 border-red-500 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-200"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={disabled || submitting}
        className="btn-primary w-full disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
