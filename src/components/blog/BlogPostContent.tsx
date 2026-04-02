import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PostFull } from "@/lib/blog";

type Props = { post: PostFull };

export default function BlogPostContent({ post }: Props) {
  const t = useTranslations("common");

  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(post.publishedAt);

  return (
    <article className="mx-auto max-w-3xl px-6 sm:px-12 pt-28 pb-24">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors mb-12"
      >
        <svg
          width="12" height="12" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M13 8H3M7 4l-4 4 4 4" />
        </svg>
        {t("back")}
      </Link>

      {/* Header */}
      <header className="mb-12 flex flex-col gap-5 border-b border-(--color-border) dark:border-(--color-border-dark) pb-10">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] font-bold uppercase tracking-wider text-(--color-accent) dark:text-(--color-accent-dark)"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1
          className="font-black tracking-tight text-(--color-text) dark:text-(--color-text-dark) leading-[0.92]"
          style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)" }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-4 font-mono text-xs text-(--color-muted) dark:text-(--color-muted-dark) tracking-wider">
          <span>{formattedDate}</span>
          <span className="h-px w-4 bg-(--color-border) dark:bg-(--color-border-dark)" />
          <span>{post.readingTime} min read</span>
        </div>
      </header>

      {/* Markdown content */}
      <div
        className="md-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
