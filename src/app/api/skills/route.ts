import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const skill = await prisma.skill.create({ data: body });
  return NextResponse.json(skill, { status: 201 });
}
