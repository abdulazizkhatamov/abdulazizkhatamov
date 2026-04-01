"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <SectionWrapper id="about">
      {/* Section label */}
      <SectionLabel number="02" label={t("title")} />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 mt-12">
        {/* Bio */}
        <div className="lg:col-span-3">
          <p className="text-lg sm:text-xl leading-[1.8] text-(--color-text) dark:text-(--color-text-dark) font-light">
            {t("bio")}
          </p>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-3 lg:grid-cols-1 gap-4">
          <StatCard
            number={4}
            suffix="+"
            label={t("label_experience")}
            sublabel={t("experience")}
          />
          <StatCard
            number={20}
            suffix="+"
            label="Projects"
            sublabel="Shipped"
          />
          <StatCard
            number={3}
            suffix=""
            label={t("label_languages")}
            sublabel="UZ / RU / EN"
          />
        </div>
      </div>

      {/* Location */}
      <motion.div
        className="mt-10 flex items-center gap-3 text-sm text-(--color-muted) dark:text-(--color-muted-dark)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {t("location")}
      </motion.div>
    </SectionWrapper>
  );
}

function StatCard({
  number,
  suffix,
  label,
  sublabel,
}: {
  number: number;
  suffix: string;
  label: string;
  sublabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, number, { duration: 1.6, ease: "easeOut" });
    return ctrl.stop;
  }, [inView, count, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-1 rounded-(--radius-2xl) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-5 hover:border-(--color-accent)/30 dark:hover:border-(--color-accent-dark)/25 transition-colors group"
    >
      <div className="text-3xl sm:text-4xl font-black text-(--color-text) dark:text-(--color-text-dark) tabular-nums group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors">
        <motion.span>{display}</motion.span>
        {suffix}
      </div>
      <div className="text-xs font-semibold uppercase tracking-[0.15em] text-(--color-accent) dark:text-(--color-accent-dark)">
        {label}
      </div>
      <div className="text-xs text-(--color-muted) dark:text-(--color-muted-dark)">
        {sublabel}
      </div>
    </motion.div>
  );
}

export function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-black tabular-nums text-(--color-text) dark:text-(--color-text-dark) opacity-[0.06] select-none"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1 }}>
        {number}
      </span>
      <div className="flex flex-col gap-1">
        <div className="h-px w-8 bg-(--color-accent) dark:bg-(--color-accent-dark)" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-(--color-accent) dark:text-(--color-accent-dark)">
          {label}
        </span>
      </div>
    </div>
  );
}
