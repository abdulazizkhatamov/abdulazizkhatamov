---
title: "Building a Production Next.js App: Lessons Learned"
date: "2025-03-10"
excerpt: "After shipping several full-stack Next.js applications to production, here are the patterns, pitfalls, and decisions that actually matter."
tags: ["Next.js", "React", "TypeScript", "Production"]
published: true
---

Shipping a Next.js app to production is straightforward. Shipping one that *stays* reliable, performs well, and doesn't cost you sleep at 2am is a different story. Here's what I've learned after building production apps with Next.js App Router.

## Route Architecture Matters More Than You Think

The App Router's nested layout system is powerful, but it's easy to create layouts that fetch data redundantly or block rendering unnecessarily. A few rules I follow:

- **Put data fetching as close to the component that needs it as possible.** Don't reach up to a layout when a page can fetch its own data.
- **Use `loading.tsx` aggressively.** Suspense boundaries give you streaming by default.
- **Separate static and dynamic segments.** `force-dynamic` on one page shouldn't force everything to be dynamic.

## Server Components vs Client Components

The default should always be Server Component. Opt into `"use client"` only when you actually need it:

```tsx
// ✅ Server Component — database query, no interactivity
export default async function ProjectList() {
  const projects = await prisma.project.findMany();
  return <ul>{projects.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}

// ✅ Client Component — needs useState for interactive filter
"use client";
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  // ...
}
```

The boundary rule: push `"use client"` to the leaves. A large tree of client components kills the benefits of RSC.

## Database Patterns with Prisma

Don't call `prisma.something.findMany()` in multiple places without thinking about N+1. With Prisma:

```ts
// ❌ N+1 — separate query per project's tags
const projects = await prisma.project.findMany();
for (const p of projects) {
  p.tags = await prisma.tag.findMany({ where: { projectId: p.id } });
}

// ✅ Single query with include
const projects = await prisma.project.findMany({
  include: { tags: true },
});
```

Also: always use `select` when you don't need every field. Sending 40 columns to the client when you need 3 is wasteful.

## Type-Safe Environment Variables

Use `zod` to validate your env at startup:

```ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  RESEND_API_KEY: z.string().startsWith("re_"),
});

export const env = envSchema.parse(process.env);
```

This catches misconfigured deployments at build time, not at runtime when a user hits the broken endpoint.

## Error Boundaries and Loading States

Every async boundary needs both a loading and error state. In App Router:

```
app/
  dashboard/
    page.tsx          # actual content
    loading.tsx       # shown during server render
    error.tsx         # shown on unhandled throws
```

Don't rely on the global error boundary for recoverable errors. Use `notFound()`, `redirect()`, and `unauthorized()` from `next/navigation` explicitly.

## Deployment Checklist

Before every production deploy I run through:

- [ ] `DATABASE_URL` points to production DB
- [ ] All `force-dynamic` pages are actually dynamic and not accidentally cached
- [ ] OG images return 200 for all slugs
- [ ] Sitemap includes all new routes
- [ ] No `console.log` with sensitive data left in server components

## Final Thought

The best Next.js codebase I've worked on wasn't the one with the most clever abstractions — it was the one where any engineer could open a file, understand what it does, and know exactly where to make a change. Boring, predictable code wins in production.
