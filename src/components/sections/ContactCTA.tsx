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
      <div ref={ref} className="border-t border-b border-(--color-border) dark:border-(--color-border-dark) py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10"
        >
          {/* Text */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-(--color-muted) dark:text-(--color-muted-dark)">
              {t("cta_subtitle")}
            </p>
            <h2
              className="font-black leading-[0.88] tracking-[-0.03em] text-(--color-text) dark:text-(--color-text-dark)"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            >
              {t("cta_title")}
            </h2>
            <p className="font-mono text-sm text-(--color-accent) dark:text-(--color-accent-dark)">
              abdulazizkhatamov@hotmail.com
            </p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center gap-3 bg-(--color-text) dark:bg-(--color-text-dark) text-(--color-bg) dark:text-(--color-bg-dark) px-8 text-sm font-semibold hover:bg-(--color-accent) dark:hover:bg-(--color-accent-dark) hover:text-white dark:hover:text-(--color-bg-dark) transition-colors"
              style={{ borderRadius: "var(--radius-sm)" }}
            >
              {t("cta_button")}
              <svg
                width="14" height="14" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
