"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Experience } from "@/generated/prisma/client";

type FormState = {
  company: string; role: string; location: string;
  startDate: string; endDate: string; current: boolean; bullets: string;
};

const EMPTY: FormState = {
  company: "", role: "", location: "", startDate: "", endDate: "", current: false, bullets: "",
};

export default function ExperienceManager({ experience }: { experience: Experience[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<(FormState & { id?: string }) | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const openNew = () => { setEditing({ ...EMPTY }); setIsNew(true); };
  const openEdit = (e: Experience) => {
    setEditing({
      id: e.id, company: e.company, role: e.role, location: e.location ?? "",
      startDate: e.startDate ? new Date(e.startDate).toISOString().split("T")[0] : "",
      endDate: e.endDate ? new Date(e.endDate).toISOString().split("T")[0] : "",
      current: e.current, bullets: e.bullets.join("\n"),
    });
    setIsNew(false);
  };
  const close = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!editing) return;
    setLoading(true);
    const payload = {
      company: editing.company, role: editing.role, location: editing.location || null,
      startDate: new Date(editing.startDate).toISOString(),
      endDate: editing.current || !editing.endDate ? null : new Date(editing.endDate).toISOString(),
      current: editing.current,
      bullets: editing.bullets.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    const url = isNew ? "/api/experience" : `/api/experience/${editing.id}`;
    await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    close();
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const set = (k: keyof FormState, v: unknown) =>
    setEditing((e) => e ? { ...e, [k]: v } : e);

  const cls = "h-9 w-full rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors";

  return (
    <div className="flex flex-col gap-4">
      <button onClick={openNew} className="self-start h-9 px-4 rounded-md bg-(--color-accent) dark:bg-(--color-accent-dark) text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-colors">
        + Add Experience
      </button>

      <div className="flex flex-col gap-3">
        {experience.length === 0 && <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">No experience yet.</p>}
        {experience.map((e) => (
          <div key={e.id} className="rounded-xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-4 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-(--color-text) dark:text-(--color-text-dark)">{e.role} <span className="font-normal text-(--color-muted) dark:text-(--color-muted-dark)">· {e.company}</span></p>
              <p className="text-xs text-(--color-muted) dark:text-(--color-muted-dark) mt-0.5">
                {new Date(e.startDate).getFullYear()} – {e.current ? "Present" : e.endDate ? new Date(e.endDate).getFullYear() : ""}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(e)} className="text-xs text-(--color-accent) dark:text-(--color-accent-dark) hover:underline">Edit</button>
              <button onClick={() => remove(e.id)} className="text-xs text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg) dark:bg-(--color-bg-dark) p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-(--color-text) dark:text-(--color-text-dark)">{isNew ? "Add Experience" : "Edit Experience"}</h2>

            {[
              { label: "Role", key: "role" }, { label: "Company", key: "company" },
              { label: "Location", key: "location" },
            ].map(({ label, key }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">{label}</label>
                <input value={(editing as Record<string, unknown>)[key] as string ?? ""} onChange={(e) => set(key as keyof FormState, e.target.value)} className={cls} />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Start Date</label>
                <input type="date" value={editing.startDate} onChange={(e) => set("startDate", e.target.value)} className={cls} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">End Date</label>
                <input type="date" value={editing.endDate} onChange={(e) => set("endDate", e.target.value)} disabled={editing.current} className={`${cls} disabled:opacity-40`} />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-(--color-text) dark:text-(--color-text-dark) cursor-pointer">
              <input type="checkbox" checked={editing.current} onChange={(e) => set("current", e.target.checked)} />
              Currently working here
            </label>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Bullet points (one per line)</label>
              <textarea value={editing.bullets} onChange={(e) => set("bullets", e.target.value)} rows={5}
                className="w-full rounded-md border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 py-2 text-sm text-(--color-text) dark:text-(--color-text-dark) focus:outline-none focus:border-(--color-accent) dark:focus:border-(--color-accent-dark) transition-colors resize-none" />
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={save} disabled={loading} className="flex-1 h-9 rounded-md bg-(--color-accent) dark:bg-(--color-accent-dark) text-sm font-medium text-white hover:bg-(--color-accent-hover) disabled:opacity-60 transition-colors">
                {loading ? "Saving..." : "Save"}
              </button>
              <button onClick={close} className="flex-1 h-9 rounded-md border border-(--color-border) dark:border-(--color-border-dark) text-sm text-(--color-text) dark:text-(--color-text-dark) hover:bg-(--color-surface) transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
