import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PostHogProvider } from "@/providers/PostHogProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Belarusian metadata (default)
export const metadata: Metadata = {
  title: "Побач - Беларуская гульня ў словы",
  description:
    "Адгадайце сакрэтнае беларускае слова. Штодзённая гульня ў словы.",

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
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="be" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PostHogProvider>
          <ThemeProvider>{children}</ThemeProvider>
          <CookieBanner />
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
