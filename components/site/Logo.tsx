import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Plynos home"
      className={cn("inline-flex items-center", className)}
    >
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
  );
}
