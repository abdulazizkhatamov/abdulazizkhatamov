import prisma from "@/lib/prisma";
import BlogEditor from "@/components/admin/BlogEditor";

type Props = { params: Promise<{ id: string }> };

export default async function AdminBlogEditorPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const post = isNew
    ? null
    : await prisma.blogPost.findUnique({ where: { id } });

  return <BlogEditor post={post} isNew={isNew} />;
}
