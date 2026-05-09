import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { UnsubscribeClient } from "@/components/site/UnsubscribeClient";
import { getLang } from "@/lib/i18n/lang";
import { t } from "@/lib/i18n/translations";

export const metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { email?: string; status?: string };
}) {
  const lang = getLang();
  const ui = t(lang).unsubscribe;
  const alreadyDone = searchParams.status === "ok";

  return (
    <main className="flex min-h-screen flex-col bg-white text-plynos-navy transition-colors dark:bg-plynos-navy dark:text-white">
      <header className="px-6 py-6 md:px-10">
        <Link href="/" aria-label="Plynos home" className="inline-flex items-center">
          <Image
            src="/plynos.svg"
            alt="Plynos"
            width={32}
            height={32}
            priority
            unoptimized
            className="h-8 w-8 select-none"
          />
        </Link>
      </header>

      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <span className="eyebrow">{ui.eyebrow}</span>
          <h1 className="mt-5 text-balance text-3xl font-semibold !leading-tight tracking-tightish md:text-4xl">
            {ui.headline}
          </h1>
          <p className="mt-4 text-sm text-plynos-slate dark:text-white/70">
            {ui.body}
          </p>

          <div className="mt-8 card">
            {alreadyDone ? (
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-500" aria-hidden />
                <div>
                  <p className="font-medium">{ui.successHeadline}</p>
                  <p className="mt-1 text-sm text-plynos-slate dark:text-white/70">
                    {ui.successBody}
                  </p>
                </div>
              </div>
            ) : (
              <UnsubscribeClient
                defaultEmail={searchParams.email ?? ""}
                strings={ui}
              />
            )}
          </div>
        </div>
      </section>

      <footer className="px-6 py-6 text-xs text-plynos-slate md:px-10 dark:text-white/50">
        <Link href="/" className="hover:text-plynos-navy dark:hover:text-white">
          plynos.dev
        </Link>
      </footer>
    </main>
  );
}
