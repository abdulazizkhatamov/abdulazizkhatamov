import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found — Abdulaziz Hatamov",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-24">
      <p className="text-faint font-mono text-xs tracking-[0.18em] uppercase">
        404 — Not found
      </p>

      <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
        There is nothing at this address.
      </h1>

      <p className="text-muted mt-5 max-w-xl leading-relaxed">
        Either the page moved or the link is wrong. The site is a single page, so
        everything worth reading is in one place.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href="/"
          className="border-fg bg-fg text-bg hover:border-accent hover:bg-accent inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          Go to the start
        </a>
        <a
          href={`mailto:${site.email}`}
          className="text-muted hover:text-fg text-sm transition-colors"
        >
          {site.email}
        </a>
      </div>
    </main>
  );
}
