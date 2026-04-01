"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { Link } from "@/i18n/navigation";

const CV_MAP: Record<string, string> = {
  en: "/cv/Abdulaziz_Hatamov_FullStack_EN.pdf",
  uz: "/cv/Abdulaziz_Hatamov_FullStack_UZ.pdf",
  ru: "/cv/Abdulaziz_Hatamov_FullStack_RU.pdf",
};

function SplitText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span aria-label={text} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "115%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + i * 0.028,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

type Props = { openToWork: boolean };

export default function HeroSection({ openToWork }: Props) {
  const t = useTranslations("hero");
  const locale = useLocale();
  const cvUrl = CV_MAP[locale] ?? CV_MAP.en;
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Mouse parallax ─────────────────────────────────────── */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const mx = useSpring(rawX, { stiffness: 25, damping: 18 });
  const my = useSpring(rawY, { stiffness: 25, damping: 18 });

  const b1x = useTransform(mx, [0, 1], [-55, 55]);
  const b1y = useTransform(my, [0, 1], [-55, 55]);
  const b2x = useTransform(mx, [0, 1], [45, -45]);
  const b2y = useTransform(my, [0, 1], [35, -35]);
  const b3x = useTransform(mx, [0, 1], [-20, 20]);
  const b3y = useTransform(my, [0, 1], [20, -20]);

  /* ── Scroll parallax ────────────────────────────────────── */
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, -80]);
  const blobsY   = useTransform(scrollY, [0, 700], [0, 120]);
  const opacity  = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden"
    >
      {/* ── Background blobs ─────────────────────────────── */}
      <motion.div
        style={{ y: blobsY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <motion.div
          style={{ x: b1x, y: b1y }}
          className="absolute -top-40 -left-20 blob-1"
        >
          <div
            className="w-[700px] h-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.45) 0%, rgba(139,92,246,0.2) 45%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
        </motion.div>

        <motion.div
          style={{ x: b2x, y: b2y }}
          className="absolute -bottom-60 -right-32 blob-2"
        >
          <div
            className="w-[650px] h-[650px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>

        <motion.div
          style={{ x: b3x, y: b3y }}
          className="absolute top-1/2 right-1/4 blob-3"
        >
          <div
            className="w-[400px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── Content ──────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto max-w-6xl w-full px-6 sm:px-12 lg:px-16 pt-28 pb-24"
      >
        {/* Available badge */}
        {openToWork && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-(--color-accent)/25 dark:border-(--color-accent-dark)/20 bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-(--color-accent) dark:text-(--color-accent-dark)">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark) opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
              </span>
              {t("available")}
            </span>
          </motion.div>
        )}

        {/* Greeting line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-sm sm:text-base font-medium text-(--color-muted) dark:text-(--color-muted-dark) mb-4 tracking-wider uppercase"
        >
          {t("greeting")}
        </motion.p>

        {/* Giant name */}
        <div className="mb-6 leading-[0.88] overflow-hidden">
          <div className="overflow-hidden">
            <SplitText
              text="ABDULAZIZ"
              delay={0.3}
              className="gradient-text text-[clamp(3.2rem,9.5vw,8.5rem)] font-black tracking-tight"
            />
          </div>
          <div className="overflow-hidden">
            <SplitText
              text="HATAMOV"
              delay={0.52}
              className="text-(--color-text) dark:text-(--color-text-dark) text-[clamp(3.2rem,9.5vw,8.5rem)] font-black tracking-tight"
            />
          </div>
        </div>

        {/* Role with animated line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="block h-px w-12 bg-(--color-accent) dark:bg-(--color-accent-dark)"
          />
          <span className="text-base sm:text-lg font-semibold text-(--color-accent) dark:text-(--color-accent-dark) tracking-[0.12em] uppercase">
            {t("role")}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md text-base sm:text-lg text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed mb-10"
        >
          {t("tagline")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          <Link
            href="/projects"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark) px-8 text-sm font-semibold text-white dark:text-(--color-bg-dark) transition-all duration-300 shadow-2xl shadow-(--color-accent)/30 dark:shadow-(--color-accent-dark)/20 hover:shadow-[0_20px_50px_rgba(99,102,241,0.45)] dark:hover:shadow-[0_20px_50px_rgba(129,140,248,0.35)] hover:-translate-y-1 hover:scale-[1.02]"
          >
            {t("cta_projects")}
            <svg
              width="14" height="14" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>

          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2.5 rounded-full border border-(--color-border) dark:border-(--color-border-dark) bg-transparent px-8 text-sm font-semibold text-(--color-text) dark:text-(--color-text-dark) transition-all duration-300 hover:border-(--color-accent)/60 dark:hover:border-(--color-accent-dark)/50 hover:bg-(--color-accent-subtle) dark:hover:bg-(--color-accent-dark-subtle) hover:-translate-y-1 hover:scale-[1.02]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t("cta_cv")}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <HeroSocialLink href="https://github.com/abdulazizkhatamov" label="GitHub">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </HeroSocialLink>
          <HeroSocialLink href="https://t.me/abdulaziz_khatamov" label="Telegram">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.857l-2.95-.924c-.64-.203-.657-.64.136-.953l11.57-4.461c.537-.194 1.006.131.968.702z" />
            </svg>
          </HeroSocialLink>
          <HeroSocialLink href="mailto:abdulazizkhatamov@hotmail.com" label="Email">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </HeroSocialLink>
        </motion.div>
      </motion.div>

      {/* Section number — decorative */}
      <div
        aria-hidden
        className="absolute right-6 sm:right-14 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black tabular-nums leading-none"
        style={{
          fontSize: "clamp(5rem, 15vw, 12rem)",
          color: "var(--color-text)",
          opacity: 0.03,
        }}
      >
        01
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="flex flex-col items-center gap-1.5">
          <div
            className="w-[1.5px] h-12 scroll-bounce"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--color-accent), transparent)",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function HeroSocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const isEmail = href.startsWith("mailto:");
  return (
    <motion.a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      aria-label={label}
      whileHover={{ y: -3, scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) hover:border-(--color-accent)/40 dark:hover:border-(--color-accent-dark)/35 hover:bg-(--color-accent-subtle) dark:hover:bg-(--color-accent-dark-subtle) transition-colors duration-200"
    >
      {children}
    </motion.a>
  );
}
