import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

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
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};
  return {
    title: `${project.title} — Abdulaziz Hatamov`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  const details = project.details as ProjectDetails | null;

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col gap-14">

        {/* Back */}
        <Link
          href="/projects"
          className="self-start inline-flex items-center gap-1.5 text-sm text-(--color-muted) dark:text-(--color-muted-dark) hover:text-(--color-text) dark:hover:text-(--color-text-dark) transition-colors"
        >
          ← All Projects
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-(--color-text) dark:text-(--color-text-dark) mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed max-w-2xl mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-(--color-accent) dark:bg-(--color-accent-dark) px-5 text-sm font-medium text-white hover:bg-(--color-accent-hover) dark:hover:bg-(--color-accent-dark-hover) transition-colors"
              >
                Live Site ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-(--color-border) dark:border-(--color-border-dark) px-5 text-sm font-medium text-(--color-text) dark:text-(--color-text-dark) hover:bg-(--color-surface) dark:hover:bg-(--color-surface-dark) transition-colors"
              >
                Source ↗
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-muted) dark:text-(--color-muted-dark) mb-4">
            Full Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-3 py-1 text-sm text-(--color-accent) dark:text-(--color-accent-dark)"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {details && (
          <>
            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold text-(--color-text) dark:text-(--color-text-dark) mb-3">
                Overview
              </h2>
              <p className="text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">
                {details.overview}
              </p>
            </section>

            {/* Repositories */}
            <section>
              <h2 className="text-xl font-bold text-(--color-text) dark:text-(--color-text-dark) mb-6">
                Repositories
              </h2>
              <div className="flex flex-col gap-6">
                {details.repos.map((repo, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) overflow-hidden"
                  >
                    {/* Repo header */}
                    <div className="px-6 pt-6 pb-4 border-b border-(--color-border) dark:border-(--color-border-dark)">
                      <div className="flex flex-wrap items-baseline gap-3 mb-2">
                        <h3 className="text-lg font-bold text-(--color-text) dark:text-(--color-text-dark)">
                          {repo.name}
                        </h3>
                        <span className="text-xs font-medium text-(--color-accent) dark:text-(--color-accent-dark) bg-(--color-accent-subtle) dark:bg-(--color-accent-dark-subtle) px-2 py-0.5 rounded-md">
                          {repo.subtitle}
                        </span>
                      </div>
                      <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">
                        {repo.description}
                      </p>
                    </div>

                    <div className="px-6 py-4 flex flex-col gap-5">
                      {/* Repo tech */}
                      <div className="flex flex-wrap gap-1.5">
                        {repo.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-(--color-bg) dark:bg-(--color-bg-dark) border border-(--color-border) dark:border-(--color-border-dark) px-2 py-0.5 text-xs text-(--color-muted) dark:text-(--color-muted-dark)"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Highlights */}
                      <ul className="flex flex-col gap-3">
                        {repo.highlights.map((point, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-(--color-text) dark:text-(--color-text-dark) leading-relaxed">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-accent) dark:bg-(--color-accent-dark)" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Architecture */}
            <section>
              <h2 className="text-xl font-bold text-(--color-text) dark:text-(--color-text-dark) mb-4">
                Architecture
              </h2>
              <div className="rounded-2xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) divide-y divide-(--color-border) dark:divide-(--color-border-dark)">
                {details.architecture.map((point, i) => (
                  <div key={i} className="flex items-start gap-4 px-6 py-4">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-border) dark:bg-(--color-border-dark)" />
                    <p className="text-sm text-(--color-muted) dark:text-(--color-muted-dark) leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

      </div>
    </main>
  );
}
