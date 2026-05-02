"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Megaphone,
  FileText,
  Briefcase,
  ShieldOff,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/site/Logo";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/niches", label: "Niches", icon: Sparkles },
  { href: "/admin/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/deals", label: "Deals", icon: Briefcase },
  { href: "/admin/suppression", label: "Suppression", icon: ShieldOff },
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
    <div className="min-h-screen bg-plynos-soft/30">
      <div className="mx-auto flex max-w-[1400px] gap-0 lg:gap-8 lg:px-6">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-plynos-navy/10 bg-white p-6 transition-transform lg:static lg:translate-x-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {nav.map((item) => {
              const active = pathname?.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                    active
                      ? "bg-plynos-navy text-white"
                      : "text-plynos-slate hover:bg-plynos-soft/60 hover:text-plynos-navy"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 border-t border-plynos-navy/10 pt-5 text-xs text-plynos-slate">
            <p className="truncate">{email ?? "Signed in"}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-plynos-navy/10 px-3 py-1.5 text-plynos-navy hover:bg-plynos-soft/60"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </aside>

        <div className="flex-1 lg:py-6">
          <header className="flex items-center justify-between border-b border-plynos-navy/10 bg-white px-6 py-4 lg:hidden">
            <Logo />
            <button
              type="button"
              className="rounded-lg border border-plynos-navy/10 p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </header>
          <div className="px-6 py-8 lg:rounded-2xl lg:bg-white lg:p-8 lg:shadow-soft">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
