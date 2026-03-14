"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

type PostRow = {
  id: string; title: string; slug: string; published: boolean;
  publishedAt: Date | null; tags: string[]; createdAt: Date;
};

export default function BlogTable({ posts }: { posts: PostRow[] }) {
  const router = useRouter();

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const togglePublish = async (id: string, published: boolean) => {
    await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published, publishedAt: published ? new Date().toISOString() : null }),
    });
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4">
      <Link href="/admin/blog/new" className="self-start inline-flex h-9 items-center gap-2 rounded-md bg-(--color-accent) dark:bg-(--color-accent-dark) px-4 text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-colors">
        + New Post
      </Link>

      <div className="rounded-xl border border-(--color-border) dark:border-(--color-border-dark) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-(--color-surface) dark:bg-(--color-surface-dark)">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Title</th>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Status</th>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Date</th>
              <th className="text-right px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-border) dark:divide-(--color-border-dark)">
            {posts.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-(--color-muted) dark:text-(--color-muted-dark)">No posts yet.</td></tr>
            )}
            {posts.map((p) => (
              <tr key={p.id} className="bg-(--color-bg) dark:bg-(--color-bg-dark) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) transition-colors">
                <td className="px-4 py-3 font-medium text-(--color-text) dark:text-(--color-text-dark)">{p.title}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${p.published ? "bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) text-(--color-accent) dark:text-(--color-accent-dark)" : "bg-(--color-surface) dark:bg-(--color-surface-dark) text-(--color-muted) dark:text-(--color-muted-dark)"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-(--color-muted) dark:text-(--color-muted-dark) text-xs">
                  {new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(p.createdAt))}
                </td>
                <td className="px-4 py-3 text-right flex justify-end gap-2">
                  <Link href={`/admin/blog/${p.id}`} className="text-xs text-(--color-accent) dark:text-(--color-accent-dark) hover:underline">Edit</Link>
                  <button onClick={() => togglePublish(p.id, !p.published)} className="text-xs text-(--color-muted) dark:text-(--color-muted-dark) hover:underline">
                    {p.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => remove(p.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
