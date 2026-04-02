import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

const BASE_URL = "https://abdulaziz.cv";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${BASE_URL}/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, "web development", "frontend", "Abdulaziz Hatamov"],
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/blog/${slug}`,
        uz: `${BASE_URL}/uz/blog/${slug}`,
        ru: `${BASE_URL}/ru/blog/${slug}`,
        "x-default": `${BASE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      authors: ["Abdulaziz Hatamov"],
      tags: post.tags,
    },
    twitter: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const ldArticle = articleJsonLd({
    title: post.title,
    description: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.publishedAt,
    slug,
    locale,
    tags: post.tags,
  });

  const ldBreadcrumb = breadcrumbJsonLd([
    { name: "Home", item: `${BASE_URL}/${locale}` },
    { name: "Blog", item: `${BASE_URL}/${locale}/blog` },
    { name: post.title, item: `${BASE_URL}/${locale}/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      <BlogPostContent post={post} />
    </>
  );
}
