"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Strings = {
  blogs: string;
  contact: string;
  requestWebsite: string;
};

export function MobileMenu({ strings }: { strings: Strings }) {
  const [open, setOpen] = useState(false);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-plynos-navy transition hover:bg-plynos-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plynos-blue focus-visible:ring-offset-2 md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-30 bg-plynos-navy/20 backdrop-blur-sm md:hidden"
          />
          {/* Panel */}
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 z-40 border-b border-plynos-navy/10 bg-white md:hidden"
          >
            <nav className="container-page flex flex-col py-4 text-base">
              <Link
                href="/blogs"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-plynos-navy transition hover:bg-plynos-soft/60"
              >
                {strings.blogs}
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-plynos-navy transition hover:bg-plynos-soft/60"
              >
                {strings.contact}
              </Link>
              <Link
                href="/#lead-form"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-plynos-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-plynos-blue"
              >
                {strings.requestWebsite}
              </Link>
              <div className="mt-4 flex items-center justify-end border-t border-plynos-navy/10 pt-4">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </>
  );
}
