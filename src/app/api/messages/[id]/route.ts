import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const { read } = await req.json();
  const message = await prisma.message.update({ where: { id }, data: { read } });
  return NextResponse.json(message);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.message.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
