import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton", openToWork: true },
  });
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await req.json();
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: body,
    create: { id: "singleton", ...body },
  });
  return NextResponse.json(settings);
}
