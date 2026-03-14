export const dynamic = "force-dynamic";

import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BlogPostContent from "@/components/blog/BlogPostContent";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return { title: `${post.title} — Abdulaziz Hatamov`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return <BlogPostContent post={post} />;
}
