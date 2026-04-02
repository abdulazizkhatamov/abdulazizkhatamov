import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://abdulaziz.cv";
const locales = ["en", "uz", "ru"] as const;

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}/${loc}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/en${path}`;
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap(
    ({ path, priority, changeFrequency }) =>
      locales.map((locale) => ({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: buildAlternates(path),
      }))
  );

  const projects = await prisma.project.findMany({
    select: { slug: true, updatedAt: true },
  });

  const mdPosts = getAllPosts();

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((p) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: buildAlternates(`/projects/${p.slug}`),
    }))
  );

  const postEntries: MetadataRoute.Sitemap = mdPosts.flatMap((p) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${p.slug}`,
      lastModified: p.publishedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
      alternates: buildAlternates(`/blog/${p.slug}`),
    }))
  );

  return [...staticEntries, ...projectEntries, ...postEntries];
}
