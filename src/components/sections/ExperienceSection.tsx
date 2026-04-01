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

      <div className="mt-12 flex flex-col gap-4">
        {experience.map((item, index) => (
          <ExperienceCard
            key={item.id}
            item={item}
            index={index}
            present={t("present")}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ExperienceCard({
  item,
  index,
  present,
}: {
  item: Experience;
  index: number;
  present: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const startYear = new Date(item.startDate).getFullYear();
  const endYear = item.current
    ? present
    : item.endDate
    ? new Date(item.endDate).getFullYear()
    : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="group relative rounded-(--radius-2xl) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-6 sm:p-8 hover:border-(--color-accent)/30 dark:hover:border-(--color-accent-dark)/25 transition-all duration-300 hover:shadow-xl hover:shadow-(--color-accent)/5 dark:hover:shadow-(--color-accent-dark)/8 overflow-hidden"
    >
      {/* Gradient top line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-(--color-accent) dark:from-(--color-accent-dark) to-(--color-accent-2) dark:to-(--color-accent-2-dark) opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          {/* Role */}
          <h3 className="text-lg sm:text-xl font-bold text-(--color-text) dark:text-(--color-text-dark)">
            {item.role}
          </h3>
          {/* Company */}
          <p className="text-base font-semibold text-(--color-accent) dark:text-(--color-accent-dark)">
            {item.company}
          </p>
          {/* Location */}
          {item.location && (
            <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {item.location}
            </p>
          )}
        </div>

        {/* Date badge */}
        <span className="shrink-0 inline-flex items-center rounded-full border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-bg) dark:bg-(--color-bg-dark) px-4 py-1.5 text-xs font-bold text-(--color-muted) dark:text-(--color-muted-dark) font-mono tracking-wide whitespace-nowrap">
          {startYear} — {endYear}
        </span>
      </div>

      {/* Bullets */}
      {item.bullets.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2.5 border-t border-(--color-border) dark:border-(--color-border-dark) pt-5">
          {item.bullets.map((bullet: string, i: number) => (
            <li key={i} className="flex gap-3 text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">
              <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
