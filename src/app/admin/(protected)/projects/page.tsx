import prisma from "@/lib/prisma";
import ProjectsTable from "@/components/admin/ProjectsTable";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-(--color-text) dark:text-(--color-text-dark)">
          Projects
        </h1>
      </div>
      <ProjectsTable projects={projects} />
    </div>
  );
}
