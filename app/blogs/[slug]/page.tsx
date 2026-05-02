import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Drift } from "@/components/site/Drift";
import { blogPosts, findPostBySlug, localize } from "@/lib/blogs";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = findPostBySlug(params.slug);
  if (!post) return {};
  // Default to EN for metadata since meta is server-emitted at request time
  return {
    title: post.title.en,
    description: post.excerpt.en,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = findPostBySlug(params.slug);
  if (!post) notFound();

  const lang = getLang();
  const ui = t(lang).blogsPost;
  const next = blogPosts.find((p) => p.slug !== post.slug);

  return (
    <>
      <SiteHeader />
      <main className="bg-white transition-colors dark:bg-plynos-navy">
        <article className="container-page py-20 md:py-28">
          <div className="max-w-3xl">
            <Drift>
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full border border-plynos-navy/10 bg-plynos-soft/50 px-2 py-0.5 font-medium text-plynos-slate dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                  {localize(post.tag, lang)}
                </span>
                <span className="text-plynos-slate dark:text-white/50">{localize(post.read, lang)}</span>
              </div>
              <h1 className="mt-6 text-balance text-4xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-6xl dark:text-white">
                {localize(post.title, lang)}
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-lg text-plynos-slate md:text-xl dark:text-white/70">
                {localize(post.excerpt, lang)}
              </p>
            </Drift>
          </div>

          <div className="mt-12 max-w-md overflow-hidden rounded-2xl border border-plynos-navy/10 md:mt-16 dark:border-white/10">
            <div className="relative aspect-square w-full">
              <Image
                src={post.image}
                alt=""
                fill
                unoptimized
                className="object-contain"
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-12 max-w-2xl space-y-6 md:mt-16 md:space-y-7">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="mt-10 text-balance text-2xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-3xl dark:text-white"
                  >
                    {localize(block.text, lang)}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  className="text-base leading-relaxed text-plynos-slate md:text-lg dark:text-white/70"
                >
                  {localize(block.text, lang)}
                </p>
              );
            })}
          </div>

          {next ? (
            <div className="mt-20 max-w-2xl border-t border-plynos-navy/10 pt-10 md:mt-28 dark:border-white/10">
              <p className="text-xs font-medium text-plynos-slate dark:text-white/60">{ui.readNext}</p>
              <Link
                href={`/blogs/${next.slug}`}
                className="mt-3 inline-flex items-baseline gap-2 text-balance text-2xl font-semibold !leading-tight tracking-tightish text-plynos-navy hover:text-plynos-blue md:text-3xl dark:text-white dark:hover:text-plynos-soft"
              >
                {localize(next.title, lang)}
                <ArrowUpRight className="h-5 w-5 flex-none translate-y-1" />
              </Link>
            </div>
          ) : null}

          <div className="mt-16">
            <Link
              href="/blogs"
              className="text-sm font-medium text-plynos-slate hover:text-plynos-navy dark:text-white/70 dark:hover:text-white"
            >
              {ui.allPosts}
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
