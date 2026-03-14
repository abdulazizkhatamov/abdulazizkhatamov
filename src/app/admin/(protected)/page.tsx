import prisma from "@/lib/prisma";
import OpenToWorkToggle from "@/components/admin/OpenToWorkToggle";

export default async function AdminDashboard() {
  const [projectCount, postCount, unreadCount, messageCount, settings] =
    await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.message.count({ where: { read: false } }),
      prisma.message.count(),
      prisma.siteSettings.upsert({
        where: { id: "singleton" },
        update: {},
        create: { id: "singleton", openToWork: true },
      }),
    ]);

  const stats = [
    { label: "Projects", value: projectCount },
    { label: "Published Posts", value: postCount },
    { label: "Total Messages", value: messageCount },
    { label: "Unread Messages", value: unreadCount, accent: true },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-(--color-text) dark:text-(--color-text-dark)">
          Dashboard
        </h1>
        <OpenToWorkToggle initialValue={settings.openToWork} />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}
            className="rounded-xl border border-(--color-border) dark:border-(--color-border-dark) bg-(--color-surface) dark:bg-(--color-surface-dark) p-6 flex flex-col gap-2">
            <span className="text-xs text-(--color-muted) dark:text-(--color-muted-dark) uppercase tracking-wider">
              {stat.label}
            </span>
            <span className={`text-3xl font-bold ${stat.accent ? "text-(--color-accent) dark:text-(--color-accent-dark)" : "text-(--color-text) dark:text-(--color-text-dark)"}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
