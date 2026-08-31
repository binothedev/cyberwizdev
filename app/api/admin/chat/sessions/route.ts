import { NextResponse } from "next/server";
import { ChatSession } from "@/lib/db/models/ChatSession";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = await ChatSession.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ sessions: sessions.map((s) => s.toObject()) });
  } catch (error) {
    console.error("Fetch sessions error:", error);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
