import { NextResponse } from "next/server";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { User } from "@/lib/db/models/User";
import { relayRequest } from "@/lib/db/relay";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
    }

    // Find the user by email from session to get the stored hash
    const user = await User.findUnique({ where: { email: session.user.email } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password using the app-side User model
    // User.update expects: { where: { field: value }, data: { ... } }
    const updated = await User.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({
      ok: true,
      message: "Password changed successfully",
      user: {
        id: updated.id,
        email: updated.email,
        role: updated.role,
      },
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to change password" },
      { status: 500 }
    );
  }
}