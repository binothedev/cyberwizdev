// app/api/admin/chat/send/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId, message, senderName } = await req.json();

    await prisma.chatMessage.create({
      data: {
        sessionId,
        message,
        sender: "admin",
        senderName: senderName || "Admin",
      },
    });

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { 
        lastMessage: message,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send admin message error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}