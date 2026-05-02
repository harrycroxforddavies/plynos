import Link from "next/link";
import { Drift } from "./Drift";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-plynos-soft/70 via-white/0 to-transparent"
        aria-hidden
      />
      <div className="container-page pt-24 pb-32 md:pt-40 md:pb-44 lg:pt-52 lg:pb-56">
        <Drift className="mx-auto max-w-3xl text-center" intensity={36}>
          <span className="inline-flex items-center rounded-full border border-plynos-navy/10 bg-white px-3 py-1.5 text-xs font-medium text-plynos-slate shadow-sm">
            Available for custom builds
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold !leading-tight text-plynos-navy md:text-6xl lg:text-7xl">
            A custom website for your business, built fast.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-plynos-slate md:text-xl">
            No template feel. Clean handover, fully owned by you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="#lead-form" className="btn-primary">
              Request a website
            </Link>
            <Link href="/blogs" className="btn-secondary">
              Read the blog
            </Link>
          </div>
        </Drift>
      </div>
    </section>
  );
}
