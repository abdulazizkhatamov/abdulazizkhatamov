"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/generated/prisma/client";

type Repo = {
  name: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlights: string[];
};

type ProjectDetails = {
  overview: string;
  repos: Repo[];
  architecture: string[];
};

const EMPTY_REPO: Repo = {
  name: "",
  subtitle: "",
  description: "",
  techStack: [],
  highlights: [],
};

const EMPTY_DETAILS: ProjectDetails = { overview: "", repos: [], architecture: [] };

const EMPTY: Partial<Project> = {
  slug: "", title: "", description: "", techStack: [], liveUrl: "", githubUrl: "",
  imageUrl: "", featured: false, order: 0, details: null,
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
    setEditing((e) => (e ? { ...e, [k]: v } : e));

  const details: ProjectDetails = (editing?.details as ProjectDetails) ?? EMPTY_DETAILS;
  const setDetails = (d: ProjectDetails) => set("details", d);

  const setOverview = (v: string) => setDetails({ ...details, overview: v });

  const setArchItem = (i: number, v: string) => {
    const arch = [...details.architecture];
    arch[i] = v;
    setDetails({ ...details, architecture: arch });
  };
  const addArchItem = () =>
    setDetails({ ...details, architecture: [...details.architecture, ""] });
  const removeArchItem = (i: number) =>
    setDetails({ ...details, architecture: details.architecture.filter((_, idx) => idx !== i) });

  const setRepo = (i: number, r: Repo) => {
    const repos = [...details.repos];
    repos[i] = r;
    setDetails({ ...details, repos });
  };
  const addRepo = () =>
    setDetails({ ...details, repos: [...details.repos, { ...EMPTY_REPO }] });
  const removeRepo = (i: number) =>
    setDetails({ ...details, repos: details.repos.filter((_, idx) => idx !== i) });

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={openNew}
        className="self-start inline-flex h-9 items-center gap-2 rounded-md bg-(--color-accent) dark:bg-(--color-accent-dark) px-4 text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-colors"
      >
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
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-(--color-muted) dark:text-(--color-muted-dark)">
                  No projects yet.
                </td>
              </tr>
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

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg) dark:bg-(--color-bg-dark) p-6 flex flex-col gap-6 my-8">
            <h2 className="text-lg font-bold text-(--color-text) dark:text-(--color-text-dark)">
              {isNew ? "Add Project" : "Edit Project"}
            </h2>

            {/* ── Basic info ── */}
            <Section title="Basic Info">
              <Field label="Slug" value={editing.slug ?? ""} onChange={(v) => set("slug", v)} />
              <Field label="Title" value={editing.title ?? ""} onChange={(v) => set("title", v)} />
              <Field label="Description" value={editing.description ?? ""} onChange={(v) => set("description", v)} textarea rows={3} />
              <Field
                label="Tech Stack (comma separated)"
                value={(editing.techStack as string[] ?? []).join(", ")}
                onChange={(v) => set("techStack", v.split(",").map((s) => s.trim()).filter(Boolean))}
              />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Live URL" value={editing.liveUrl ?? ""} onChange={(v) => set("liveUrl", v)} />
                <Field label="GitHub URL" value={editing.githubUrl ?? ""} onChange={(v) => set("githubUrl", v)} />
              </div>
              <Field label="Image URL" value={editing.imageUrl ?? ""} onChange={(v) => set("imageUrl", v)} />
              <div className="flex items-center gap-4">
                <Field label="Order" type="number" value={String(editing.order ?? 0)} onChange={(v) => set("order", parseInt(v) || 0)} />
                <label className="flex items-center gap-2 text-sm text-(--color-text) dark:text-(--color-text-dark) cursor-pointer mt-4">
                  <input type="checkbox" checked={editing.featured ?? false} onChange={(e) => set("featured", e.target.checked)} className="accent-(--color-accent)" />
                  Featured
                </label>
              </div>
            </Section>

            {/* ── Details: Overview ── */}
            <Section title="Overview">
              <Field
                label="Overview paragraph"
                value={details.overview}
                onChange={setOverview}
                textarea
                rows={5}
              />
            </Section>

            {/* ── Details: Repos ── */}
            <Section
              title="Repos"
              action={<AddButton onClick={addRepo} label="Add Repo" />}
            >
              {details.repos.length === 0 && (
                <p className="text-xs text-(--color-muted) dark:text-(--color-muted-dark)">No repos yet.</p>
              )}
              {details.repos.map((repo, i) => (
                <div key={i} className="flex flex-col gap-3 rounded-xl border border-(--color-border) dark:border-(--color-border-dark) p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-(--color-text) dark:text-(--color-text-dark)">
                      Repo {i + 1}{repo.name ? ` — ${repo.name}` : ""}
                    </span>
                    <button
                      onClick={() => removeRepo(i)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      label="Name"
                      value={repo.name}
                      onChange={(v) => setRepo(i, { ...repo, name: v })}
                    />
                    <Field
                      label="Subtitle"
                      value={repo.subtitle}
                      onChange={(v) => setRepo(i, { ...repo, subtitle: v })}
                    />
                  </div>
                  <Field
                    label="Description"
                    value={repo.description}
                    onChange={(v) => setRepo(i, { ...repo, description: v })}
                    textarea
                    rows={3}
                  />
                  <Field
                    label="Tech Stack (comma separated)"
                    value={repo.techStack.join(", ")}
                    onChange={(v) =>
                      setRepo(i, { ...repo, techStack: v.split(",").map((s) => s.trim()).filter(Boolean) })
                    }
                  />
                  <Field
                    label="Highlights (one per line)"
                    value={repo.highlights.join("\n")}
                    onChange={(v) =>
                      setRepo(i, { ...repo, highlights: v.split("\n").map((s) => s.trim()).filter(Boolean) })
                    }
                    textarea
                    rows={5}
                  />
                </div>
              ))}
            </Section>

            {/* ── Details: Architecture ── */}
            <Section
              title="Architecture"
              action={<AddButton onClick={addArchItem} label="Add Point" />}
            >
              {details.architecture.length === 0 && (
                <p className="text-xs text-(--color-muted) dark:text-(--color-muted-dark)">No architecture points yet.</p>
              )}
              {details.architecture.map((item, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <textarea
                    value={item}
                    onChange={(e) => setArchItem(i, e.target.value)}
                    rows={2}
                    className="flex-1 rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 py-2 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors resize-none"
                  />
                  <button
                    onClick={() => removeArchItem(i)}
                    className="mt-1 text-xs text-red-500 hover:underline shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </Section>

            {/* ── Actions ── */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={save}
                disabled={loading}
                className="flex-1 h-9 rounded-md bg-(--color-accent) dark:bg-(--color-accent-dark) text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) disabled:opacity-60 transition-colors"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={close}
                className="flex-1 h-9 rounded-md border border-(--color-border) dark:border-(--color-border-dark) text-sm text-(--color-text) dark:text-(--color-text-dark) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-(--color-border) dark:border-(--color-border-dark) pb-2">
        <span className="text-sm font-semibold text-(--color-text) dark:text-(--color-text-dark)">{title}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="text-xs text-(--color-accent) dark:text-(--color-accent-dark) hover:underline"
    >
      + {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  rows,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  type?: string;
}) {
  const cls =
    "w-full rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 py-2 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors";
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows ?? 3}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type={type ?? "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-9 ${cls}`}
        />
      )}
    </div>
  );
}
