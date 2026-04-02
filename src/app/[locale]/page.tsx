export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LatestPosts from "@/components/sections/LatestPosts";
import ContactCTA from "@/components/sections/ContactCTA";
import prisma from "@/lib/prisma";
import { getAllPosts } from "@/lib/blog";
import { personJsonLd, websiteJsonLd } from "@/lib/jsonld";

const BASE_URL = "https://abdulaziz.cv";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const about = await getTranslations({ locale, namespace: "about" });

  const title = `Abdulaziz Hatamov — ${t("role")}`;
  const description = about("bio");

  return {
    title,
    description,
    keywords: [
      "Abdulaziz Hatamov",
      "frontend developer",
      "full stack developer",
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "web developer",
      "portfolio",
      "hire frontend developer",
    ],
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        uz: `${BASE_URL}/uz`,
        ru: `${BASE_URL}/ru`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      type: "profile",
      firstName: "Abdulaziz",
      lastName: "Hatamov",
      username: "abdulazizkhatamov",
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const latestPosts = getAllPosts().slice(0, 3);

  const [featuredProjects, skills, experience, settings] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      take: 3,
    }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <HeroSection openToWork={settings?.openToWork ?? true} />
      <AboutSection />
      <SkillsSection skills={skills} />
      <ExperienceSection experience={experience} />
      <FeaturedProjects projects={featuredProjects} />
      <LatestPosts posts={latestPosts} />
      <ContactCTA />
    </>
  );
}
