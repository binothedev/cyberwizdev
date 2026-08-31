import { NextResponse } from "next/server";
import { ChatMessage } from "@/lib/db/models/ChatMessage";
import { ChatSession } from "@/lib/db/models/ChatSession";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId, message, senderName } = await req.json();

    await ChatMessage.create({
      data: {
        sessionId,
        message,
        sender: "admin",
        senderName: senderName || "Admin",
      },
    });

    await ChatSession.update({
      where: { id: sessionId },
      data: {
        lastMessage: message,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send admin message error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
