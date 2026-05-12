import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
};

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
    "A custom website for your business, built in 2 days. No template feel. Clean handover.",
  openGraph: {
    title: "Plynos",
    description:
      "A custom website for your business, built in 2 days. No template feel. Clean handover.",
    url: siteUrl,
    siteName: "Plynos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plynos",
    description:
      "A custom website for your business, built in 2 days. No template feel. Clean handover.",
  },
  icons: {
    icon: [{ url: "/logos/plynos.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Inline script that runs synchronously before paint, reads the saved theme
// from localStorage and applies the `dark` class to <html> so there's no
// flash of the wrong theme on load.
const themeBootstrap = `
(function () {
  try {
    var t = localStorage.getItem('plynos-theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-screen bg-white font-sans text-plynos-navy transition-colors dark:bg-plynos-navy dark:text-white">
        {children}
      </body>
    </html>
  );
}
