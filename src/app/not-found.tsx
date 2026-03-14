import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--color-bg) px-4 text-center">
      <p className="text-8xl font-bold text-(--color-accent) mb-6 select-none">404</p>
      <h1 className="text-2xl font-bold text-(--color-text) mb-3">Page Not Found</h1>
      <p className="text-(--color-muted) mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/en"
        className="inline-flex h-10 items-center rounded-lg bg-(--color-accent) px-6 text-sm font-medium text-white hover:bg-(--color-accent-hover) transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
