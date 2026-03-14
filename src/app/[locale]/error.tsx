"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-(--color-text) dark:text-(--color-text-dark) mb-3">
        {t("title")}
      </h1>
      <p className="text-(--color-muted) dark:text-(--color-muted-dark) mb-8 max-w-sm leading-relaxed">
        {t("description")}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex h-10 items-center rounded-lg bg-(--color-accent) dark:bg-(--color-accent-dark) px-6 text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-colors"
        >
          {t("try_again")}
        </button>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-lg border border-(--color-border) dark:border-(--color-border-dark) px-6 text-sm font-medium text-(--color-text) dark:text-(--color-text-dark) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) transition-colors"
        >
          {t("back_home")}
        </Link>
      </div>
    </div>
  );
}
