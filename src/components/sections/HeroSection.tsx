"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";

const CV_MAP: Record<string, string> = {
  en: "/cv/Abdulaziz_Hatamov_EN.pdf",
  uz: "/cv/Abdulaziz_Hatamov_UZ.pdf",
  ru: "/cv/Abdulaziz_Hatamov_RU.pdf",
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0, 0, 1] },
  }),
};

type Props = { openToWork: boolean };

export default function HeroSection({ openToWork }: Props) {
  const t = useTranslations("hero");
  const locale = useLocale();
  const cvUrl = CV_MAP[locale] ?? CV_MAP.en;

  return (
    <section className="relative flex min-h-screen flex-col items-start justify-center px-6 pt-24 pb-16 mx-auto max-w-5xl">
      <div className="flex flex-col gap-6 max-w-2xl">
        {openToWork && (
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-(--color-accent)/30 dark:border-(--color-accent-dark)/30 bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-3 py-1 text-xs font-medium text-(--color-accent) dark:text-(--color-accent-dark)">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark) opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
              </span>
              {t("available")}
            </span>
          </motion.div>
        )}

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-base text-(--color-muted) dark:text-(--color-muted-dark) font-medium"
        >
          {t("greeting")}
        </motion.p>

        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark) leading-tight"
        >
          Abdulaziz Hatamov
        </motion.h1>

        <motion.h2
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xl sm:text-2xl font-medium text-(--color-accent) dark:text-(--color-accent-dark)"
        >
          {t("role")}
        </motion.h2>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed max-w-lg"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3 pt-2"
        >
          <Link
            href="/projects"
            className="inline-flex h-10 items-center gap-2 rounded-(--radius-md) bg-(--color-accent) dark:bg-(--color-accent-dark) px-5 text-sm font-medium text-white dark:text-(--color-bg-dark) hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-colors"
          >
            {t("cta_projects")}
          </Link>
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-(--radius-md) border border-(--color-border) dark:border-(--color-border-dark) px-5 text-sm font-medium text-(--color-text) dark:text-(--color-text-dark) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) transition-colors"
          >
            {t("cta_cv")}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 pt-2"
        >
          <a
            href="https://github.com/abdulazizkhatamov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://t.me/abdulaziz_khatamov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
            aria-label="Telegram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.857l-2.95-.924c-.64-.203-.657-.64.136-.953l11.57-4.461c.537-.194 1.006.131.968.702z" />
            </svg>
          </a>
          <a
            href="mailto:abdulazizkhatamov@hotmail.com"
            className="text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
            aria-label="Email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-6 flex flex-col items-center gap-2"
      >
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-(--color-border) dark:to-(--color-border-dark)" />
      </motion.div>
    </section>
  );
}
