"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PostPreview } from "@/lib/blog";

export default function BlogCard({ post }: { post: PostPreview }) {
  const t = useTranslations("blog");
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const date = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(post.publishedAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        ref={ref}
        href={`/blog/${post.slug}`}
        className="group flex flex-col gap-4 border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-6 hover:border-(--color-accent)/50 dark:hover:border-(--color-accent-dark)/45 transition-all duration-300 relative overflow-hidden"
        style={{ borderRadius: "var(--radius-md)" }}
      >
        {/* Accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-(--color-accent) dark:bg-(--color-accent-dark) scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] font-bold uppercase tracking-wider text-(--color-accent) dark:text-(--color-accent-dark)"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-bold text-(--color-text) dark:text-(--color-text-dark) group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-(--color-border) dark:border-(--color-border-dark)">
          <span className="font-mono text-xs text-(--color-muted) dark:text-(--color-muted-dark)">
            {date}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-(--color-accent) dark:text-(--color-accent-dark) flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
            {t("read_more")}
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
