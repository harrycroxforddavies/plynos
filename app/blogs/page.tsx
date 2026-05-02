import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Drift } from "@/components/site/Drift";
import { blogPosts, localize } from "@/lib/blogs";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export const metadata = {
  title: "Blogs",
  description:
    "Short reads on websites, design and ownership from the Plynos studio.",
};

export default function BlogsIndex() {
  const lang = getLang();
  const ui = t(lang).blogsIndex;

  return (
    <>
      <SiteHeader />
      <main className="bg-white transition-colors dark:bg-plynos-navy">
        <section className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <Drift>
              <h1 className="text-balance text-4xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-6xl dark:text-white">
                {ui.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-balance text-lg text-plynos-slate md:text-xl dark:text-white/70">
                {ui.subhead}
              </p>
            </Drift>
          </div>

          <div className="mt-16 space-y-10 md:mt-24 md:space-y-14">
            {blogPosts.map((p) => (
              <Link
                href={`/blogs/${p.slug}`}
                id={p.slug}
                key={p.slug}
                className="group grid scroll-mt-24 gap-6 border-b border-plynos-navy/10 pb-10 last:border-b-0 last:pb-0 md:grid-cols-[1fr,1.4fr] md:gap-10 md:pb-14 dark:border-white/10"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-plynos-navy/10 dark:border-white/10">
                  <Image
                    src={p.image}
                    alt=""
                    width={500}
                    height={500}
                    unoptimized
                    className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full border border-plynos-navy/10 bg-plynos-soft/50 px-2 py-0.5 font-medium text-plynos-slate dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                      {localize(p.tag, lang)}
                    </span>
                    <span className="text-plynos-slate dark:text-white/50">{localize(p.read, lang)}</span>
                  </div>
                  <h2 className="mt-4 text-balance text-2xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-4xl dark:text-white">
                    {localize(p.title, lang)}
                  </h2>
                  <p className="mt-4 text-base text-plynos-slate md:text-lg dark:text-white/70">
                    {localize(p.excerpt, lang)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-plynos-blue dark:text-plynos-soft">
                    {ui.readPost}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
