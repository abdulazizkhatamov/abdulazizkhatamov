"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import type { BlogPost } from "@/generated/prisma/client";

type Props = { post: BlogPost | null; isNew: boolean };

export default function BlogEditor({ post, isNew }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));
  const [published, setPublished] = useState(post?.published ?? false);
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: post?.content as object ?? "",
    immediatelyRender: false,
  });

  const autoSlug = useCallback((val: string) => {
    return val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) setSlug(autoSlug(val));
  };

  const save = async (publish?: boolean) => {
    if (!editor) return;
    setLoading(true);

    const finalPublished = publish !== undefined ? publish : published;
    const payload = {
      title, slug, excerpt,
      content: editor.getJSON(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      published: finalPublished,
      publishedAt: finalPublished ? (post?.publishedAt ?? new Date()).toISOString() : null,
    };

    const url = isNew ? "/api/blog" : `/api/blog/${post!.id}`;
    const res = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) router.push("/admin/blog");
  };

  const btnCls = "h-9 px-4 rounded-md text-sm font-medium transition-colors";

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-(--color-text) dark:text-(--color-text-dark)">
          {isNew ? "New Post" : "Edit Post"}
        </h1>
        <div className="flex gap-2">
          <button onClick={() => save(false)} disabled={loading}
            className={`${btnCls} border border-(--color-border) dark:border-(--color-border-dark) text-(--color-text) dark:text-(--color-text-dark) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) disabled:opacity-60`}>
            Save Draft
          </button>
          <button onClick={() => save(true)} disabled={loading}
            className={`${btnCls} bg-(--color-accent) dark:bg-(--color-accent-dark) text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) disabled:opacity-60`}>
            {loading ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Title</label>
          <input value={title} onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
            className="h-10 rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)}
              className="h-10 rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Tags (comma separated)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)}
              className="h-10 rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Excerpt</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2}
            className="rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 py-2 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors resize-none" />
        </div>
      </div>

      {/* Tiptap toolbar + editor */}
      <div className="flex flex-col gap-0 rounded-xl border border-(--color-border) dark:border-(--color-border-dark) overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-2 border-b border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark)">
          {[
            { label: "B", action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
            { label: "I", action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
            { label: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive("heading", { level: 2 }) },
            { label: "H3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive("heading", { level: 3 }) },
            { label: "Code", action: () => editor?.chain().focus().toggleCode().run(), active: editor?.isActive("code") },
            { label: "Block", action: () => editor?.chain().focus().toggleCodeBlock().run(), active: editor?.isActive("codeBlock") },
            { label: "UL", action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
            { label: "OL", action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
            { label: "Quote", action: () => editor?.chain().focus().toggleBlockquote().run(), active: editor?.isActive("blockquote") },
          ].map((btn) => (
            <button key={btn.label} onMouseDown={(e) => { e.preventDefault(); btn.action(); }}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${btn.active ? "bg-(--color-accent) dark:bg-(--color-accent-dark) text-white" : "text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) hover:bg-(--color-bg) dark:hover:bg-(--color-bg-dark)"}`}>
              {btn.label}
            </button>
          ))}
        </div>

        {/* Editor area */}
        <div className="min-h-80 p-4 bg-(--color-bg) dark:bg-(--color-bg-dark) prose prose-sm dark:prose-invert max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-72">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
