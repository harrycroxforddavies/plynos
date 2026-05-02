import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-plynos-navy/10 bg-white">
      <div className="container-page flex flex-col items-start justify-between gap-8 py-12 md:flex-row md:items-center">
        <Logo />
        <nav className="flex flex-wrap items-center gap-6 text-sm text-plynos-slate">
          <Link href="/blogs" className="hover:text-plynos-navy">Blogs</Link>
          <Link href="/privacy" className="hover:text-plynos-navy">Privacy</Link>
          <Link href="/legal" className="hover:text-plynos-navy">Legal</Link>
          <Link href="/cookies" className="hover:text-plynos-navy">Cookies</Link>
        </nav>
        <p className="text-xs text-plynos-slate">© {year} Plynos.</p>
      </div>
    </footer>
  );
}
