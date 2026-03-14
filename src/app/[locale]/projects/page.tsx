export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCard from "@/components/ui/ProjectCard";
import prisma from "@/lib/prisma";
import type { Project } from "@/generated/prisma/client";

const BASE_URL = "https://abdulaziz.cv";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const title = t("title");
  const description = "A collection of production web applications built by Abdulaziz Hatamov — full-stack projects using React, Next.js, TypeScript, and Node.js.";

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects`,
      languages: {
        en: `${BASE_URL}/en/projects`,
        uz: `${BASE_URL}/uz/projects`,
        ru: `${BASE_URL}/ru/projects`,
        "x-default": `${BASE_URL}/en/projects`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/projects`,
    },
    twitter: {
      title,
      description,
    },
  };
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
