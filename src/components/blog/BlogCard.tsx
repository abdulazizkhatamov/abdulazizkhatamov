"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

type PostPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  publishedAt: Date | null;
};

export default function BlogCard({ post }: { post: PostPreview }) {
  const t = useTranslations("blog");
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]),  { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
        new Date(post.publishedAt)
      )
    : null;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col rounded-(--radius-2xl) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) overflow-hidden hover:border-(--color-accent)/35 dark:hover:border-(--color-accent-dark)/30 hover:shadow-2xl hover:shadow-(--color-accent)/10 dark:hover:shadow-(--color-accent-dark)/10 transition-all duration-300"
    >
      {/* Spotlight glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(180px circle at ${x}% ${y}%, rgba(99,102,241,0.10), transparent 60%)`
          ),
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-(--color-accent) dark:from-(--color-accent-dark) to-(--color-accent-2) dark:to-(--color-accent-2-dark) opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Link href={`/blog/${post.slug}`} className="flex flex-col gap-4 p-6 flex-1">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) border border-(--color-accent)/15 dark:border-(--color-accent-dark)/15 px-2.5 py-0.5 text-xs font-semibold text-(--color-accent) dark:text-(--color-accent-dark)">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-bold text-(--color-text) dark:text-(--color-text-dark) group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-(--color-border) dark:border-(--color-border-dark)">
          {formattedDate && (
            <span className="text-xs text-(--color-muted) dark:text-(--color-muted-dark)">{formattedDate}</span>
          )}
          <span className="ml-auto text-xs font-bold text-(--color-accent) dark:text-(--color-accent-dark) flex items-center gap-1.5 group-hover:gap-2 transition-all duration-200">
            {t("read_more")}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
