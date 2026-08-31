import { NextResponse } from "next/server";
import { ChatMessage } from "@/lib/db/models/ChatMessage";
import { ChatSession } from "@/lib/db/models/ChatSession";
import { sendLiveChatAlert } from "@/email/templates/liveChatAlert";

export async function POST(req: Request) {
  try {
    const { sessionId, message, userName } = await req.json();

    await ChatMessage.create({
      data: {
        sessionId,
        message,
        sender: "user",
        senderName: userName,
      },
    });

    await ChatSession.update({
      where: { id: sessionId },
      data: {
        lastMessage: message,
      },
    });

    sendLiveChatAlert(process.env.ADMIN_EMAIL!, {
      visitorName: userName || "Visitor",
      timestamp: new Date().toLocaleString(),
      messageContent: message,
      chatDashboardUrl: `${process.env.AUTH_URL}/admin/chat`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
