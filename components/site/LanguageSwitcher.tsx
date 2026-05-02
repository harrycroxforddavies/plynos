"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "en_us" | "en_gb" | "es" | "fr" | "nl" | "de";

const COOKIE = "plynos-lang";
const DEFAULT_LANG: Lang = "en_gb";

const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "en_us", label: "English (United States)", short: "EN-US" },
  { code: "en_gb", label: "English (United Kingdom)", short: "EN-GB" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "nl", label: "Nederlands", short: "NL" },
  { code: "de", label: "Deutsch", short: "DE" },
];

function readCookie(): Lang {
  if (typeof document === "undefined") return DEFAULT_LANG;
  const m = document.cookie.match(/(?:^|;\s*)plynos-lang=([a-z_]+)/);
  const v = m?.[1];
  if (v && LANGS.some((l) => l.code === v)) return v as Lang;
  return DEFAULT_LANG;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Lang>(DEFAULT_LANG);
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
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pick(lang: Lang) {
    setOpen(false);
    if (lang === current) return;
    setCurrent(lang);
    document.cookie = `${COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  }

  const currentShort = LANGS.find((l) => l.code === current)?.short ?? "EN-GB";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${currentShort}`}
        className="inline-flex items-center gap-1 px-1 text-xs font-medium text-plynos-slate transition hover:text-plynos-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plynos-blue focus-visible:ring-offset-2 focus-visible:rounded-sm dark:text-white/60 dark:hover:text-white"
      >
        <span>{currentShort}</span>
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden border border-plynos-navy/10 bg-white text-sm shadow-soft dark:border-white/10 dark:bg-plynos-navy"
        >
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="menuitem"
              onClick={() => pick(lang.code)}
              className="block w-full px-3 py-2 text-left text-plynos-slate transition hover:bg-plynos-soft/60 hover:text-plynos-navy dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {lang.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
