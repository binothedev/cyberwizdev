// app/api/chat/start/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function POST(req: Request) {
  try {
    const { userName, userEmail } = await req.json();

    const session = await prisma.chatSession.create({
      data: {
        userName,
        userEmail,
        status: "active",
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Start chat error:", error);
    return NextResponse.json({ error: "Failed to start chat" }, { status: 500 });
  }
}