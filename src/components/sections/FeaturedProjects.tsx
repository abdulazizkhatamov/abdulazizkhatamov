import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/generated/prisma/client";

type Props = { projects: Project[] };

export default function FeaturedProjects({ projects }: Props) {
  const t = useTranslations("projects");

  return (
    <SectionWrapper id="projects">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-(--color-accent) dark:text-(--color-accent-dark)">
          {t("featured_title")}
        </h2>
        <Link
          href="/projects"
          className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
        >
          {t("view_all")} →
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark)">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
