import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/site/Logo";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirectTo?: string; error?: string };
}) {
  const configured = isSupabaseConfigured();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-16 transition-colors dark:bg-plynos-navy">
      <div className="w-full max-w-sm">
        <div className="mb-12 flex items-center justify-center">
          <Logo />
        </div>

        <div className="border-y border-plynos-navy/10 py-10 dark:border-white/10">
          <h1 className="text-balance text-2xl font-semibold tracking-tightish text-plynos-navy dark:text-white">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-plynos-slate dark:text-white/60">
            Authorised personnel only.
          </p>

          {!configured ? (
            <div className="mt-6 border-l-2 border-amber-500 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
              Service unavailable. Configuration is incomplete.
            </div>
          ) : null}

          {searchParams.error === "forbidden" ? (
            <div className="mt-6 border-l-2 border-red-500 bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-200">
              This account is not authorised.
            </div>
          ) : null}

          <div className="mt-8">
            <LoginForm
              redirectTo={searchParams.redirectTo ?? "/admin/dashboard"}
              disabled={!configured}
            />
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-plynos-slate dark:text-white/50">
          Forgot your password? Contact your administrator.
        </p>
      </div>
    </main>
  );
}
