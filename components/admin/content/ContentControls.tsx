"use client";

import { useTransition } from "react";
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
      className="text-xs font-medium text-plynos-slate hover:text-red-600 disabled:opacity-50 dark:text-white/60 dark:hover:text-red-400"
    >
      Delete
    </button>
  );
}
