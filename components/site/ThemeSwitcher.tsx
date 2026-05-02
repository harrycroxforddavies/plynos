"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
const STORAGE_KEY = "plynos-theme";

function readSavedTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeSwitcher({
  lightLabel = "Light",
  darkLabel = "Dark",
}: {
  lightLabel?: string;
  darkLabel?: string;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readSavedTheme());
  }, []);

  function pick(next: Theme) {
    if (next === theme) return;
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  const baseLink =
    "block py-1 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plynos-blue focus-visible:ring-offset-2";
  const inactive =
    "text-plynos-slate hover:text-plynos-navy dark:text-white/60 dark:hover:text-white";
  const active = "text-plynos-navy dark:text-white";

  return (
    <div role="group" aria-label="Theme" className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={() => pick("light")}
        aria-pressed={theme === "light"}
        className={cn(baseLink, theme === "light" ? active : inactive)}
      >
        {lightLabel}
      </button>
      <button
        type="button"
        onClick={() => pick("dark")}
        aria-pressed={theme === "dark"}
        className={cn(baseLink, theme === "dark" ? active : inactive)}
      >
        {darkLabel}
      </button>
    </div>
  );
}
