"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/i18n/navigation";

const CV_MAP: Record<string, string> = {
  en: "/cv/Abdulaziz_Hatamov_FullStack_EN.pdf",
  uz: "/cv/Abdulaziz_Hatamov_FullStack_UZ.pdf",
  ru: "/cv/Abdulaziz_Hatamov_FullStack_RU.pdf",
};

function CharReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span aria-label={text} className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + i * 0.032,
            duration: 0.72,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection({ openToWork }: { openToWork: boolean }) {
  const t = useTranslations("hero");
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col px-5 sm:px-12 lg:px-20 pt-20 pb-8 overflow-hidden"
      style={{ opacity }}
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.032] dark:opacity-[0.048]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-text) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Vertical label — desktop only */}
      <div className="pointer-events-none absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 hidden lg:flex">
        <span
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-(--color-muted) dark:text-(--color-muted-dark) opacity-40"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          FRONTEND DEVELOPER
        </span>
      </div>

      {/* ── Top bar ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <motion.span
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-(--color-muted) dark:text-(--color-muted-dark)"
        >
          01 / PORTFOLIO
        </motion.span>

        {openToWork && (
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-(--color-accent) dark:text-(--color-accent-dark)">
              {t("available")}
            </span>
          </motion.div>
        )}
      </div>

      {/* ── Giant name ───────────────────────────────────────── */}
      <motion.div style={{ y: contentY }} className="flex-1 flex flex-col justify-center py-10 lg:py-16">
        <h1
          className="font-black leading-[0.85] tracking-[-0.04em] select-none"
          style={{ fontSize: "clamp(1.9rem, 10.5vw, 12rem)" }}
        >
          <CharReveal
            text="ABDULAZIZ"
            delay={0.38}
            className="block text-(--color-text) dark:text-(--color-text-dark)"
          />
          <CharReveal
            text="HATAMOV"
            delay={0.54}
            className="block text-(--color-accent) dark:text-(--color-accent-dark)"
          />
        </h1>

        {/* Slide-in rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className="mt-8 h-px bg-(--color-border) dark:bg-(--color-border-dark)"
        />

        {/* Role + tagline */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.08 }}
            className="text-base sm:text-lg leading-relaxed text-(--color-muted) dark:text-(--color-muted-dark) max-w-md"
          >
            {t("tagline")}
          </motion.p>

          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.16 }}
            className="font-mono text-sm font-semibold text-(--color-text) dark:text-(--color-text-dark) shrink-0"
          >
            {t("role")}
          </motion.span>
        </div>
      </motion.div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.26 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-6 border-t border-(--color-border) dark:border-(--color-border-dark)"
      >
        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/#projects"
            className="group inline-flex h-10 items-center gap-2 bg-(--color-text) dark:bg-(--color-text-dark) text-(--color-bg) dark:text-(--color-bg-dark) px-5 text-sm font-semibold hover:opacity-80 transition-opacity"
            style={{ borderRadius: "var(--radius-sm)" }}
          >
            {t("cta_projects")}
            <svg
              width="12" height="12" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>

          <a
            href={CV_MAP[locale] ?? CV_MAP.en}
            download
            className="inline-flex h-10 items-center gap-2 border border-(--color-border) dark:border-(--color-border-dark) px-5 text-sm font-semibold text-(--color-text) dark:text-(--color-text-dark) hover:border-(--color-accent) dark:hover:border-(--color-accent-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors"
            style={{ borderRadius: "var(--radius-sm)" }}
          >
            {t("cta_cv")}
            <svg
              width="12" height="12" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M8 3v8M4 7l4 4 4-4M3 13h10" />
            </svg>
          </a>
        </div>

        {/* Socials + scroll hint */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[
              {
                href: "https://github.com/abdulazizkhatamov",
                label: "GitHub",
                fill: true,
                d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
              },
              {
                href: "https://t.me/abdulaziz_khatamov",
                label: "Telegram",
                fill: true,
                d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.857l-2.95-.924c-.64-.203-.657-.64.136-.953l11.57-4.461c.537-.194 1.006.131.968.702z",
              },
              {
                href: "mailto:abdulazizkhatamov@hotmail.com",
                label: "Email",
                fill: false,
                d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              },
            ].map(({ href, label, fill, d }) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{ y: -2 }}
                className="flex h-9 w-9 items-center justify-center text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
              >
                <svg
                  width="15" height="15" viewBox="0 0 24 24"
                  fill={fill ? "currentColor" : "none"}
                  stroke={fill ? undefined : "currentColor"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d={d} />
                </svg>
              </motion.a>
            ))}
          </div>

          <span className="h-4 w-px bg-(--color-border) dark:bg-(--color-border-dark)" />

          <div className="scroll-bounce text-(--color-muted) dark:text-(--color-muted-dark)">
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="1" width="12" height="20" rx="6" />
              <motion.circle
                cx="7" cy="7" r="1.8" fill="currentColor" stroke="none"
                animate={{ cy: [7, 12, 7] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
