"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { Project } from "@/generated/prisma/client";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const router = useRouter();
  const hasDetail = !!project.slug;

  const handleCardClick = () => {
    if (hasDetail) router.push(`/projects/${project.slug}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className={`group flex flex-col gap-4 rounded-2xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-5 transition-colors ${hasDetail ? "hover:border-(--color-accent)/40 dark:hover:border-(--color-accent-dark)/40 cursor-pointer" : ""}`}
    >
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-(--color-text) dark:text-(--color-text-dark)">
          {project.title}
        </h3>
        <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech: string) => (
            <span
              key={tech}
              className="rounded-md bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-2 py-0.5 text-xs text-(--color-accent) dark:text-(--color-accent-dark)"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        {hasDetail && (
          <span className="text-xs font-medium text-(--color-accent) dark:text-(--color-accent-dark)">
            View Details →
          </span>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
          >
            {t("live")} ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-medium text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
          >
            {t("source")} ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}
