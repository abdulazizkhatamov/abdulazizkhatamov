import prisma from "@/lib/prisma";
import ExperienceManager from "@/components/admin/ExperienceManager";

export default async function AdminExperiencePage() {
  const experience = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-(--color-text) dark:text-(--color-text-dark)">
        Experience
      </h1>
      <ExperienceManager experience={experience} />
    </div>
  );
}
