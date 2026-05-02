import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Drift } from "@/components/site/Drift";
import { blogPosts, findPostBySlug } from "@/lib/blogs";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = findPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = findPostBySlug(params.slug);
  if (!post) notFound();

  // Pick "next read" — first other post in the list
  const next = blogPosts.find((p) => p.slug !== post.slug);

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="container-page py-16 md:py-24">
          <div className="max-w-3xl">
            <Drift>
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full border border-plynos-navy/10 bg-plynos-soft/50 px-2 py-0.5 font-medium text-plynos-slate">
                  {post.tag}
                </span>
                <span className="text-plynos-slate">{post.read}</span>
              </div>
              <h1 className="mt-6 text-balance text-4xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-lg text-plynos-slate md:text-xl">
                {post.excerpt}
              </p>
            </Drift>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-plynos-navy/10 md:mt-16">
            <div className="relative aspect-[16/7] w-full">
              <Image
                src={post.image}
                alt=""
                fill
                unoptimized
                className="object-cover"
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
                    className="mt-10 text-balance text-2xl font-semibold !leading-tight tracking-tightish text-plynos-navy md:text-3xl"
                  >
                    {block.text}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  className="text-base leading-relaxed text-plynos-slate md:text-lg"
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          {next ? (
            <div className="mt-20 max-w-2xl border-t border-plynos-navy/10 pt-10 md:mt-28">
              <p className="text-xs font-medium text-plynos-slate">
                Read next
              </p>
              <Link
                href={`/blogs/${next.slug}`}
                className="mt-3 inline-flex items-baseline gap-2 text-balance text-2xl font-semibold !leading-tight tracking-tightish text-plynos-navy hover:text-plynos-blue md:text-3xl"
              >
                {next.title}
                <ArrowUpRight className="h-5 w-5 flex-none translate-y-1" />
              </Link>
            </div>
          ) : null}

          <div className="mt-16">
            <Link
              href="/blogs"
              className="text-sm font-medium text-plynos-slate hover:text-plynos-navy"
            >
              All posts
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
