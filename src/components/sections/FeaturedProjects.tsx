import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCard from "@/components/ui/ProjectCard";
import { SectionLabel } from "./AboutSection";
import type { Project } from "@/generated/prisma/client";

type Props = { projects: Project[] };

export default function FeaturedProjects({ projects }: Props) {
  const t = useTranslations("projects");

  return (
    <SectionWrapper id="projects">
      <div className="flex items-end justify-between mb-12">
        <SectionLabel number="05" label={t("featured_title")} />
        <Link
          href="/projects"
          className="group hidden sm:flex items-center gap-2 text-sm font-semibold text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors"
        >
          {t("view_all")}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <div className="mt-8 sm:hidden">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-(--color-accent) dark:text-(--color-accent-dark)"
        >
          {t("view_all")}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </SectionWrapper>
  );
}
