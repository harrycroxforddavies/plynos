import Link from "next/link";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-plynos-navy/10 bg-white/80 backdrop-blur">
      <div className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-6">
        <div className="flex items-center">
          <Logo />
        </div>
        <nav className="hidden items-center justify-center gap-8 text-sm text-plynos-slate md:flex">
          <Link href="/blogs" className="hover:text-plynos-navy">Blogs</Link>
        </nav>
        <div className="flex items-center justify-end gap-3">
          <Link href="/#lead-form" className="btn-primary">
            Request a website
          </Link>
        </div>
      </div>
    </header>
  );
}
