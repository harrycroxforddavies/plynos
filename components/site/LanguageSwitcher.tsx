"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "en" | "es";
const LANGS: Lang[] = ["en", "es"];
const COOKIE = "plynos-lang";

function readCookie(): Lang {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)plynos-lang=(en|es)/);
  return (match?.[1] as Lang) ?? "en";
}

export function LanguageSwitcher() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Lang>("en");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(readCookie());
  }, []);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function pick(lang: Lang) {
    setCurrent(lang);
    setOpen(false);
    // Persist choice for one year and re-fetch the RSC payload so server
    // components pick up the new locale.
    document.cookie = `${COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${current.toUpperCase()}`}
        disabled={pending}
        className="inline-flex items-center gap-1 px-1 text-xs font-medium text-plynos-slate transition hover:text-plynos-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plynos-blue focus-visible:ring-offset-2 focus-visible:rounded-sm disabled:opacity-60"
      >
        <span>{current.toUpperCase()}</span>
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-20 overflow-hidden rounded-lg border border-plynos-navy/10 bg-white shadow-lg"
        >
          {LANGS.map((lang) => (
            <button
              key={lang}
              type="button"
              role="menuitem"
              onClick={() => pick(lang)}
              className={cn(
                "block w-full px-3 py-2 text-left text-xs font-medium transition",
                current === lang
                  ? "bg-plynos-soft/60 text-plynos-navy"
                  : "text-plynos-slate hover:bg-plynos-soft/40 hover:text-plynos-navy"
              )}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
