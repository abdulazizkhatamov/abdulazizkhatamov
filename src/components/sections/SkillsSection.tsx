"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SectionLabel } from "./AboutSection";
import type { Skill } from "@/generated/prisma/client";

type Props = { skills: Skill[] };

const CATEGORIES = ["Core", "Frontend", "UI", "Backend", "APIs", "DevOps", "Testing"];

export default function SkillsSection({ skills }: Props) {
  const t = useTranslations("skills");

  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <SectionWrapper id="skills">
      <SectionLabel number="03" label={t("title")} />

      <div className="flex flex-col">
        {grouped.map((group, gi) => (
          <SkillRow key={group.category} category={group.category} items={group.items} index={gi} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function SkillRow({
  category,
  items,
  index,
}: {
  category: string;
  items: Skill[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-6 border-b border-(--color-border) dark:border-(--color-border-dark) first:border-t"
    >
      {/* Category label */}
      <div className="shrink-0 sm:w-28">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-(--color-accent) dark:text-(--color-accent-dark)">
          {category}
        </span>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2">
        {items.map((skill, si) => (
          <motion.span
            key={skill.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.07 + si * 0.04 }}
            whileHover={{ y: -2 }}
            className="inline-flex items-center border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3.5 py-1.5 text-sm font-medium text-(--color-text) dark:text-(--color-text-dark) hover:border-(--color-accent) dark:hover:border-(--color-accent-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors select-none"
            style={{ borderRadius: "var(--radius-sm)" }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
