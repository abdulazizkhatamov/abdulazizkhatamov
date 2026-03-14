"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--color-bg) px-4 text-center">
      <h1 className="text-2xl font-bold text-(--color-text) mb-3">
        Something Went Wrong
      </h1>
      <p className="text-(--color-muted) mb-8 max-w-sm leading-relaxed">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex h-10 items-center rounded-lg bg-(--color-accent) px-6 text-sm font-medium text-white hover:bg-(--color-accent-hover) transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/en"
          className="inline-flex h-10 items-center rounded-lg border border-(--color-border) px-6 text-sm font-medium text-(--color-text) hover:bg-(--color-surface) transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
