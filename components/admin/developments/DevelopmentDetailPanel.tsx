"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X } from "lucide-react";
import { StageBadge } from "./StageBadge";
import { DevelopmentStageSelect } from "./DevelopmentStageSelect";
import { DevelopmentProgressInput } from "./DevelopmentProgressInput";
import { DevelopmentDeleteButton } from "./DevelopmentDeleteButton";
import { cn, formatDate, formatDateTime } from "@/lib/utils";
import type { Development } from "@/types/database";

export type DevelopmentWithClient = Development & {
  client: { id: string; name: string; country: string | null; locale: string | null } | null;
};

export function DevelopmentDetailPanel({
  development,
  onClose,
}: {
  development: DevelopmentWithClient | null;
  onClose: () => void;
}) {
  const open = development != null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  const panel = (
    <aside
      aria-hidden={!open}
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-[34rem] transform border-l border-plynos-navy/10 bg-white shadow-[-12px_0_30px_-18px_rgba(11,18,32,0.18)] transition-transform duration-200 ease-out dark:border-white/10 dark:bg-plynos-navy",
        open ? "translate-x-0" : "pointer-events-none translate-x-full"
      )}
    >
      {development ? (
        <div className="flex h-full flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-plynos-navy/10 px-6 py-5 dark:border-white/10">
            <div className="min-w-0">
              <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
                Development
              </p>
              <h2 className="mt-1 truncate text-lg font-semibold text-plynos-navy dark:text-white">
                {development.title}
              </h2>
              <p className="mt-0.5 truncate text-sm text-plynos-slate dark:text-white/60">
                {development.client?.name ?? "Unlinked client"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="-mr-2 rounded-md p-1.5 text-plynos-slate transition hover:bg-plynos-soft/40 hover:text-plynos-navy dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </header>

          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Stage">
                <div className="flex flex-col gap-2">
                  <StageBadge stage={development.stage} />
                  <DevelopmentStageSelect
                    id={development.id}
                    stage={development.stage}
                  />
                </div>
              </Field>
              <Field label="Progress">
                <DevelopmentProgressInput
                  id={development.id}
                  value={development.progress_pct}
                />
              </Field>
            </div>

            <Section title="Timeline">
              <DetailList
                rows={[
                  ["Started", formatDate(development.started_at)],
                  ["Expected live", formatDate(development.expected_live_at)],
                  ["Actual live", formatDate(development.actual_live_at)],
                  ["Stage changed", formatDateTime(development.stage_changed_at)],
                  ["Last updated", formatDateTime(development.updated_at)],
                ]}
              />
            </Section>

            <Section title="Build">
              <DetailList
                rows={[
                  ["Template", development.template ?? "-"],
                  ["Tech stack", development.tech_stack ?? "-"],
                  ["Domain", development.domain ?? "-"],
                ]}
              />
            </Section>

            <Section title="Links">
              <ul className="space-y-2 text-sm">
                <LinkRow label="Preview" url={development.preview_url} />
                <LinkRow label="Staging" url={development.staging_url} />
                <LinkRow label="Live" url={development.live_url} />
                <LinkRow label="Repository" url={development.repo_url} />
              </ul>
            </Section>

            {development.notes ? (
              <Section title="Notes">
                <p className="whitespace-pre-wrap text-sm text-plynos-navy dark:text-white">
                  {development.notes}
                </p>
              </Section>
            ) : null}
          </div>

          <footer className="flex items-center justify-end border-t border-plynos-navy/10 px-6 py-4 dark:border-white/10">
            <DevelopmentDeleteButton id={development.id} />
          </footer>
        </div>
      ) : null}
    </aside>
  );

  return createPortal(panel, document.body);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-plynos-slate dark:text-white/60">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function DetailList({ rows }: { rows: Array<[string, React.ReactNode]> }) {
  return (
    <dl className="divide-y divide-plynos-navy/5 dark:divide-white/5">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-6 py-3 text-sm">
          <dt className="text-plynos-slate dark:text-white/60">{k}</dt>
          <dd className="min-w-0 truncate text-right text-plynos-navy dark:text-white">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function LinkRow({ label, url }: { label: string; url: string | null }) {
  return (
    <li className="flex items-center justify-between gap-4">
      <span className="text-plynos-slate dark:text-white/60">{label}</span>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-w-0 items-center gap-1 truncate text-plynos-navy hover:underline dark:text-white"
        >
          <span className="truncate">{url.replace(/^https?:\/\//, "")}</span>
          <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
        </a>
      ) : (
        <span className="text-plynos-slate dark:text-white/40">-</span>
      )}
    </li>
  );
}
