import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function ContactCTA() {
  const t = useTranslations("contact");

  return (
    <SectionWrapper id="contact-cta">
      <div className="rounded-(--radius-2xl) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-10 text-center flex flex-col items-center gap-5">
        <h2 className="text-2xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark)">
          {t("cta_title")}
        </h2>
        <p className="max-w-md text-(--color-muted) dark:text-(--color-muted-dark) text-sm leading-relaxed">
          {t("cta_subtitle")}
        </p>
        <Link
          href="/contact"
          className="inline-flex h-10 items-center gap-2 rounded-(--radius-md) bg-(--color-accent) dark:bg-(--color-accent-dark) px-6 text-sm font-medium text-white dark:text-(--color-bg-dark) hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-colors"
        >
          {t("cta_button")}
        </Link>
      </div>
    </SectionWrapper>
  );
}
