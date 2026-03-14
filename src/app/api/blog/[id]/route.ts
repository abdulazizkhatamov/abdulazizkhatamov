import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const post = await prisma.blogPost.update({ where: { id }, data: body });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
