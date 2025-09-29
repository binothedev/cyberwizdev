// ============================================
// templates/contactFormUser.ts - Contact Form User Renderer
// ============================================

import { EmailSender } from '../sender';
import { ContactFormUserData } from '../types';
import path from 'path';

const caseStudiesUrl = process.env.CASE_STUDIES_URL || 'https://www.cyberwizdev.com.ng/portfolio';
const websiteUrl = process.env.WEBSITE_URL || 'https://www.cyberwizdev.com.ng';
const phoneNumber = process.env.CONTACT_PHONE || '+1-800-123-4567';
const companyName = process.env.COMPANY_NAME || 'CyberWizDev';
const companyAddress = process.env.COMPANY_ADDRESS || 'Akure, Ondo, Nigeria';

const companyEmail = process.env.COMPANY_EMAIL || 'info@cyberwizdev.com';
const twitterUrl = process.env.TWITTER_URL || 'https://twitter.com/cyberwizdev';
const linkedinUrl = process.env.LINKEDIN_URL || 'https://linkedin.com/company/cyberwizdev';
const facebookUrl = process.env.FACEBOOK_URL || 'https://facebook.com/cyberwizdev';


export async function renderContactFormUser(data: ContactFormUserData): Promise<string> {
  const templatePath = path.join(process.cwd(), 'email', 'templates', 'html', 'user-contact.html');
  return await EmailSender.renderTemplate(templatePath, data, 'Message Received - We\'ll Be In Touch');
}

export async function sendContactFormUser(to: string, data: { name: string, message: string }): Promise<void> {
  const html = await renderContactFormUser({
    contactName: data.name,
    contactMessagePreview: data.message,
    websiteUrl,
    caseStudiesUrl,
    phoneNumber,
    companyName,
    companyAddress,
    companyEmail,
    twitterUrl,
    linkedinUrl,
    facebookUrl,
  });
  await EmailSender.sendEmail(to, '✓ We Received Your Message', html, {
    from: process.env.EMAIL_FROM || 'support@cyberwizdev.com',
  });
}
