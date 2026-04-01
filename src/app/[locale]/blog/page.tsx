export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BlogCard from "@/components/blog/BlogCard";
import prisma from "@/lib/prisma";

const BASE_URL = "https://abdulaziz.cv";

type Props = { params: Promise<{ locale: string }> };

type PostPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  publishedAt: Date | null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const title = t("title");
  const description = "Articles on frontend development, React, TypeScript, and modern web engineering by Abdulaziz Hatamov.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages: {
        en: `${BASE_URL}/en/blog`,
        uz: `${BASE_URL}/uz/blog`,
        ru: `${BASE_URL}/ru/blog`,
        "x-default": `${BASE_URL}/en/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/blog`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts: PostPreview[] = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      tags: true,
      publishedAt: true,
    },
  });

  return <BlogContent posts={posts} />;
}

function BlogContent({ posts }: { posts: PostPreview[] }) {
  const t = useTranslations("blog");

  return (
    <SectionWrapper className="pt-32">
      {/* Page header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-(--color-accent) dark:bg-(--color-accent-dark)" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-(--color-accent) dark:text-(--color-accent-dark)">
            {t("title")}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark)">
          {t("title")}
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-(--color-muted) dark:text-(--color-muted-dark)">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
