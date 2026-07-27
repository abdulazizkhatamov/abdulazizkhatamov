import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "full-stack developer",
    "contract developer",
    "Next.js",
    "React",
    "NestJS",
    "PostgreSQL",
    "React Native",
    "ecommerce development",
    "AI automation",
  ],
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

/**
 * Runs before first paint so the correct theme is applied without a flash.
 * Kept as a string because it must be synchronous and inline.
 */
const themeScript = `
(function(){try{
  var s = localStorage.getItem('theme');
  var d = s ? s === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  if (d) document.documentElement.classList.add('dark');
}catch(e){}})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Full-Stack Developer",
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fergana",
    addressCountry: "UZ",
  },
  sameAs: [site.linkedin, site.github],
  knowsAbout: [
    "Full-stack web development",
    "Next.js",
    "React",
    "NestJS",
    "PostgreSQL",
    "React Native",
    "Ecommerce platforms",
    "AI integration",
    "Web performance",
  ],
  knowsLanguage: ["en", "uz"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
