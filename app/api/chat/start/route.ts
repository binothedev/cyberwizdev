import { NextResponse } from "next/server";
import { ChatSession } from "@/lib/db/models/ChatSession";

export async function POST(req: Request) {
  try {
    const { userName, userEmail } = await req.json();

    const session = await ChatSession.create({
      data: {
        userName,
        userEmail,
        status: "active",
      },
    });

    return NextResponse.json({ sessionId: session.get("id") });
  } catch (error) {
    console.error("Start chat error:", error);
    return NextResponse.json({ error: "Failed to start chat" }, { status: 500 });
  }
}
