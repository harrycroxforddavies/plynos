import { PageHeader } from "@/components/admin/PageHeader";

export const metadata = { title: "Ask Plynos" };

export default function AskPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Ask Plynos"
        description="A chat that knows your leads, opportunities, and pipeline. Ask anything."
      />
      <div className="border border-plynos-navy/10 px-6 py-16 text-center text-sm text-plynos-slate dark:border-white/10 dark:text-white/60">
        Coming soon.
      </div>
    </div>
  );
}
