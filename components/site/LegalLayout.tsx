import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="bg-white transition-colors dark:bg-plynos-navy">
        <article className="container-page py-20 md:py-28">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-medium text-plynos-slate dark:text-white/60">
              Last updated {updated}
            </p>
            <h1 className="mt-3 text-balance text-3xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-5xl dark:text-white">
              {title}
            </h1>
            <div className="prose prose-slate mt-10 max-w-none text-plynos-slate prose-headings:text-plynos-navy prose-headings:font-semibold prose-strong:text-plynos-navy prose-a:text-plynos-blue dark:text-white/70 dark:prose-headings:text-white dark:prose-strong:text-white dark:prose-a:text-plynos-soft">
              {children}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
