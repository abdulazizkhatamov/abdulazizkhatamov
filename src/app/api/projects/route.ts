import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const project = await prisma.project.create({ data: body });
  return NextResponse.json(project, { status: 201 });
}
