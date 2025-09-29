// app/api/admin/subscribers/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const awaitedParams = await params;
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.newsletterSubscription.delete({
      where: { id: awaitedParams.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete subscriber error:", error);
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
