// app/api/chat/send/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function POST(req: Request) {
  try {
    const { sessionId, message, userName } = await req.json();

    await prisma.chatMessage.create({
      data: {
        sessionId,
        message,
        sender: "user",
        senderName: userName,
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
    console.error("Send message error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}