"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

/* ── SectionLabel — shared across all sections ────────────────────────────── */
export function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-5 mb-14">
      <span className="font-mono text-xs font-bold tabular-nums text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">
        {number}
      </span>
      <div className="flex-1 h-px bg-(--color-border) dark:bg-(--color-border-dark)" />
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-(--color-muted) dark:text-(--color-muted-dark) shrink-0">
        {label}
      </span>
    </div>
  );
}

/* ── Animated counter ─────────────────────────────────────────────────────── */
function StatCounter({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return ctrl.stop;
  }, [inView, count, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-1.5 border-l-2 border-(--color-accent) dark:border-(--color-accent-dark) pl-4"
    >
      <div
        className="font-black tabular-nums text-(--color-text) dark:text-(--color-text-dark) leading-none"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
      >
        <motion.span>{display}</motion.span>
        <span>{suffix}</span>
      </div>
      <div suppressHydrationWarning className="font-mono text-[11px] uppercase tracking-[0.24em] text-(--color-muted) dark:text-(--color-muted-dark)">
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const t = useTranslations("about");
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="about">
      <SectionLabel number="02" label={t("title")} />

      {/* Large editorial bio text */}
      <motion.p
        ref={bodyRef}
        initial={{ opacity: 0, y: 18 }}
        animate={bodyInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-xl sm:text-2xl lg:text-[1.65rem] font-medium leading-[1.7] text-(--color-text) dark:text-(--color-text-dark) max-w-4xl"
      >
        {t("bio")}
      </motion.p>

      {/* Rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={bodyInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="mt-12 mb-10 h-px bg-(--color-border) dark:bg-(--color-border-dark)"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
        <StatCounter value={4}  suffix="+" label={t("label_experience")} delay={0} />
        <StatCounter value={12} suffix="+" label="Projects Delivered"    delay={0.06} />
        <StatCounter value={15} suffix="+" label="Technologies"          delay={0.12} />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-1.5 border-l-2 border-(--color-border) dark:border-(--color-border-dark) pl-4"
        >
          <div
            className="font-black text-(--color-text) dark:text-(--color-text-dark) leading-none"
            style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}
          >
            Uzbekistan
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-(--color-muted) dark:text-(--color-muted-dark)">
            {t("label_location")}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
