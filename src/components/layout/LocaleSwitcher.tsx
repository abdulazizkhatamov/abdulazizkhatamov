"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  uz: "UZ",
  ru: "RU",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={[
            "text-xs font-medium px-2 py-1 rounded-(--radius-sm) transition-colors",
            loc === locale
              ? "text-(--color-accent) dark:text-(--color-accent-dark) bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle)"
              : "text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark)",
          ].join(" ")}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
