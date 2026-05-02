import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://plynos.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Plynos",
    template: "%s. Plynos",
  },
  description:
    "A custom website for your business, built fast. No template feel. Clean handover.",
  openGraph: {
    title: "Plynos",
    description:
      "A custom website for your business, built fast. No template feel. Clean handover.",
    url: siteUrl,
    siteName: "Plynos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plynos",
    description:
      "A custom website for your business, built fast. No template feel. Clean handover.",
  },
  icons: {
    icon: [{ url: "/plynos.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen bg-white font-sans text-plynos-navy">
        {children}
      </body>
    </html>
  );
}
