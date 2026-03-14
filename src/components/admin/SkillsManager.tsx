"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Skill } from "@/generated/prisma/client";

const CATEGORIES = ["Core", "Frontend", "UI", "Backend", "APIs", "DevOps", "Testing"];
const EMPTY = { name: "", category: "Core", order: 0 };

export default function SkillsManager({ skills }: { skills: Skill[] }) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const grouped = CATEGORIES.reduce<Record<string, Skill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  const startEdit = (s: Skill) => {
    setEditingId(s.id);
    setForm({ name: s.name, category: s.category, order: s.order });
  };

  const save = async () => {
    setLoading(true);
    if (editingId) {
      await fetch(`/api/skills/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm(EMPTY);
    setEditingId(null);
    setLoading(false);
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Form */}
      <div className="rounded-xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-5 flex flex-col gap-4 h-fit">
        <h2 className="text-sm font-semibold text-(--color-text) dark:text-(--color-text-dark)">{editingId ? "Edit Skill" : "Add Skill"}</h2>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Name</label>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-9 rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg) dark:bg-(--color-bg-dark) px-3 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Category</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="h-9 rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg) dark:bg-(--color-bg-dark) px-3 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex gap-2">
          <button onClick={save} disabled={loading || !form.name}
            className="flex-1 h-9 rounded-md bg-(--color-accent) dark:bg-(--color-accent-dark) text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) disabled:opacity-60 transition-colors">
            {loading ? "Saving..." : editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button onClick={() => { setEditingId(null); setForm(EMPTY); }}
              className="h-9 px-3 rounded-md border border-(--color-border) dark:border-(--color-border-dark) text-sm text-(--color-text) dark:text-(--color-text-dark) hover:bg-(--color-bg) dark:hover:bg-(--color-bg-dark) transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Skills list */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {CATEGORIES.map((cat) => grouped[cat]?.length > 0 && (
          <div key={cat}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-(--color-muted) dark:text-(--color-muted-dark) mb-2">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {grouped[cat].map((s) => (
                <div key={s.id} className="flex items-center gap-1 rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 py-1.5 text-sm text-(--color-text) dark:text-(--color-text-dark)">
                  {s.name}
                  <button onClick={() => startEdit(s)} className="ml-1 text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) text-xs">✎</button>
                  <button onClick={() => remove(s.id)} className="text-(--color-muted) dark:text-(--color-muted-dark) hover:text-red-500 text-xs">✕</button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">No skills yet.</p>}
      </div>
    </div>
  );
}
