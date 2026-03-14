import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("not_found");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-(--color-accent) dark:text-(--color-accent-dark) mb-6 select-none">
        404
      </p>
      <h1 className="text-2xl font-bold text-(--color-text) dark:text-(--color-text-dark) mb-3">
        {t("title")}
      </h1>
      <p className="text-(--color-muted) dark:text-(--color-muted-dark) mb-8 max-w-sm leading-relaxed">
        {t("description")}
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center rounded-lg bg-(--color-accent) dark:bg-(--color-accent-dark) px-6 text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-colors"
      >
        {t("back_home")}
      </Link>
    </div>
  );
}
