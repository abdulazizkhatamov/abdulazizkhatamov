import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import type { Experience } from "@/generated/prisma/client";

type Props = { experience: Experience[] };

export default function ExperienceSection({ experience }: Props) {
  const t = useTranslations("experience");

  return (
    <SectionWrapper id="experience">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-(--color-accent) dark:text-(--color-accent-dark) mb-8">
        {t("title")}
      </h2>

      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-(--color-border) dark:bg-(--color-border-dark)" />

        {experience.map((item) => (
          <div key={item.id} className="relative pl-8 pb-10 last:pb-0">
            {/* Dot */}
            <div className="absolute left-[-4px] top-2 h-2.5 w-2.5 rounded-full border-2 border-(--color-accent) dark:border-(--color-accent-dark) bg-(--color-bg) dark:bg-(--color-bg-dark)" />

            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-base font-semibold text-(--color-text) dark:text-(--color-text-dark)">
                  {item.role}
                </h3>
                <span className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">
                  · {item.company}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-(--color-muted) dark:text-(--color-muted-dark)">
                <span>
                  {new Date(item.startDate).getFullYear()} –{" "}
                  {item.current
                    ? t("present")
                    : item.endDate
                      ? new Date(item.endDate).getFullYear()
                      : ""}
                </span>
                {item.location && (
                  <>
                    <span>·</span>
                    <span>{item.location}</span>
                  </>
                )}
              </div>

              {item.bullets.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {item.bullets.map((bullet: string, i: number) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
