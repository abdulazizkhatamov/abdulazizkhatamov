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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d10" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulaziz.cv"),
  title: {
    default: "Abdulaziz Hatamov — Frontend Developer",
    template: "%s — Abdulaziz Hatamov",
  },
  description:
    "Frontend Developer with 4+ years of experience building production web applications with React and TypeScript.",
  authors: [{ name: "Abdulaziz Hatamov", url: "https://abdulaziz.cv" }],
  creator: "Abdulaziz Hatamov",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Abdulaziz Hatamov",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@abdulazizkhatamov",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
