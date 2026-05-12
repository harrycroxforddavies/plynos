"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X } from "lucide-react";
import { ClientStatusSelect } from "./ClientStatusSelect";
import { ClientDeleteButton } from "./ClientDeleteButton";
import { cn, formatDateTime } from "@/lib/utils";
import type { Client } from "@/types/database";

export type ClientWithMeta = Client & {
  developments_count: number;
  developments_preview: { id: string; title: string; stage: string }[];
  last_development_at: string | null;
};

export function ClientDetailPanel({
  client,
  onClose,
}: {
  client: ClientWithMeta | null;
  onClose: () => void;
}) {
  const open = client != null;
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
        "fixed inset-y-0 right-0 z-50 w-full max-w-[32rem] transform border-l border-plynos-navy/10 bg-white shadow-[-12px_0_30px_-18px_rgba(11,18,32,0.18)] transition-transform duration-200 ease-out dark:border-white/10 dark:bg-plynos-navy",
        open ? "translate-x-0" : "pointer-events-none translate-x-full"
      )}
    >
      {client ? (
        <div className="flex h-full flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-plynos-navy/10 px-6 py-5 dark:border-white/10">
            <div className="min-w-0">
              <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
                Client
              </p>
              <h2 className="mt-1 truncate text-lg font-semibold text-plynos-navy dark:text-white">
                {client.name}
              </h2>
              {client.website_url ? (
                <a
                  href={client.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 truncate text-xs text-plynos-slate hover:text-plynos-navy dark:text-white/60 dark:hover:text-white"
                >
                  {client.website_url.replace(/^https?:\/\//, "")}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              ) : null}
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
              <Field label="Status">
                <ClientStatusSelect id={client.id} status={client.status} />
              </Field>
              <Field label="Country">
                <span className="text-sm text-plynos-navy dark:text-white">
                  {client.country ?? "-"}
                </span>
              </Field>
              <Field label="Locale">
                <span className="text-sm text-plynos-navy dark:text-white">
                  {client.locale ?? "-"}
                </span>
              </Field>
              <Field label="Developments">
                <span className="text-sm font-medium text-plynos-navy dark:text-white">
                  {client.developments_count}
                </span>
              </Field>
            </div>

            <Section title="Primary contact">
              <DetailList
                rows={[
                  ["Name", client.primary_contact_name ?? "-"],
                  ["Email", client.primary_contact_email ?? "-"],
                  ["Phone", client.primary_contact_phone ?? "-"],
                ]}
              />
            </Section>

            <Section title="Origin">
              <DetailList
                rows={[
                  [
                    "Source lead",
                    client.source_lead_id ? (
                      <Link
                        href="/admin/leads"
                        className="text-plynos-blue underline-offset-2 hover:underline dark:text-plynos-soft"
                      >
                        View linked lead
                      </Link>
                    ) : (
                      "-"
                    ),
                  ],
                  [
                    "Source opportunity",
                    client.source_opportunity_id ? (
                      <Link
                        href="/admin/opportunities"
                        className="text-plynos-blue underline-offset-2 hover:underline dark:text-plynos-soft"
                      >
                        View linked opportunity
                      </Link>
                    ) : (
                      "-"
                    ),
                  ],
                  ["Created", formatDateTime(client.created_at)],
                  ["Updated", formatDateTime(client.updated_at)],
                ]}
              />
            </Section>

            <Section
              title="Developments"
              action={
                <Link
                  href={`/admin/developments?client=${client.id}`}
                  className="text-xs font-medium text-plynos-blue hover:underline dark:text-plynos-soft"
                >
                  View all
                </Link>
              }
            >
              {client.developments_preview.length === 0 ? (
                <p className="text-sm text-plynos-slate dark:text-white/60">
                  No developments yet for this client.
                </p>
              ) : (
                <ul className="divide-y divide-plynos-navy/5 dark:divide-white/5">
                  {client.developments_preview.map((d) => (
                    <li
                      key={d.id}
                      className="flex items-center justify-between gap-3 py-2.5 text-sm"
                    >
                      <span className="truncate text-plynos-navy dark:text-white">
                        {d.title}
                      </span>
                      <span className="shrink-0 text-xs text-plynos-slate dark:text-white/60">
                        {d.stage}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            {client.notes ? (
              <Section title="Notes">
                <p className="whitespace-pre-wrap text-sm text-plynos-navy dark:text-white">
                  {client.notes}
                </p>
              </Section>
            ) : null}
          </div>

          <footer className="flex items-center justify-end border-t border-plynos-navy/10 px-6 py-4 dark:border-white/10">
            <ClientDeleteButton id={client.id} />
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
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-plynos-slate dark:text-white/60">
          {title}
        </h3>
        {action}
      </div>
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
