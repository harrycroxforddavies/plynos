"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectOption<T extends string> = T | { value: T; label: string };

type Props<T extends string> = {
  options: ReadonlyArray<SelectOption<T>>;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  placeholder?: string;
  value?: T;
  onChange?: (v: T) => void;
  name?: string;
  defaultValue?: T;
  ariaLabel?: string;
};

export function Select<T extends string>({
  options,
  disabled,
  className,
  buttonClassName,
  placeholder,
  value,
  onChange,
  name,
  defaultValue,
  ariaLabel,
}: Props<T>) {
  const [internal, setInternal] = useState<T | undefined>(defaultValue);
  const current = value !== undefined ? value : internal;

  const items = useMemo(
    () =>
      options.map((o) =>
        typeof o === "string"
          ? { value: o as T, label: o as string }
          : (o as { value: T; label: string })
      ),
    [options]
  );

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(() =>
    Math.max(
      0,
      items.findIndex((i) => i.value === current)
    )
  );
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const btnId = useId();
  const listId = useId();

  const commit = useCallback(
    (next: T) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    },
    [value, onChange]
  );

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(items.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = items[activeIdx];
        if (item) {
          commit(item.value);
          setOpen(false);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIdx(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIdx(items.length - 1);
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, items, activeIdx, commit]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[activeIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIdx]);

  function toggle() {
    if (disabled) return;
    const next = !open;
    setOpen(next);
    if (next) {
      const idx = items.findIndex((i) => i.value === current);
      setActiveIdx(idx >= 0 ? idx : 0);
    }
  }

  const selectedLabel = items.find((i) => i.value === current)?.label;

  return (
    <div ref={ref} className={cn("relative inline-block w-full", className)}>
      <button
        id={btnId}
        type="button"
        disabled={disabled}
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-lg border border-plynos-navy/15 bg-white py-1.5 pl-3 pr-3 text-left text-xs font-medium text-plynos-navy transition focus:border-plynos-blue focus:outline-none focus:ring-2 focus:ring-plynos-blue/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:bg-white/5 dark:text-white",
          buttonClassName
        )}
      >
        <span className={cn("truncate", !selectedLabel && "text-plynos-slate dark:text-white/50")}>
          {selectedLabel ?? placeholder ?? "Select"}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-plynos-slate transition dark:text-white/60",
            open && "rotate-180"
          )}
        />
      </button>
      {open ? (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          aria-activedescendant={items[activeIdx] ? `${listId}-${activeIdx}` : undefined}
          className="absolute left-0 right-0 z-20 mt-1 max-h-44 overflow-auto rounded-lg border border-plynos-navy/10 bg-white py-1 shadow-[0_8px_24px_-12px_rgba(11,18,32,0.18)] dark:border-white/10 dark:bg-plynos-navy"
        >
          {items.map((item, i) => {
            const selected = item.value === current;
            const active = i === activeIdx;
            return (
              <li
                key={item.value}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => {
                  commit(item.value);
                  setOpen(false);
                }}
                className={cn(
                  "cursor-pointer px-3 py-1.5 text-xs",
                  active
                    ? "bg-plynos-soft/60 text-plynos-navy dark:bg-white/10 dark:text-white"
                    : "text-plynos-navy dark:text-white",
                  selected && "font-medium"
                )}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      ) : null}
      {name ? <input type="hidden" name={name} value={current ?? ""} /> : null}
    </div>
  );
}
