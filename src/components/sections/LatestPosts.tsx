import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BlogCard from "@/components/blog/BlogCard";
import { SectionLabel } from "./AboutSection";

type PostPreview = { id: string; title: string; slug: string; excerpt: string; tags: string[]; publishedAt: Date | null };
type Props = { posts: PostPreview[] };

export default function LatestPosts({ posts }: Props) {
  const t = useTranslations("blog");

  return (
    <SectionWrapper id="blog">
      <div className="flex items-end justify-between mb-12">
        <SectionLabel number="06" label={t("latest_title")} />
        <Link href="/blog" className="group hidden sm:flex items-center gap-2 text-sm font-semibold text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors">
          {t("view_all")}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <BlogCard key={post.id} post={post} />)}
        </div>
      )}
    </SectionWrapper>
  );
}
