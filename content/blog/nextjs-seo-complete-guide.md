---
title: "Next.js SEO: The Complete Technical Checklist"
date: "2025-03-01"
excerpt: "A technical deep-dive into every SEO lever available in Next.js App Router — metadata API, dynamic OG images, structured data, sitemaps, and Core Web Vitals."
tags: ["Next.js", "SEO", "Web Performance", "TypeScript"]
published: true
---

Next.js App Router provides more SEO tooling out of the box than any previous version. But "available" and "correctly configured" are different things. Here's every SEO lever worth pulling, in order of impact.

## 1. Metadata API

The App Router's `generateMetadata` function is the foundation. Every page should export either a static `metadata` object or a dynamic `generateMetadata` function:

```ts
// Dynamic — for pages whose content comes from a database or CMS
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `https://yourdomain.com/projects/${params.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}
```

Key points:
- Set `metadataBase` in root layout — otherwise relative URLs in OG images won't resolve
- Use `title.template` in root layout for consistent page titles: `"%s — Your Name"`
- Always set `alternates.canonical` on pages that could be reached via multiple URLs

## 2. Dynamic Open Graph Images

Static OG images are fine for personal pages. Dynamic ones are essential for content pages:

```tsx
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogOGImage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  return new ImageResponse(
    (
      <div style={{ background: "#090909", width: "100%", height: "100%", display: "flex", padding: "80px" }}>
        <h1 style={{ color: "#e8e8e4", fontSize: "64px", fontWeight: 900 }}>
          {post.title}
        </h1>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

The `opengraph-image.tsx` file convention is automatically picked up by Next.js — no configuration needed.

## 3. Structured Data (JSON-LD)

Structured data helps search engines understand your content beyond what they can infer from HTML. For a developer portfolio:

```tsx
// In your homepage component
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Your Name",
  url: "https://yourdomain.com",
  jobTitle: "Frontend Developer",
  sameAs: [
    "https://github.com/yourhandle",
    "https://linkedin.com/in/yourprofile",
  ],
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
/>
```

For blog posts, use the `Article` schema. For projects, use `CreativeWork`. Use [Google's Rich Results Test](https://search.google.com/test/rich-results) to validate.

## 4. Sitemap with hreflang

If your site has multiple locales, your sitemap needs `hreflang` alternates. Next.js's sitemap API supports this:

```ts
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://yourdomain.com/en",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://yourdomain.com/en",
          ru: "https://yourdomain.com/ru",
          uz: "https://yourdomain.com/uz",
          "x-default": "https://yourdomain.com/en",
        },
      },
    },
  ];
}
```

The `x-default` entry tells Google which language to show when none of the others match the user's language.

## 5. Robots.txt

```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/" },
      { userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai"], disallow: "/" },
    ],
    sitemap: "https://yourdomain.com/sitemap.xml",
  };
}
```

Block AI crawlers if you don't want your content used for training. Block `/api/` to prevent crawlers from triggering server load.

## 6. Core Web Vitals

Technical SEO increasingly means passing Core Web Vitals. The three metrics:

**LCP (Largest Contentful Paint)** — time until the largest visible element renders. For most pages this is a hero image or heading.

Fix: Add `priority` to hero images, preconnect to font origins, minimize render-blocking resources.

```tsx
<Image src="/hero.jpg" alt="Hero" priority />
```

**CLS (Cumulative Layout Shift)** — elements shifting after initial render. Classic causes: images without dimensions, fonts loading in, dynamically injected content.

Fix: Always set `width` and `height` on images. Use `font-display: optional` or `swap` for web fonts. Reserve space for dynamic content.

**INP (Interaction to Next Paint)** — how long interactions take. Replaces FID.

Fix: Break up long JavaScript tasks, defer non-critical work with `requestIdleCallback`, avoid heavy synchronous operations in event handlers.

## 7. `<link rel="preconnect">`

For external resources (fonts, CDNs), preconnect cuts the DNS + TCP + TLS round trip from the critical path:

```tsx
// app/layout.tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
</head>
```

In Next.js with Google Fonts via `next/font`, this is handled automatically.

## 8. Security Headers

Google factors HTTPS and basic security into rankings. Add security headers in `next.config.ts`:

```ts
headers: async () => [
  {
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ],
  },
],
```

## The Checklist

- [ ] `metadataBase` set in root layout
- [ ] Every page has unique `title` and `description`
- [ ] `canonical` URL set on all indexable pages
- [ ] OG image for every page (static or dynamic)
- [ ] JSON-LD on homepage, blog posts, and project pages
- [ ] Sitemap includes all routes with hreflang alternates
- [ ] `robots.ts` configured
- [ ] LCP image has `priority` prop
- [ ] No CLS from images without dimensions
- [ ] Security headers configured
- [ ] Site passes [PageSpeed Insights](https://pagespeed.web.dev/) on mobile
