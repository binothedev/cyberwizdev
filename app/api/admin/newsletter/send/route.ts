// app/api/admin/newsletter/send/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";
import { sendNewsletter } from "@/email/templates/newsletter";
import { NewsletterSubscription } from "@prisma/client";
import { Session } from "next-auth";

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
      return NextResponse.json(
        { error: "No active subscribers" },
        { status: 400 }
      );
    }

    sendMails(subscribers, content, subject, session);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter send error:", error);
    return NextResponse.json(
      { error: "Failed to send newsletter" },
      { status: 500 }
    );
  }
}

const sendMails = async (
  subscribers: NewsletterSubscription[],
  content: string,
  subject: string,
  session: Session
) => {
  // Send emails
  let sentCount = 0;
  for (const subscriber of subscribers) {
    try {
      sendNewsletter(subscriber.email, {
        subject,
        content,
        unsubscribeUrl: `${process.env.WEBSITE_URL}/unsubscribe?email=${subscriber.email}`,
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
};
