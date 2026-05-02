"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteContent, togglePublished } from "@/app/admin/(protected)/content/actions";

export function PublishToggle({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-plynos-slate">
      <input
        type="checkbox"
        defaultChecked={published}
        disabled={pending}
        onChange={(e) =>
          startTransition(() => {
            void togglePublished(id, e.target.checked);
          })
        }
        className="h-4 w-4 rounded border-plynos-navy/20 text-plynos-blue focus:ring-plynos-blue"
      />
      Published
    </label>
  );
}

export function ContentDeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this post?")) return;
        startTransition(() => {
          void deleteContent(id);
        });
      }}
      className="inline-flex items-center gap-1 rounded-lg border border-plynos-navy/10 px-2 py-1 text-xs text-plynos-slate hover:border-rose-300 hover:text-rose-600 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" /> Delete
    </button>
  );
}
