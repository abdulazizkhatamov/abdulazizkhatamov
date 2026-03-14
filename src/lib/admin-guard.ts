import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session };
}
