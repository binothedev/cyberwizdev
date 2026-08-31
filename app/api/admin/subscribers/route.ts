import { NextResponse } from "next/server";
import { NewsletterSubscription } from "@/lib/db/models/NewsletterSubscription";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscribers = await NewsletterSubscription.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ subscribers: subscribers.map((s) => s.toObject()) });
  } catch (error) {
    console.error("Fetch subscribers error:", error);
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}
