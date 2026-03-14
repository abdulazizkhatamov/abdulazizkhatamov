import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(experience);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const item = await prisma.experience.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
