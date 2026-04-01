"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SectionLabel } from "./AboutSection";
import type { Skill } from "@/generated/prisma/client";

type Props = { skills: Skill[] };

const CATEGORY_ORDER = ["Core", "Frontend", "UI", "Backend", "APIs", "DevOps", "Testing"];

export default function SkillsSection({ skills }: Props) {
  const t = useTranslations("skills");

  const all = CATEGORY_ORDER.flatMap((cat) =>
    skills.filter((s) => s.category === cat)
  );

  const mid = Math.ceil(all.length / 2);
  const row1 = all.slice(0, mid);
  const row2 = all.slice(mid);

  return (
    <SectionWrapper id="skills">
      <SectionLabel number="03" label={t("title")} />

      <div className="mt-12 flex flex-col gap-4 overflow-hidden">
        {/* Row 1 — scrolls left */}
        <MarqueeRow items={row1} direction="left" />
        {/* Row 2 — scrolls right */}
        <MarqueeRow items={row2} direction="right" />
      </div>

      {/* Gradient fade edges */}
    </SectionWrapper>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Skill[];
  direction: "left" | "right";
}) {
  if (items.length === 0) return null;
  const doubled = [...items, ...items, ...items];
  const xStart = direction === "left" ? "0%" : "-33.33%";
  const xEnd   = direction === "left" ? "-33.33%" : "0%";

  return (
    <div className="relative overflow-hidden py-1">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }} />

      <motion.div
        animate={{ x: [xStart, xEnd] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-3 w-max"
      >
        {doubled.map((skill, i) => (
          <SkillChip key={`${skill.id}-${i}`} name={skill.name} />
        ))}
      </motion.div>
    </div>
  );
}

function SkillChip({ name }: { name: string }) {
  return (
    <motion.span
      whileHover={{ y: -3, scale: 1.06 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="inline-flex items-center rounded-full border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-4 py-2 text-sm font-medium text-(--color-text) dark:text-(--color-text-dark) cursor-default select-none whitespace-nowrap hover:border-(--color-accent)/50 dark:hover:border-(--color-accent-dark)/40 hover:bg-(--color-accent-subtle) dark:hover:bg-(--color-accent-dark-subtle) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors"
    >
      {name}
    </motion.span>
  );
}
