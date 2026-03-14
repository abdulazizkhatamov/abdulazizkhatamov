import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <SectionWrapper id="about">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-(--color-accent) dark:text-(--color-accent-dark) mb-3">
        {t("title")}
      </h2>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <p className="text-lg leading-relaxed text-(--color-text) dark:text-(--color-text-dark)">
            {t("bio")}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat label={t("label_location")} value={t("location")} />
            <Stat label={t("label_experience")} value={t("experience")} />
            <Stat label={t("label_languages")} value="UZ / EN" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-(--radius-lg) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-4">
      <span className="text-xs text-(--color-muted) dark:text-(--color-muted-dark) uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-medium text-(--color-text) dark:text-(--color-text-dark)">
        {value}
      </span>
    </div>
  );
}
