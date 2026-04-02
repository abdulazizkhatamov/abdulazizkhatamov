import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import type { PostPreview } from "@/lib/blog";

const BASE_URL = "https://abdulaziz.cv";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const title = t("title");
  const description =
    "Articles on frontend development, React, TypeScript, and modern web engineering by Abdulaziz Hatamov.";

  return {
    title,
    description,
    keywords: [
      "web development blog",
      "frontend articles",
      "React tutorials",
      "TypeScript",
      "Next.js",
      "JavaScript",
      "Abdulaziz Hatamov",
    ],
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
      type: "website",
    },
    twitter: { title, description },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts();

  const ldBreadcrumb = breadcrumbJsonLd([
    { name: "Home", item: `${BASE_URL}/${locale}` },
    { name: "Blog", item: `${BASE_URL}/${locale}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      <BlogContent posts={posts} />
    </>
  );
}

function BlogContent({ posts }: { posts: PostPreview[] }) {
  const t = useTranslations("blog");

  return (
    <SectionWrapper className="pt-32">
      <div className="flex items-center gap-5 mb-14">
        <span className="font-mono text-xs font-bold text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">
          05
        </span>
        <div className="flex-1 h-px bg-(--color-border) dark:bg-(--color-border-dark)" />
        <h1 className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-(--color-muted) dark:text-(--color-muted-dark) shrink-0">
          {t("title")}
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-(--color-muted) dark:text-(--color-muted-dark)">
          {t("empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
