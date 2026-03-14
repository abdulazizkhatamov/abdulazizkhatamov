import prisma from "@/lib/prisma";
import SkillsManager from "@/components/admin/SkillsManager";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-(--color-text) dark:text-(--color-text-dark)">
        Skills
      </h1>
      <SkillsManager skills={skills} />
    </div>
  );
}
