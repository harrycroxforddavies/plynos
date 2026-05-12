import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts, localize } from "@/lib/blogs";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export function Blogs() {
  const lang = getLang();
  const ui = t(lang).blogsHome;
  const featured = blogPosts.slice(0, 3);

  return (
    <section id="blogs" className="section bg-white transition-colors dark:bg-plynos-navy">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-[1fr,auto] md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-plynos-navy/10 bg-white px-3 py-1 text-xs font-medium text-plynos-slate shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:shadow-none">
              {ui.eyebrow}
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-5xl dark:text-white">
              {ui.headline}
            </h2>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-plynos-slate transition hover:text-plynos-navy md:self-end dark:text-white/70 dark:hover:text-white"
          >
            {ui.viewAll} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/blogs/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-plynos-navy/10 bg-white shadow-soft transition hover:border-plynos-navy/30 dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:border-white/30"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={localize(p.title, lang)}
                  width={500}
                  height={500}
                  unoptimized
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-plynos-navy/10 bg-plynos-soft/50 px-2 py-0.5 text-[10px] font-medium text-plynos-slate dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                    {localize(p.tag, lang)}
                  </span>
                  <span className="text-xs text-plynos-slate dark:text-white/50">{localize(p.read, lang)}</span>
                </div>
                <h3 className="text-lg font-semibold leading-tight text-plynos-navy dark:text-white">
                  {localize(p.title, lang)}
                </h3>
                <p className="text-sm text-plynos-slate dark:text-white/70">{localize(p.excerpt, lang)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
