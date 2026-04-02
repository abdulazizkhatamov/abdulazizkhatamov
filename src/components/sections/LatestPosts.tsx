import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SectionLabel } from "./AboutSection";

import type { PostPreview } from "@/lib/blog";
type Props = { posts: PostPreview[] };

export default function LatestPosts({ posts }: Props) {
  const t = useTranslations("blog");

  return (
    <SectionWrapper id="blog">
      <div className="flex items-center justify-between mb-14">
        <SectionLabel number="06" label={t("latest_title")} />
        <Link
          href="/blog"
          className="group hidden sm:flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors shrink-0"
        >
          {t("view_all")}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-(--color-muted) dark:text-(--color-muted-dark)">{t("empty")}</p>
      ) : (
        <>
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[2rem_1fr_7rem_8rem] gap-6 pb-3 border-b border-(--color-border) dark:border-(--color-border-dark)">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted) dark:text-(--color-muted-dark)">No.</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted) dark:text-(--color-muted-dark)">Title</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted) dark:text-(--color-muted-dark)">Date</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-(--color-muted) dark:text-(--color-muted-dark)">Tags</span>
          </div>

          <div className="flex flex-col">
            {posts.map((post, index) => (
              <PostRow key={post.slug} post={post} index={index} readMore={t("read_more")} />
            ))}
          </div>
        </>
      )}

      <div className="mt-8 sm:hidden">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-(--color-accent) dark:text-(--color-accent-dark)"
        >
          {t("view_all")}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </SectionWrapper>
  );
}

function PostRow({
  post,
  index,
  readMore,
}: {
  post: PostPreview;
  index: number;
  readMore: string;
}) {
  const num = String(index + 1).padStart(2, "0");
  const date = new Intl.DateTimeFormat("en", { month: "short", year: "2-digit" }).format(post.publishedAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group py-5 border-b border-(--color-border) dark:border-(--color-border-dark) hover:border-(--color-accent)/40 dark:hover:border-(--color-accent-dark)/35 transition-colors"
    >
      {/* Mobile layout */}
      <div className="sm:hidden flex flex-col gap-2">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">{num}</span>
          <h3 className="text-base font-bold text-(--color-text) dark:text-(--color-text-dark) group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors leading-snug">
            {post.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 ml-6">
          <span className="font-mono text-xs text-(--color-muted) dark:text-(--color-muted-dark)">{date}</span>
          {post.tags[0] && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-(--color-accent) dark:text-(--color-accent-dark)">
              {post.tags[0]}
            </span>
          )}
        </div>
      </div>

      {/* Desktop table row */}
      <div className="hidden sm:grid grid-cols-[2rem_1fr_7rem_8rem] gap-6 items-center">
        <span className="font-mono text-xs text-(--color-accent) dark:text-(--color-accent-dark) tabular-nums">{num}</span>
        <div className="flex items-center gap-3 min-w-0">
          <h3 className="text-sm font-semibold text-(--color-text) dark:text-(--color-text-dark) group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors truncate">
            {post.title}
          </h3>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase tracking-widest text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">
            → {readMore}
          </span>
        </div>
        <span className="font-mono text-xs text-(--color-muted) dark:text-(--color-muted-dark)">
          {date}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider text-(--color-muted) dark:text-(--color-muted-dark) group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
