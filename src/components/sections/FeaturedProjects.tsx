"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SectionLabel } from "./AboutSection";
import type { Project } from "@/generated/prisma/client";
import { Link } from "@/i18n/navigation";

type Props = { projects: Project[] };

export default function FeaturedProjects({ projects }: Props) {
  const t = useTranslations("projects");

  return (
    <SectionWrapper id="projects">
      <div className="flex items-center justify-between mb-14">
        <SectionLabel number="05" label={t("featured_title")} />
        <Link
          href="/projects"
          className="group hidden sm:flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors shrink-0"
        >
          {t("view_all")}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="font-mono text-sm text-(--color-muted) dark:text-(--color-muted-dark)">{t("empty")}</p>
      ) : (
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectListItem key={project.id} project={project} index={index} t={t} />
          ))}
        </div>
      )}

      <div className="mt-8 sm:hidden">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-(--color-accent) dark:text-(--color-accent-dark)"
        >
          {t("view_all")}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </SectionWrapper>
  );
}

function ProjectListItem({
  project,
  index,
  t,
}: {
  project: Project;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) {
  const router = useRouter();
  const num = String(index + 1).padStart(2, "0");

  const handleRowClick = () => {
    if (project.slug) router.push(`/projects/${project.slug}`);
  };

  return (
    <div
      onClick={handleRowClick}
      className={[
        "group flex flex-col gap-4 py-8 border-b border-(--color-border) dark:border-(--color-border-dark) first:border-t transition-colors",
        project.slug ? "cursor-pointer hover:border-(--color-accent)/40 dark:hover:border-(--color-accent-dark)/35" : "",
      ].join(" ")}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4 flex-1 min-w-0">
          <span className="font-mono text-xs font-bold text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">
            {num}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-(--color-text) dark:text-(--color-text-dark) group-hover:text-(--color-accent) dark:group-hover:text-(--color-accent-dark) transition-colors leading-tight truncate">
            {project.title}
          </h3>
        </div>

        {/* External links — stop propagation to prevent row click */}
        <div className="flex items-center gap-3 shrink-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-[10px] uppercase tracking-widest text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors flex items-center gap-1"
            >
              {t("live")}
              <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
              className="font-mono text-[10px] uppercase tracking-widest text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors flex items-center gap-1"
            >
              {t("source")}
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed max-w-2xl ml-8 sm:ml-11">
        {project.description}
      </p>

      {/* Tech stack */}
      {project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 ml-8 sm:ml-11">
          {project.techStack.slice(0, 5).map((tech: string) => (
            <span
              key={tech}
              className="font-mono text-[10px] font-bold uppercase tracking-wider text-(--color-accent) dark:text-(--color-accent-dark)"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="font-mono text-[10px] text-(--color-muted) dark:text-(--color-muted-dark)">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
