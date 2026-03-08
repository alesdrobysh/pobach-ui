import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import AuroraBackground from "@/components/AuroraBackground";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { BannerProvider } from "@/contexts/BannerContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PostHogProvider } from "@/providers/PostHogProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F3ED" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1410" },
  ],
};

// Belarusian metadata (default)
export const metadata: Metadata = {
  title: "Побач - Беларуская гульня ў словы",
  description:
    "Адгадайце сакрэтнае беларускае слова. Штодзённая гульня ў словы.",
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Побач",
  },

  openGraph: {
    title: "Побач - Беларуская гульня ў словы",
    description:
      "Адгадайце сакрэтнае беларускае слова. Штодзённая гульня ў словы.",
    url: "https://pobach.app",
    siteName: "Побач",
    locale: "be_BY",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Побач - Беларуская гульня ў словы",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Побач - Беларуская гульня ў словы",
    description: "Адгадайце сакрэтнае беларускае слова",
    images: ["/og-image.png"],
  },

  keywords: [
    "беларуская мова",
    "гульня",
    "словы",
    "загадка",
    "contexto",
    "беларускі contexto",
    "wordle",
    "беларускі wordle",
    "беларуская гульня",
    "беларуская загадка",
    "побач",
    "pobach",
  ],

  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg", // Modern iOS supports SVG; otherwise use an auto-generated PNG
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="be" suppressHydrationWarning>
      <body className="font-sans bg-[var(--bg)] text-[var(--text)]">
        <BannerProvider>
          <PostHogProvider>
            <ThemeProvider>
              <AuroraBackground />
              {children}
            </ThemeProvider>
            <CookieBanner />
          </PostHogProvider>
          <ServiceWorkerRegistration />
        </BannerProvider>
        <Analytics />
      </body>
    </html>
  );
}
