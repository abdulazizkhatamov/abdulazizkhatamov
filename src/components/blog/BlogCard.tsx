import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type PostPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  publishedAt: Date | null;
};

type Props = { post: PostPreview };

export default function BlogCard({ post }: Props) {
  const t = useTranslations("blog");

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(
        new Date(post.publishedAt)
      )
    : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-3 rounded-(--radius-xl) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-5 hover:border-(--color-accent)/40 dark:hover:border-(--color-accent-dark)/40 transition-colors"
    >
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-(--color-text) dark:text-(--color-text-dark) group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-(--radius-sm) bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-2 py-0.5 text-xs text-(--color-accent) dark:text-(--color-accent-dark)"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        {formattedDate && (
          <span className="text-xs text-(--color-muted) dark:text-(--color-muted-dark)">
            {formattedDate}
          </span>
        )}
        <span className="text-xs font-medium text-(--color-accent) dark:text-(--color-accent-dark)">
          {t("read_more")} →
        </span>
      </div>
    </Link>
  );
}
