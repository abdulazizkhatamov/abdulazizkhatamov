import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--color-border) dark:border-(--color-border-dark) py-8 px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">
          {t("built_with")}
        </p>
        <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">
          © {year} Abdulaziz Hatamov. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
