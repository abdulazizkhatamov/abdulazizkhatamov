import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f0ec" },
    { media: "(prefers-color-scheme: dark)", color: "#090909" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulaziz.cv"),
  title: {
    default: "Abdulaziz Hatamov — Frontend Developer",
    template: "%s — Abdulaziz Hatamov",
  },
  description:
    "Frontend Developer with 4+ years of experience building production web applications with React, Next.js, TypeScript, and Node.js.",
  keywords: [
    "Abdulaziz Hatamov",
    "frontend developer",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "NestJS",
    "web developer",
    "JavaScript",
    "portfolio",
  ],
  authors: [{ name: "Abdulaziz Hatamov", url: "https://abdulaziz.cv" }],
  creator: "Abdulaziz Hatamov",
  publisher: "Abdulaziz Hatamov",
  applicationName: "Abdulaziz Hatamov Portfolio",
  category: "technology",
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Abdulaziz Hatamov",
    locale: "en_US",
    alternateLocale: ["uz_UZ", "ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@abdulazizkhatamov",
    site: "@abdulazizkhatamov",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
