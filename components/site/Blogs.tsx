import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Drift } from "./Drift";
import { blogPosts } from "@/lib/blogs";

export function Blogs() {
  const featured = blogPosts.slice(0, 3);

  return (
    <section id="blogs" className="section bg-white">
      <div className="container-page">
        <Drift className="grid gap-10 md:grid-cols-[1fr,auto] md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-plynos-navy/10 bg-white px-3 py-1 text-xs font-medium text-plynos-slate shadow-sm">
              From the studio
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-5xl">
              Short reads on websites that work.
            </h2>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-plynos-slate transition hover:text-plynos-navy md:self-end"
          >
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Drift>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/blogs/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-plynos-navy/10 bg-white shadow-soft transition hover:border-plynos-navy/30"
            >
              <div className="relative aspect-square w-full overflow-hidden">
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
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-plynos-navy/10 bg-plynos-soft/50 px-2 py-0.5 text-[10px] font-medium text-plynos-slate">
                    {p.tag}
                  </span>
                  <span className="text-xs text-plynos-slate">{p.read}</span>
                </div>
                <h3 className="text-lg font-semibold leading-tight text-plynos-navy">
                  {p.title}
                </h3>
                <p className="text-sm text-plynos-slate">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
