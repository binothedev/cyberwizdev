// ============================================
// templates/newsletter.ts - Newsletter Renderer
// ============================================

import { EmailSender } from "../sender";
import { NewsletterData } from "../types";
import path from "path";

const twitterUrl = process.env.TWITTER_URL || "https://twitter.com/cyberwizdev";
const linkedinUrl =
  process.env.LINKEDIN_URL || "https://linkedin.com/company/cyberwizdev";
const facebookUrl =
  process.env.FACEBOOK_URL || "https://facebook.com/cyberwizdev";
const websiteUrl = process.env.WEBSITE_URL || "https://www.cyberwizdev.com.ng";

export async function renderNewsletter(data: NewsletterData): Promise<string> {
  const templatePath = path.join(
    process.cwd(),
    "email",
    "templates",
    "html",
    "newsletter.html"
  );
  return await EmailSender.renderTemplate(templatePath, data, "Newsletter");
}

export async function sendNewsletter(
  to: string | string[],
  data: { subject: string, unsubscribeUrl: string; content: string }
): Promise<void> {
  const html = await renderNewsletter({
    ...data,
    twitterUrl,
    facebookUrl,
    linkedinUrl,
    companyName: "Cyberwizdev Software Solutions",
    websiteUrl,
  });
  await EmailSender.sendEmail(to, data.subject, html, {
    from: process.env.EMAIL_FROM || "Cyberwizdev Newsletter <newsletter@cyberwizdev.com.ng>",
  });
}
