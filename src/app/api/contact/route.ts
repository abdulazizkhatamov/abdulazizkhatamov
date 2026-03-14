import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  try {
    // Save to database
    await prisma.message.create({
      data: { name, email, subject, body: message },
    });

    // Send email notification
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
