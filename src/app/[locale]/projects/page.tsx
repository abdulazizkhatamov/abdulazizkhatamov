export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCard from "@/components/ui/ProjectCard";
import prisma from "@/lib/prisma";
import type { Project } from "@/generated/prisma/client";
import { breadcrumbJsonLd } from "@/lib/jsonld";

const BASE_URL = "https://abdulaziz.cv";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const title = t("title");
  const description =
    "A collection of production web applications built by Abdulaziz Hatamov — full-stack projects using React, Next.js, TypeScript, and Node.js.";

  return {
    title,
    description,
    keywords: [
      "web projects",
      "React applications",
      "Next.js projects",
      "TypeScript",
      "NestJS",
      "full stack",
      "portfolio",
      "Abdulaziz Hatamov",
    ],
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
      type: "website",
    },
    twitter: { title, description },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects: Project[] = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  const ldBreadcrumb = breadcrumbJsonLd([
    { name: "Home", item: `${BASE_URL}/${locale}` },
    { name: "Projects", item: `${BASE_URL}/${locale}/projects` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />
      <ProjectsContent projects={projects} />
    </>
  );
}

function ProjectsContent({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects");

  return (
    <SectionWrapper className="pt-32">
      <div className="flex items-center gap-5 mb-14">
        <span className="font-mono text-xs font-bold text-(--color-accent) dark:text-(--color-accent-dark) shrink-0">
          04
        </span>
        <div className="flex-1 h-px bg-(--color-border) dark:bg-(--color-border-dark)" />
        <h1 className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-(--color-muted) dark:text-(--color-muted-dark) shrink-0">
          {t("title")}
        </h1>
      </div>

      {projects.length === 0 ? (
        <p className="font-mono text-sm text-(--color-muted) dark:text-(--color-muted-dark)">
          {t("empty")}
        </p>
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
