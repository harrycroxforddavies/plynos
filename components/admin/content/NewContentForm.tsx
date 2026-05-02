"use client";

import { useRef, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Select } from "@/components/admin/Select";
import { createContent } from "@/app/admin/(protected)/content/actions";
import type { ContentType } from "@/types/database";

const TYPE_OPTIONS: ContentType[] = ["blog", "news", "portfolio", "testimonial"];

export function NewContentForm() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createContent(fd);
      if (res?.error) {
        setError(res.error);
        return;
      }
      formRef.current?.reset();
      setOpen(false);
    });
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn-primary">
        Add post
      </button>
    );
  }

  return (
    <div className="border border-plynos-navy/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-plynos-navy dark:text-white">New content</h2>
        <button type="button" onClick={() => setOpen(false)} className="text-xs font-medium text-plynos-slate hover:text-plynos-navy dark:text-white/60 dark:hover:text-white">
          Cancel
        </button>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="label-field">Title</label>
          <input className="input-field" name="title" required />
        </div>
        <div>
          <label className="label-field">Type</label>
          <Select<ContentType>
            name="type"
            defaultValue="blog"
            options={TYPE_OPTIONS}
            buttonClassName="py-3 text-sm"
          />
        </div>
        <div>
          <label className="label-field">Slug (optional)</label>
          <input className="input-field" name="slug" placeholder="auto-generated from title" />
        </div>
        <div>
          <label className="label-field">Cover URL</label>
          <input className="input-field" name="cover_url" />
        </div>
        <div className="md:col-span-2">
          <label className="label-field">Excerpt</label>
          <textarea className="input-field min-h-[60px]" name="excerpt" />
        </div>
        <div className="md:col-span-2">
          <label className="label-field">Body</label>
          <textarea className="input-field min-h-[160px]" name="body" />
        </div>
        <label className="md:col-span-2 flex items-center gap-2 text-sm text-plynos-slate">
          <input type="checkbox" name="published" className="h-4 w-4 rounded border-plynos-navy/20 text-plynos-blue focus:ring-plynos-blue" />
          Publish immediately
        </label>

        {error ? (
          <p className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
            {pending ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
            ) : (
              "Save post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
