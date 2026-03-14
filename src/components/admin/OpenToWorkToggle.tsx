"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OpenToWorkToggle({ initialValue }: { initialValue: boolean }) {
  const [enabled, setEnabled] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    setLoading(true);
    const next = !enabled;
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ openToWork: next }),
    });
    setEnabled(next);
    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-colors disabled:opacity-60 ${
        enabled
          ? "border-(--color-accent)/30 dark:border-(--color-accent-dark)/30 bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) text-(--color-accent) dark:text-(--color-accent-dark)"
          : "border-(--color-border) dark:border-(--color-border-dark) text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark)"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${enabled ? "bg-(--color-accent) dark:bg-(--color-accent-dark) animate-pulse" : "bg-(--color-muted) dark:bg-(--color-muted-dark)"}`} />
      {enabled ? "Open to Work" : "Not Available"}
    </button>
  );
}
