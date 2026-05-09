"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Logo } from "@/components/site/Logo";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/opportunities", label: "Opportunities" },
  { href: "/admin/campaigns", label: "Campaigns" },
  { href: "/admin/niches", label: "Niches" },
  { href: "/admin/suppression", label: "Suppression" },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-white text-plynos-navy transition-colors dark:bg-plynos-navy dark:text-white">
      <div className="mx-auto flex w-full max-w-[1400px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-y-auto border-r border-plynos-navy/10 bg-white p-6 transition-transform dark:border-white/10 dark:bg-plynos-navy lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex items-center justify-between">
            <Logo className="[&_img]:h-11 [&_img]:w-11" />
            <button
              type="button"
              className="text-plynos-slate hover:text-plynos-navy lg:hidden dark:text-white/60 dark:hover:text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="mt-12 flex flex-col gap-0.5 text-sm">
            {nav.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 transition",
                    active
                      ? "bg-plynos-soft text-plynos-navy dark:bg-white/10 dark:text-white"
                      : "text-plynos-slate hover:bg-plynos-soft/60 hover:text-plynos-navy dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-plynos-navy/10 pt-6 text-xs dark:border-white/10">
            <p className="truncate text-plynos-slate dark:text-white/60">{email ?? "Signed in"}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-3 text-sm font-medium text-plynos-navy hover:text-plynos-blue dark:text-white dark:hover:text-plynos-soft"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-plynos-navy/10 bg-white px-6 py-4 lg:hidden dark:border-white/10 dark:bg-plynos-navy">
            <Logo className="[&_img]:h-11 [&_img]:w-11" />
            <button
              type="button"
              className="text-plynos-slate hover:text-plynos-navy dark:text-white/70 dark:hover:text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </header>
          <div className="px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
