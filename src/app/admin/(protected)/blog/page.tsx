import prisma from "@/lib/prisma";
import BlogTable from "@/components/admin/BlogTable";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      publishedAt: true,
      tags: true,
      createdAt: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-(--color-text) dark:text-(--color-text-dark)">
        Blog
      </h1>
      <BlogTable posts={posts} />
    </div>
  );
}
