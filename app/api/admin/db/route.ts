import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { relayRequest } from "@/lib/db/relay";

/**
 * Admin DB operations (migrate / seed / migrate_status) through the PHP relay.
 * All endpoints require an authenticated admin session.
 */

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await req.json();

    if (action !== "migrate" && action !== "seed" && action !== "migrate_status") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const response = await relayRequest(action);
    return NextResponse.json({ ok: true, result: response });
  } catch (error) {
    console.error("DB relay action error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Relay action failed" },
      { status: 500 }
    );
  }
}
