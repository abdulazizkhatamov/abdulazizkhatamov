"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { Project } from "@/generated/prisma/client";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  const t = useTranslations("projects");
  const router = useRouter();
  const hasDetail = !!project.slug;
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── 3D tilt ──────────────────────────────────────── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [9, -9]),  { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(rawX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(rawY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handleClick = () => {
    if (hasDetail) router.push(`/projects/${project.slug}`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      whileHover={{ z: 20 }}
      transition={{ duration: 0.2 }}
      className={[
        "group relative flex flex-col rounded-(--radius-2xl) border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) overflow-hidden transition-all duration-300",
        hasDetail
          ? "hover:border-(--color-accent)/35 dark:hover:border-(--color-accent-dark)/30 hover:shadow-2xl hover:shadow-(--color-accent)/12 dark:hover:shadow-(--color-accent-dark)/12 cursor-pointer"
          : "",
      ].join(" ")}
    >
      {/* Dynamic glow spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(200px circle at ${x}% ${y}%, rgba(99,102,241,0.12), transparent 60%)`
          ),
        }}
      />

      {/* Top gradient line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-(--color-accent) dark:from-(--color-accent-dark) via-(--color-accent-2) dark:via-(--color-accent-2-dark) to-(--color-accent) dark:to-(--color-accent-dark) opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Title + description */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="font-bold text-(--color-text) dark:text-(--color-text-dark) group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors text-base">
            {project.title}
          </h3>
          <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech: string) => (
              <span
                key={tech}
                className="rounded-full bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) border border-(--color-accent)/15 dark:border-(--color-accent-dark)/15 px-2.5 py-0.5 text-xs font-semibold text-(--color-accent) dark:text-(--color-accent-dark)"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-4 pt-2 border-t border-(--color-border) dark:border-(--color-border-dark)">
          {hasDetail && (
            <span className="text-xs font-bold text-(--color-accent) dark:text-(--color-accent-dark) flex items-center gap-1.5 group-hover:gap-2 transition-all duration-200">
              {t("view_details")}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          )}
          <div className="flex items-center gap-3 ml-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs font-semibold text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
              >
                {t("live")}
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 3H3v10h10V9M9 1h6v6M15 1l-8 8" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs font-semibold text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
              >
                {t("source")}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
