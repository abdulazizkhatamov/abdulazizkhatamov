import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import type { Skill } from "@/generated/prisma/client";

type Props = { skills: Skill[] };

const CATEGORY_ORDER = ["Core", "Frontend", "UI", "Backend", "APIs", "DevOps", "Testing"];

export default function SkillsSection({ skills }: Props) {
  const t = useTranslations("skills");

  const grouped = CATEGORY_ORDER.reduce<Record<string, Skill[]>>((acc, cat) => {
    const items = skills.filter((s) => s.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <SectionWrapper id="skills">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-(--color-accent) dark:text-(--color-accent-dark) mb-8">
        {t("title")}
      </h2>

      <div className="flex flex-col gap-8">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xs font-medium uppercase tracking-wider text-(--color-muted) dark:text-(--color-muted-dark) mb-3">
              {t(`categories.${category}`)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-(--radius-sm) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 py-1.5 text-sm text-(--color-text) dark:text-(--color-text-dark)"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
