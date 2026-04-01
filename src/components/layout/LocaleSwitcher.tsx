"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { motion } from "framer-motion";

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
    <div className="flex items-center gap-0.5 rounded-(--radius-md) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-0.5">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className="relative px-2.5 py-1.5 text-xs font-semibold rounded-(--radius-sm) transition-colors"
        >
          {loc === locale && (
            <motion.span
              layoutId="locale-pill"
              className="absolute inset-0 rounded-(--radius-sm) bg-(--color-accent) dark:bg-(--color-accent-dark)"
              transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
            />
          )}
          <span
            className={[
              "relative z-10 transition-colors",
              loc === locale
                ? "text-white dark:text-(--color-bg-dark)"
                : "text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark)",
            ].join(" ")}
          >
            {LOCALE_LABELS[loc]}
          </span>
        </button>
      ))}
    </div>
  );
}
