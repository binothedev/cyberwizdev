"use server"

import { ContactFormData } from "@/components/ContactForm";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer"

const prisma = new PrismaClient();

export const contact = async (data: ContactFormData) => {
  const { name, phone, email, message } = data;

  try {
    await prisma.contact.create({ data: { name, email, message, phone } });
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "hallelojowuro@gmail.com",
      subject: "Contact Form (Cyberwizdev)",
      html: `
        <div style="background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="margin-top: 0;">Contact Information</h2>
            <p><strong style="font-weight: bold; color: #333;">Name:</strong> ${name}</p>
            <p><strong style="font-weight: bold; color: #333;">Phone:</strong> ${phone}</p>
            <p><strong style="font-weight: bold; color: #333;">Email:</strong> ${email}</p>
            <h2 style="margin-top: 20px;">Message</h2>
            <p>${message}</p>
        </div>
        `,
      replyTo: email,
    });
  } catch (ex) {
    console.log(ex);
    throw new Error("Something went wrong. Please try again!")
  }
};

export const subscribeToNewsletter = async (email: string) => {
  try {
    await prisma.newsletterSubscription.create({ data: { email } });
  } catch (ex) {
    console.log(ex);
    throw new Error("Something went wrong. Please try again!")
  }
};
