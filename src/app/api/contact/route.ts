import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import prisma from "@/lib/prisma";

// ─── Rate limiting ─────────────────────────────────────────────────────────
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS) return true;

  record.count++;
  return false;
}

// ─── Handler ───────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before sending another message." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  try {
    await prisma.message.create({
      data: { name, email, subject, body: message },
    });

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "abdulazizkhatamov@hotmail.com",
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
