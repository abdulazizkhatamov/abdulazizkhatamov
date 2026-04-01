"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function ContactCTA() {
  const t = useTranslations("contact");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="contact-cta">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
        className="relative overflow-hidden rounded-(--radius-3xl) border border-(--color-accent)/20 dark:border-(--color-accent-dark)/20 bg-gradient-to-br from-(--color-accent-subtle) dark:from-(--color-accent-dark-subtle) to-(--color-surface) dark:to-(--color-surface-dark) p-12 sm:p-16 text-center flex flex-col items-center gap-6"
      >
        {/* Background glow orbs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-(--color-accent)/10 dark:bg-(--color-accent-dark)/10 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-(--color-accent-2)/8 dark:bg-(--color-accent-2-dark)/8 blur-[60px] pointer-events-none" />

        {/* Icon */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-(--radius-2xl) border border-(--color-accent)/25 dark:border-(--color-accent-dark)/25 bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) text-(--color-accent) dark:text-(--color-accent-dark)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <div className="relative flex flex-col gap-3 max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark)">
            {t("cta_title")}
          </h2>
          <p className="text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">
            {t("cta_subtitle")}
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative">
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-2 rounded-(--radius-lg) bg-(--color-accent) dark:bg-(--color-accent-dark) px-8 text-sm font-semibold text-white dark:text-(--color-bg-dark) hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-all shadow-lg shadow-(--color-accent)/30 dark:shadow-(--color-accent-dark)/25 hover:shadow-xl hover:shadow-(--color-accent)/40"
          >
            {t("cta_button")}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
