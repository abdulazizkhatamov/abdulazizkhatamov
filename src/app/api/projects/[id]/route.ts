import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await req.json();
  const project = await prisma.project.update({ where: { id }, data: body });
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
