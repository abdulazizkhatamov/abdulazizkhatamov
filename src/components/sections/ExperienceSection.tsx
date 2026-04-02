"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SectionLabel } from "./AboutSection";
import type { Experience } from "@/generated/prisma/client";

type Props = { experience: Experience[] };

export default function ExperienceSection({ experience }: Props) {
  const t = useTranslations("experience");

  return (
    <SectionWrapper id="experience">
      <SectionLabel number="04" label={t("title")} />

      <div className="relative flex flex-col">
        {/* Vertical timeline line */}
        <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-(--color-border) dark:bg-(--color-border-dark) hidden sm:block" />

        {experience.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} present={t("present")} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function TimelineItem({
  item,
  index,
  present,
}: {
  item: Experience;
  index: number;
  present: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const startYear = new Date(item.startDate).getFullYear();
  const endYear = item.current
    ? present
    : item.endDate
    ? new Date(item.endDate).getFullYear().toString()
    : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row gap-4 sm:gap-8 pb-12 last:pb-0"
    >
      {/* Year column */}
      <div className="shrink-0 sm:w-20 flex sm:flex-col sm:items-end gap-2 sm:gap-0.5 pt-1">
        <span className="font-mono text-xs font-bold text-(--color-accent) dark:text-(--color-accent-dark) tabular-nums">
          {startYear}
        </span>
        <span className="font-mono text-[10px] text-(--color-muted) dark:text-(--color-muted-dark) sm:block hidden">↓</span>
        <span className="font-mono text-xs font-bold text-(--color-muted) dark:text-(--color-muted-dark) tabular-nums sm:block hidden">
          {endYear}
        </span>
        <span className="font-mono text-xs text-(--color-muted) dark:text-(--color-muted-dark) sm:hidden">
          — {endYear}
        </span>
      </div>

      {/* Timeline dot */}
      <div className="relative hidden sm:flex items-start justify-center w-4 shrink-0 pt-1.5">
        <div className="h-2 w-2 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
          <div>
            <h3 className="text-base font-bold text-(--color-text) dark:text-(--color-text-dark) leading-tight">
              {item.role}
            </h3>
            <p className="text-sm font-semibold text-(--color-accent) dark:text-(--color-accent-dark) mt-0.5">
              {item.company}
            </p>
            {item.location && (
              <p className="text-xs text-(--color-muted) dark:text-(--color-muted-dark) mt-0.5 font-mono">
                {item.location}
              </p>
            )}
          </div>

          {item.current && (
            <span
              className="shrink-0 inline-flex items-center gap-1.5 border border-(--color-accent)/30 dark:border-(--color-accent-dark)/25 bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-(--color-accent) dark:text-(--color-accent-dark)"
              style={{ borderRadius: "var(--radius-sm)" }}
            >
              <span className="pulse-dot h-1 w-1 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
              {present}
            </span>
          )}
        </div>

        {item.bullets.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {item.bullets.map((bullet: string, i: number) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed"
              >
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
