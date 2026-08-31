import { NextResponse } from "next/server";
import { Contact } from "@/lib/db/models/Contact";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contacts = await Contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ contacts: contacts.map((c) => c.toObject()) });
  } catch (error) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
