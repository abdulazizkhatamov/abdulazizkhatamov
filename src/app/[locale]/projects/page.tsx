export const dynamic = "force-dynamic";

import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCard from "@/components/ui/ProjectCard";
import prisma from "@/lib/prisma";
import type { Project } from "@/generated/prisma/client";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: `${t("title")} — Abdulaziz Hatamov` };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects: Project[] = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  return <ProjectsContent projects={projects} />;
}

function ProjectsContent({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects");

  return (
    <SectionWrapper className="pt-32">
      <h1 className="text-3xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark) mb-10">
        {t("title")}
      </h1>

      {projects.length === 0 ? (
        <p className="text-(--color-muted) dark:text-(--color-muted-dark)">No projects yet.</p>
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
