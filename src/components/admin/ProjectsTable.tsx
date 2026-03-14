"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/generated/prisma/client";

const EMPTY: Partial<Project> = {
  slug: "", title: "", description: "", techStack: [], liveUrl: "", githubUrl: "",
  imageUrl: "", featured: false, order: 0,
};

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const openNew = () => { setEditing({ ...EMPTY }); setIsNew(true); };
  const openEdit = (p: Project) => { setEditing({ ...p }); setIsNew(false); };
  const close = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!editing) return;
    setLoading(true);
    const url = isNew ? "/api/projects" : `/api/projects/${editing.id}`;
    const method = isNew ? "POST" : "PUT";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setLoading(false);
    close();
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const set = (k: keyof Project, v: unknown) =>
    setEditing((e) => e ? { ...e, [k]: v } : e);

  return (
    <div className="flex flex-col gap-4">
      <button onClick={openNew} className="self-start inline-flex h-9 items-center gap-2 rounded-md bg-(--color-accent) dark:bg-(--color-accent-dark) px-4 text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-colors">
        + Add Project
      </button>

      <div className="rounded-xl border border-(--color-border) dark:border-(--color-border-dark) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-(--color-surface) dark:bg-(--color-surface-dark)">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Title</th>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Tech</th>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Featured</th>
              <th className="text-right px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-border) dark:divide-(--color-border-dark)">
            {projects.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-(--color-muted) dark:text-(--color-muted-dark)">No projects yet.</td></tr>
            )}
            {projects.map((p) => (
              <tr key={p.id} className="bg-(--color-bg) dark:bg-(--color-bg-dark) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) transition-colors">
                <td className="px-4 py-3 font-medium text-(--color-text) dark:text-(--color-text-dark)">{p.title}</td>
                <td className="px-4 py-3 text-(--color-muted) dark:text-(--color-muted-dark)">{p.techStack.slice(0, 3).join(", ")}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${p.featured ? "bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) text-(--color-accent) dark:text-(--color-accent-dark)" : "bg-(--color-surface) dark:bg-(--color-surface-dark) text-(--color-muted) dark:text-(--color-muted-dark)"}`}>
                    {p.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right flex justify-end gap-2">
                  <button onClick={() => openEdit(p)} className="text-xs text-(--color-accent) dark:text-(--color-accent-dark) hover:underline">Edit</button>
                  <button onClick={() => remove(p.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg) dark:bg-(--color-bg-dark) p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-(--color-text) dark:text-(--color-text-dark)">{isNew ? "Add Project" : "Edit Project"}</h2>

            <Field label="Slug" value={editing.slug ?? ""} onChange={(v) => set("slug", v)} />
            <Field label="Title" value={editing.title ?? ""} onChange={(v) => set("title", v)} />
            <Field label="Description" value={editing.description ?? ""} onChange={(v) => set("description", v)} textarea />
            <Field label="Tech Stack (comma separated)" value={(editing.techStack as string[] ?? []).join(", ")} onChange={(v) => set("techStack", v.split(",").map((s) => s.trim()).filter(Boolean))} />
            <Field label="Live URL" value={editing.liveUrl ?? ""} onChange={(v) => set("liveUrl", v)} />
            <Field label="GitHub URL" value={editing.githubUrl ?? ""} onChange={(v) => set("githubUrl", v)} />
            <Field label="Image URL" value={editing.imageUrl ?? ""} onChange={(v) => set("imageUrl", v)} />
            <Field label="Order" type="number" value={String(editing.order ?? 0)} onChange={(v) => set("order", parseInt(v) || 0)} />

            <label className="flex items-center gap-2 text-sm text-(--color-text) dark:text-(--color-text-dark) cursor-pointer">
              <input type="checkbox" checked={editing.featured ?? false} onChange={(e) => set("featured", e.target.checked)} className="accent-(--color-accent)" />
              Featured
            </label>

            <div className="flex gap-2 pt-2">
              <button onClick={save} disabled={loading} className="flex-1 h-9 rounded-md bg-(--color-accent) dark:bg-(--color-accent-dark) text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) disabled:opacity-60 transition-colors">
                {loading ? "Saving..." : "Save"}
              </button>
              <button onClick={close} className="flex-1 h-9 rounded-md border border-(--color-border) dark:border-(--color-border-dark) text-sm text-(--color-text) dark:text-(--color-text-dark) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, textarea, type }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; type?: string;
}) {
  const cls = "w-full rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 py-2 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors";
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">{label}</label>
      {textarea
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={`${cls} resize-none`} />
        : <input type={type ?? "text"} value={value} onChange={(e) => onChange(e.target.value)} className={`h-9 ${cls}`} />}
    </div>
  );
}
