import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/site/Logo";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirectTo?: string; error?: string };
}) {
  const configured = isSupabaseConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-plynos-soft/40 px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center">
          <Logo />
        </div>
        <div className="card">
          <h1 className="text-xl font-semibold text-plynos-navy">
            Sign in to Plynos
          </h1>
          <p className="mt-1 text-sm text-plynos-slate">
            Admin access only. Use your Supabase credentials.
          </p>

          {!configured ? (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              Supabase is not yet configured. Set{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
              in your environment to enable login.
            </div>
          ) : null}

          {searchParams.error === "forbidden" ? (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              That account does not have admin access.
            </div>
          ) : null}

          <div className="mt-6">
            <LoginForm
              redirectTo={searchParams.redirectTo ?? "/admin/dashboard"}
              disabled={!configured}
            />
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-plynos-slate">
          Lost your password? Reset it from the Supabase dashboard.
        </p>
      </div>
    </main>
  );
}
