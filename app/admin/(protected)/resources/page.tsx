import { PageHeader } from "@/components/admin/PageHeader";

export const metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Resources"
        description="SOPs, templates, checklists. The knowledge that runs the studio."
      />
      <div className="border border-plynos-navy/10 px-6 py-16 text-center text-sm text-plynos-slate dark:border-white/10 dark:text-white/60">
        Coming soon.
      </div>
    </div>
  );
}
