import { PageHeader } from "@/components/admin/PageHeader";

export const metadata = { title: "Teams" };

export default function TeamsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Teams"
        description="Members, capacity, performance, scorecards."
      />
      <div className="border border-plynos-navy/10 px-6 py-16 text-center text-sm text-plynos-slate dark:border-white/10 dark:text-white/60">
        Coming soon.
      </div>
    </div>
  );
}
