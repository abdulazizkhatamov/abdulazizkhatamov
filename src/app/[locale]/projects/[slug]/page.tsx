export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import prisma from "@/lib/prisma";
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

const BASE_URL = "https://abdulaziz.cv";

type RepoDetail = {
  name: string;
  subtitle: string;
  description: string;
  techStack: string[];
  highlights: string[];
};
type ProjectDetails = {
  overview: string;
  repos: RepoDetail[];
  architecture: string[];
};
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};

  const url = `${BASE_URL}/${locale}/projects/${slug}`;
  const keywords = [
    project.title,
    ...project.techStack,
    "web application",
    "full stack project",
    "Abdulaziz Hatamov",
  ];

  return {
    title: project.title,
    description: project.description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en/projects/${slug}`,
        uz: `${BASE_URL}/uz/projects/${slug}`,
        ru: `${BASE_URL}/ru/projects/${slug}`,
        "x-default": `${BASE_URL}/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url,
      type: "article",
      authors: ["Abdulaziz Hatamov"],
    },
    twitter: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  const details = project.details as ProjectDetails | null;

  const ldProject = projectJsonLd({
    title: project.title,
    description: project.description,
    slug,
    locale,
    techStack: project.techStack as string[],
    liveUrl: project.liveUrl,
    updatedAt: project.updatedAt,
  });

  const ldBreadcrumb = breadcrumbJsonLd([
    { name: "Home", item: `${BASE_URL}/${locale}` },
    { name: "Projects", item: `${BASE_URL}/${locale}/projects` },
    { name: project.title, item: `${BASE_URL}/${locale}/projects/${slug}` },
  ]);

  return (
    <main className="min-h-screen pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldProject) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }}
      />

      <div className="mx-auto max-w-4xl px-6 sm:px-12 flex flex-col gap-12">

        {/* Back */}
        <Link
          href="/projects"
          className="self-start inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 8H3M7 4l-4 4 4 4" />
          </svg>
          All Projects
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-(--color-border) dark:border-(--color-border-dark) pb-10">
          <h1
            className="font-black tracking-tight text-(--color-text) dark:text-(--color-text-dark) leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            {project.title}
          </h1>
          <p className="text-base text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed max-w-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 bg-(--color-text) dark:bg-(--color-text-dark) text-(--color-bg) dark:text-(--color-bg-dark) px-5 font-mono text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 border border-(--color-border) dark:border-(--color-border-dark) text-(--color-text) dark:text-(--color-text-dark) px-5 font-mono text-xs font-bold uppercase tracking-widest hover:border-(--color-accent) dark:hover:border-(--color-accent-dark) hover:text-(--color-accent) dark:hover:text-(--color-accent-dark) transition-colors"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                Source ↗
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-(--color-accent) dark:text-(--color-accent-dark)">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-(--color-text) dark:text-(--color-text-dark)"
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {details && (
          <>
            {/* Overview */}
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-(--color-accent) dark:text-(--color-accent-dark)">
                Overview
              </p>
              <p className="text-base text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">
                {details.overview}
              </p>
            </div>

            {/* Repositories */}
            {details.repos?.length > 0 && (
              <div className="flex flex-col gap-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-(--color-accent) dark:text-(--color-accent-dark)">
                  Repositories
                </p>
                <div className="flex flex-col gap-4">
                  {details.repos.map((repo, i) => (
                    <div
                      key={i}
                      className="border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) overflow-hidden"
                      style={{ borderRadius: "var(--radius-md)" }}
                    >
                      <div className="px-6 pt-5 pb-4 border-b border-(--color-border) dark:border-(--color-border-dark) flex flex-wrap items-baseline gap-3">
                        <h3 className="font-bold text-(--color-text) dark:text-(--color-text-dark)">{repo.name}</h3>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-(--color-accent) dark:text-(--color-accent-dark) bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-2 py-0.5" style={{ borderRadius: "var(--radius-sm)" }}>
                          {repo.subtitle}
                        </span>
                      </div>
                      <div className="px-6 py-5 flex flex-col gap-4">
                        <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">{repo.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {repo.techStack.map((tech) => (
                            <span key={tech} className="font-mono text-[10px] font-bold uppercase tracking-wider text-(--color-muted) dark:text-(--color-muted-dark) border border-(--color-border) dark:border-(--color-border-dark) px-2 py-0.5" style={{ borderRadius: "var(--radius-sm)" }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <ul className="flex flex-col gap-2">
                          {repo.highlights.map((point, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-(--color-text) dark:text-(--color-text-dark) leading-relaxed">
                              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture */}
            {details.architecture?.length > 0 && (
              <div className="flex flex-col gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-(--color-accent) dark:text-(--color-accent-dark)">
                  Architecture
                </p>
                <div className="border border-(--color-border) dark:border-(--color-border-dark) divide-y divide-(--color-border) dark:divide-(--color-border-dark)" style={{ borderRadius: "var(--radius-md)" }}>
                  {details.architecture.map((point, i) => (
                    <div key={i} className="flex items-start gap-4 px-6 py-4">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
                      <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}
