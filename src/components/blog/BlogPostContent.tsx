"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { BlogPost } from "@/generated/prisma/client";

type Props = { post: BlogPost };

export default function BlogPostContent({ post }: Props) {
  const t = useTranslations("common");

  const editor = useEditor({
    extensions: [StarterKit],
    content: post.content as object,
    editable: false,
    immediatelyRender: false,
  });

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : null;

  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors mb-8"
      >
        ← {t("back")}
      </Link>

      <header className="mb-10 flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-(--radius-sm) bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-2 py-0.5 text-xs text-(--color-accent) dark:text-(--color-accent-dark)"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark) leading-tight">
          {post.title}
        </h1>

        {formattedDate && (
          <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">
            {formattedDate}
          </p>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <EditorContent editor={editor} />
      </div>
    </article>
  );
}
