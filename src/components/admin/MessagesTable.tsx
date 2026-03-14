"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Message } from "@/generated/prisma/client";

export default function MessagesTable({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Message | null>(null);

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setSelected(null);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-(--color-border) dark:border-(--color-border-dark) overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-(--color-surface) dark:bg-(--color-surface-dark)">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Status</th>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">From</th>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Subject</th>
              <th className="text-left px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Date</th>
              <th className="text-right px-4 py-3 font-medium text-(--color-muted) dark:text-(--color-muted-dark)">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-border) dark:divide-(--color-border-dark)">
            {messages.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-(--color-muted) dark:text-(--color-muted-dark)">No messages yet.</td></tr>
            )}
            {messages.map((m) => (
              <tr key={m.id} className={`cursor-pointer transition-colors ${m.read ? "bg-(--color-bg) dark:bg-(--color-bg-dark)" : "bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle)"} hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark)`}
                onClick={() => setSelected(m)}>
                <td className="px-4 py-3">
                  <span className={`inline-flex h-2 w-2 rounded-full ${m.read ? "bg-(--color-border) dark:bg-(--color-border-dark)" : "bg-(--color-accent) dark:bg-(--color-accent-dark)"}`} />
                </td>
                <td className="px-4 py-3">
                  <p className={`font-medium ${m.read ? "text-(--color-muted) dark:text-(--color-muted-dark)" : "text-(--color-text) dark:text-(--color-text-dark)"}`}>{m.name}</p>
                  <p className="text-xs text-(--color-muted) dark:text-(--color-muted-dark)">{m.email}</p>
                </td>
                <td className="px-4 py-3 text-(--color-text) dark:text-(--color-text-dark)">{m.subject}</td>
                <td className="px-4 py-3 text-(--color-muted) dark:text-(--color-muted-dark) text-xs">
                  {new Intl.DateTimeFormat("en", { day: "numeric", month: "short" }).format(new Date(m.createdAt))}
                </td>
                <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => markRead(m.id, !m.read)} className="text-xs text-(--color-accent) dark:text-(--color-accent-dark) hover:underline mr-2">
                    {m.read ? "Unread" : "Read"}
                  </button>
                  <button onClick={() => remove(m.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg) dark:bg-(--color-bg-dark) p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-(--color-text) dark:text-(--color-text-dark)">{selected.subject}</h2>
                <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">{selected.name} · {selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) text-lg">✕</button>
            </div>
            <p className="text-sm text-(--color-text) dark:text-(--color-text-dark) leading-relaxed whitespace-pre-wrap">{selected.body}</p>
            <div className="flex gap-2 pt-2">
              <a href={`mailto:${selected.email}`} className="flex-1 h-9 flex items-center justify-center rounded-md bg-(--color-accent) dark:bg-(--color-accent-dark) text-sm font-medium text-white hover:bg-(--color-accent-hover) transition-colors">
                Reply
              </a>
              <button onClick={() => remove(selected.id)} className="h-9 px-4 rounded-md border border-red-500/30 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
