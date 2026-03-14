import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BlogCard from "@/components/blog/BlogCard";

type PostPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  publishedAt: Date | null;
};

type Props = { posts: PostPreview[] };

export default function LatestPosts({ posts }: Props) {
  const t = useTranslations("blog");

  return (
    <SectionWrapper id="blog">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-(--color-accent) dark:text-(--color-accent-dark)">
          {t("latest_title")}
        </h2>
        <Link
          href="/blog"
          className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
        >
          {t("view_all")} →
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">No posts yet.</p>
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
