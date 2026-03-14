import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BlogCard from "@/components/blog/BlogCard";
import prisma from "@/lib/prisma";

type Props = { params: Promise<{ locale: string }> };

type PostPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  publishedAt: Date | null;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: `${t("title")} — Abdulaziz Hatamov` };
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
      <h1 className="text-3xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark) mb-10">
        {t("title")}
      </h1>

      {posts.length === 0 ? (
        <p className="text-(--color-muted) dark:text-(--color-muted-dark)">No posts yet.</p>
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
