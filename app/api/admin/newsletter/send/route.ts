// app/api/admin/newsletter/send/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subject, content } = await req.json();

    // Get all active subscribers
    const subscribers = await prisma.newsletterSubscription.findMany({
      where: { status: "active" },
    });

    if (subscribers.length === 0) {
      return NextResponse.json({ error: "No active subscribers" }, { status: 400 });
    }

    // Configure your email transporter (use your email service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send emails
    let sentCount = 0;
    for (const subscriber of subscribers) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || "noreply@cyberwizdev.com",
          to: subscriber.email,
          subject: subject,
          html: content,
        });
        sentCount++;
      } catch (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error);
      }
    }

    // Save newsletter record
    await prisma.newsletter.create({
      data: {
        subject,
        content,
        sentBy: session.user.email || "admin",
        sentCount,
      },
    });

    return NextResponse.json({ success: true, sentCount });
  } catch (error) {
    console.error("Newsletter send error:", error);
    return NextResponse.json({ error: "Failed to send newsletter" }, { status: 500 });
  }
}