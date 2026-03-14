export const dynamic = "force-dynamic";

import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LatestPosts from "@/components/sections/LatestPosts";
import ContactCTA from "@/components/sections/ContactCTA";
import prisma from "@/lib/prisma";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [featuredProjects, latestPosts, skills, experience, settings] =
    await Promise.all([
      prisma.project.findMany({
        where: { featured: true },
        orderBy: { order: "asc" },
        take: 3,
      }),
      prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          tags: true,
          publishedAt: true,
        },
      }),
      prisma.skill.findMany({ orderBy: { order: "asc" } }),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    ]);

  return (
    <>
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
